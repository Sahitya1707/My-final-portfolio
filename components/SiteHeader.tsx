"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const NAV = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header className="relative z-40 border-b border-rule">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="page flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={`${site.name}, home`}>
          <span className="font-serif text-[1.35rem] font-medium tracking-tight">{site.name}</span>
          <span className="label hidden md:inline">{site.role}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-[0.95rem] transition-colors hover:text-signal ${
                isActive(item.href) ? "text-ink underline decoration-signal decoration-2 underline-offset-[0.4em]" : "text-ink/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="btn !px-4 !py-2.5 text-[0.9rem]">
            Start a project <span className="arrow">→</span>
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 items-center gap-2 px-2 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="label !text-ink">{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper sm:hidden"
      >
        <nav aria-label="Mobile" className="page flex flex-col pt-6">
          {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact/", label: "Contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between border-b border-rule py-5 font-serif text-4xl tracking-tight"
            >
              {item.label}
              <span className="label">0{i + 1}</span>
            </Link>
          ))}
          <a href={`mailto:${site.email}`} className="link mt-8 break-all text-lg">
            {site.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
