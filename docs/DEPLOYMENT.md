# Deploying for free on Cloudflare

Total cost: **$0/month**. A custom domain is optional (roughly $15–25 a year from any registrar).

You need: a free Cloudflare account and this repository on GitHub. Takes about 10 minutes.

## 1. Create the project

Cloudflare offers two free ways to host a static site. Either one works; the repository is set up for both.

### Option A: Workers (Cloudflare's default "Create" flow)

`wrangler.jsonc` in the repository tells Cloudflare to upload the static export in `./out`. No server code runs, so it stays on the free plan.

1. Sign up or log in at <https://dash.cloudflare.com/sign-up> (free plan, no card needed).
2. **Workers & Pages** → **Create** → **Import a repository** → pick **Sahitya1707/My-final-portfolio**.
3. Fill in:

   | Setting | Value |
   |---|---|
   | Project name | `sahitya-neupane` (must match `name` in `wrangler.jsonc`) |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Production branch | `production` |

4. Under **Advanced settings** → **Build variables**, add `NODE_VERSION` = `22` and, once you know your address, `NEXT_PUBLIC_SITE_URL` (see section 3).
5. **Deploy.** The site appears at `https://sahitya-neupane.<your-account>.workers.dev`. Copy that address for section 3.

If a deploy log shows wrangler offering to "configure the project for Next.js with OpenNext", `wrangler.jsonc` is missing from the branch being built. Don't accept the OpenNext setup; this site doesn't need a server.

### Option B: Pages

1. Sign up or log in at <https://dash.cloudflare.com/sign-up> (free plan, no card needed).
2. In the sidebar open **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
3. Authorise GitHub and pick **Sahitya1707/My-final-portfolio**. You can limit Cloudflare's access to just this repository.
4. Project name: `sahitya-neupane` (this becomes `https://sahitya-neupane.pages.dev`; pick something else if it's taken).
5. Production branch: `production` (this repository's default branch).
6. Build settings:

   | Setting | Value |
   |---|---|
   | Framework preset | **None** (do not pick "Next.js": that preset expects a server build) |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Root directory | *(leave empty)* |

7. **Environment variables** (Production *and* Preview):

   | Name | Value |
   |---|---|
   | `NODE_VERSION` | `22` |
   | `NEXT_PUBLIC_WEB3FORMS_KEY` | your Web3Forms key (step 2) |
   | `NEXT_PUBLIC_SITE_URL` | `https://sahitya-neupane.pages.dev` (or your domain later) |

8. **Save and Deploy.** The first build takes 1–2 minutes. Open the `*.pages.dev` link when it finishes.

From now on every push to `production` deploys automatically, and every other branch or pull request gets its own preview link.

## 2. Turn on the contact form (free)

1. Go to <https://web3forms.com>, enter the email address enquiries should go to, and click **Create Access Key**.
2. The key arrives by email. Paste it into `NEXT_PUBLIC_WEB3FORMS_KEY` in Cloudflare (**Settings** → **Variables and secrets**).
3. Redeploy: **Deployments** → latest → **⋯** → **Retry deployment** (env vars are baked in at build time).
4. Send yourself a test message from `/contact/`. Check spam the first time and mark it "not spam".

Without the key the form still works: it opens the visitor's email app with their message filled in.

## 3. Point the site's URL at the right place

If your final URL differs from `https://sahitya-neupane.pages.dev` (for example a `*.workers.dev` address or your own domain), update `url` in `content/site.ts` **or** set the `NEXT_PUBLIC_SITE_URL` build variable, then redeploy. This fixes canonical links, the sitemap, social previews, `llms.txt` and the links inside the concept sites (`scripts/finalize-concepts.ts` rewrites them after every build).

## 4. Optional: custom domain

1. Buy a domain anywhere (Cloudflare Registrar sells at cost, no markup). Your old `sahityaneupane.com.np` also works if you still control it.
2. In the Pages project: **Custom domains** → **Set up a custom domain** → follow the DNS steps. HTTPS is issued automatically and free.
3. Update `NEXT_PUBLIC_SITE_URL` and redeploy.

## 5. Optional: Google Search Console

The old verification tag is kept in `content/site.ts`. Once the site is live on its final domain, add it in <https://search.google.com/search-console> and submit `https://<your-domain>/sitemap.xml`.

## Checking locally before you push

```bash
npm install
npm run build     # type-checks, validates projects.ts, builds into ./out
npm run preview   # serves ./out at http://localhost:4000
```

## Free-tier limits worth knowing (late 2026; check Cloudflare's docs for current numbers)

- 500 builds per month (you'll use a few dozen at most).
- 20,000 files per deployment, 25 MiB per file.
- Static bandwidth and requests are unlimited.

## The old deployments

The previous site ran on Vercel (`my-final-portfolio-tbir.vercel.app`) with the Express API hosted elsewhere. Once the Cloudflare site is live you can delete the Vercel project and cancel/delete anything left of the old API host and MongoDB database so nothing can bill you again.

## GitHub Actions

`.github/workflows/ci.yml` runs `npm run build` on every pull request so a broken `projects.ts` is caught before merge. It uses GitHub's free minutes and doesn't deploy anything (Cloudflare does that).
