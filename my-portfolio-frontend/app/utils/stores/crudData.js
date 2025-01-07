import { create } from "zustand";

// here menu, project, page, tech are data.
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
    updateProject: (project) => set(() => ({ project: project })),
  };
});
