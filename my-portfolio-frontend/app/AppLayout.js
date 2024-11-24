"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./components/themeContext";
import { ActiveNavContext } from "./components/activeNavContext";

// import this in order to set cookies from the client component
import { getCookie, setCookie } from "cookies-next";
import SocialMediaHandle from "./components/SocialMediaHandle";
import { useBackgroundText } from "./utils/stores/backgroundTextStore";

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
      // setActiveNav(4);
    } else if (pathname === "/contact") {
      setActiveNav(5);
    } else if (pathname === "/todo") {
      setActiveNav(4);
    } else {
      setActiveNav(null);
    }
  }, [pathname]);

  useEffect(() => {
    // let's know if the browser is darkmode or light mode https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
    const currentTheme = getCookie("theme");
    // console.log(currentTheme);
  }, []);
  return (
    <body
      className={` bg-colorBody ${theme} max-w-full w-full overflow-hidden max-h-screen `}
    >
      <Header />
      <main className="relative px-[12rem] py-[2rem] text-colorText max-w-[150rem] z-[1000] mx-auto h-[80vh]">
        {children}
        {/* <span
          className="   flex text-colorText/5 text-[20rem] stroke-none font-poppins-500 rotate-[-10deg]"
          style={{
            WebkitTextStroke: "2px rgb(var(--primary-clr))",
            // transform: position,
          }}
        >
          {backgroundText}
        </span> */}
      </main>
      <SocialMediaHandle />
      <Footer />
    </body>
  );
};

export default AppLayout;
