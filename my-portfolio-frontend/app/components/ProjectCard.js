import React, { useEffect, useRef, useState } from "react";
import { ProjectDescription, ProjectHeading } from "./ProjectComponent";
import ButtonTypeOne from "./ButtonTypeOne";
import TechStack from "./TechStack";
import { techStackData } from "../utils/techStackData";
import { useTechStack, usetechStack } from "../utils/stores/techStackStore";
import TechCard from "./TechCard";
import { projectsData } from "../utils/projectsData";

const ProjectCard = ({
  heading,
  description,
  viewSource,
  liveProject,
  techUsed,
  index,
}) => {
  // console.log(techUsed);

  const updateTechStack = useTechStack((state) => state.updateTechStackUsed);

  useEffect(() => {
    const filterTechStack = techStackData.filter((e, i) => {
      return techUsed.includes(e.name);
    });

    // i am using udateTechStack here to update the tech stack part through zustand

    updateTechStack(filterTechStack);
  }, [techUsed]);

  // setting the state for the techstack index
  const [techStackIndexForMobile, setTechStackIndexForMobile] = useState([]);

  useEffect(() => {
    //filtering using index, so that it is displayed in mobile phone
    const filterTechUsingIndex = techStackData.filter((e, i) => {
      return projectsData[index].techUsed.includes(e.name);
    });
    // setting the filterTechsugin index for mobile
    console.log(filterTechUsingIndex);
    setTechStackIndexForMobile(filterTechUsingIndex);
  }, []);

  // setting the data for each mobile tech stack
  const techStackMblData = projectsData[index].techUsed;

  return (
    <div
      className="flex justify-center  gap-x-4 
      h-[100%] relative flex-col opacity-40 sm:mt-6 md:my-0 border-b py-4 md:pb-0 md:border-0 border-textColor/20"
    >
      <ProjectHeading text={heading} />
      <ProjectDescription text={description} />
      <div className="md:hidden grid sm:grid-cols-3 gap-x-3 gap-y-2 grid-cols-2">
        {techStackIndexForMobile.map((e, i) => {
          return <TechCard image={e.name} name={e.tech} key={i} />;
        })}
      </div>

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
