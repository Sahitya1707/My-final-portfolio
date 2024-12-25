import { create } from "zustand";

export const usePopupStatus = create((set) => {
  return {
    popupStatus: false,
    popupContent: "",
    successMessageIcon: true,
    updatePopupStatus: (popupStatus) => {
      set((state) => ({
        popupStatus: popupStatus,
      }));
    },
    updatePopupContent: (popupContent) => {
      set((state) => ({
        popupContent: popupContent,
      }));
    },
    updateSuccessMessageIcon: (successMessageIcon) => {
      set((state) => ({
        successMessageIcon: successMessageIcon,
      }));
    },
  };
});
