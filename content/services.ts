/**
 * Services, process and FAQ. Plain data so you can reword anything without touching layout code.
 * Keep promises here realistic: this is what a client will hold you to.
 */

export interface Service {
  id: string;
  name: string;
  /** Who it is for, in one line. */
  forWho: string;
  description: string;
  includes: string[];
}

export const services: Service[] = [
  {
    id: "business-website",
    name: "Business websites",
    forWho: "For businesses with no website, or one that no longer represents them.",
    description:
      "A small, fast site that tells people what you do, shows your work or menu or services, and makes it obvious how to call, book or visit. Built so you are not paying monthly fees for features you never use.",
    includes: [
      "Up to about six pages: home, services, about, gallery, contact and similar",
      "Written structure and headings that help customers and search engines",
      "Contact form, click-to-call, map and opening hours",
      "Set up on hosting that can cost $0 a month",
    ],
  },
  {
    id: "redesign",
    name: "Website redesigns",
    forWho: "For sites that look dated, load slowly or fall apart on a phone.",
    description:
      "I start by reviewing what you have: what works, what is broken, what customers struggle with on a phone. Then I rebuild it with your existing content as the starting point, so nothing important is lost.",
    includes: [
      "A written review of the current site before any work starts",
      "Redesign that keeps your name, content and search history",
      "Redirects from old page addresses so links keep working",
      "Speed and mobile improvements you can check yourself",
    ],
  },
  {
    id: "landing-page",
    name: "Landing pages",
    forWho: "For a launch, a campaign, an event or a single offer.",
    description:
      "One focused page with one job: explain the offer and get the sign-up, booking or enquiry. Quick to build, easy to measure.",
    includes: [
      "One page, designed for phones first",
      "Form or booking link connected to your email",
      "Basic, privacy-friendly visit counting if you want it",
    ],
  },
  {
    id: "web-app",
    name: "Web applications",
    forWho: "For startups and teams that need a working product, not a brochure.",
    description:
      "Dashboards, client portals, booking tools and internal apps built with React, Next.js, Node.js or .NET. I scope these in small, testable stages so you see working software early.",
    includes: [
      "Scoping session and a written plan with stages",
      "Accounts and sign-in, databases and APIs where needed",
      "Hosting chosen for your budget, including free tiers where they genuinely fit",
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance and improvements",
    forWho: "For existing sites that need someone to look after them.",
    description:
      "Content updates, fixes, small features, speed work and keeping things up to date, on a simple per-task or small monthly basis. WordPress sites included.",
    includes: [
      "Text, image and page updates",
      "Bug fixes and small new features",
      "Speed, accessibility and mobile check-ups",
    ],
  },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const process: ProcessStep[] = [
  {
    title: "Conversation",
    description:
      "A short call or email exchange about your business, who your customers are and what the website needs to do. No cost and no obligation.",
  },
  {
    title: "Written proposal",
    description:
      "A plain-language scope, timeline and fixed price. You know exactly what you are getting and what it costs before anything starts.",
  },
  {
    title: "Design",
    description:
      "I design the key pages and share them with you. We adjust until it feels right, before I build the rest.",
  },
  {
    title: "Build and review",
    description:
      "I build the site on a private preview link you can open on your own phone and computer, and fix anything you find.",
  },
  {
    title: "Launch and hand-over",
    description:
      "I connect your domain, check everything works and show you how to make simple changes. You own the site and the code.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How much does a website cost?",
    a: "It depends on the number of pages and what the site has to do. I give a fixed price in writing after our first conversation, so there are no surprises. Small business sites are deliberately kept simple so they stay affordable.",
  },
  {
    q: "Will I have to pay monthly fees?",
    a: "Usually only for your domain name, which is typically around $15 to $25 a year. Most small business sites I build can be hosted for free. If your project needs a paid service, I will explain why before we commit.",
  },
  {
    q: "How long does it take?",
    a: "A landing page can take about a week. A small business website usually takes two to four weeks, mostly depending on how quickly content and feedback come together.",
  },
  {
    q: "I already have a website. Do I need to start over?",
    a: "Not necessarily. Sometimes a few targeted fixes to speed, mobile layout and contact options make the biggest difference. I will tell you honestly which one makes sense.",
  },
  {
    q: "Who owns the website?",
    a: "You do. The code, the content and the domain are yours, and I can hand everything over at any time.",
  },
];
