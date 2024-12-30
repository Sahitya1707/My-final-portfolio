import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { DashboardIconText } from "./DashboardComponent";

const LoginToDashboard = () => {
  return (
    <DashboardIconText
      icon={<DashboardIconText />}
      text={"Login to dashboard"}
      link={"/admin/dashboard"}
    />
  );
};

export default LoginToDashboard;
