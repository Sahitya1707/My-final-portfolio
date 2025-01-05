import { create } from "zustand";

export const useCrudData = create((set) => {
  return {
    menu: "",
    refreshMenu: "true",
    pages: "",
    project: "",
    tech: "",
    projectFormPopup: false,
    updateMenu: (menu) => set(() => ({ menu: menu })),
    updateTech: (tech) => set(() => ({ tech: tech })),
    updateProjectFormPopup: (projectFormPopup) =>
      set(() => ({ projectFormPopup: projectFormPopup })),
  };
});
