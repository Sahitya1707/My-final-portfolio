/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins-500": "var(--font-poppins)",
      },
    },
    // adding root color read it here https://stackoverflow.com/questions/64872861/how-to-use-css-variables-with-tailwind-css
    colors: {
      primary: "rgb(var(--primary-clr)/<alpha-value>)",
      colorText: "rgb(var(--color-text)/<alpha-value>)",
      colorNav: "rgb(var(--nav-clr)/<alpha-value>)",
      colorBody: "rgb(var(--body-clr)/<alpha-value>)",
      colorFive: "rgb(var(--clr-5)/<alpha-value>)",
      colorSix: "rgb(var(--clr-6)/<alpha-value>)",
      // background: "var(--background)",
      // foreground: "var(--foreground)",
    },
  },
  plugins: [],
};
