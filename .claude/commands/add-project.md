---
description: Add or update a portfolio project from a plain-English description
argument-hint: <describe the project, links and where the screenshots are>
---

Add or update a project in `content/projects.ts` based on this request:

$ARGUMENTS

Follow "Adding or updating a project from a natural-language request" in CLAUDE.md exactly. In short: gather facts (ask once for anything essential that's missing, never invent), copy and optimise screenshots into `public/projects/<id>/`, write the entry in the site's plain first-person voice, run `npm run build` until it passes, commit on a new branch, and tell me how to publish it.
