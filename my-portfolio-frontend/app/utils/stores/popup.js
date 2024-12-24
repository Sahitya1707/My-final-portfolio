import { create } from "zustand";

export const usePopupStatus = create((set) => {
  return {
    popupStatus: false,
    popupContent: "",
    successMessageIcon: true,
    updatePopupStatus: (popupStatus) => {
      set(() => ({
        popupStatus: popupStatus,
      }));
    },
    updatePopupContent: (popupContent) => {
      set(() => ({
        popupContent: popupContent,
      }));
    },
    updateSuccessMessageIcon: (successMessageIcon) => {
      set(() => ({
        successMessageIcon: successMessageIcon,
      }));
    },
  };
});
