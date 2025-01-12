import { create } from "zustand";

// here menu, project, page, tech are data.
export const useCrudData = create((set) => {
  return {
    menu: "",
    refreshMenu: "",
    pages: "",
    project: "",
    tech: "",
    projectFormPopup: false,
    skills: "",
    updateMenu: (menu) => set(() => ({ menu: menu })),
    updateTech: (tech) => set(() => ({ tech: tech })),
    updateProjectFormPopup: (projectFormPopup) =>
      set(() => ({ projectFormPopup: projectFormPopup })),
    updateProject: (project) => set(() => ({ project: project })),
    // this will set if the project form is edit or add, if it is true then it is add if not it is edit
    projectFormState: true,
    updateProjectFormState: (projectFormState) =>
      set(() => ({ projectFormState: projectFormState })),
    updateSkills: (skills) => set(() => ({ skills })),
  };
});
