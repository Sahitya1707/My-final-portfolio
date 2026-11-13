# Automatic project import from GitHub

Finish a project, tag its repository, and it appears on your portfolio within a day. You don't edit this repository at all. It's free: a scheduled GitHub Action runs once a day and Cloudflare redeploys when anything changes.

## How it works

```
your project repo                     this repo (daily GitHub Action)              Cloudflare Pages
─────────────────                     ───────────────────────────────              ────────────────
topic: portfolio      ──┐
portfolio.json          ├──►  npm run sync  →  content/generated/github-projects.json  ──►  redeploys on push
docs/cover.png        ──┘                   →  public/projects/<id>/cover.webp
```

1. `.github/workflows/sync-projects.yml` runs every day (and whenever you press **Run workflow**).
2. It lists your repositories, keeps those with the **`portfolio`** topic, and reads each one's **`portfolio.json`**.
3. Screenshots named in `portfolio.json` are downloaded and converted to WebP.
4. If anything changed, the Action commits it to `production`. Cloudflare sees the push and redeploys.

Only finished work shows up: no topic or no `portfolio.json` means no import, and `"draft": true` keeps a project hidden until you flip it to `false`.

## Publishing a project (about 5 minutes)

1. **Add `portfolio.json`** to the root of the project's repository. Copy [`portfolio.example.json`](portfolio.example.json) and edit it.
2. **Add a screenshot** to that repo, e.g. `docs/cover.png` (1440×900 desktop screenshot is ideal), and point `cover.src` at it.
3. **Add the topic**: on the repo's GitHub page click the ⚙ next to **About** → **Topics** → type `portfolio` → **Save changes**.
4. Wait for the daily run, or go to this repo's **Actions** tab → **Sync projects from GitHub** → **Run workflow** for an instant update.

## `portfolio.json` fields

Same meaning as in `content/projects.ts` (see [ADDING-PROJECTS.md](ADDING-PROJECTS.md)). Everything is optional except a summary.

| Field | Default if left out |
|---|---|
| `summary` | The repository description. One of the two is required. |
| `name` | Repository name |
| `id` | Repository name, lowercased (the page is `/work/<id>/`) |
| `category` | `"Web app"`. Options: `Website`, `Web app`, `Product`, `Concept`, `Open source`, `Experiment` |
| `status` | `"Live"` |
| `completed` | Month of the last push, e.g. `"2026-11"` |
| `description` | The summary. Use a list of paragraphs. |
| `role` | `"Solo. Design and development."` |
| `technologies` | The repo's main language |
| `features`, `context`, `links`, `screenshots` | none |
| `cover` | none. A typographic cover is drawn. `src` is a path in that repo or a full `https://` image URL. |
| `liveUrl` | The repository's **Website** field |
| `featured`, `order`, `archived` | `false` / none / `false` |
| `draft` | `false`. Set `true` to keep it off the site. |
| `showCode` | `true`. Set `false` to hide the GitHub link on a public repo. |

The source-code link is added automatically for public repositories.

## Private repositories (optional)

By default only **public** repositories are scanned. To include private ones (their code link is never shown):

1. Create a **fine-grained personal access token** at <https://github.com/settings/personal-access-tokens/new>: Resource owner = you, Repository access = **All repositories**, Permissions → Repository → **Contents: Read-only** (Metadata is added automatically). Set an expiry you'll remember.
2. In this repo: **Settings → Secrets and variables → Actions → New repository secret**, name `PORTFOLIO_SYNC_TOKEN`, paste the token.

## Overriding or removing an import

- To change how an imported project looks without touching its repo, add an entry with the **same `id`** to `content/projects.ts`. Hand-written entries win.
- To remove it, delete the `portfolio` topic (or set `"draft": true`). The next sync removes the project and its images.

## Running it yourself

```bash
npm run sync          # scan GitHub now (set GITHUB_TOKEN to avoid the 60-requests-an-hour limit)
npm run test:sync     # offline test with fake GitHub responses
```

If GitHub is down or a `portfolio.json` is broken, that repo is skipped with a warning. A failed run changes nothing, so the live site keeps the last good import.

## Recent-work feed

`/work/feed.xml` is an RSS feed of current projects, rebuilt on every deploy. Point a free feed tool at it (for example an RSS-to-LinkedIn or RSS-to-email automation) if you'd like new work announced automatically. You don't have to write any posts for it.
