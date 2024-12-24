import React, { useState } from "react";
import HeadingTypeOne from "./HeadingTypeOne";
import { ProjectHeading } from "./ProjectComponent";
import { Input } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";
import { RxCross2 } from "react-icons/rx";
import { useMenuPopup } from "../utils/stores/menuPopup";
import { backendURI } from "../utils/secret";
import { Content } from "next/font/google";

const MenuPopup = ({ width }) => {
  const updatePopup = useMenuPopup((state) => state.updatePopupActive);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
  });
  const closeMenuPopup = () => {
    updatePopup(false);
  };
  const handleMenu = async (e) => {
    e.preventDefault();
    console.log(formData.link);
    try {
      const response = await fetch(`${backendURI}/admin/data/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          link: `${formData.link}`,
        }),
        credentials: "include",
      });
      if (response.ok) {
      }
    } catch (err) {}
  };
  const handleMenuForm = (e) => {
    setFormData({ ...formData, [`${e.target.name}`]: e.target.value });
  };
  return (
    <div className="fixed z-[500]  h-[100vh] w-[100vw] top-0 right-0 left-0 flex items-center justify-center duration-50 ease-out ">
      <span
        className="absolute top-0 z-[501] w-full h-full backdrop-blur-sm"
        onClick={closeMenuPopup}
      ></span>
      <div
        className="relative z-[502] bg-colorNav  shadow-lg shadow-colorText/30 p-4 rounded-lg border-2 border-colorText/10 border-solid"
        style={{
          width: `${width}`,
        }}
      >
        <span
          className="absolute top-2 right-3 text-lg cursor-pointer text-colorText"
          onClick={closeMenuPopup}
        >
          <RxCross2 />
        </span>
        <ProjectHeading text={"Add Menu"} />
        <form action="" onSubmit={handleMenu}>
          <Input
            placeholderText={"Add Your Menu name"}
            label={"name"}
            inputType="text"
            handleInput={handleMenuForm}
          />
          <Input
            placeholderText={"Add a link to menu"}
            label={"link"}
            inputType="text"
            handleInput={handleMenuForm}
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

export default MenuPopup;
