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
  const getParentScroll = (e) => {
    // console.log(e);
    // console.log(e);
    // console.log(e.target.childNodes[0].clientHeight);
    // console.log(e.target.childNodes[0].childNodes[0].clientHeight);
    // const rect = e.target.childNodes[0].childNodes[0].getBoundingClientRect();
    // console.log(rect.top);
    const container = e.target;
    // console.log(container.scrollTop);
    // console.log(container.scrollHeight);
    let containerRect = container.getBoundingClientRect();
    // console.log(containerRect.top);
    // console.log(container.clientHeight);
    // console.log("container");
    // console.log(containerRect.top);

    // console.log(container.scrollTop);
    // console.log(containerRect);
    // console.log(containerRect.top, containerRect.y);
    // suppose the child element is 1 (considering second item just for now)
    const child = container.childNodes[0].childNodes[0];
    const child1 = container.childNodes[0].childNodes[1];
    const child2 = container.childNodes[0].childNodes[2];
    // console.log(child.clientHeight);
    // console.log("child");
    let childRect = child.getBoundingClientRect();
    let childRect1 = child1.getBoundingClientRect();
    // let childRect2 = child2.getBoundingClientRect();
    // console.log(childRect.top, childRect1.top, childRect2.top);
    // console.log(childRect1.top, containerRect.top);
    // console.log("-----------------");
    // console.log(childRect1.bottom, containerRect.bottom);
    if (
      childRect1.top > containerRect.top + 100 &&
      childRect1.bottom < containerRect.bottom + 100
    ) {
      // console.log(true);
    }
    // console.log(child);
    // console.log("child");
    // console.log(childRect.top, childRect.y);
  };
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
                techUsed={projectsData[0].techUsed}
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
