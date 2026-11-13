import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <section className="page pt-20 sm:pt-28">
        <p className="label mb-5">Error 404</p>
        <h1 className="max-w-[14ch] font-serif text-display-xl">This page isn&rsquo;t here.</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          It may have moved when the site was rebuilt. These should help:
        </p>
        <ul className="mt-8 flex flex-wrap gap-4">
          <li>
            <Link href="/" className="btn">
              Home <span className="arrow">→</span>
            </Link>
          </li>
          <li>
            <Link href="/work/" className="btn-ghost">
              Work
            </Link>
          </li>
          <li>
            <Link href="/contact/" className="btn-ghost">
              Contact
            </Link>
          </li>
        </ul>
      </section>
      <SiteFooter showCta={false} />
    </>
  );
}
