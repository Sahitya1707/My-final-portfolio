"use client";

import { useEffect } from "react";

/**
 * Remembers how a visitor first arrived (the referring site, ?ref= / utm_ tags, landing page)
 * so it can be attached to their enquiry. Stored only in their own browser, never sent anywhere
 * except inside a message they choose to send you.
 */
export const LEAD_KEY = "first-touch";

export interface FirstTouch {
  landing: string;
  referrer: string;
  ref: string;
  utm: string;
  at: string;
}

export function LeadSource() {
  useEffect(() => {
    try {
      if (localStorage.getItem(LEAD_KEY)) return;
      const q = new URLSearchParams(location.search);
      const utm = ["utm_source", "utm_medium", "utm_campaign"]
        .map((k) => (q.get(k) ? `${k.replace("utm_", "")}=${q.get(k)}` : ""))
        .filter(Boolean)
        .join(", ");
      const ref = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "";
      const touch: FirstTouch = {
        landing: location.pathname,
        referrer: ref,
        ref: q.get("ref") || "",
        utm,
        at: new Date().toISOString().slice(0, 10),
      };
      localStorage.setItem(LEAD_KEY, JSON.stringify(touch));
    } catch {
      /* storage blocked: the enquiry just won't include the source */
    }
  }, []);
  return null;
}

export function readFirstTouch(): FirstTouch | null {
  try {
    const raw = localStorage.getItem(LEAD_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}

/** One readable line for the enquiry email, e.g. "google.com → /services/ (2026-11-14)". */
export function describeFirstTouch(t: FirstTouch | null): string {
  if (!t) return "Unknown";
  const from = t.ref ? `ref=${t.ref}` : t.utm ? t.utm : t.referrer ? new URL(t.referrer).host : "Direct / typed / bookmark";
  return `${from} → ${t.landing} (${t.at})`;
}
