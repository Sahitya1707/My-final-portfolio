# Adding and updating projects

There are three ways to add a project. All of them end up in the same place: pages, the home page, the work index, filters, the sitemap and the recent-work feed update by themselves.

1. **Automatic, from the project's own repo.** Add a `portfolio.json` and the `portfolio` topic, and it is imported daily. See [AUTOMATION.md](AUTOMATION.md). Best for anything new.
2. **Ask Claude Code** (below).
3. **Edit `content/projects.ts` by hand** (below). Best for work without a GitHub repo, such as client sites.

## The quickest way: ask Claude Code

Open the repository in Claude Code and say something like:

> /add-project Roadstar is now live on Google Play at https://play.google.com/store/apps/details?id=... Update it and add the store screenshots in ~/Desktop/roadstar-shots.

or

> Add a project: I built a website for Maple Bakery in Barrie, live at maplebakery.ca. Next.js and Tailwind, I did design and development, finished December 2026. Screenshots are in ~/Desktop/maple. Feature it on the home page.

Claude will follow the rules in `CLAUDE.md`: ask for anything missing rather than inventing it, copy and optimise the images, edit `projects.ts`, run the build, and commit on a branch. Push (or merge the pull request) and Cloudflare deploys it.

## Doing it by hand

1. **Images (optional but recommended).** Make a folder `public/projects/<id>/` (e.g. `public/projects/maple-bakery/`) and drop in PNG or JPG screenshots. A 1440×900 desktop screenshot works best as the cover. Then run:

   ```bash
   npm run images
   ```

   This writes a compressed `.webp` next to each file. You can delete the original PNG/JPG afterwards.

2. **Data.** Open `content/projects.ts`, copy the TEMPLATE at the bottom, paste it into the list, and fill it in:

   | Field | Required | Notes |
   |---|---|---|
   | `id` | yes | URL slug, e.g. `maple-bakery` → `/work/maple-bakery/` |
   | `name`, `summary` | yes | Summary is one sentence (under ~200 characters) |
   | `description` | yes | List of paragraphs: the situation, what you built, how |
   | `category` | yes | `Website`, `Web app`, `Product`, `Concept`, `Open source`, `Experiment`. `Concept` pages automatically say the work was self-initiated, not commissioned. |
   | `status` | yes | `Live`, `In development`, `Prototype`, `Archived` |
   | `completed` | yes | `"2026"` or `"2026-12"` |
   | `role` | yes | What *you* did |
   | `technologies`, `features` | yes | Short lists |
   | `context` | no | e.g. `"Client project"`, `"College project"` |
   | `cover` | no | `{ src: "/projects/<id>/cover.webp", alt: "…" }`. Without it, a typographic cover is drawn. |
   | `screenshots` | no | More images for the project page, each with `alt` and optional `caption` |
   | `liveUrl`, `githubUrl`, `links` | no | Full `https://` URLs |
   | `featured` | no | `true` to show on the home page (keep 3–4 featured) |
   | `order` | no | Lower numbers first. Without it, newest first. |
   | `archived` | no | `true` moves it into the collapsed Archive on /work/ and off the home page. Use for older or weaker work. |

3. **Check it.**

   ```bash
   npm run build
   ```

   The build stops with a plain-English message if something is wrong (missing image, duplicate id, bad date…). `npm run dev` shows it live at http://localhost:3000.

4. **Publish.** Commit and push to `production` (or merge a pull request into it). Cloudflare Pages deploys in about a minute.

## Other things you might update

| To change… | Edit |
|---|---|
| Availability line ("Taking on new projects for…") | `content/site.ts` → `availability` |
| Email, socials, location, reply time | `content/site.ts` |
| Services, process steps, FAQ | `content/services.ts` |
| Résumé | replace `public/files/sahitya-neupane-resume.pdf` (keep the name) |
| Bio, experience, tools | `app/about/page.tsx` |

## Adding a testimonial later

Only once a real client has said it and agreed to be quoted. Add a `testimonial` to that project (ask Claude Code to add the field and display it on the project page).
