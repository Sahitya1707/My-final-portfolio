/**
 * The shape of everything the site renders. If you add a project with a typo in a field
 * name or an unknown category, `npm run check` (and the build) will tell you exactly where.
 */

export const PROJECT_CATEGORIES = [
  "Website",
  "Web app",
  "Product",
  "Open source",
  "Experiment",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUSES = [
  "Live",
  "In development",
  "Prototype",
  "Archived",
] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface ProjectImage {
  /** Path under /public, e.g. "/projects/roadstar/cover.webp". */
  src: string;
  /** Describe what is in the image for screen readers. */
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  /** URL slug: lowercase letters, numbers and dashes. Becomes /work/<id>/. */
  id: string;
  name: string;
  /** One sentence. Shown in lists and in search/social previews. */
  summary: string;
  /** Full write-up for the project page. One string per paragraph. */
  description: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  /** "YYYY" or "YYYY-MM". Used for sorting and the year label. */
  completed: string;
  /** What you personally did on it. Be specific and honest. */
  role: string;
  /** Optional one-line context, e.g. "College project" or "Personal product". */
  context?: string;
  technologies: string[];
  /** Short bullet points of what it does. */
  features: string[];
  /** Main image. Leave out and the site draws a typographic cover instead. */
  cover?: ProjectImage;
  /** Extra screenshots shown on the project page. */
  screenshots?: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  /** Anything else worth linking: an article, a store listing, a demo video. */
  links?: ProjectLink[];
  /** Featured projects appear on the home page. Keep it to three or four. */
  featured?: boolean;
  /** Lower numbers come first. Projects without it are sorted by date, newest first. */
  order?: number;
}
