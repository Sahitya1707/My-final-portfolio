"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { ActiveNavContext } from "./components/activeNavContext";
const AppLayout = ({ children }) => {
  // read current path url
  const pathname = usePathname();

  const { activeNav, setActiveNav } = useContext(ActiveNavContext);
  useEffect(() => {
    console.log("useEffect called");
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
  }, [pathname]);
  return (
    <>
      {" "}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
