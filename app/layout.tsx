import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/schibsted-grotesk/wght.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import { LeadSource } from "@/components/LeadSource";
import { themeInitScript } from "@/components/ThemeToggle";
import { siteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Independent web developer in Ontario`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/", types: { "application/rss+xml": [{ url: "/work/feed.xml", title: "Recent work" }] } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
    url: "/",
    title: `${site.name} · Independent web developer`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, independent web developer` }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], apple: "/apple-touch-icon.png" },
  verification: { google: site.googleSiteVerification },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#181613" },
  ],
};

/** Free Cloudflare Web Analytics token (see docs/HOW-IT-WORKS.md). Leave unset to disable. */
const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }} />
        <SiteHeader />
        <main id="main">{children}</main>
        <Reveal />
        <LeadSource />
        {ANALYTICS_TOKEN ? (
          // Cloudflare Web Analytics: free, no cookies, no consent banner needed.
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: ANALYTICS_TOKEN })}
          />
        ) : null}
      </body>
    </html>
  );
}
