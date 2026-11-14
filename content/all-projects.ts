import type { Project, ProjectImage } from "./types";
import { projects as manual } from "./projects";
import generated from "./generated/github-projects.json";
import screenshots from "./generated/screenshots.json";

/**
 * Every project the site shows: the ones you write by hand in projects.ts, plus the ones
 * imported automatically from GitHub by `npm run sync` (see docs/AUTOMATION.md).
 * If both define the same id, the hand-written entry wins, so you can always override an import.
 *
 * Projects with a live link but no hand-picked images get the automatic screenshots
 * from `npm run screenshots` (content/generated/screenshots.json). Your own images always win.
 */
type Shot = { cover?: ProjectImage; mobile?: ProjectImage };
const shots = screenshots as Record<string, Shot>;

const imported = (generated as Project[]).filter((g) => !manual.some((m) => m.id === g.id));

export const allProjects: Project[] = [...manual, ...imported].map((p) => {
  const s = shots[p.id];
  if (!s || p.archived) return p;
  return { ...p, cover: p.cover ?? s.cover, mobile: p.mobile ?? s.mobile };
});
