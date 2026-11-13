import type { Metadata } from "next";

/** Per-page metadata with a matching canonical URL and Open Graph block. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [{ url: "/og.png", width: 1200, height: 630 }] },
  };
}
