# Portfolio site: notes for Claude Code

Static Next.js 15 (App Router, TypeScript, Tailwind 3) exported to `./out` and hosted on Cloudflare Pages. No backend, database or server code: keep it that way (see DECISIONS.md §1).

## Commands

- `npm run dev`: local dev server
- `npm run build`: type-check + `scripts/check-projects.ts` + static export. Must pass before committing.
- `npm run images`: convert PNG/JPG in `public/projects` and `public/images` to WebP
- `npm run preview`: serve `./out` on port 4000

## Where content lives

- `content/projects.ts`: all projects (types in `content/types.ts`)
- `content/site.ts`: name, email, availability, socials, site URL
- `content/services.ts`: services, process, FAQ
- `app/about/page.tsx`: bio, experience, tools

## Adding or updating a project from a natural-language request

1. Collect the facts: name, what it is, who it was for, what the user personally did, stack, date, status, links, which images. **Never invent clients, results, metrics, testimonials or features.** If something essential is missing or unclear, ask the user once, listing exactly what you need.
2. Choose an `id` (lowercase-dashed). Copy any screenshots the user points to into `public/projects/<id>/`, name the main one `cover.png`, run `npm run images`, then delete the PNG/JPG originals.
3. Add the entry to `content/projects.ts` using the TEMPLATE at the bottom. Write in the site's voice: first person, plain English, specific, no hype words ("cutting-edge", "seamless", "world-class"). Write alt text describing what the screenshot shows.
4. Only set `featured: true` if the user asks or it's clearly stronger than an existing featured project; keep 3–4 featured (adjust `order`).
5. Run `npm run build` and fix any errors.
6. Commit on a new branch with a clear message and tell the user how to publish (push / merge).

## Design rules (keep the site consistent)

- Palette tokens only (`paper`, `paper-2`, `ink`, `muted`, `rule`, `signal`, `leaf`); never add gradients, glows, glassmorphism or new accent colours.
- Headlines `font-serif`, UI `font-sans`, metadata `.label` (mono, uppercase).
- Rules (borders) and numbered lists over cards and rounded boxes. No rounded corners except the availability dot.
- Motion stays subtle and must respect `prefers-reduced-motion`.
- Images: `<img>` with width/height, `loading="lazy"` below the fold, WebP from `npm run images`.
