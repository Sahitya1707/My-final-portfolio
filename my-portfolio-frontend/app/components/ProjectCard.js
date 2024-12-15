import React, { useEffect } from "react";
import { ProjectDescription, ProjectHeading } from "./ProjectComponent";
import ButtonTypeOne from "./ButtonTypeOne";
import TechStack from "./TechStack";
import { techStackData } from "../utils/techStackData";
import { useTechStack, usetechStack } from "../utils/stores/techStackStore";

const ProjectCard = ({
  heading,
  description,
  viewSource,
  liveProject,
  techUsed,
}) => {
  const updateTechStackUsed = useTechStack(
    (state) => state.updateTechStackUsed
  );
  useEffect(() => {
    const filterTechStack = techStackData.filter((e, i) => {
      return techUsed.includes(e.name);
    });
    // i am using udateTechStack here to update the tech stack part through zustand
    console.log(filterTechStack);
    updateTechStackUsed(filterTechStack);
  }, []);

  return (
    <div
      className="flex justify-center  gap-x-4 
      h-[100%] relative flex-col "
    >
      <ProjectHeading text={heading} />
      <ProjectDescription text={description} />

      <div className="flex gap-x-6">
        {viewSource && viewSource ? (
          <ButtonTypeOne
            text={"View Source"}
            color={"primary"}
            bgColor={"colorNav"}
            link={"/"}
            target={true}
          />
        ) : null}
        {liveProject && liveProject ? (
          <ButtonTypeOne
            text={"View Live Project"}
            color={"colorText"}
            bgColor={"colorNav"}
            link={"/"}
            target={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
