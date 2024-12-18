"use client";
import React, { useEffect, useRef, useState } from "react";
import HeadingTypeOne from "../components/HeadingTypeOne";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
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
  const [currenScrollBarPosition, setCurrenScrollBarPosition] = useState(false);
  const getParentScroll = (e) => {
    // getting the total scrollheight
    const scrollableHeight = e.target.scrollHeight - e.target.clientHeight;
    // current scrollbar postion
    const scrollbarPosition = e.target.scrollTop;
    // console.log(scrollbarPosition);
    if (scrollbarPosition >= scrollableHeight / 2) {
      console.log("equal");
      // if the position is more then half
      setCurrenScrollBarPosition(true);
    } else {
      // if the positionis less than half
      setCurrenScrollBarPosition(false);
    }
  };

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
            // making opacity one when it is in screen
            entry.target.style.opacity = "1";
          } else {
            // making it low when it is not in screen
            entry.target.style.opacity = "0.4";
          }
        });
      },
      {
        root: project,
        // An offset margin applied to the root's bounding box, affecting when the observer's callback is triggered.
        rootMargin: "0px",
        // a value that determines when the callback function is triggered
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
        className="w-[90%] max-w-[80rem] h-[70%] lg:h-[90%] my-auto mt-10 border-2 border-primary rounded-xl overflow-y-scroll realtive shadow-colorText/50 shadow-md relative px-10 flex gap-x-5 mx-auto py-4"
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

        <span className="absolute bottom-10 right-10 lg:block hidden">
          <span className="text-xl fixed animate-bounce rotate-[180] ">
            {currenScrollBarPosition ? <FaAnglesUp /> : <FaAnglesDown />}
          </span>
        </span>
      </div>
    </>
  );
};

export default Projects;
