/**
 * Free image optimisation, run on your machine: `npm run images`.
 *
 * Finds every .png / .jpg / .jpeg under public/projects and public/images and writes a
 * resized .webp next to it (max 1600px wide, quality 80). Point projects.ts at the .webp.
 * Originals are kept so you can re-run with different settings; existing .webp files are
 * skipped unless the original is newer.
 */
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOTS = ["public/projects", "public/images"];
const MAX_WIDTH = 1600;

async function* walk(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let made = 0;
for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const ext = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    const out = file.slice(0, -ext.length) + ".webp";
    const src = await stat(file);
    const dst = await stat(out).catch(() => null);
    if (dst && dst.mtimeMs >= src.mtimeMs) continue;
    const info = await sharp(file).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    made++;
    console.log(`  ${out}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB  (was ${(src.size / 1024).toFixed(0)} KB)`);
  }
}
console.log(made ? `✓ Optimised ${made} image(s)` : "✓ All images already optimised");
