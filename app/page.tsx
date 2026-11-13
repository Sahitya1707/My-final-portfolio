import Link from "next/link";
import { site } from "@/content/site";
import { services, process } from "@/content/services";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";
import { Availability } from "@/components/Availability";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectIndex } from "@/components/ProjectIndex";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const rest = getAllProjects().filter((p) => !p.featured).slice(0, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="page pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pt-20" aria-labelledby="hero-title">
        <div className="mb-10 flex flex-col gap-3 border-b border-rule pb-5 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            Websites · Redesigns · Web apps — {site.location}
          </p>
          <Availability className="text-sm" />
        </div>

        <h1 id="hero-title" className="max-w-[17ch] font-serif text-display-xl font-normal">
          <span className="rise sm:block">I design and build </span>
          <span className="rise sm:block" style={{ ["--rise-delay" as string]: "90ms" }}>
            websites that make{" "}
          </span>
          <span className="rise sm:block" style={{ ["--rise-delay" as string]: "180ms" }}>
            small businesses <em className="text-signal">easy</em>{" "}
          </span>
          <span className="rise sm:block" style={{ ["--rise-delay" as string]: "270ms" }}>
            <em className="text-signal">to choose.</em>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12">
          <p className="rise text-xl leading-relaxed text-ink/85 lg:col-span-6 lg:col-start-1" style={{ ["--rise-delay" as string]: "380ms" }}>
            I&rsquo;m {site.shortName}, an independent developer. I make new websites, rebuild tired ones so they
            work properly on a phone, and build web apps when a website isn&rsquo;t enough. I do the design, the code
            and the launch myself, and keep your running costs close to zero.
          </p>
          <div className="rise flex flex-col gap-4 sm:flex-row sm:items-start lg:col-span-5 lg:col-start-8 lg:justify-end" style={{ ["--rise-delay" as string]: "460ms" }}>
            <Link href="/contact/" className="btn justify-center">
              Tell me about your project <span className="arrow">→</span>
            </Link>
            <Link href="#work" className="btn-ghost justify-center">
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/* ── What I can help with ─────────────────────────────── */}
      <section className="border-y border-ink bg-paper-2/50" aria-labelledby="help-title">
        <div className="page grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label mb-4">What I can help with</p>
            <h2 id="help-title" className="font-serif text-display-md">
              Practical work for businesses that need to be found, understood and contacted.
            </h2>
            <Link href="/services/" className="link mt-6 inline-block">
              Services, process and pricing <span className="arrow">→</span>
            </Link>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {services.map((s, i) => (
              <li key={s.id} data-reveal className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-5 first:pt-0 last:border-0 sm:grid-cols-[3rem_14rem_1fr]">
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-2xl tracking-tight">{s.name}</h3>
                <p className="col-start-2 mt-1 text-muted sm:col-start-3 sm:mt-0">{s.forWho}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────────── */}
      <section id="work" className="page scroll-mt-8 pt-20 sm:pt-28" aria-labelledby="work-title">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label mb-4">Selected work</p>
            <h2 id="work-title" className="font-serif text-display-lg">Things I&rsquo;ve built</h2>
          </div>
          <p className="max-w-md text-muted">
            A mix of websites, web apps and a product of my own. Each one links to a write-up of the problem, what
            I did and how it was built.
          </p>
        </div>
        <div className="grid gap-16 sm:gap-20">
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} />
          ))}
        </div>

        {rest.length > 0 ? (
          <div className="mt-20 sm:mt-28">
            <div className="mb-6 flex items-baseline justify-between">
              <h3 className="label !text-ink">More from the index</h3>
              <Link href="/work/" className="link text-[0.95rem]">
                All work <span className="arrow">→</span>
              </Link>
            </div>
            <ProjectIndex projects={rest} startAt={featured.length + 1} />
          </div>
        ) : null}
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="page pt-24 sm:pt-32" aria-labelledby="process-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label mb-4">How a project works</p>
            <h2 id="process-title" className="font-serif text-display-md">
              Fixed price, agreed in writing, and you see progress the whole way.
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {process.map((step, i) => (
              <li key={step.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} className="bg-paper p-6">
                <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
            <li className="flex flex-col justify-end bg-ink p-6 text-paper">
              <p className="font-serif text-xl">No lock-in.</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-paper/70">
                You own the domain, the code and the content from day one.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ── About teaser ─────────────────────────────────────── */}
      <section className="page pt-24 sm:pt-32" aria-labelledby="about-title">
        <div className="grid items-end gap-10 border-t border-rule pt-10 lg:grid-cols-12">
          <figure data-reveal className="lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sahitya-portrait.webp"
              alt="Sahitya Neupane standing in front of Toronto's Old City Hall at Nathan Phillips Square."
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover grayscale-[35%]"
            />
          </figure>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="label mb-4">About</p>
            <h2 id="about-title" className="font-serif text-display-md">
              One person, start to finish. You always talk to the person doing the work.
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/85">
              I studied Interactive Media Design (Web) at Georgian College and have built websites professionally on
              WordPress and full-stack apps with React, Next.js, Node.js and .NET. I care about sites that load fast,
              read clearly and are easy for the owner to keep up to date.
            </p>
            <Link href="/about/" className="link mt-6 inline-block">
              More about me <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
