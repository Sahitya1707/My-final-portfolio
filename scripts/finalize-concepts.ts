/**
 * Runs after `next build`. The concept demo sites in public/concepts/ are plain HTML, so they
 * can't read content/site.ts. They are written with the placeholder address below; this swaps
 * in the real site URL (site.url, or NEXT_PUBLIC_SITE_URL) in the exported copies in ./out.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "../content/site";

const PLACEHOLDER = "https://sahitya-neupane.pages.dev";
const url = site.url.replace(/\/$/, "");
const dir = join(process.cwd(), "out", "concepts");

if (!existsSync(dir)) {
  console.log("No out/concepts folder; nothing to update.");
  process.exit(0);
}
let n = 0;
for (const slug of readdirSync(dir)) {
  const file = join(dir, slug, "index.html");
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  writeFileSync(file, html.split(PLACEHOLDER).join(url));
  n++;
}
console.log(`✓ ${n} concept site(s) point at ${url}`);
