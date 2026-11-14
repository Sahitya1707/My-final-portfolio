import Link from "next/link";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMeta({
  title: "About",
  description:
    "Independent web developer in Ontario. Georgian College Interactive Media Design (Web) graduate with professional WordPress and full-stack experience.",
  path: "/about/",
});

const experience = [
  {
    when: "2024 – present",
    what: "Web Developer",
    where: "DS Digital Media, Barrie, ON",
    note: "Building and maintaining responsive, SEO-friendly WordPress sites, and working with designers and non-technical teammates.",
  },
  {
    when: "2023 – 2025",
    what: "Interactive Media Design – Web",
    where: "Georgian College, Barrie, ON",
    note: "Design, front-end and back-end web development, content management and AR/VR.",
  },
  {
    when: "2023",
    what: "Full Stack Developer Intern",
    where: "Digital Terai, Kathmandu, Nepal",
    note: "React components connected to REST APIs, Node.js back-end work, Git-based team workflow.",
  },
];

const principles = [
  {
    title: "Clarity over decoration",
    body: "A visitor should know what you do and how to reach you within a few seconds. Design serves that first.",
  },
  {
    title: "Fast on a real phone",
    body: "Most of your customers will see the site on a phone, on mobile data. I build and test for that, not just a big monitor.",
  },
  {
    title: "Nothing you don't need",
    body: "No plugins, subscriptions or databases unless the project genuinely needs them. Less to break, less to pay for.",
  },
  {
    title: "Honest estimates",
    body: "If something will take longer or cost more than you'd expect, I'll tell you before we start, not after.",
  },
];

const tools = [
  ["Front end", "HTML, CSS, JavaScript, TypeScript, React, Next.js, Angular, Tailwind CSS"],
  ["Back end", "Node.js, Express, ASP.NET Core, REST APIs"],
  ["Data & CMS", "MongoDB, MySQL, SQLite, WordPress, Payload CMS, headless CMSs"],
  ["Mobile", "React Native with Expo"],
  ["Design", "Figma, Adobe Illustrator"],
];

export default function AboutPage() {
  return (
    <>
      <section className="page grid gap-12 pt-14 sm:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label mb-5">About</p>
          <h1 className="font-serif text-display-lg">
            I&rsquo;m {site.name}. I build websites and software, and I like it when they&rsquo;re simple.
          </h1>
          <div className="prose-body mt-10 max-w-prose font-serif text-[1.3rem] leading-[1.6]">
            <p>
              I started building for the web in 2021 and haven&rsquo;t stopped. I studied Interactive Media Design
              (Web) at Georgian College in Ontario, and I&rsquo;ve worked professionally on WordPress sites for real
              businesses and on full-stack apps with React, Next.js, Node.js and .NET.
            </p>
            <p>
              Now I work independently. I help small businesses that have no website, or one that has fallen
              behind, and I build products of my own, like Roadstar, an Android app for families logging teen
              driving hours.
            </p>
            <p>
              What I bring is the whole job in one person: understanding what your customers need, designing the
              pages, writing the code, and launching it on hosting that won&rsquo;t quietly eat your budget.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact/" className="btn">
              Work with me <span className="arrow">→</span>
            </Link>
          </div>
        </div>
        <figure className="lg:col-span-4 lg:col-start-9">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sahitya-portrait.webp"
            alt="Sahitya Neupane standing in front of Toronto's Old City Hall at Nathan Phillips Square."
            width={640}
            height={800}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <figcaption className="label mt-3">Toronto, Nathan Phillips Square</figcaption>
        </figure>
      </section>

      <section className="page mt-24 sm:mt-32" aria-labelledby="principles-title">
        <p className="label mb-4">How I work</p>
        <h2 id="principles-title" className="font-serif text-display-md">
          Four things I hold myself to.
        </h2>
        <div className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} data-reveal className="bg-paper p-6 sm:p-8">
              <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page mt-24 grid gap-12 sm:mt-32 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="label mb-6 !text-ink">Experience & education</h2>
          <ol className="border-t border-ink">
            {experience.map((e) => (
              <li key={e.what} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <span className="label pt-1">{e.when}</span>
                <div>
                  <p className="font-serif text-xl">{e.what}</p>
                  <p className="text-[0.95rem] text-muted">{e.where}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="label mb-6 !text-ink">Tools I use</h2>
          <dl className="border-t border-ink">
            {tools.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="label pt-1">{k}</dt>
                <dd className="text-[0.97rem] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
