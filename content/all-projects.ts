import type { Project } from "./types";
import { projects as manual } from "./projects";
import generated from "./generated/github-projects.json";

/**
 * Every project the site shows: the ones you write by hand in projects.ts, plus the ones
 * imported automatically from GitHub by `npm run sync` (see docs/AUTOMATION.md).
 * If both define the same id, the hand-written entry wins, so you can always override an import.
 */
const imported = (generated as Project[]).filter((g) => !manual.some((m) => m.id === g.id));

export const allProjects: Project[] = [...manual, ...imported];
