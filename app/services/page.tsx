import Link from "next/link";
import { services, process, faqs } from "@/content/services";
import { pageMeta } from "@/lib/meta";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Business websites, redesigns, landing pages, web applications and ongoing maintenance, with fixed prices agreed in writing and hosting that can cost $0 a month.",
  path: "/services/",
});

export default function ServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="page pt-14 sm:pt-20">
        <p className="label mb-5">Services</p>
        <h1 className="max-w-[18ch] font-serif text-display-lg">
          Websites that do their job, built by someone who explains things plainly.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          I work with small businesses, startups and individuals. Every project starts with understanding what your
          customers need from you online, and ends with a site you own outright.
        </p>
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="link text-[0.95rem]">
              {s.name}
            </a>
          ))}
        </nav>
      </section>

      <section className="page mt-16 sm:mt-24" aria-label="Services">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            data-reveal
            className="grid scroll-mt-8 gap-6 border-t border-ink py-10 sm:py-14 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 font-serif text-display-md">{s.name}</h2>
              <p className="mt-3 text-muted">{s.forWho}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed">{s.description}</p>
              <ul className="mt-6 border-t border-rule">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-rule py-3 text-[0.97rem]">
                    <span aria-hidden="true" className="text-signal">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section id="process" className="border-y border-ink bg-paper-2/50" aria-labelledby="process-title">
        <div className="page py-16 sm:py-24">
          <p className="label mb-4">Process</p>
          <h2 id="process-title" className="max-w-[20ch] font-serif text-display-md">
            Five steps, no surprises.
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {process.map((step, i) => (
              <li key={step.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }} className="border-t border-ink pt-5">
                <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page mt-20 grid gap-10 sm:mt-28 lg:grid-cols-12" aria-labelledby="faq-title">
        <div className="lg:col-span-4">
          <p className="label mb-4">Questions</p>
          <h2 id="faq-title" className="font-serif text-display-md">
            Things people usually ask first.
          </h2>
          <p className="mt-6 text-muted">
            Something else on your mind?{" "}
            <Link href="/contact/" className="link">
              Ask me directly
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-rule py-5 first:border-t">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-serif text-xl sm:text-2xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="font-mono text-lg text-muted transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-prose leading-relaxed text-ink/85">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
