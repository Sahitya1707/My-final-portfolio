import React, { useEffect, useRef } from "react";
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

  return (
    <div
      className="flex justify-center  gap-x-4 
      h-[100%] relative flex-col opacity-40"
      ref={ref}
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
