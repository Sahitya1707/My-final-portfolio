import { getAllProjects, getUsedCategories } from "@/lib/projects";
import { pageMeta } from "@/lib/meta";
import { WorkBrowser } from "@/components/WorkBrowser";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMeta({
  title: "Work",
  description: "Websites, web applications, open-source work and a product of my own, each with a write-up of what I built and how.",
  path: "/work/",
});

export default function WorkPage() {
  const projects = getAllProjects();
  return (
    <>
      <section className="page pt-14 sm:pt-20">
        <p className="label mb-5">Index of work — {projects.length} projects</p>
        <h1 className="max-w-[16ch] font-serif text-display-lg">Websites, apps and experiments.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Everything here is real work I did, from client-style websites to college projects, open source and a
          product I&rsquo;m building. Each entry says plainly what it was and what my role was.
        </p>
      </section>
      <section className="page mt-14" aria-label="Projects">
        <WorkBrowser projects={projects} categories={getUsedCategories()} />
      </section>
      <SiteFooter />
    </>
  );
}
