"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
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
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/sahitya-avatar.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <span className="font-serif text-[1.3rem] font-medium tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:bg-paper-2 ${
                isActive(item.href) ? "bg-paper-2 text-ink" : "text-ink/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="ml-1" />
          <Link href="/contact/" className="btn ml-2 !rounded-full !px-5 !py-2.5 text-[0.9rem]">
            Get a free quote <span className="arrow">→</span>
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-full px-3"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-[0.95rem]">{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper md:hidden">
        <nav aria-label="Mobile" className="page flex flex-col pt-4">
          {[{ href: "/", label: "Home" }, ...NAV].map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-rule py-5 font-serif text-4xl tracking-tight">
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="btn mt-8 justify-center !rounded-full">
            Get a free quote <span className="arrow">→</span>
          </Link>
          <a href={`mailto:${site.email}`} className="link mt-6 break-all text-center text-lg">
            {site.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
