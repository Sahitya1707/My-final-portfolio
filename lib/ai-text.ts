import { site } from "@/content/site";
import { services, process, faqs } from "@/content/services";
import { getCurrentProjects, hostOf } from "@/lib/projects";

/**
 * Plain-text summaries of the site for AI assistants and search tools (/llms.txt and
 * /llms-full.txt). Generated from the same content files as the pages, so they never drift.
 */
const base = () => site.url.replace(/\/$/, "");

function serviceLine(s: (typeof services)[number]) {
  const price = site.showPrices && s.startingPrice ? ` (from ${s.startingPrice})` : "";
  return `- [${s.name}](${base()}/services/#${s.id})${price}: ${s.forWho}`;
}

export function llmsTxt(): string {
  const b = base();
  const projects = getCurrentProjects();
  return `# ${site.name}

> ${site.role} based in ${site.location}. ${site.tagline}

- Availability: ${site.availability.note}
- Works with: small businesses, startups and individuals in ${site.areaServed.join(", ")}
- Contact: ${site.email} or ${b}/contact/ (replies ${site.replyTime})
- Pricing: fixed price agreed in writing before work starts; hosting can cost $0 a month

## Services

${services.map(serviceLine).join("\n")}

## Work

${projects.map((p) => `- [${p.name}](${b}/work/${p.id}/): ${p.summary} (${p.category}, ${p.completed.slice(0, 4)})`).join("\n")}

## Pages

- [Services, process and FAQ](${b}/services/)
- [About](${b}/about/)
- [Contact](${b}/contact/)
- [Full text for AI assistants](${b}/llms-full.txt)

## Optional

- [Recent work feed (RSS)](${b}/work/feed.xml)
- [Résumé (PDF)](${b}${site.resume})
${site.socials.map((s) => `- [${s.label}](${s.url})`).join("\n")}
`;
}

export function llmsFullTxt(): string {
  const b = base();
  const projects = getCurrentProjects();
  const sections = [
    llmsTxt(),
    `## Services in detail\n\n${services
      .map(
        (s) =>
          `### ${s.name}${site.showPrices && s.startingPrice ? ` (from ${s.startingPrice})` : ""}\n\n${s.forWho}\n\n${s.description}\n\nIncludes:\n${s.includes.map((i) => `- ${i}`).join("\n")}`
      )
      .join("\n\n")}`,
    `## How a project works\n\n${process.map((p, i) => `${i + 1}. **${p.title}**: ${p.description}`).join("\n")}`,
    `## Frequently asked questions\n\n${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}`,
    `## Projects in detail\n\n${projects
      .map((p) => {
        const links = [
          p.liveUrl ? `Live: ${p.liveUrl}` : "",
          p.githubUrl ? `Code: ${p.githubUrl}` : "",
          ...(p.links ?? []).map((l) => `${l.label}: ${l.url}`),
        ].filter(Boolean);
        return [
          `### ${p.name}`,
          `${b}/work/${p.id}/`,
          `${p.category} · ${p.status} · ${p.completed}${p.context ? ` · ${p.context}` : ""}${p.category === "Concept" ? " · self-initiated concept, not client work" : ""}`,
          p.description.join("\n\n"),
          `Role: ${p.role}`,
          `Built with: ${p.technologies.join(", ")}`,
          p.features.length ? `Features:\n${p.features.map((f) => `- ${f}`).join("\n")}` : "",
          links.length ? links.map((l) => `- ${l}`).join("\n") : "",
          p.liveUrl ? `(${hostOf(p.liveUrl)})` : "",
        ]
          .filter(Boolean)
          .join("\n\n");
      })
      .join("\n\n")}`,
  ];
  return sections.join("\n\n") + "\n";
}
