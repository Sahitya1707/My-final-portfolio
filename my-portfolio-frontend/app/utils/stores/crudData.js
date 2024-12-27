import { create } from "zustand";

export const useCrudData = create((set) => {
  return {
    menu: "",
    refreshMenu: "true",
    pages: "",
    projects: "",
    techStack: "",
    updateMenu: (menu) => set(() => ({ menu: menu })),
  };
});
