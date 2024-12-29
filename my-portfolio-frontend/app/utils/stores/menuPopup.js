import { create } from "zustand";

export const useMenuPopup = create((set) => {
  return {
    popupActive: false,
    addMenuState: true,
    menuHeading: "",
    editId: null,

    // this will contain all the data that will be passed as a props
    updatePopupActive: (popupActive) =>
      set((state) => ({
        popupActive: popupActive,
      })),
    // update Add
    updateAddMenuState: (addMenuState) =>
      set((state) => ({
        addMenuState: addMenuState,
      })),
    //update menu heading
    updateMenuHeading: (menuHeading) =>
      set((state) => ({
        menuHeading: menuHeading,
      })),
    //edit id through state
    updateEditId: (editId) =>
      set((state) => ({
        editId: editId,
      })),
  };
});
