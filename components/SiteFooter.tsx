import Link from "next/link";
import { site } from "@/content/site";
import { Availability } from "./Availability";

export function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="mt-24 border-t border-ink sm:mt-32">
      {showCta ? (
        <section className="page grid gap-10 py-16 sm:py-24 lg:grid-cols-12" aria-labelledby="footer-cta">
          <div className="lg:col-span-8">
            <p className="label mb-6">Next step</p>
            <h2 id="footer-cta" className="font-serif text-display-lg">
              Have a website that isn&rsquo;t pulling its weight? <em className="text-signal">Let&rsquo;s talk.</em>
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            <Availability withNote className="text-[0.95rem]" />
            <div className="flex flex-wrap gap-3">
              <Link href="/contact/" className="btn">
                Start a project <span className="arrow">→</span>
              </Link>
            </div>
            <a href={`mailto:${site.email}`} className="link break-all text-lg">
              {site.email}
            </a>
          </div>
        </section>
      ) : null}
      <div className="border-t border-rule">
        <div className="page flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Designed and built by me, hosted for $0.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.resume} className="link" target="_blank" rel="noopener">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
