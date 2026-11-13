# Repository audit (Phase 1)

Audit of `Sahitya1707/My-final-portfolio` as of commit `f59ee30` (18 Aug 2025), done before the rebuild.

## What was there

| Part | What it was | Verdict |
|---|---|---|
| `my-portfolio-frontend/` | Next.js 15 (App Router, JavaScript), Tailwind 3, Zustand, custom cursor, admin dashboard | Framework kept, code rewritten |
| `my-portfolio-backend/` | Express + MongoDB (Mongoose) API: admin login (JWT cookies), CRUD for projects / tech / skills / menu, Multer uploads, Nodemailer contact handler | **Removed** |
| `pages/api/today.js` | Next API route reading a Google Sheet with a service account (`googleapis`) | **Removed** |
| `plan.doc` | Personal notes on the old scroll interaction | Removed |
| `public/mycv.pdf`, `public/images/myimg.png` | Résumé and portrait | **Reused** (PDF moved to `/files/`, portrait cropped and converted to WebP) |
| Tech-stack SVG icons | 19 logo icons | Not reused (the new design lists tools in text) |

## Paid or hosted dependencies found

| Dependency | Where | Status |
|---|---|---|
| MongoDB (`MONGODB_URI`) | backend `config/dbConnection.js` | Needed a hosted database. Removed. |
| Hosting for the Express API (`NEXT_PUBLIC_API_URL`, `CLIENT_DOMAIN`, `PORT`) | backend + frontend | The cancelled subscription. Removed. |
| Gmail SMTP via Nodemailer (`MAIL_ID`, `OAUTH_PASSWORD`) | backend contact controller | Removed; replaced by a static form (see DECISIONS.md). |
| Google Sheets API (`SHEET_ID`, `SHEET_NAME`, `GOOGLE_SERVICE_ACCOUNT_KEY`/`_FILE`) | `pages/api/today.js` | Removed. |
| Next.js server runtime (server actions, API routes) | `app/actions/*`, `pages/api` | Removed; the site is now a static export. |

No API keys or secrets were committed in the repository (`.env` and `keys` were git-ignored). The old `.env` values are simply no longer read by anything.

## What was broken

- **Projects page** fetched `${NEXT_PUBLIC_API_URL}/admin/data/project/getAll`. With the backend gone it rendered nothing.
- **Contact form**: `app/actions/sendMessage.js` was an empty function and the backend mail route was gone, so messages went nowhere.
- **Admin login/dashboard** depended on the backend and cookies.
- **Home page** called `/api/today` (Google Sheets) on every load and showed an error box when it failed.
- `app/utils/projectsData.js` (the only local project data) held three lorem-ipsum placeholders.
- `body * { cursor: none }` replaced the mouse pointer with a JS cursor: an accessibility problem and invisible on touch.
- The README noted the site was not responsive on mobile.

## Design review

Two fonts plus two unused ones loaded from Google, a blue/purple gradient headline, glass-style cards, a giant outlined background glyph and a rotating role ticker. It read as a student portfolio aimed at job applications ("Open to software developer roles"), not at clients.

## Real material available for the new site

- Work history and education from the résumé (DS Digital Media, Digital Terai, Georgian College).
- Public repositories with enough substance to write up honestly: TrackMyWork, Elevate Athletes, Different Treks, Payload + Cloudinary, Earthquake Simulation, JWT Auth, YouTube-style study app.
- Roadstar (the user's current product) and its public landing page in `Sahitya1707/app-pages`.
- Elmvale Horticultural Society, listed on the résumé with a live URL.

Nothing in the repository or public profile supports testimonials, client counts or metrics, so the new site has none.
