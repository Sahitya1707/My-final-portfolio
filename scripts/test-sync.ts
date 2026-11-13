/**
 * Offline test for scripts/sync-github.ts: `npm run test:sync`.
 * Feeds the sync script fake GitHub API responses and checks what it imports.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const key = (url: string) => url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
const work = mkdtempSync(join(tmpdir(), "sync-test-"));
const fixtures = join(work, "fixtures");
mkdirSync(fixtures);
const put = (url: string, body: string | Buffer) => writeFileSync(join(fixtures, key(url)), body);

const repo = (name: string, extra: Record<string, unknown> = {}) => ({
  name,
  full_name: `tester/${name}`,
  private: false,
  fork: false,
  archived: false,
  html_url: `https://github.com/tester/${name}`,
  homepage: null,
  description: null,
  topics: ["portfolio"],
  language: "TypeScript",
  pushed_at: "2026-10-05T10:00:00Z",
  default_branch: "main",
  ...extra,
});

const contents = (r: string, path: string) => `https://api.github.com/repos/tester/${r}/contents/${path}?ref=main`;

async function main() {
  put(
    "https://api.github.com/users/tester/repos?type=owner&per_page=100&page=1",
    JSON.stringify([
      repo("good-site", { homepage: "https://good.example.com", description: "Repo description" }),
      repo("no-file"),
      repo("not-tagged", { topics: [] }),
      repo("draft-one"),
      repo("bad-category"),
      repo("a-fork", { fork: true }),
    ])
  );
  put(
    contents("good-site", "portfolio.json"),
    JSON.stringify({
      name: "Good Site",
      summary: "A concept website for a bakery.",
      category: "Concept",
      status: "Live",
      completed: "2026-11",
      role: "Design and development.",
      technologies: ["Next.js", "Tailwind CSS"],
      features: ["Online menu", "Click to call"],
      cover: { src: "docs/cover.png", alt: "Home page of Good Site" },
      featured: true,
    })
  );
  put(contents("good-site", "docs/cover.png"), await sharp({ create: { width: 2000, height: 1250, channels: 3, background: "#c4421b" } }).png().toBuffer());
  put(contents("draft-one", "portfolio.json"), JSON.stringify({ summary: "Not ready", draft: true }));
  put(contents("bad-category", "portfolio.json"), JSON.stringify({ summary: "x", category: "Spaceship" }));

  const out = execFileSync("npx", ["tsx", join(process.cwd(), "scripts/sync-github.ts")], {
    cwd: work,
    env: { ...process.env, GITHUB_USER: "tester", SYNC_FIXTURES: fixtures, GITHUB_TOKEN: "" },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  console.log(out);

  const result = JSON.parse(readFileSync(join(work, "content/generated/github-projects.json"), "utf8"));
  const checks: [string, boolean][] = [
    ["imports exactly one project", result.length === 1],
    ["uses id from repo name", result[0]?.id === "good-site"],
    ["keeps the Concept category", result[0]?.category === "Concept"],
    ["fills liveUrl from the repo homepage", result[0]?.liveUrl === "https://good.example.com"],
    ["links public source code", result[0]?.githubUrl === "https://github.com/tester/good-site"],
    ["marks the source", result[0]?.source === "github"],
    ["downloads and converts the cover", result[0]?.cover?.src === "/projects/good-site/cover.webp" && existsSync(join(work, "public/projects/good-site/cover.webp"))],
    ["resizes the cover to 1600px", (await sharp(join(work, "public/projects/good-site/cover.webp")).metadata()).width === 1600],
  ];
  rmSync(work, { recursive: true, force: true });
  let failed = 0;
  for (const [name, ok] of checks) {
    console.log(`${ok ? "✓" : "✗"} ${name}`);
    if (!ok) failed++;
  }
  if (failed) process.exit(1);
}

main();
