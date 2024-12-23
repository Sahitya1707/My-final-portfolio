import React from "react";
import HeadingTypeOne from "./HeadingTypeOne";
import { ProjectHeading } from "./ProjectComponent";
import { Input } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";
import { RxCross2 } from "react-icons/rx";
import { useDashboardPopup } from "../utils/stores/dashboardPopup";

const DashboardPopup = ({ width }) => {
  const updatePopup = useDashboardPopup((state) => state.updatePopupActive);

  const closeDashboardPopup = () => {
    updatePopup(false);
  };
  return (
    <div className="fixed z-[500]  h-[100vh] w-[100vw] top-0 right-0 left-0 flex items-center justify-center duration-50 ease-out">
      <span
        className="absolute top-0 z-[501] w-full h-full backdrop-blur-sm"
        onClick={closeDashboardPopup}
      ></span>
      <div
        className="relative z-[502] bg-colorNav  shadow-lg shadow-colorText/30 p-4 rounded-lg"
        style={{
          width: `${width}`,
        }}
      >
        <span
          className="absolute top-2 right-3 text-lg cursor-pointer"
          onClick={closeDashboardPopup}
        >
          <RxCross2 />
        </span>
        <ProjectHeading text={"Add Menu"} />
        <form action="">
          <Input
            placeholderText={"Add Your Menu name"}
            label={"Menu Name"}
            inputType="text"
          />
          <Input
            placeholderText={"Add a link to menu"}
            label={" Link"}
            inputType="text"
          />
          <ButtonTypeOne
            color={"primary"}
            bgColor={"colorBody"}
            text={"submit"}
          />
        </form>
      </div>
    </div>
  );
};

export default DashboardPopup;
