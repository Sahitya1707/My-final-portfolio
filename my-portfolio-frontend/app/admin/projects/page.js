"use client";
import ButtonTypeOne from "@/app/components/ButtonTypeOne";
import DashboardSecondHeading from "@/app/components/DashboardSecondHeading";
import { Input, TextArea } from "@/app/components/Form";
import FormPopup from "@/app/components/FormPopup";
import HeadingTypeOne from "@/app/components/HeadingTypeOne";
import { ProjectHeading } from "@/app/components/ProjectComponent";

const Projects = () => {
  return (
    <div>
      <ProjectHeading text={"Projects"} /> <FormPopup />
    </div>
  );
};

export default Projects;
