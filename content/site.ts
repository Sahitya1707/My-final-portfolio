/**
 * Everything about you that appears on the site, in one place.
 * Change a value here and every page that uses it updates.
 */

export const site = {
  name: "Sahitya Neupane",
  shortName: "Sahitya",
  role: "Independent web developer",
  location: "Ontario, Canada",
  timezone: "Eastern Time",
  email: "neupanesahitya1@gmail.com",

  /**
   * The address the site lives at. Update this once you know your Cloudflare Pages URL
   * (or your own domain). It is used for canonical links, the sitemap and social previews.
   * NEXT_PUBLIC_SITE_URL, if set at build time, wins over this value.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sahitya-neupane.pages.dev",

  description:
    "Independent web developer in Ontario, Canada. I design and build fast, clear websites for small businesses, and web and mobile apps of my own.",

  /**
   * Availability shown in the header strip and on the contact page.
   * status: "available" | "limited" | "unavailable"
   */
  availability: {
    status: "available" as "available" | "limited" | "unavailable",
    note: "Taking on new website projects for December 2026 and January 2027.",
  },

  /** Typical reply time promised on the contact page. Only promise what you can keep. */
  replyTime: "within two working days",

  resume: "/files/sahitya-neupane-resume.pdf",

  socials: [
    { label: "GitHub", url: "https://github.com/Sahitya1707" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sahitya-neupane-3b0697212/" },
    { label: "Medium", url: "https://medium.com/@neupanesahitya1" },
  ],

  /** Google Search Console verification carried over from the previous site. */
  googleSiteVerification: "Tl4yrauYYf_veX_JQ_9e8PZOxLmqmDtwGQ-MYxPwVtU",
};

export type Site = typeof site;
