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
// import { projectsData } from "../utils/projectsData";
import { useCrudData } from "../utils/stores/crudData";
import { backendURI } from "../utils/secret";
import Shimmer from "../components/Shimmer";

const Projects = () => {
  const [currenScrollBarPosition, setCurrenScrollBarPosition] = useState(false);
  const getParentScroll = (e) => {
    // getting the total scrollheight
    const scrollableHeight = e.target.scrollHeight - e.target.clientHeight;
    // current scrollbar postion
    const scrollbarPosition = e.target.scrollTop;
    // console.log(scrollbarPosition);
    if (scrollbarPosition >= scrollableHeight / 2) {
      // if the position is more then half
      setCurrenScrollBarPosition(true);
    } else {
      // if the positionis less than half
      setCurrenScrollBarPosition(false);
    }
  };

  const projectRef = useRef(null);
  const project = projectRef.current;
  const [techStackIndex, setTechStackIndex] = useState(0);
  // setting the project data
  const setProjectData = useCrudData((store) => store.updateProject);
  // this contains all the project data
  const projectData = useCrudData((store) => store.project);
  // at first the child node list is 0 as it will be empty until data is fetched so setting it false at beginning and setting it to true when data is loaded, so that we could use intersection observer.
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    // getting the project data
    const fetchData = async () => {
      const response = await fetch(`${backendURI}/admin/data/project/getAll`, {
        credentials: "include",
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        setProjectData(data.data);
        setDataFetched(true);
      }
    };
    fetchData();
  }, []);
  // useEffect for intersection observer which will run after data is fetched.
  useEffect(() => {
    // the projectChild target all the project like youutbeclone
    // const projectChild = project.childNodes[0].childNodes;
    if (project && dataFetched) {
      // console.log(project);
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
          threshold: 0.5,
        }
      );

      // https://stackoverflow.com/questions/67945846/setting-root-property-in-options-argument-of-intersection-observer-causes-weird
      projectChild.forEach((child) => {
        observer.observe(child);
      });
      // console.log(project);

      return () => observer.disconnect();
    } else {
      console.log("outside else statement");
    }
  }, [dataFetched]);

  return (
    <>
      <HeadingTypeOne text={"My Projects"} />
      <div
        className="md:w-[90%] max-w-[80rem] h-[70%] lg:h-[80%] my-auto mt-2 lg:mt-10 md:border-2 md:border-primary rounded-xl overflow-y-scroll realtive shadow-colorText/50 md:shadow-md relative px-4 md:flex gap-x-5 mx-auto md:py-4   border-b border-colorNav/80 pb-8"
        style={{
          scrollbarWidth: "none",
        }}
        onScroll={getParentScroll}
        id="project"
        ref={projectRef}
      >
        <div
          className="md:w-[55%] "
          style={
            {
              // scrollbarWidth: "none",
            }
          }
        >
          {projectData &&
            projectData.map((e, i) => {
              return (
                <ProjectCard
                  key={e._id}
                  heading={e.heading}
                  description={e.description}
                  viewSource={e.projectLink}
                  liveProject={e.liveLink}
                  techUsed={projectData[techStackIndex].techName}
                  index={i}
                />
              );
            })}
        </div>
        <div className="w-[50%] px-4 sticky top-[0%]  items-center hidden md:flex">
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
