import React from "react";
import { DashboardIconText } from "./DashboardComponent";
import { IoHome } from "react-icons/io5";
import { LiaPagerSolid } from "react-icons/lia";
import { dashboardMenu } from "../utils/constant";
import { useTheme } from "../utils/stores/theme";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { setCookie } from "cookies-next";
import ButtonTheme from "./ButtonTheme";
import { HiHomeModern } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
const Dashboard = () => {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.updateTheme);
  const toggleLightMode = () => {
    setTheme("light");
    setCookie("theme", "light");
  };
  // dark mode
  const toggleDarkMode = () => {
    setTheme("dark");
    setCookie("theme", "dark");
  };
  return (
    <>
      <div className="border-b-2 border-solid py-2 text-center text-colorText">
        <p>Sahitya Portfolio</p>
        <div>
          {theme === "dark" ? (
            <ButtonTheme icon={<CiLight />} handleTheme={toggleLightMode} />
          ) : (
            <ButtonTheme icon={<CiDark />} handleTheme={toggleDarkMode} />
          )}
        </div>
      </div>
      <div className=" ">
        <ul className="">
          {dashboardMenu.map((e, i) => {
            return (
              <DashboardIconText
                icon={e.icon}
                text={e.text}
                key={i}
                link={e.link}
                index={i}
              />
            );
          })}
        </ul>
        <ul className="absolute left-50  bottom-5 ">
          <DashboardIconText
            link={"/"}
            text={"Back to Homepage"}
            icon={<HiHomeModern />}
          />
          <DashboardIconText link={"/"} text={"Logout"} icon={<IoLogOut />} />
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
