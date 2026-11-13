import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/**
 * Everything is public and meant to be found, including by AI assistants and their search
 * tools, so people asking an assistant for a web developer can be pointed here.
 * The named crawlers are listed explicitly because some hosts and templates block them by default.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: AI_CRAWLERS, allow: "/" }],
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
