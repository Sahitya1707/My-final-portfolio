import Link from "next/link";
import type { Project } from "@/content/types";
import { hostOf, yearOf } from "@/lib/projects";
import { ProjectCover } from "./ProjectCover";

/** An editorial spread for one featured project. Alternates sides down the page. */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  return (
    <article data-reveal className="group grid gap-6 border-t border-rule pt-8 lg:grid-cols-12 lg:gap-10 lg:pt-10">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Link href={`/work/${project.id}/`} tabIndex={-1} aria-hidden="true" className="block">
          <ProjectCover project={project} index={index} />
        </Link>
      </div>
      <div className={`flex flex-col lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="mb-5 flex items-baseline justify-between">
          <span className="font-mono text-sm text-signal">{num}</span>
          <span className="label">
            {project.category} · {yearOf(project)}
          </span>
        </div>
        <h3 className="font-serif text-display-md">
          <Link href={`/work/${project.id}/`} className="transition-colors hover:text-signal">
            {project.name}
          </Link>
        </h3>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/85">{project.summary}</p>
        <dl className="mt-6 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2 border-t border-rule pt-5 text-[0.92rem]">
          <dt className="label pt-[0.2em]">Role</dt>
          <dd>{project.role}</dd>
          <dt className="label pt-[0.2em]">Stack</dt>
          <dd>{project.technologies.slice(0, 5).join(", ")}</dd>
          <dt className="label pt-[0.2em]">Status</dt>
          <dd>{project.status}</dd>
        </dl>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link href={`/work/${project.id}/`} className="btn-ghost">
            Read the case study <span className="arrow">→</span>
          </Link>
          {project.liveUrl ? (
            <a href={project.liveUrl} className="link text-[0.95rem]" target="_blank" rel="noopener noreferrer">
              {hostOf(project.liveUrl)} ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
