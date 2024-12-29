import React, { useEffect, useState } from "react";
import HeadingTypeOne from "./HeadingTypeOne";
import { ProjectHeading } from "./ProjectComponent";
import { Input } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";
import { RxCross2 } from "react-icons/rx";
import { useMenuPopup } from "../utils/stores/menuPopup";
import { backendURI } from "../utils/secret";
import { Content } from "next/font/google";
import { usePopupStatus } from "../utils/stores/popup";
import { useCrudData } from "../utils/stores/crudData";

const MenuPopup = ({ width }) => {
  const setMenuData = useCrudData((state) => state.updateMenu);
  const menuData = useCrudData((state) => state.menuData);
  // ------------showing success popup after submission
  const updatePopupContent = usePopupStatus(
    (state) => state.updatePopupContent
  );
  const updatePopupStatusForm = usePopupStatus(
    (state) => state.updatePopupStatus
  );
  const updateSuccessMessageIcon = usePopupStatus(
    (state) => state.updateSuccessMessageIcon
  );

  // -----------
  const updatePopup = useMenuPopup((state) => state.updatePopupActive);
  const addMenuState = useMenuPopup((state) => state.addMenuState);
  const menuHeading = useMenuPopup((state) => state.menuHeading);
  //edit id and set edit id
  const id = useMenuPopup((state) => state.editId);
  const setEditId = useMenuPopup((state) => state.updateEditId);

  const [formData, setFormData] = useState({
    name: "",
    link: "",
  });
  const closeMenuPopup = () => {
    setEditId(null);
    updatePopup(false);
  };
  const handleAddMenu = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendURI}/admin/data/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          link: formData.link,
        }),
        credentials: "include",
      });
      console.log(response);

      if (response.ok) {
        // closing the menu after successfull submission
        updatePopup(false);
        // this is for the small popup
        updatePopupStatusForm(true);
        updateSuccessMessageIcon(true);
        const data = await response.json();
        updatePopupContent(data.message);
        console.log(data.data);
        setMenuData(data.data);
        console.log(menuData);
      } else {
        updatePopupStatusForm(true);
        updateSuccessMessageIcon(false);
        updatePopupContent("Error submitting the data.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditMenu = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendURI}/admin/data/menu/edit/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          link: formData.link,
        }),
      });
      console.log(response);
    } catch (err) {}
    console.log("edit menu");
  };
  const handleMenuForm = (e) => {
    setFormData({ ...formData, [`${e.target.name}`]: e.target.value });
  };

  // using useEffect for the get
  useEffect(() => {
    console.log("useEffect called");
    if (!addMenuState) {
      console.log("edit called");
      const fetchIndividualMenu = async () => {
        console.log("fetchIndividualMenu");
        try {
          const response = await fetch(
            `${backendURI}/admin/data//get/menu/${id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setFormData({
              name: data.data.menuName,
              link: data.data.menuLink,
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchIndividualMenu();
    }
  }, [id]);
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
        <ProjectHeading text={menuHeading} />
        <form
          action=""
          onSubmit={addMenuState ? handleAddMenu : handleEditMenu}
        >
          <Input
            placeholderText={"Add Your Menu name"}
            label={"name"}
            inputType="text"
            value={formData.name}
            handleInput={handleMenuForm}
          />
          <Input
            placeholderText={"Add a link to menu"}
            label={"link"}
            inputType="text"
            value={formData.link}
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
