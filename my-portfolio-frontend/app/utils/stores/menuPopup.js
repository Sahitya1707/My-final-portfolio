import { create } from "zustand";

export const useMenuPopup = create((set) => {
  return {
    popupActive: false,
    // this will contain all the data that will be passed as a props
    updatePopupActive: (popupActive) =>
      set((state) => ({
        popupActive: popupActive,
      })),
  };
});
