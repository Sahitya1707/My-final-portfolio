import Link from "next/link";
import type { Project } from "@/content/types";
import { yearOf } from "@/lib/projects";

/** A compact, table-like index of projects: number, name and summary, type, year. */
export function ProjectIndex({ projects, startAt = 1 }: { projects: Project[]; startAt?: number }) {
  return (
    <ol className="border-t border-ink">
      {projects.map((p, i) => (
        <li key={p.id} className="border-b border-rule">
          <Link
            href={`/work/${p.id}/`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 transition-colors hover:bg-paper-2/60 sm:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.4fr)_9rem_4rem] sm:px-2 sm:py-6"
          >
            <span className="font-mono text-sm text-muted group-hover:text-signal">
              {String(startAt + i).padStart(2, "0")}
            </span>
            <span className="font-serif text-2xl tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-[1.75rem]">
              {p.name}
            </span>
            <span className="label text-right sm:hidden">{yearOf(p)}</span>
            <span className="col-start-2 col-end-4 text-[0.95rem] leading-snug text-muted sm:col-auto">{p.summary}</span>
            <span className="label col-start-2 sm:col-auto">{p.category}</span>
            <span className="label hidden text-right sm:block">{yearOf(p)}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
