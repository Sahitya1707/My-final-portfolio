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
```

Requires Node 20 or newer. Copy `.env.example` to `.env.local` if you want to test the real contact form locally.

## Add a project

Edit **one file**, `content/projects.ts`, or just tell Claude Code what you built (`/add-project …`). Full guide: [docs/ADDING-PROJECTS.md](docs/ADDING-PROJECTS.md).

## Project layout

```
content/          ← everything you edit regularly
  projects.ts       projects (one entry each; pages are generated)
  site.ts           name, email, availability, socials, site URL
  services.ts       services, process steps, FAQ
app/              pages: home, work, work/[id], services, about, contact, 404, sitemap, robots
components/       header, footer, project covers/index, filter, contact form
lib/              small helpers (sorting, metadata)
scripts/          check-projects.ts (runs before every build), optimize-images.mjs
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
| [freelance/PLAYBOOK.md](freelance/PLAYBOOK.md) | Positioning, services, starting prices, finding prospects, staying CASL-compliant |
| [freelance/OUTREACH-TEMPLATES.md](freelance/OUTREACH-TEMPLATES.md) | Cold email, follow-ups and reply templates |

## Licence

Code: yours to reuse. Written content, photos and project screenshots: © Sahitya Neupane.
