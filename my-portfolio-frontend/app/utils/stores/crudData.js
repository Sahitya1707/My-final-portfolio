import { create } from "zustand";

export const useCrudData = create((set) => {
  return {
    menu: "",
    refreshMenu: "true",
    pages: "",
    projects: "",
    tech: "",
    updateMenu: (menu) => set(() => ({ menu: menu })),
    updateTech: (tech) => set(() => ({ tech: tech })),
  };
});
