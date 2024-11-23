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
    console.log(filterTechStack);
    updateTechStackUsed(filterTechStack);
  }, []);

  return (
    <div
      className="flex justify-evenly gap-x-4 
     gap-y-[5rem] h-[70%] relative"
    >
      <div className=" ">
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
    </div>
  );
};

export default ProjectCard;
