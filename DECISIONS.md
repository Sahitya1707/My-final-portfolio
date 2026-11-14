# Decisions

Why the site is built the way it is. Each entry: the decision, the options considered, and the reason. Newest decisions go at the bottom.

---

## 1. No backend, no database, no server

**Decision:** The site is a fully static export (`output: "export"` in `next.config.mjs`). There is no API server, database, authentication or server-side rendering at request time.

**Why:** Everything the old backend did is either unnecessary or replaceable for free:

| Old feature | Needed? | Replacement |
|---|---|---|
| Admin dashboard to edit projects (Express + MongoDB + JWT) | No. One person edits a handful of projects a year. | `content/projects.ts`, edited in a code editor or by asking Claude Code. Git is the history and the backup. |
| Image uploads (Multer) | No | Images live in `public/projects/<id>/`. |
| Contact email (Nodemailer + Gmail) | Yes | Web3Forms (free) with a mailto fallback. See 6. |
| "Today" feed (Google Sheets API) | No | Removed. An availability line in `content/site.ts` does the useful part. |

A static site cannot go down because a database subscription lapsed, has no secrets to leak, and costs nothing to host.

**Reconsider when:** you need user accounts, payments or data that visitors create. Even then, add it as a separate service rather than turning the portfolio into an app.

## 2. Keep Next.js, rewrite the code

**Options:** keep the old code and patch it; switch to Astro or plain HTML; keep Next.js and rebuild.

**Decision:** Keep Next.js (already in the repo, and a framework you use in your projects), upgrade to TypeScript, and rewrite the pages and components.

**Why:** Astro would be marginally lighter, but switching frameworks adds learning cost with no client-visible benefit. The old components were tightly coupled to the backend, Zustand stores and the custom cursor, so patching would have taken longer than rebuilding. TypeScript lets the build catch mistakes in `projects.ts` (a misspelled field or unknown category fails the build with a clear message instead of shipping a broken page).

**Removed packages:** `googleapis`, `cookies-next`, `zustand`, `react-icons`, `react-intersection-observer`, plus the whole backend (`express`, `mongoose`, `mongodb`, `jsonwebtoken`, `bcryptjs`, `multer`, `nodemailer`, `cors`, `cookie-parser`, `body-parser`, `dotenv`, `nodemon`). Runtime dependencies are now just Next.js, React and three self-hosted font packages.

## 3. Hosting: Cloudflare Pages

