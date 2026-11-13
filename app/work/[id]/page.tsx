import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProjects as projects } from "@/content/all-projects";
import { getAllProjects, getNextProject, getProject, hostOf, yearOf } from "@/lib/projects";
import { pageMeta } from "@/lib/meta";
import { site } from "@/content/site";
import { ProjectCover } from "@/components/ProjectCover";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProject(id);
  if (!p) return {};
  const meta = pageMeta({ title: p.name, description: p.summary, path: `/work/${p.id}/` });
  if (p.cover) meta.openGraph = { ...meta.openGraph, images: [{ url: p.cover.src }] };
  return meta;
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const index = getAllProjects().findIndex((p) => p.id === project.id);
  const next = getNextProject(project.id);
  const links = [
    project.liveUrl ? { label: `Visit ${hostOf(project.liveUrl)}`, url: project.liveUrl } : null,
    project.githubUrl ? { label: "Source code on GitHub", url: project.githubUrl } : null,
    ...(project.links ?? []),
  ].filter(Boolean) as { label: string; url: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    dateCreated: project.completed,
    keywords: project.technologies.join(", "),
    url: `${site.url.replace(/\/$/, "")}/work/${project.id}/`,
    creator: { "@id": `${site.url.replace(/\/$/, "")}/#person` },
    genre: project.category,
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(project.cover ? { image: `${site.url.replace(/\/$/, "")}${project.cover.src}` } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="page pt-10 sm:pt-14">
          <nav aria-label="Breadcrumb" className="label mb-10">
            <Link href="/work/" className="hover:text-signal">
              ← All work
            </Link>
          </nav>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="label mb-5">
                <span className="text-signal">{String(index + 1).padStart(2, "0")}</span> — {project.category}
                {project.context ? ` · ${project.context}` : ""}
              </p>
              <h1 className="font-serif text-display-xl">{project.name}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/85">{project.summary}</p>
              {project.category === "Concept" ? (
                <p className="mt-5 max-w-2xl border-l-2 border-signal pl-4 text-[0.95rem] text-muted">
                  Concept project: a self-initiated design and build to show what I&rsquo;d make for this kind of
                  business. It was not commissioned by, and is not affiliated with, any real business.
                </p>
              ) : null}
            </div>
            <dl className="grid grid-cols-2 content-end gap-x-6 gap-y-5 border-t border-ink pt-5 text-[0.95rem] lg:col-span-4 lg:grid-cols-1">
              <div>
                <dt className="label mb-1">Year</dt>
                <dd>{yearOf(project)}</dd>
              </div>
              <div>
                <dt className="label mb-1">Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <dt className="label mb-1">My role</dt>
                <dd>{project.role}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="page mt-12 sm:mt-16">
          <ProjectCover project={project} index={index} priority wide />
        </div>

        <div className="page mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="label mb-6 !text-ink">The project</h2>
            <div className="prose-body max-w-prose font-serif text-[1.3rem] leading-[1.6]">
              {project.description.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>

          <aside className="grid content-start gap-10 lg:col-span-4 lg:col-start-9">
            <section>
              <h2 className="label mb-4 !text-ink">Key features</h2>
              <ul className="border-t border-rule">
                {project.features.map((f) => (
                  <li key={f} className="border-b border-rule py-3 text-[0.97rem] leading-snug">
                    {f}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="label mb-4 !text-ink">Built with</h2>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="border border-rule px-2.5 py-1 font-mono text-[0.75rem]">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
            {links.length > 0 ? (
              <section>
                <h2 className="label mb-4 !text-ink">Links</h2>
                <ul className="grid gap-2">
                  {links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="link text-lg">
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>

        {project.screenshots && project.screenshots.length > 0 ? (
          <section className="page mt-20 grid gap-12" aria-label="Screenshots">
            {project.screenshots.map((s) => (
              <figure key={s.src} data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="w-full border border-rule bg-paper-2"
                />
                {s.caption ? <figcaption className="label mt-3 normal-case tracking-normal">{s.caption}</figcaption> : null}
              </figure>
            ))}
          </section>
        ) : null}

        <nav aria-label="Next project" className="page mt-24">
          <Link href={`/work/${next.id}/`} className="group flex flex-col gap-3 border-y border-ink py-10 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="label">Next project</span>
            <span className="font-serif text-display-md transition-colors group-hover:text-signal">
              {next.name} <span className="arrow">→</span>
            </span>
          </Link>
        </nav>
      </article>
      <SiteFooter />
    </>
  );
}
