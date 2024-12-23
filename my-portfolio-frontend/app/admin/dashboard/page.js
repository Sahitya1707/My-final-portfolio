"use client";
import { DashboardMainComponent } from "@/app/components/DashboardComponent";
import ProtectedRoute from "@/app/components/HOC/ProtectedRoute";
import { ProjectHeading } from "@/app/components/ProjectComponent";
import { CiMenuFries } from "react-icons/ci";
import { RiPagesLine } from "react-icons/ri";

const Dashboard = () => {
  return (
    <div className="">
      <ProjectHeading text={"Dashboard"} />
      <div className="flex my-4 gap-4">
        <DashboardMainComponent
          // link={"/admin/dashboard/menu"}
          linkText={""}
          text={"Menus"}
          componentBgColor={"primary"}
          icon={<CiMenuFries />}
          btnText={"Edit Menu"}
          btnColor={"primary"}
          btnBgColor={"colorText"}
        />
        <DashboardMainComponent
          link={"/admin/page"}
          linkText={""}
          text={"Pages"}
          componentBgColor={"primary"}
          icon={<RiPagesLine />}
          btnText={"Edit Page"}
          btnColor={"primary"}
          btnBgColor={"colorText"}
        />
      </div>
    </div>
  );
};

export default ProtectedRoute(Dashboard);
