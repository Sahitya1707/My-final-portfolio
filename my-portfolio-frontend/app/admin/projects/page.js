"use client";
import ButtonTypeOne from "@/app/components/ButtonTypeOne";
import DashboardSecondHeading from "@/app/components/DashboardSecondHeading";
import { Input, TextArea } from "@/app/components/Form";
import FormPopup from "@/app/components/ProjectForm";
import HeadingTypeOne from "@/app/components/HeadingTypeOne";
import { ProjectHeading } from "@/app/components/ProjectComponent";
import { useCrudData } from "@/app/utils/stores/crudData";
import ProjectForm from "@/app/components/ProjectForm";
import AdminProjectList from "@/app/components/AdminProjectList";

const Projects = () => {
  const formPopup = useCrudData((state) => state.projectFormPopup);
  console.log(formPopup);
  const setProjectFormPopup = useCrudData(
    (state) => state.updateProjectFormPopup
  );

  const handleProjectFormPopup = () => {
    setProjectFormPopup(true);
  };
  return (
    <div>
      <ProjectHeading text={"Projects"} />
      <ButtonTypeOne
        color={"primary"}
        bgColor={"colorNav"}
        text={"Add project"}
        handleClick={handleProjectFormPopup}
      />
      {formPopup ? <ProjectForm /> : null}
      <AdminProjectList />
    </div>
  );
};

export default Projects;
