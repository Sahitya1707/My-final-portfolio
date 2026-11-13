import type { Project } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  YOUR PROJECTS. This is the only file you edit to add, change or remove work.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  To add a project:
 *    1. Copy the TEMPLATE at the bottom of this file and paste it at the top of the list.
 *    2. Fill in the fields. Leave out anything you don't have (cover, liveUrl, githubUrl...).
 *    3. Put screenshots in public/projects/<id>/ and run `npm run images` to make .webp copies.
 *    4. Run `npm run build` to check it, then commit and push. Cloudflare deploys it.
 *
 *  Every project gets its own page at /work/<id>/ automatically.
 *  Set `featured: true` to show it on the home page (three or four looks best).
 *  Full guide: docs/ADDING-PROJECTS.md
 */
export const projects: Project[] = [
  {
    id: "roadstar",
    name: "Roadstar",
    summary:
      "An Android app that logs a teen driver's supervised hours in one tap and tracks progress against their state's requirement.",
    description: [
      "Parents of teen drivers in the US have to log dozens of supervised driving hours, often with a separate count for night driving, and hand the log to the DMV. Most families do it on paper or in a spreadsheet, and the rules differ in every state.",
      "Roadstar makes it a single tap: start a drive as you pull away, stop when you park. The app counts the hours, splits day and night time using real sunset times for where you drove, and shows how close you are to your state's requirement.",
      "It is offline-first. There is no account, no ads and no tracking, and drives stay on the phone. A one-time Pro upgrade exports a DMV-ready PDF log with totals and signature lines.",
      "I am building it end to end as my own product: research into each state's rules, the app itself, the landing page and the privacy policy.",
    ],
    category: "Product",
    status: "In development",
    completed: "2026-11",
    role: "Solo. Product research, design, mobile development, landing page and privacy policy.",
    context: "My own product, coming soon to Google Play",
    technologies: ["React Native", "Expo", "TypeScript", "Expo Router", "SQLite", "Location services"],
    features: [
      "One tap to start a drive; keeps recording with Maps open or the screen off and saves every 30 seconds",
      "Day and night hours split from real sunset times",
      "Requirements for all 50 states and DC, each linked to its official DMV source",
      "DMV-ready PDF log with totals and signature lines",
      "No account, no ads, no tracking: data stays on the device",
    ],
    screenshots: [
      {
        src: "/projects/roadstar/landing.webp",
        alt: "The Roadstar landing page: the headline 'Your teen's driving hours, logged in one tap' above a short list of features.",
        caption: "The public landing page and privacy policy, hosted for free on GitHub Pages.",
      },
    ],
    liveUrl: "https://sahitya1707.github.io/app-pages/roadstar/",
    featured: true,
    order: 1,
  },
  {
    id: "elmvale-horticultural-society",
    name: "Elmvale Horticultural Society",
    summary:
      "A content-managed website for a local horticultural society, built with Next.js and a headless CMS.",
    description: [
      "A website for the Elmvale Horticultural Society in Ontario. The site presents the society and its activities, and its content is managed through a headless CMS so it can be updated without touching code.",
      "I built it as a full-stack Next.js application with the CMS behind it, so content is edited in an admin screen while the public site stays fast and responsive on any device.",
    ],
    category: "Website",
    status: "Live",
    completed: "2025-05",
    role: "Full-stack development: front end, CMS content model and integration.",
    technologies: ["Next.js", "React", "Bootstrap", "Headless CMS"],
    features: [
      "Pages and posts edited through a CMS instead of code",
      "Responsive layout for phones, tablets and desktops",
      "Dynamic, content-managed pages",
    ],
    liveUrl: "https://elmvale.infinitecascade.xyz",
    featured: true,
    order: 2,
  },
  {
    id: "trackmywork",
    name: "TrackMyWork",
    summary:
      "A small CRM for freelancers: clients, projects and messages, with a separate portal where each client sees their own work.",
    description: [
      "Freelancers juggle clients, projects and conversations across email, spreadsheets and chat. TrackMyWork puts them in one place.",
      "The freelancer manages clients and projects and sends messages to a specific client. Clients sign in with the same email address and see only their own projects and messages. Messages cannot be edited or deleted once sent, so there is always a reliable record of what was agreed.",
      "It is built with ASP.NET Core MVC and Entity Framework Core, uses ASP.NET Identity with Google and GitHub sign-in, and has unit tests for the controllers.",
    ],
    category: "Web app",
    status: "Archived",
    completed: "2024-12",
    role: "Solo. Data model, back end, interface and tests.",
    context: "College project",
    technologies: ["ASP.NET Core MVC", "C#", "Entity Framework Core", "ASP.NET Identity", "Tailwind CSS", "MSTest"],
    features: [
      "Separate freelancer and client roles",
      "Client and project management (create, edit, delete)",
      "Per-client messages kept as a permanent record",
      "Sign in with email, Google or GitHub",
      "Controller unit tests",
    ],
    githubUrl: "https://github.com/Sahitya1707/TrackMyWork",
    featured: true,
    order: 3,
  },
  {
    id: "elevate-athletes",
    name: "Elevate Athletes",
    summary:
      "A platform for promoting under-recognised athletes from developing countries in football, cricket and esports.",
    description: [
      "Talented athletes in developing countries often have no way to be seen by scouts or sponsors. Elevate Athletes is a platform where they can showcase their skills, connect with scouts and sponsors, and find resources for training and career growth.",
      "The front end is built with Next.js, Redux Toolkit and Tailwind CSS with light and dark themes. The back end is an Express and MongoDB API with JWT-based sign-in for the developer dashboard.",
    ],
    category: "Web app",
    status: "Prototype",
    completed: "2024-09",
    role: "Full-stack development.",
    technologies: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "Express", "MongoDB", "JWT"],
    features: [
      "Featured athletes, events and resources sections",
      "Light and dark themes",
      "Developer dashboard with protected sign-in",
      "REST API built with Express and MongoDB",
    ],
    cover: {
      src: "/projects/elevate-athletes/cover.webp",
      alt: "Elevate Athletes home page: a wide photo of a packed football stadium with the headline 'Empowering underrated talents'.",
    },
    githubUrl: "https://github.com/Sahitya1707/Elevate-Athletes",
    featured: true,
    order: 4,
  },
  {
    id: "different-treks",
    name: "Different Treks",
    summary:
      "Website front end for a Nepal trekking and tour company, with destinations, packages and enquiry options.",
    description: [
      "A website front end for Different Treks, a trekking and tour company in Nepal. Visitors can browse destinations and trekking packages, read about activities and get in touch.",
      "WhatsApp, Viber, Facebook and email are kept one tap away on every page, so a visitor planning a trip can ask a question the moment they think of it.",
    ],
    category: "Website",
    status: "Archived",
    completed: "2023-12",
    role: "Front-end development.",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    features: [
      "Destination and package pages",
      "Package slider and search",
      "Enquiry form and contact page",
      "Floating contact buttons for WhatsApp, Viber, Facebook and email",
    ],
    githubUrl: "https://github.com/Sahitya1707/different-treks-frontend",
    archived: true,
  },
  {
    id: "payload-cloudinary",
    name: "Payload CMS + Cloudinary",
    summary:
      "An open-source example and step-by-step article showing how to store Payload CMS media on Cloudinary.",
    description: [
      "Payload CMS stores uploaded images on the server's disk by default, which does not work on most modern hosting. Getting it to upload straight to Cloudinary instead was poorly documented, so after working it out I published a complete working example and wrote up the process.",
      "The repository includes a Docker setup so anyone can run it locally in a few minutes.",
    ],
    category: "Open source",
    status: "Live",
    completed: "2025-05",
    role: "Solo. Code and article.",
    technologies: ["Payload CMS", "Next.js", "TypeScript", "Cloudinary", "Docker"],
    features: [
      "Media uploads go directly to Cloudinary with no local file storage",
      "Uses the official Payload cloud storage plugin",
      "Docker Compose setup for local development",
    ],
    githubUrl: "https://github.com/Sahitya1707/payload-cloudinary",
    links: [
      {
        label: "Read the article on Medium",
        url: "https://medium.com/@neupanesahitya1/how-i-integrated-cloudinary-with-payload-cms-so-you-dont-have-to-struggle-like-i-did-58ace37dd531",
      },
    ],
  },
  {
    id: "earthquake-simulation",
    name: "Earthquake Simulation",
    summary:
      "A 3D, VR-ready room in the browser that simulates an earthquake, built with Babylon.js.",
    description: [
      "An interactive 3D room rendered in the browser that shakes as an earthquake hits, with sound effects and on-screen guidance. It can be entered in virtual reality on a supported headset through WebXR.",
    ],
    category: "Experiment",
    status: "Prototype",
    completed: "2025-04",
    role: "Solo.",
    technologies: ["Babylon.js", "WebXR", "JavaScript", "glTF models"],
    features: [
      "Furnished 3D room built from glTF models",
      "Earthquake motion with sound",
      "On-screen text guidance",
      "Immersive VR mode through WebXR",
    ],
    githubUrl: "https://github.com/Sahitya1707/earthquake-simulation",
  },
  {
    id: "youtube-clone",
    name: "Video browsing app",
    summary:
      "A study project: a responsive video browsing interface in React using the YouTube Data API and Redux.",
    description: [
      "A learning project to practise state management at a realistic scale. It lists and searches videos from the YouTube Data API, with Redux Toolkit managing app state and Tailwind CSS for a responsive layout.",
    ],
    category: "Experiment",
    status: "Archived",
    completed: "2024-07",
    role: "Solo.",
    context: "Study project",
    technologies: ["React", "Redux Toolkit", "YouTube Data API", "Tailwind CSS"],
    features: [
      "Video listing and search from a live API",
      "Global state with Redux Toolkit",
      "Responsive layout",
    ],
    liveUrl: "https://youtube-clone-by-sahitya.vercel.app/",
    githubUrl: "https://github.com/Sahitya1707/youtube-clone",
    archived: true,
  },
  {
    id: "jwt-auth",
    name: "JWT authentication",
    summary:
      "A reference implementation of token-based sign-in with Next.js, Node.js and Express.",
    description: [
      "A small, complete example of JSON Web Token authentication across a Next.js front end and an Express API, written to understand the moving parts properly and to help others learning the same stack.",
    ],
    category: "Open source",
    status: "Archived",
    completed: "2024-09",
    role: "Solo.",
    technologies: ["Next.js", "Node.js", "Express", "JWT", "Tailwind CSS"],
    features: [
      "Sign-up and sign-in with hashed passwords (bcrypt)",
      "Token-based protected routes",
      "Separate front end and API",
    ],
    githubUrl: "https://github.com/Sahitya1707/JWT_AUTH",
    archived: true,
  },
];

/*
──── TEMPLATE: copy from here ───────────────────────────────────────────────────
  {
    id: "my-new-project",
    name: "My New Project",
    summary: "One sentence about what it is and who it is for.",
    description: [
      "First paragraph: the problem or the client's situation.",
      "Second paragraph: what you built and how.",
    ],
    category: "Website", // Website | Web app | Product | Concept | Open source | Experiment
    status: "Live", // Live | In development | Prototype | Archived
    completed: "2026-12",
    role: "What you personally did.",
    context: "Client project", // optional
    technologies: ["Next.js", "Tailwind CSS"],
    features: ["Feature one", "Feature two"],
    cover: { src: "/projects/my-new-project/cover.webp", alt: "Describe the image" }, // optional
    screenshots: [], // optional
    liveUrl: "https://example.com", // optional
    githubUrl: "https://github.com/Sahitya1707/my-new-project", // optional
    featured: false,
  },
──── to here ───────────────────────────────────────────────────────────────────
*/