Compared on the free tiers (as of late 2026; check the providers' pages before relying on a number):

| Host | Free tier, in short | Fit |
|---|---|---|
| **Cloudflare Pages** | Unlimited static bandwidth and requests, 500 builds a month, free `*.pages.dev` subdomain, free custom domains with HTTPS, GitHub auto-deploys and preview links for every branch. No commercial-use restriction. | **Chosen** |
| Vercel Hobby | Generous, but the Hobby plan is for **non-commercial** use. A site that sells your services is commercial, so you'd be pushed to the $20/month Pro plan. | Rejected |
| Netlify Free | Works well, but bandwidth and build minutes are metered, and going over pauses the site or bills you. | Good backup |
| GitHub Pages | Free and simple, but no build-time env vars without a custom workflow, no `_headers`/`_redirects`, and its terms discourage commercial use. | Rejected |

Cloudflare reads `public/_headers` (security and caching headers) and `public/_redirects` (old URLs such as `/projects` and `/mycv.pdf` keep working).

## 4. Design direction

Three directions were sketched before building:

1. **"Studio grid"**: monochrome Swiss layout, big grotesk type, strict 12-column grid. Clean, but this is what most developer portfolios already look like.
2. **"Terminal"**: dark, monospace, code-flavoured. Signals "developer" strongly but speaks to other developers, not to a bakery owner reading a cold email.
3. **"Printed index"**: warm paper, ink-black serif headlines, a single vermilion accent, mono labels for metadata, projects presented as a numbered index and editorial spreads. Feels like a well-made printed catalogue. **Chosen.**

Why 3: the audience is small-business owners. Editorial type and generous spacing read as care and craft, not as a template, and the first sentence tells them exactly what you do. Specific choices:

- **Type:** Newsreader (variable serif with optical sizes) for headlines and long reading; Schibsted Grotesk for interface text; JetBrains Mono for small labels. All open-source (OFL) and **self-hosted** through Fontsource, so no Google Fonts request and no layout shift.
- **Colour:** warm paper `#F6F1E8`, warm near-black ink `#1E1A16`, terracotta signal `#BF4822`, a green dot only for "available". No gradients, glows or glass. Light and dark themes (see 16).
- **Projects without screenshots** get a typographic "plate" built from the project's own name, type, year and stack, instead of a stock photo or a fake mock-up. Real screenshots replace them when you add a `cover`.
- **Motion:** the headline rises in once on load; sections fade up as they scroll in; links and arrows respond on hover. All of it switches off for visitors with "reduce motion" set, and content is fully visible without JavaScript.
- **No** fake stats, testimonials, logos, client counts or "years of experience" claims.

## 5. Site structure, designed around the cold-email visitor

Someone clicks your link from an email. In the first screen they see: what you do ("I design and build websites that make small businesses easy to choose"), that you are available, and a button to get in touch. Scrolling: what you can help with, real work, how a project runs, who you are, and a closing call to action.

| Page | Purpose |
|---|---|
| `/` | The pitch, in the order above |
| `/work/` | Full index of projects, filterable by type (`/work/?type=website` can be linked directly from an email) |
| `/work/<id>/` | One case study per project, generated from `projects.ts` |
| `/services/` | Five services in plain language, the five-step process, and an FAQ (cost, monthly fees, timing, ownership) |
| `/about/` | Short bio, working principles, experience, tools (no résumé, by choice) |
| `/contact/` | Enquiry form, email, what to include, availability |

Considered and **not** built: a separate process page (it's a section of Services, one less click), testimonials (none exist yet; add them only when real), a blog (adds upkeep; Medium already exists), public prices (see `freelance/PLAYBOOK.md`; the FAQ explains how pricing works instead).

## 6. Contact form: Web3Forms with a mailto fallback

| Option | Free tier | Notes |
|---|---|---|
| **Web3Forms** | About 250 submissions/month | No account dashboard needed: enter your email, get an access key. The key is designed to be public. **Chosen.** |
| Formspree | About 50 submissions/month | Fine, but lower limit. |
| Cloudflare Pages Function + email API | Free function, but every transactional email API needs its own account and most free tiers are small | More moving parts than it's worth. |
| Netlify Forms | Only on Netlify | Not our host. |

The form posts directly from the browser to Web3Forms. **If the key is missing, the service is down or the monthly limit is hit, the visitor is offered (or sent straight to) their own email app with the message pre-filled.** A message can't silently vanish. The email address is also shown on every page. A hidden honeypot field filters basic spam bots.

## 7. Projects as one typed data file

`content/projects.ts` is the single source of truth. Types in `content/types.ts`. `scripts/check-projects.ts` runs before every build and checks things TypeScript can't: unique ids, date format, that image files exist and have alt text, that URLs are absolute. Featured projects show on the home page; every project gets a page automatically.

For natural-language updates, `CLAUDE.md` and the `/add-project` command in `.claude/commands/` tell Claude Code exactly how to add a project (including asking you for facts rather than inventing them).

## 8. Images

Static export means no on-the-fly image optimisation. Instead `npm run images` (uses `sharp`, free, runs locally) converts PNG/JPG under `public/projects` and `public/images` to resized WebP. Images below the fold load lazily. The home page's heaviest image is about 220 KB.

## 9. SEO basics

Per-page titles, descriptions and canonical URLs; Open Graph image (`public/og.png`); `sitemap.xml` and `robots.txt` generated at build; JSON-LD for the person, each project and the services FAQ; the Google Search Console verification tag from the old site is kept. Set the real site URL in `content/site.ts` (or `NEXT_PUBLIC_SITE_URL`) once you have it.

## 10. Accessibility

Real system cursor (the custom cursor is gone), skip link, visible focus outlines, semantic landmarks and headings, labelled form fields, `aria-current` on navigation, `aria-pressed` on filters, reduced-motion support, colour contrast checked in both themes, and alt text required by the build for every project image.

## 11. Projects import themselves from GitHub

**Decision:** A daily GitHub Action (`sync-projects.yml`) imports any of your repositories that have the `portfolio` topic **and** a `portfolio.json`. Screenshots are downloaded and converted to WebP. The result is committed to `content/generated/github-projects.json`, and that push triggers a Cloudflare redeploy. Details are in `docs/AUTOMATION.md`.

**Why:** you wanted new work to show up without editing the portfolio. Requiring both the topic and the file keeps unfinished or weak repos off the site by default, and `"draft": true` hides a project until it's ready. Committing the import (instead of calling GitHub during every Cloudflare build) means a GitHub outage or rate limit can never break a deploy. Hand-written entries in `projects.ts` override imports with the same `id`.

**Cost:** $0. The run takes well under a minute of the free GitHub Actions allowance. Private repos are optional and need a read-only token (`PORTFOLIO_SYNC_TOKEN`).

**Rejected:** a headless CMS. You'd be filling in the same fields in a second place, with another account to keep alive.

## 12. Archive for older work

Projects can be marked `archived: true`. They keep their page but sit in a collapsed **Archive** on `/work/` and never appear on the home page. The YouTube-API study app, JWT Auth and Different Treks start archived, so the work clients see first is the strongest. A **Concept** category is ready for self-initiated demo sites. Concept project pages automatically say the work was self-initiated and not commissioned by a real business.

## 13. No blog (for now)

A blog only helps if you post regularly, and you won't have time to write. An empty or AI-written blog would hurt credibility more than having none. Instead, `/work/feed.xml` is an RSS feed generated from project data, so every new project counts as an update automatically. If you start writing later, Markdown posts can be added without changing hosting.

## 14. Readable by AI assistants

More people now ask ChatGPT, Claude or Perplexity to recommend a developer. To make the site easy for those tools to read:

- `/llms.txt` and `/llms-full.txt` give a plain-text summary of who you are, services with starting prices, availability, work and contact. They are generated from the same content files as the pages, so they never go out of date.
- JSON-LD `@graph` describes a `Person`, a `ProfessionalService` (with an offer catalogue and CAD starting prices) and the `WebSite`. Each project page has a `CreativeWork` linked to you, and the services page has an `FAQPage`.
- `robots.txt` explicitly allows the main AI and search crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others).
- Every page is static HTML with plain, factual copy, so it needs no JavaScript to read.

## 15. Positioning and visible prices

Services are pitched as **fast, modern, low-maintenance sites** with no plugins to update and no platform fees. WordPress is offered only when a client wants to edit pages themselves. Starting prices ("From CA$1,200") are now shown on the services page and in `llms.txt`, because small-business owners and AI assistants both look for a number. You can turn them off with `showPrices` in `content/site.ts`, and they should stay in step with `freelance/PLAYBOOK.md`.

## 16. Warmer, more personal, easier to use (Nov 2026)

You asked for something that feels human rather than like a template, with very simple navigation. Changes:

- **A face first.** Your photo and "Hi, I'm Sahitya" open the home page, and a small avatar sits next to your name in the header. People hire people.
- **Warmer palette and softer shapes.** The paper is a little creamier and the ink browner. Buttons, nav items, photos and project images have rounded corners; layout still uses thin rules and numbered lists, so it doesn't turn into a grid of generic cards.
- **Navigation:** four items (Work, Services, About, Contact) plus one always-visible "Get a free quote" button. On phones: a Menu button with the same items, the quote button and your email.
- **Work comes earlier** on the home page, right after the pitch, because it's what visitors want to judge you by.
- **Light/dark toggle.** Follows the visitor's system setting until they click the sun/moon button, then remembers their choice. A tiny script in `<head>` applies it before the page paints, so there's no flash.
- **No résumé.** The PDF, its links and its mentions are gone. Old résumé URLs redirect to `/about/`. Clients buy outcomes, not CVs.

## 17. Automatic screenshots

**Decision:** `npm run screenshots` opens each project's live link in a headless browser (Playwright, free) and saves a laptop and a phone screenshot as WebP. The daily sync Action runs it, so imported projects get real images instead of a typographic plate. Hand-picked images always win, archived projects are skipped, and a site that is down is skipped without failing the run. Results are recorded in `content/generated/screenshots.json`.

**Why:** you wanted the project showcase to look good without manual work. The laptop-plus-phone pairing also shows clients, at a glance, that the sites work on phones.

## 18. Knowing where enquiries come from

**Decision:** the contact form asks "How did you find me?" and also attaches the visit source recorded on the visitor's first page view (referring site, landing page, any `?ref=` or `utm_` tag). It's stored only in the visitor's browser and sent only with their message. Cloudflare Web Analytics (free, cookieless) is available through `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`.

**Why:** with cold email, Google, AI assistants and referrals all in play, you need to know which one is working. **Rejected:** Google Analytics (cookie banner, heavier, more than you need) and paid CRMs. A tracking sheet plus these two fields is enough at this scale. The plain-language version is in `docs/HOW-IT-WORKS.md`.
