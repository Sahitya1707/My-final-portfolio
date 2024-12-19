"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// import this in order to set cookies from the client component
import { getCookie, setCookie } from "cookies-next";
import SocialMediaHandle from "./components/SocialMediaHandle";
import { useBackgroundText } from "./utils/stores/backgroundTextStore";
import { useTheme } from "./utils/stores/theme";
import { useActiveNav } from "./utils/stores/activeNav";

const AppLayout = ({ children }) => {
  // reading theme through zustand
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.updateTheme);

  // read current path url
  const pathname = usePathname();
  console.log(pathname);

  // const { activeNav, setActiveNav } = useContext(ActiveNavContext);
  const setActiveNav = useActiveNav((state) => state.updateActiveNav);

  // importing the font from google

  useEffect(() => {
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
    } else if (pathname === "/contact") {
      setActiveNav(4);
    } else {
      setActiveNav(null);
    }
  }, [pathname]);

  useEffect(() => {
    // let's know if the browser is darkmode or light mode https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
    // const currentTheme = getCookie("theme");
    // console.log(currentTheme);
    const currentTheme = getCookie("theme");

    if (currentTheme === "dark") {
      setTheme("dark");
      return;
    } else if (currentTheme === "light") {
      setTheme("light");
      return;
    } else {
      // if browser theme is dark then set to null and vice versa

      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
      setCookie("theme", theme);
    }
  }, []);
  return (
    <body
      className={` bg-colorBody ${theme} max-w-full w-full lg:overflow-clip overflow-auto lg:max-h-screen max-h-auto `}
    >
      {pathname.includes("/admin") ? (
        <main className="">{children}</main>
      ) : (
        <>
          <Header />
          <main className="relative px-[3rem] md:px-[5rem] xl:px-[12rem] lg:py-[2rem] text-colorText max-w-[150rem] z-[1000] mx-auto lg:h-[80vh] lg:min-h-auto min-h-[90vh]">
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
        </>
      )}
    </body>
  );
};

export default AppLayout;
