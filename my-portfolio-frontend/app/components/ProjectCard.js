import React, { useEffect, useRef, useState } from "react";
import { ProjectDescription, ProjectHeading } from "./ProjectComponent";
import ButtonTypeOne from "./ButtonTypeOne";
import TechStack from "./TechStack";
import { techStackData } from "../utils/techStackData";
import { useTechStack, usetechStack } from "../utils/stores/techStackStore";
import TechCard, { TechCard2 } from "./TechCard";
import { useCrudData } from "../utils/stores/crudData";
// import { projectsData } from "../utils/projectsData";

const ProjectCard = ({
  heading,
  description,
  viewSource,
  liveProject,
  techUsed,
  index,
}) => {
  console.log(liveProject, viewSource);

  const updateTechStack = useTechStack((state) => state.updateTechStackUsed);

  useEffect(() => {
    // i am using udateTechStack here to update the tech stack part through zustand
    updateTechStack(techUsed);
  }, [techUsed]);

  // setting the state for the techstack index
  // const [techStackIndexForMobile, setTechStackIndexForMobile] = useState([]);

  // useEffect(() => {
  //   console.log("mbl device use");
  //   //filtering using index, so that it is displayed in mobile phone
  //   // const filterTechUsingIndex = techStackData.filter((e, i) => {
  //   //   return projectsData[index].techUsed.includes(e.name);
  //   // });
  //   // console.log(filterTechUsingIndex);
  //   // setting the filterTechsugin index for mobile
  //   // console.log(filterTechUsingIndex);
  //   // setTechStackIndexForMobile(filterTechUsingIndex);
  // }, []);

  // this contains all the project data
  const projectData = useCrudData((store) => store.project);

  return (
    <div
      className="flex justify-center  gap-x-4 
      h-[100%] relative flex-col opacity-40 sm:mt-6 lg:my-0 border-b py-4 lg:pb-0 lg:border-0 border-textColor/20"
    >
      <ProjectHeading text={heading} />
      <ProjectDescription text={description} />
      <div className="lg:hidden grid sm:grid-cols-3 gap-x-3 gap-y-2 grid-cols-2">
        {projectData[index].techName.map((e, i) => {
          return <TechCard imageName={e} key={i} />;
        })}
      </div>

      <div className="flex gap-x-6">
        {viewSource && viewSource ? (
          <ButtonTypeOne
            text={"View Source"}
            color={"primary"}
            bgColor={"colorNav"}
            link={viewSource}
            target={true}
          />
        ) : null}
        {liveProject && liveProject ? (
          <ButtonTypeOne
            text={"View Live Project"}
            color={"colorText"}
            bgColor={"colorNav"}
            link={liveProject}
            target={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
