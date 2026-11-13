/**
 * Import finished projects from your GitHub repositories: `npm run sync`.
 *
 * A repository is imported when BOTH are true:
 *   1. it has the topic `portfolio` (repo page → ⚙ next to "About" → Topics), and
 *   2. it has a `portfolio.json` file in its root (see docs/AUTOMATION.md for the format).
 *
 * The script writes content/generated/github-projects.json and downloads any screenshots
 * listed in portfolio.json into public/projects/<id>/ as compressed WebP.
 * A scheduled GitHub Action runs it daily and commits changes, which makes Cloudflare redeploy.
 *
 * Environment variables (all optional):
 *   GITHUB_USER      whose repositories to scan (default: Sahitya1707)
 *   GITHUB_TOKEN     raises the API rate limit; a personal token with read access also
 *                    lets private repositories be imported (their code link is hidden)
 *   PORTFOLIO_TOPIC  topic that marks a repo for import (default: portfolio)
 *   SYNC_FIXTURES    folder of fake API responses, used by scripts/test-sync.ts
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename, extname } from "node:path";
import sharp from "sharp";
import type { Project, ProjectImage } from "../content/types";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "../content/types";
import { projects as manualProjects } from "../content/projects";

const USER = process.env.GITHUB_USER || "Sahitya1707";
const TOKEN = process.env.GITHUB_TOKEN || "";
const TOPIC = (process.env.PORTFOLIO_TOPIC || "portfolio").toLowerCase();
const ROOT = process.cwd();
const OUT_JSON = join(ROOT, "content/generated/github-projects.json");

interface Repo {
  name: string;
  full_name: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  html_url: string;
  homepage: string | null;
  description: string | null;
  topics?: string[];
  language: string | null;
  pushed_at: string;
  default_branch: string;
}

type FetchLike = (url: string, init?: { headers?: Record<string, string> }) => Promise<{
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
  arrayBuffer(): Promise<ArrayBuffer>;
}>;

function makeFetch(): FetchLike {
  const fixtures = process.env.SYNC_FIXTURES;
  if (!fixtures) return fetch as unknown as FetchLike;
  // Test mode: map URLs to files in the fixtures folder.
  return async (url) => {
    const key = url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
    const file = join(fixtures, key);
    const exists = existsSync(file);
    const buf = exists ? await readFile(file) : Buffer.from("");
    return {
      ok: exists,
      status: exists ? 200 : 404,
      json: async () => JSON.parse(buf.toString("utf8")),
      arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
    };
  };
}

const http = makeFetch();
const headers = (accept = "application/vnd.github+json"): Record<string, string> => ({
  Accept: accept,
  "User-Agent": "portfolio-sync",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
});

async function listRepos(): Promise<Repo[]> {
  const repos: Repo[] = [];
  // With a personal token for this user, /user/repos also returns private repos.
  const base = TOKEN && process.env.SYNC_INCLUDE_PRIVATE === "1"
    ? "https://api.github.com/user/repos?affiliation=owner&visibility=all"
    : `https://api.github.com/users/${USER}/repos?type=owner`;
  for (let page = 1; page <= 10; page++) {
    const res = await http(`${base}&per_page=100&page=${page}`, { headers: headers() });
    if (!res.ok) throw new Error(`GitHub API returned ${res.status} listing repositories.`);
    const batch = (await res.json()) as Repo[];
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function getFile(repo: Repo, path: string): Promise<Buffer | null> {
  const url = `https://api.github.com/repos/${repo.full_name}/contents/${path.replace(/^\/+/, "")}?ref=${repo.default_branch}`;
  const res = await http(url, { headers: headers("application/vnd.github.raw") });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

async function getUrl(url: string): Promise<Buffer | null> {
  const res = await http(url, { headers: { "User-Agent": "portfolio-sync" } });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const asList = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String).map((s) => s.trim()).filter(Boolean) : typeof v === "string" && v.trim() ? [v.trim()] : [];

interface RawImage {
  src?: string;
  alt?: string;
  caption?: string;
}

async function importImage(repo: Repo, id: string, img: RawImage | string | undefined, fallbackAlt: string): Promise<ProjectImage | undefined> {
  if (!img) return undefined;
  const raw = typeof img === "string" ? { src: img } : img;
  if (!raw.src) return undefined;
  const data = /^https?:\/\//.test(raw.src) ? await getUrl(raw.src) : await getFile(repo, raw.src);
  if (!data) {
    console.warn(`  ! ${repo.name}: couldn't download image "${raw.src}", skipping it`);
    return undefined;
  }
  const name = slugify(basename(raw.src, extname(raw.src))) || "image";
  const dir = join(ROOT, "public/projects", id);
  await mkdir(dir, { recursive: true });
  try {
    await sharp(data).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(dir, `${name}.webp`));
  } catch {
    console.warn(`  ! ${repo.name}: "${raw.src}" isn't an image sharp can read, skipping it`);
    return undefined;
  }
  return {
    src: `/projects/${id}/${name}.webp`,
    alt: raw.alt?.trim() || fallbackAlt,
    ...(raw.caption ? { caption: raw.caption } : {}),
  };
}

/** Turn one repo + its portfolio.json into a Project, or explain why not. */
async function toProject(repo: Repo, meta: Record<string, unknown>): Promise<Project | string> {
  if (meta.draft === true || meta.publish === false) return "marked as draft";
  const name = String(meta.name || repo.name).trim();
  const id = slugify(String(meta.id || repo.name));
  const summary = String(meta.summary || repo.description || "").trim();
  if (!summary) return 'needs a "summary" (or a repository description)';
  const category = String(meta.category || "Web app");
  if (!(PROJECT_CATEGORIES as readonly string[]).includes(category))
    return `category "${category}" must be one of: ${PROJECT_CATEGORIES.join(", ")}`;
  const status = String(meta.status || "Live");
  if (!(PROJECT_STATUSES as readonly string[]).includes(status))
    return `status "${status}" must be one of: ${PROJECT_STATUSES.join(", ")}`;
  const completed = String(meta.completed || repo.pushed_at.slice(0, 7));
  if (!/^\d{4}(-\d{2})?$/.test(completed)) return `completed "${completed}" should look like 2026 or 2026-11`;
  const description = asList(meta.description);
  const technologies = asList(meta.technologies);
  if (technologies.length === 0 && repo.language) technologies.push(repo.language);

  const cover = await importImage(repo, id, meta.cover as RawImage, `${name} screenshot`);
  const screenshots: ProjectImage[] = [];
  for (const s of (Array.isArray(meta.screenshots) ? meta.screenshots : []) as (RawImage | string)[]) {
    const img = await importImage(repo, id, s, `${name} screenshot`);
    if (img) screenshots.push(img);
  }
  const liveUrl = String(meta.liveUrl || repo.homepage || "").trim();
  const links = Array.isArray(meta.links)
    ? (meta.links as { label?: string; url?: string }[]).filter((l) => l.label && l.url && /^https?:\/\//.test(l.url)).map((l) => ({ label: String(l.label), url: String(l.url) }))
    : [];

  const p: Project = {
    id,
    name,
    summary,
    description: description.length ? description : [summary],
    category: category as Project["category"],
    status: status as Project["status"],
    completed,
    role: String(meta.role || "Solo. Design and development."),
    technologies,
    features: asList(meta.features),
    source: "github",
  };
  if (meta.context) p.context = String(meta.context);
  if (cover) p.cover = cover;
  if (screenshots.length) p.screenshots = screenshots;
  if (/^https?:\/\//.test(liveUrl)) p.liveUrl = liveUrl;
  if (!repo.private && meta.showCode !== false) p.githubUrl = repo.html_url;
  if (links.length) p.links = links;
  if (meta.featured === true) p.featured = true;
  if (typeof meta.order === "number") p.order = meta.order;
  if (meta.archived === true) p.archived = true;
  return p;
}

async function main() {
  console.log(`Scanning ${USER}'s repositories for the "${TOPIC}" topic…`);
  const repos = (await listRepos()).filter((r) => !r.fork && (r.topics ?? []).map((t) => t.toLowerCase()).includes(TOPIC));
  console.log(`  ${repos.length} tagged repositor${repos.length === 1 ? "y" : "ies"}`);

  const previous: Project[] = existsSync(OUT_JSON) ? JSON.parse(await readFile(OUT_JSON, "utf8")) : [];
  const projects: Project[] = [];

  for (const repo of repos) {
    const file = await getFile(repo, "portfolio.json");
    if (!file) {
      console.warn(`  ! ${repo.name}: has the topic but no portfolio.json in its root, skipped`);
      continue;
    }
    let meta: Record<string, unknown>;
    try {
      meta = JSON.parse(file.toString("utf8"));
    } catch (e) {
      console.warn(`  ! ${repo.name}: portfolio.json is not valid JSON (${(e as Error).message}), skipped`);
      continue;
    }
    const result = await toProject(repo, meta);
    if (typeof result === "string") {
      console.warn(`  ! ${repo.name}: ${result}, skipped`);
      continue;
    }
    if (projects.some((p) => p.id === result.id)) {
      console.warn(`  ! ${repo.name}: id "${result.id}" already imported from another repo, skipped`);
      continue;
    }
    projects.push(result);
    console.log(`  ✓ ${result.name} → /work/${result.id}/`);
  }

  // Clean up images of projects that are no longer imported.
  for (const old of previous) {
    if (!projects.some((p) => p.id === old.id) && !manualProjects.some((m) => m.id === old.id)) {
      await rm(join(ROOT, "public/projects", old.id), { recursive: true, force: true });
      console.log(`  - removed ${old.name} (no longer tagged or published)`);
    }
  }

  projects.sort((a, b) => a.id.localeCompare(b.id));
  await mkdir(join(ROOT, "content/generated"), { recursive: true });
  await writeFile(OUT_JSON, JSON.stringify(projects, null, 2) + "\n");
  console.log(`✓ Wrote ${projects.length} imported project(s) to content/generated/github-projects.json`);
}

main().catch((e) => {
  console.error(`✗ Sync failed: ${(e as Error).message}`);
  console.error("  Nothing was changed. The site keeps the projects from the last successful sync.");
  process.exit(1);
});
