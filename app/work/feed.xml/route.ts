import { site } from "@/content/site";
import { getCurrentProjects } from "@/lib/projects";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * An RSS feed of current work, generated from the project data on every build, so it
 * updates itself whenever a project is added or imported. Readers, LinkedIn tools and
 * services like IFTTT/Zapier free tiers can watch it to announce new work.
 */
export function GET() {
  const base = site.url.replace(/\/$/, "");
  const projects = [...getCurrentProjects()].sort((a, b) => b.completed.localeCompare(a.completed));
  const date = (c: string) => new Date(`${c.length === 4 ? `${c}-01` : c}-01T12:00:00Z`).toUTCString();
  const items = projects
    .map(
      (p) => `    <item>
      <title>${esc(p.name)}</title>
      <link>${base}/work/${p.id}/</link>
      <guid isPermaLink="true">${base}/work/${p.id}/</guid>
      <pubDate>${date(p.completed)}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.summary)}</description>
    </item>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}: recent work</title>
    <link>${base}/work/</link>
    <atom:link href="${base}/work/feed.xml" rel="self" type="application/rss+xml" />
    <description>New websites, apps and projects by ${esc(site.name)}.</description>
    <language>en-ca</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
