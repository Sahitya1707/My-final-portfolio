import React from "react";
import { DashboardIconText } from "./DashboardComponent";
import { IoHome } from "react-icons/io5";
import { LiaPagerSolid } from "react-icons/lia";
import { dashboardMenu } from "../utils/constant";

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
