/**
 * Sanity checks for content/projects.ts that TypeScript can't do on its own.
 * Runs automatically before every build. Fails with a readable message instead of a broken page.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { allProjects as projects } from "../content/all-projects";

const errors: string[] = [];
const warnings: string[] = [];
const seen = new Set<string>();

for (const p of projects) {
  const where = `Project "${p.name || p.id}"`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) errors.push(`${where}: id "${p.id}" must be lowercase letters, numbers and dashes.`);
  if (seen.has(p.id)) errors.push(`${where}: id "${p.id}" is used twice.`);
  seen.add(p.id);
  if (!/^\d{4}(-\d{2})?$/.test(p.completed)) errors.push(`${where}: completed "${p.completed}" should look like "2026" or "2026-11".`);
  if (!p.summary.trim()) errors.push(`${where}: summary is empty.`);
  if (p.description.length === 0) errors.push(`${where}: description needs at least one paragraph.`);
  if (p.summary.length > 200) warnings.push(`${where}: summary is ${p.summary.length} characters; under 200 reads better in lists.`);

  const images = [p.cover, p.mobile, ...(p.screenshots ?? [])].filter(Boolean) as { src: string; alt: string }[];
  for (const img of images) {
    if (!img.src.startsWith("/")) errors.push(`${where}: image "${img.src}" should start with "/" (it lives in /public).`);
    else if (!existsSync(join(process.cwd(), "public", img.src))) {
      const hint = img.src.endsWith(".webp") ? " Did you run `npm run images`?" : "";
      errors.push(`${where}: image "${img.src}" not found in /public.${hint}`);
    }
    if (!img.alt?.trim()) errors.push(`${where}: image "${img.src}" needs alt text.`);
  }
  for (const [k, url] of [["liveUrl", p.liveUrl], ["githubUrl", p.githubUrl], ...(p.links ?? []).map((l) => ["links", l.url])] as const) {
    if (url && !/^https?:\/\//.test(url)) errors.push(`${where}: ${k} "${url}" should start with https://`);
  }
}

const featured = projects.filter((p) => p.featured).length;
if (featured === 0) warnings.push("No project has featured: true, so the home page will have no selected work.");
if (featured > 5) warnings.push(`${featured} projects are featured; three or four keeps the home page focused.`);

warnings.forEach((w) => console.warn(`  ! ${w}`));
if (errors.length) {
  console.error(`\nProject data has ${errors.length} problem(s):\n`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  console.error("\nFix these in content/projects.ts and run the build again.\n");
  process.exit(1);
}
console.log(`✓ ${projects.length} projects OK (${featured} featured)`);
