import { google } from "googleapis";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const rawSheetId = process.env.SHEET_ID;
  const rawSheetName = process.env.SHEET_NAME || "Sheet1";

  if (!rawSheetId)
    return res.status(500).json({ error: "SHEET_ID not configured" });

  const SHEET_NAME = String(rawSheetName)
    .replace(/^['"]|['"]$/g, "")
    .trim();

  // load service account key JSON from env or file
  let key;
  try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      if (typeof key.private_key === "string")
        key.private_key = key.private_key.replace(/\\n/g, "\n");
    } else if (process.env.GOOGLE_SERVICE_ACCOUNT_FILE) {
      const candidate = path.resolve(
        process.cwd(),
        process.env.GOOGLE_SERVICE_ACCOUNT_FILE
      );
      if (!fs.existsSync(candidate))
        throw new Error(`Service account file not found at ${candidate}`);
      const raw = fs.readFileSync(candidate, "utf8");
      key = JSON.parse(raw);
      if (typeof key.private_key === "string")
        key.private_key = key.private_key.replace(/\\n/g, "\n");
    } else {
      return res
        .status(500)
        .json({ error: "Service account key not configured." });
    }
  } catch (err) {
    console.error("Service account key parse error", err);
    return res
      .status(500)
      .json({ error: "Invalid service account key", detail: err.message });
  }

  try {
    const jwtClient = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    await jwtClient.authorize();

    const sheets = google.sheets({ version: "v4", auth: jwtClient });

    const needsQuoting = /[^A-Za-z0-9_]/.test(SHEET_NAME);
    const safeName = needsQuoting
      ? `'${SHEET_NAME.replace(/'/g, "\\'")}'`
      : SHEET_NAME;
    const range = `${safeName}!A:Z`;
    console.log("Using range for Sheets API:", range);

    // fetch sheet
    const r = await sheets.spreadsheets.values.get({
      spreadsheetId: rawSheetId,
      range,
    });

    // Debug: log everything for first-step inspection (remove in production)
    console.log("Full Sheets API response object (r):");
    console.log(JSON.stringify(r, null, 2));

    const values = r.data.values || [];
    console.log("Raw values array:", JSON.stringify(values, null, 2));

    if (values.length === 0) {
      console.log("Sheet returned no rows.");
      return res.status(200).json({ items: [] });
    }

    // read headers from first row; if headers empty, fallback to positional mapping
    const rawHeaders = values[0].map((h) =>
      (h ?? "").toString().trim().toLowerCase()
    );
    console.log(
      "Parsed headers (rawHeaders):",
      JSON.stringify(rawHeaders, null, 2)
    );
    const headerEmpty = rawHeaders.every((h) => !h);
    console.log("headerEmpty:", headerEmpty);

    const headers = headerEmpty ? ["id", "title", "meta"] : rawHeaders;
    console.log("Effective headers used:", JSON.stringify(headers, null, 2));

    const rows = values.slice(1);
    console.log("Rows to parse (rows):", JSON.stringify(rows, null, 2));

    const items = rows
      .map((row, idx) => {
        const obj = {};
        for (let i = 0; i < Math.max(3, headers.length); i++) {
          const keyName = headers[i] || `col${i}`;
          obj[keyName] = (row[i] ?? "").toString().trim();
        }
        return {
          id: obj.id || obj.col0 || idx + 1,
          title: obj.title || obj.col1 || "",
          meta: obj.meta || obj.col2 || "",
        };
      })
      .filter((it) => it.title !== "" || it.meta !== "" || it.id !== "");

    console.log(
      "Final parsed items to return:",
      JSON.stringify(items, null, 2)
    );

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ items });
  } catch (err) {
    console.error("Sheets (service account) error:", err);
    if (
      err &&
      err.message &&
      err.message.toLowerCase().includes("parse range")
    ) {
      return res.status(400).json({
        error: "Invalid sheet range",
        detail: `Unable to parse range for SHEET_NAME="${SHEET_NAME}". Use a tab name or 'TabName!A:Z'.`,
      });
    }
    return res
      .status(500)
      .json({ error: "Failed to load sheet", detail: err.message || null });
  }
}
