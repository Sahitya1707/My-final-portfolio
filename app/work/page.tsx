import { getArchivedProjects, getCurrentProjects, getUsedCategories } from "@/lib/projects";
import { ProjectIndex } from "@/components/ProjectIndex";
import { pageMeta } from "@/lib/meta";
import { WorkBrowser } from "@/components/WorkBrowser";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMeta({
  title: "Work",
  description: "Websites, web applications, open-source work and a product of my own, each with a write-up of what I built and how.",
  path: "/work/",
});

export default function WorkPage() {
  const projects = getCurrentProjects();
  const archived = getArchivedProjects();
  return (
    <>
      <section className="page pt-14 sm:pt-20">
        <p className="label mb-5">Index of work</p>
        <h1 className="max-w-[16ch] font-serif text-display-lg">Websites, apps and experiments.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Real work I did, from websites and web apps to open source and a product I&rsquo;m building. Each entry says plainly what it was and what my role was.
        </p>
      </section>
      <section className="page mt-14" aria-label="Projects">
        <WorkBrowser projects={projects} categories={getUsedCategories(projects)} />
      </section>
      {archived.length > 0 ? (
        <section className="page mt-20" aria-labelledby="archive-title">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 border-t border-ink py-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span id="archive-title" className="font-serif text-2xl sm:text-3xl">
                  Archive
                </span>
                <span className="ml-3 text-muted">
                  {archived.length} older {archived.length === 1 ? "project" : "projects"}
                </span>
              </span>
              <span aria-hidden="true" className="font-mono text-lg text-muted transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <ProjectIndex projects={archived} startAt={projects.length + 1} />
          </details>
        </section>
      ) : null}
      <SiteFooter />
    </>
  );
}
