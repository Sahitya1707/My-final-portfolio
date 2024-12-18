import React, { useEffect, useRef } from "react";
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
  console.log(index);
  const updateTechStack = useTechStack((state) => state.updateTechStackUsed);

  // using intersectino obeserver
  const ref = useRef(null);

  useEffect(() => {
    const filterTechStack = techStackData.filter((e, i) => {
      return techUsed.includes(e.name);
    });
    // i am using udateTechStack here to update the tech stack part through zustand

    updateTechStack(filterTechStack);
  }, [techUsed]);
  const options = {
    rootMargin: "0px",
    threshold: 0.65,
  };
  const observerCallback = (entries) => {
    const [entry] = entries;

    // console.log(entry.isIntersecting);
    // console.log(entries);
  };
  // using another useeffect for the intersection obeserver api
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(ref.current);
  });

  // setting the data for each mobile tech stack
  const techStackMblData = projectsData[index].techUsed;
  console.log(techStackData);

  return (
    <div
      className="flex justify-center  gap-x-4 
      h-[100%] relative flex-col opacity-40 mt-6 md:my-0 border-b pb-4 md:pb-0 md:border-0 border-textColor/20"
      ref={ref}
    >
      <ProjectHeading text={heading} />
      <ProjectDescription text={description} />
      <div className="md:hidden block">
        <TechCard
          image={projectsData[index].techUsed}
          name={projectsData[index].techUsed}
        />
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
