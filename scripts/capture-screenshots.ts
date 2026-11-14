/**
 * Automatic screenshots: `npm run screenshots` (after `npm run build`).
 *
 * For every current project with a liveUrl that is missing a cover or a phone screenshot,
 * this opens the live site in a headless browser and saves a desktop (1440×900) and a phone
 * (390×844) screenshot as WebP in public/projects/<id>/auto-*.webp. Results are recorded in
 * content/generated/screenshots.json and used automatically wherever the project has no
 * hand-picked image. Your own screenshots always win.
 *
 * Links that point at this site itself (the concept demos) are captured from the local ./out
 * build, so they work before the site is even deployed.
 *
 * Flags / env:
 *   --force              re-capture even projects that already have an automatic screenshot
 *   --only=<id>[,<id>]   limit to these projects
 *   PW_CHROMIUM          path to a Chromium binary (optional)
 */
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import type { AddressInfo } from "node:net";
import sharp from "sharp";
import { chromium } from "playwright";
import { site } from "../content/site";
import { projects as manual } from "../content/projects";
import generated from "../content/generated/github-projects.json";
import type { Project, ProjectImage } from "../content/types";

const ROOT = process.cwd();
const OUT_JSON = join(ROOT, "content/generated/screenshots.json");
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",") ?? null;

export type ScreenshotRecord = { url: string; capturedAt: string; cover?: ProjectImage; mobile?: ProjectImage };

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

/** Tiny static server for ./out so same-site links can be captured before deploying. */
async function serveOut(): Promise<{ origin: string; close: () => void } | null> {
  const dir = join(ROOT, "out");
  if (!existsSync(dir)) return null;
  const server = createServer(async (req, res) => {
    try {
      let path = normalize(decodeURIComponent((req.url || "/").split("?")[0])).replace(/^(\.\.[/\\])+/, "");
      let file = join(dir, path);
      if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  return { origin: `http://127.0.0.1:${(server.address() as AddressInfo).port}`, close: () => server.close() };
}

async function main() {
  const previous: Record<string, ScreenshotRecord> = existsSync(OUT_JSON) ? JSON.parse(await readFile(OUT_JSON, "utf8")) : {};
  const all: Project[] = [...manual, ...(generated as Project[]).filter((g) => !manual.some((m) => m.id === g.id))];
  const targets = all.filter((p) => {
    if (!p.liveUrl || p.archived) return false;
    if (ONLY) return ONLY.includes(p.id);
    if (p.cover && p.mobile) return false; // has its own images
    return FORCE || !previous[p.id];
  });
  if (targets.length === 0) {
    console.log("✓ Nothing to capture");
    return;
  }

  const base = site.url.replace(/\/$/, "");
  const local = await serveOut();
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const next = { ...previous };

  for (const p of targets) {
    let url = p.liveUrl!;
    if (url.startsWith(base)) {
      if (!local) {
        console.warn(`  ! ${p.name}: links to this site, run \`npm run build\` first; skipped`);
        continue;
      }
      url = local.origin + url.slice(base.length);
    }
    const dir = join(ROOT, "public/projects", p.id);
    await mkdir(dir, { recursive: true });
    const record: ScreenshotRecord = { url: p.liveUrl!, capturedAt: new Date().toISOString().slice(0, 10) };
    for (const [kind, viewport, scale] of [
      ["desktop", { width: 1440, height: 900 }, 1],
      ["mobile", { width: 390, height: 844 }, 2],
    ] as const) {
      const page = await browser.newPage({ viewport, deviceScaleFactor: scale, colorScheme: "light", reducedMotion: "reduce" });
      try {
        const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
        if (!res || !res.ok()) throw new Error(`HTTP ${res?.status() ?? "no response"}`);
        await page.waitForTimeout(1200);
        const png = await page.screenshot({ type: "png" });
        const name = `auto-${kind}.webp`;
        await sharp(png).resize({ width: kind === "desktop" ? 1440 : 780 }).webp({ quality: 80 }).toFile(join(dir, name));
        const img: ProjectImage = {
          src: `/projects/${p.id}/${name}`,
          alt: `${p.name} ${kind === "desktop" ? "home page on a desktop screen" : "on a phone"} (automatic screenshot of the live site).`,
        };
        if (kind === "desktop") record.cover = img;
        else record.mobile = img;
        console.log(`  ✓ ${p.name}: ${kind}`);
      } catch (e) {
        console.warn(`  ! ${p.name}: ${kind} screenshot failed (${(e as Error).message.split("\n")[0]})`);
      }
      await page.close();
    }
    if (record.cover || record.mobile) next[p.id] = record;
  }

  await browser.close();
  local?.close();
  // Forget projects that no longer exist.
  for (const id of Object.keys(next)) if (!all.some((p) => p.id === id)) delete next[id];
  await mkdir(join(ROOT, "content/generated"), { recursive: true });
  await writeFile(OUT_JSON, JSON.stringify(next, null, 2) + "\n");
  console.log(`✓ Screenshots recorded for ${Object.keys(next).length} project(s)`);
}

main().catch((e) => {
  console.error(`✗ Screenshot capture failed: ${(e as Error).message}`);
  process.exit(1);
});
