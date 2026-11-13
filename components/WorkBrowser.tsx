"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/types";
import { ProjectIndex } from "./ProjectIndex";

/** Category filter for the work page. The full list is in the HTML, so it works without JS. */
export function WorkBrowser({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  // Allow linking straight to a filter, e.g. /work/?type=website
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    const match = categories.find((c) => c.toLowerCase().replace(/\s+/g, "-") === t);
    if (match) setActive(match);
  }, [categories]);

  const shown = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, [projects]);

  const select = (c: ProjectCategory | "All") => {
    setActive(c);
    const url = new URL(window.location.href);
    if (c === "All") url.searchParams.delete("type");
    else url.searchParams.set("type", c.toLowerCase().replace(/\s+/g, "-"));
    window.history.replaceState(null, "", url);
  };

  return (
    <div>
      <div role="group" aria-label="Filter by type" className="mb-8 flex flex-wrap gap-x-1 gap-y-2">
        {(["All", ...categories] as const).map((c) => {
          const on = active === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => select(c)}
              className={`border px-3.5 py-2 text-sm transition-colors ${
                on ? "border-ink bg-ink text-paper" : "border-rule text-ink/80 hover:border-ink hover:text-ink"
              }`}
            >
              {c}
              <sup className={`ml-1 font-mono text-[0.65rem] ${on ? "text-paper/70" : "text-muted"}`}>
                {c === "All" ? projects.length : counts.get(c)}
              </sup>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      <ProjectIndex projects={shown} />
    </div>
  );
}
