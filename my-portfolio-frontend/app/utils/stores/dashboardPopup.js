import { create } from "zustand";

export const useDashboardPopup = create((set) => {
  return {
    popupActive: false,
    popContent: {}, // this will contain all the data that will be passed as a props
    updatePopupActive: (popupActive) =>
      set((state) => ({
        popupActive: popupActive,
      })),
  };
});
