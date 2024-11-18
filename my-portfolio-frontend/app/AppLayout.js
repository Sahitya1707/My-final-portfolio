"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import Provider from "./components/activeNavProvider";
const AppLayout = ({ children }) => {
  // read current path url
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div>
      {" "}
      <Provider>
        <Header />
        <main>{children}</main>
      </Provider>
      <Footer />
    </div>
  );
};

export default AppLayout;
