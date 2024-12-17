"use client";
import React, { useEffect, useRef, useState } from "react";
import HeadingTypeOne from "../components/HeadingTypeOne";
import { FaAnglesDown } from "react-icons/fa6";
import Image from "next/image";
import {
  ProjectDescription,
  ProjectHeading,
} from "../components/ProjectComponent";
import TechStack from "../components/TechStack";
import ButtonTypeOne from "../components/ButtonTypeOne";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../utils/projectsData";

const Projects = () => {
  const getParentScroll = (e) => {};

  const projectRef = useRef(null);
  const [techStackIndex, setTechStackIndex] = useState(0);
  useEffect(() => {
    const project = projectRef.current;
    // the projectChild target all the project like youutbeclone
    const projectChild = project.childNodes[0].childNodes;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // if intersecting is true means we will make it visible opacity 1 and also another thing we will do is we will compare the target element of intersecting true and projectChild so that we can get the index which we need to update the tech stack.
            //
            // if there is none intersecting  we will try to use the previous value, if there are two value intersecting maybe we will use the new one.
            const index = Array.from(projectChild).indexOf(entry.target);
            setTechStackIndex(index);

            entry.target.style.opacity = "1";
          } else {
            entry.target.style.opacity = "0.4";
          }
        });
      },
      {
        root: project,
        rootMargin: "0px",
        threshold: 0.55,
      }
    );

    // https://stackoverflow.com/questions/67945846/setting-root-property-in-options-argument-of-intersection-observer-causes-weird
    projectChild.forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <HeadingTypeOne text={"My Projects"} />
      <div
        className="w-[90%] max-w-[80rem] h-[70%] my-auto mt-10 border-2 border-primary rounded-xl overflow-y-scroll realtive shadow-colorText/50 shadow-md relative px-10 flex gap-x-5 mx-auto py-4"
        style={{
          scrollbarWidth: "none",
        }}
        onScroll={getParentScroll}
        id="project"
        ref={projectRef}
      >
        <div
          className="w-[55%] "
          style={
            {
              // scrollbarWidth: "none",
            }
          }
        >
          {projectsData.map((e, i) => {
            return (
              <ProjectCard
                key={i}
                heading={e.projectName}
                description={e.projectDescription}
                viewSource={e.source_link}
                liveProject={e.live_link}
                techUsed={projectsData[techStackIndex].techUsed}
              />
            );
          })}
        </div>
        <div className="w-[50%] px-4 sticky top-[0%] flex items-center">
          <TechStack />
        </div>
        <span className="absolute bottom-10 right-10">
          <span className="text-xl fixed animate-bounce">
            <FaAnglesDown />
          </span>
        </span>
      </div>
    </>
  );
};

export default Projects;
