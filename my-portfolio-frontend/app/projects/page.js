"use client";
import React from "react";
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
  return (
    <>
      <HeadingTypeOne text={"My Projects"} />
      <div
        className="w-[90%] max-w-[80rem] h-[70%] my-auto mt-10 border-2 border-primary rounded-xl overflow-y-hidden realtive shadow-colorText/50 shadow-md relative px-10 flex gap-x-5 mx-auto py-4"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div
          className="w-[55%] overflow-y-scroll"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {projectsData.map((e, i) => {
            return (
              <ProjectCard
                key={i}
                heading={e.projectName}
                description={e.projectDescription}
                viewSource={e.source_link}
                liveProject={e.live_link}
                techUsed={projectsData[0].techUsed}
              />
            );
          })}
        </div>
        <div className="w-[50%] sticky top-[40%] flex items-center">
          <TechStack />
        </div>
        <span className="text-xl absolute bottom-3 right-3">
          <FaAnglesDown />
        </span>
      </div>
    </>
  );
};

export default Projects;
