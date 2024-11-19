"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./components/themeContext";
import { ActiveNavContext } from "./components/activeNavContext";

const AppLayout = ({ children }) => {
  // read current path url
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const { activeNav, setActiveNav } = useContext(ActiveNavContext);
  // importing the font from google

  useEffect(() => {
    console.log(ThemeContext);
    console.log("useEffect called");
    // setting the active nav
    if (pathname === "/") {
      setActiveNav(0);
    } else if (pathname === "/about") {
      setActiveNav(1);
    } else if (pathname === "/projects") {
      setActiveNav(2);
    } else if (pathname === "/skills") {
      setActiveNav(3);
    } else if (pathname === "/experience") {
      setActiveNav(4);
    } else {
      setActiveNav(null);
    }
    // let's know if the browser is darkmode or light mode https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // if browser theme is dark then set to null
      setTheme(null);
    } else {
      // if browser theme is light then set to light
      setTheme("light");
    }

    console.log(theme);
  }, [pathname]);
  return (
    <body className={` bg-colorBody ${theme}`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  );
};

export default AppLayout;
