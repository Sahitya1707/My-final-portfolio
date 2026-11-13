import type { Project } from "@/content/types";
import { yearOf } from "@/lib/projects";

/**
 * The project's cover image, or (when there is no screenshot yet) a typographic plate
 * built from the project's own data. It never shows a stock photo or a fake mockup.
 */
export function ProjectCover({
  project,
  index,
  priority = false,
  wide = false,
  className = "",
}: {
  project: Project;
  index: number;
  priority?: boolean;
  /** Use a wider, shorter plate (project pages), since the title is already above it. */
  wide?: boolean;
  className?: string;
}) {
  if (project.cover) {
    return (
      <div className={`relative aspect-[16/10] overflow-hidden bg-paper-2 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          width={1440}
          height={900}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  // Three plate styles, chosen by position, all from the site palette.
  const variant = index % 3;
  const plate =
    variant === 0 ? "bg-ink text-paper" : variant === 1 ? "bg-paper-2 text-ink" : "bg-signal text-paper";
  const sub = variant === 1 ? "text-muted" : "text-paper/70";

  return (
    <div
      role="img"
      aria-label={`${project.name}: ${project.category.toLowerCase()}, ${yearOf(project)}`}
      className={`relative flex ${wide ? "aspect-[16/10] sm:aspect-[24/9]" : "aspect-[16/10]"} flex-col justify-between overflow-hidden p-5 sm:p-8 ${plate} ${className}`}
    >
      {/* Baseline grid, like a type specimen sheet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "100% 2.25rem",
        }}
      />
      <div className={`relative flex justify-between font-mono text-label uppercase ${sub}`}>
        <span>{project.category}</span>
        <span>{yearOf(project)}</span>
      </div>
      <p
        aria-hidden="true"
        className="relative font-serif text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] tracking-[-0.03em] transition-transform duration-700 ease-out group-hover:-translate-y-1"
      >
        {project.name}
      </p>
      <p aria-hidden="true" className={`relative font-mono text-label uppercase ${sub}`}>
        {project.technologies.slice(0, 4).join(" · ")}
      </p>
    </div>
  );
}
