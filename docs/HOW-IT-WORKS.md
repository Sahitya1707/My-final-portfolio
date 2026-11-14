# How the site works, in plain words

Three questions: how do projects get on the site, how do people find you, and how do enquiries reach you. Everything here costs $0.

---

## 1. How projects get added (automatically)

You don't edit the website to add work. Once a day, at about 1–2 am Ontario time, GitHub runs a small job that does this:

1. **Looks through your GitHub repositories** for any that have the topic `portfolio` **and** a file called `portfolio.json` (copy `docs/portfolio.example.json` and fill it in: name, one-line summary, what you did, links).
2. **Imports them** into the site, with any screenshots you listed in that file.
3. **Takes its own screenshots** if a project has a live link but no images: one of the home page on a laptop screen and one on a phone. They're shown together on the project card, the phone overlapping the laptop shot.
4. **Checks the site still builds**, then saves the changes. That save makes Cloudflare publish the new version within a couple of minutes.

So the routine is: finish a project, add `portfolio.json` and the `portfolio` topic to its repo, and it appears on the site the next morning. To see it straight away, open the repo on GitHub → **Actions** → **Sync projects from GitHub** → **Run workflow**.

Your choice always wins over the automatic version:

- Want different screenshots? Put them in `public/projects/<id>/` (or list them in `portfolio.json`) and the automatic ones are no longer used.
- Want to change how an imported project is described? Add an entry with the same `id` to `content/projects.ts`.
- Not ready yet? Put `"draft": true` in `portfolio.json`.
- Older work? Mark it `"archived": true`. It keeps its page but moves into the collapsed Archive.

Or just ask Claude Code: "add my new project X" (see `docs/ADDING-PROJECTS.md`).

Commands if you want to run any of this yourself: `npm run sync` (import), `npm run build` then `npm run screenshots` (screenshots; add `--force` to retake them).

---

## 2. How people find you

There's no single trick that puts you "at the top". The site already does the technical part. The rest is a few free accounts and steady, small actions.

### Already built into the site

- A clear title, description and preview image on every page, so links look good in Google, LinkedIn and messages.
- `sitemap.xml` and `robots.txt`, so search engines find every page.
- Structured data (JSON-LD) telling Google you're a web developer in Ontario, what you offer, your starting prices, your projects and your FAQ.
- `/llms.txt` and `/llms-full.txt`: plain-text summaries written for AI assistants (ChatGPT, Claude, Perplexity). `robots.txt` lets their crawlers in.
- Fast, plain HTML pages. Speed is part of Google's ranking.

### Do these once (about an hour in total)

1. **Google Search Console** (search.google.com/search-console): add your site, then submit `https://<your-site>/sitemap.xml`. This is how Google learns the site exists, and it shows which searches you appear for.
2. **Bing Webmaster Tools** (bing.com/webmasters): sign in, choose "Import from Google Search Console". Bing's index is what ChatGPT search and Microsoft Copilot use, so this matters for AI answers.
3. **Google Business Profile** (business.google.com): create a profile as a service-area business (hide your home address, list the towns you serve). For "web designer near me" searches this matters more than anything on the website. Add the site link and a few photos of your work.
4. **Your own links**: put the site in your GitHub profile, LinkedIn headline and "Contact info", and your email signature.
5. **A few free listings** that real people use: Clutch or GoodFirms (free profile), local chamber of commerce or business association directories if you join one.

### Then, slowly over time

- **Reviews on your Google Business Profile** from real clients. Ask every happy client. This is the strongest local signal there is. Never post fake ones.
- **Each new project is a new page**, picked up automatically by the sitemap and the RSS feed (`/work/feed.xml`).
- **Ask clients for a "Website by Sahitya" footer link** on sites you build. Links from real businesses help search and AI tools trust you.
- Expect weeks to months, not days. New sites start low and rise as these signals add up.

### How AI assistants pick you

They mostly repeat what they find on the web: your site, your Google Business Profile, directories and reviews. Keeping your name, location and services described the same way everywhere is what helps. The site's `llms.txt` does that for the site itself and stays up to date automatically.

---

## 3. How enquiries (leads) reach you

### The form

Every page has a "Get a free quote" button leading to `/contact/`. When someone sends the form you get an email (through Web3Forms, free) with:

- their name, email, phone (optional), current website, what they need and budget
- **"How did you find me?"**, which they pick from a list (Google, an AI assistant, your email, LinkedIn, a recommendation…)
- **Visit source**, recorded automatically: the site that sent them on their first visit (for example `google.com` or `chatgpt.com`) and the page they landed on. Nothing is shared with any third party; it's kept in their browser and only sent with their message.

If the form service is ever down, the visitor's own email app opens with the message filled in, so nothing gets lost. Your email address is also shown on every page.

### Track your cold emails

When you link to the site in an outreach email, add `?ref=` to the end:

```
https://sahitya-neupane.pages.dev/work/?ref=email-bakeries
```

If that person later sends an enquiry, the email you receive shows `ref=email-bakeries`, so you know which batch of emails worked. It works with any word: `?ref=linkedin`, `?ref=card` (business card QR code), `?ref=chamber`.

### See your visitors (optional)

Turn on Cloudflare Web Analytics (free, no cookies, no cookie banner) to see how many people visit, which pages they read and which sites send them. Setup takes two minutes: `docs/DEPLOYMENT.md`, section 2b.

### When an enquiry arrives

Reply the same day if you can. `freelance/PLAYBOOK.md` §7 has what to say and what to ask. Log it in your prospects sheet with where it came from, so after a few months you know which channel is worth your time.
