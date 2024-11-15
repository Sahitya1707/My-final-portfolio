/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // adding root color read it here https://stackoverflow.com/questions/64872861/how-to-use-css-variables-with-tailwind-css
      colors: {
        primary: "rgb(var(--primary-clr)/<alpha-value>)",
        textClr: "rgb(var(--Clr-text)/<alpha-value>)",
        navClr: "rgb(var(--nav-clr)/<alpha-value>)",
        bodyClr: "rgb(var(--body-clr)/<alpha-value>)",
        colorFive: "rgb(var(--clr-5)/<alpha-value>)",
        colorSix: "rgb(var(--clr-6)/<alpha-value>)",
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
