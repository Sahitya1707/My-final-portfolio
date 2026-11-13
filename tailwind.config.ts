import type { Config } from "tailwindcss";

/**
 * Design tokens. Colours are CSS variables (see app/globals.css) so light and dark
 * themes share one set of class names.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      paper: "rgb(var(--paper) / <alpha-value>)",
      "paper-2": "rgb(var(--paper-2) / <alpha-value>)",
      ink: "rgb(var(--ink) / <alpha-value>)",
      muted: "rgb(var(--muted) / <alpha-value>)",
      rule: "rgb(var(--rule) / <alpha-value>)",
      signal: "rgb(var(--signal) / <alpha-value>)",
      leaf: "rgb(var(--leaf) / <alpha-value>)",
    },
    fontFamily: {
      serif: ['"Newsreader Variable"', "Georgia", "serif"],
      sans: ['"Schibsted Grotesk Variable"', "system-ui", "sans-serif"],
      mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
    },
    extend: {
      maxWidth: { page: "88rem" },
      fontSize: {
        // Fluid display sizes: clamp(min, preferred, max)
        "display-xl": ["clamp(2.75rem, 7.4vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3.2vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        label: ["0.72rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
      },
      transitionTimingFunction: { out: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
    },
  },
  plugins: [],
};

export default config;
