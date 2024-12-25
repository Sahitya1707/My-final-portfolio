"use client";
import { DashboardMainComponent } from "@/app/components/DashboardComponent";
import ProtectedRoute from "@/app/components/HOC/ProtectedRoute";
import { ProjectHeading } from "@/app/components/ProjectComponent";
import { CiMenuFries } from "react-icons/ci";
import { RiPagesLine } from "react-icons/ri";
import { GrTechnology } from "react-icons/gr";
import { useMenuPopup } from "@/app/utils/stores/menuPopup";
import { useEffect } from "react";
import { backendURI } from "@/app/utils/secret";

const Dashboard = () => {
  const updatePopupActive = useMenuPopup((state) => state.updatePopupActive);
  const handleMenuPopup = () => {
    updatePopupActive(true);
  };
  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await fetch(`${backendURI}/admin/data/getAllMenu`, {
          method: "GET",
          headers: {},
        });
        if (response.ok) {
        }
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMenu();
  }, []);
  return (
    <div className="">
      <ProjectHeading text={"Dashboard"} />
      <div className="flex my-4 gap-y-4 gap-x-6 flex-wrap">
        <DashboardMainComponent
          handleClick={handleMenuPopup}
          linkText={""}
          text={"Menus"}
          componentBgColor={"primary"}
          icon={<CiMenuFries />}
          btnText={"Edit Menu"}
          btnColor={"primary"}
          btnBgColor={"colorText"}
        />
        <DashboardMainComponent
          linkText={"/admin/pages"}
          text={"Pages"}
          componentBgColor={"primary"}
          icon={<RiPagesLine />}
          btnText={"Edit Page"}
          btnColor={"primary"}
          btnBgColor={"colorText"}
        />
        <DashboardMainComponent
          linkText={"/admin/techstack"}
          text={"Tech Stack"}
          componentBgColor={"primary"}
          icon={<GrTechnology />}
          btnText={"Edit Tech Stack"}
          btnColor={"primary"}
          btnBgColor={"colorText"}
        />
      </div>
    </div>
  );
};

export default ProtectedRoute(Dashboard);
