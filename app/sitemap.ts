import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = ["/", "/work/", "/services/", "/about/", "/contact/"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : 0.8,
  }));
  const work = getAllProjects().map((p) => ({
    url: `${base}/work/${p.id}/`,
    changeFrequency: "yearly" as const,
    priority: p.featured ? 0.7 : 0.5,
  }));
  return [...pages, ...work];
}
