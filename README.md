# Sahitya Neupane: portfolio & freelance site

Personal site for finding website and web-app clients. A static Next.js site that costs **$0/month** to run on Cloudflare Pages: no backend, no database, no subscriptions.

- **Live:** not deployed yet. Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) (about 10 minutes).
- **Stack:** Next.js 15 (static export) · React 19 · TypeScript · Tailwind CSS 3 · self-hosted open-source fonts
- **Contact form:** Web3Forms (free) with an automatic email-app fallback

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # checks types + project data, then builds static files into ./out
npm run preview    # serve ./out at http://localhost:4000
npm run images     # convert screenshots in public/projects to compressed WebP
npm run sync       # import tagged projects from GitHub now
npm run test:sync  # offline test of the importer
```

Requires Node 20 or newer. Copy `.env.example` to `.env.local` if you want to test the real contact form locally.

## Add a project

- **Automatically:** give the project's repo the `portfolio` topic and a `portfolio.json`. It's imported daily ([docs/AUTOMATION.md](docs/AUTOMATION.md)).
- **By hand:** edit `content/projects.ts`, or tell Claude Code what you built (`/add-project …`) ([docs/ADDING-PROJECTS.md](docs/ADDING-PROJECTS.md)).

## Built to be found

Sitemap, Open Graph images, JSON-LD (Person, ProfessionalService, CreativeWork, FAQ), a recent-work RSS feed at `/work/feed.xml`, and `/llms.txt` + `/llms-full.txt` so AI assistants can read who you are and what you offer. `robots.txt` allows the main AI crawlers.

## Project layout

```
content/          ← everything you edit regularly
  projects.ts       projects (one entry each; pages are generated)
  site.ts           name, email, availability, socials, site URL
  services.ts       services, process steps, FAQ
app/              pages: home, work, work/[id], services, about, contact, 404, sitemap, robots
components/       header, footer, project covers/index, filter, contact form
lib/              small helpers (sorting, metadata)
scripts/          check-projects.ts (runs before every build), optimize-images.mjs,
                  sync-github.ts (GitHub import) + test-sync.ts
content/generated/github-projects.json   written by the daily sync, don't edit
public/           images, résumé PDF, og.png, Cloudflare _headers and _redirects
docs/             AUDIT.md, DEPLOYMENT.md, ADDING-PROJECTS.md
freelance/        PLAYBOOK.md (positioning, services, pricing), OUTREACH-TEMPLATES.md, prospects-template.csv
DECISIONS.md      why it's built this way
CLAUDE.md         instructions Claude Code follows in this repo
```

## Documents

| | |
|---|---|
| [DECISIONS.md](DECISIONS.md) | Architecture, hosting, design and contact-form decisions, with the alternatives considered |
| [docs/AUDIT.md](docs/AUDIT.md) | What the old repository contained, what was broken and what was removed |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Step-by-step Cloudflare Pages + Web3Forms setup |
| [docs/ADDING-PROJECTS.md](docs/ADDING-PROJECTS.md) | Adding and updating projects |
| [docs/AUTOMATION.md](docs/AUTOMATION.md) | Automatic import from GitHub repos, `portfolio.json` format |
| [freelance/PLAYBOOK.md](freelance/PLAYBOOK.md) | Positioning, services, starting prices, finding prospects, staying CASL-compliant |
| [freelance/OUTREACH-TEMPLATES.md](freelance/OUTREACH-TEMPLATES.md) | Cold email, follow-ups and reply templates |

## Licence

Code: yours to reuse. Written content, photos and project screenshots: © Sahitya Neupane.
