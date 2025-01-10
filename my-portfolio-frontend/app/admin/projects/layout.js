"use client";

import ProjectForm from "@/app/components/ProjectForm";
import { useCrudData } from "@/app/utils/stores/crudData";

const ProjectLayout = ({ children }) => {
  const formPopup = useCrudData((state) => state.projectFormPopup);
  return (
    <>
      {children}
      {formPopup ? <ProjectForm /> : null}
    </>
  );
};
export default ProjectLayout;
