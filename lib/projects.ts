import { allProjects as projects } from "@/content/all-projects";
import type { Project, ProjectCategory } from "@/content/types";
import { PROJECT_CATEGORIES } from "@/content/types";

/** Explicit `order` first, then newest `completed` first. */
function compare(a: Project, b: Project) {
  const ao = a.order ?? Number.POSITIVE_INFINITY;
  const bo = b.order ?? Number.POSITIVE_INFINITY;
  if (ao !== bo) return ao - bo;
  return b.completed.localeCompare(a.completed);
}

export function getAllProjects(): Project[] {
  return [...projects].sort(compare);
}

/** Current work: everything not marked archived. */
export function getCurrentProjects(): Project[] {
  return getAllProjects().filter((p) => !p.archived);
}

export function getArchivedProjects(): Project[] {
  return getAllProjects().filter((p) => p.archived);
}

export function getFeaturedProjects(): Project[] {
  return getCurrentProjects().filter((p) => p.featured);
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Categories that actually have projects, in the canonical order. */
export function getUsedCategories(list: Project[] = projects): ProjectCategory[] {
  const used = new Set(list.map((p) => p.category));
  return PROJECT_CATEGORIES.filter((c) => used.has(c));
}

/** The next project in list order, for the "next project" link at the end of a case study. */
export function getNextProject(id: string): Project {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.id === id);
  return all[(i + 1) % all.length];
}

export function yearOf(p: Project): string {
  return p.completed.slice(0, 4);
}

export function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
