"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades elements marked with data-reveal in as they scroll into view.
 * Content is fully visible without JavaScript or with reduced motion turned on.
 */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => {
      // Anything already on screen shows immediately, so nothing "pops" above the fold.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add("is-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
