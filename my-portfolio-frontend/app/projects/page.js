import React from "react";
import HeadingTypeOne from "../components/HeadingTypeOne";
import { FaAnglesDown } from "react-icons/fa6";
import Image from "next/image";
import {
  ProjectDescription,
  ProjectHeading,
} from "../components/ProjectComponent";

const Projects = () => {
  return (
    <>
      <HeadingTypeOne text={"My Projects"} />
      <div
        className="w-[90%] mx-auto max-w-[80rem] h-[90%] my-auto mt-6 border-2 border-primary rounded-xl overflow-y-scroll realtive shadow-colorText/50 shadow-md relative p-6"
        style={
          {
            // scrollbarWidth: "none",
          }
        }
      >
        <div className="flex justify-evenly gap-x-4 items-center h-[100%]">
          <div className="w-[40%] ">
            <ProjectHeading text={"Youtube Clone"} />
            <ProjectDescription
              text={`  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolore corrupti quidem accusantium, corporis reiciendis magnam
              tenetur itaque fugit omnis vero obcaecati architecto assumenda
              quos pariatur.`}
            />

            <div className="flex">
              <button>View Source</button>
              <button>View Live Project</button>{" "}
            </div>
          </div>
          <div className="w-[40%] flex flex-wrap gap-x-2">
            <div className="flex items-center gap-x-3 bg-colorText p-2 rounded text-colorBody h-[3rem]">
              <div className="relative w-[35px] h-[35px]">
                <Image
                  src="/images/tech-stack/reactjs.svg"
                  // height={50}

                  // width={50}
                  layout="fill"
                  alt="react-icon"
                />
              </div>
              <span className="uppercase">React Js</span>
            </div>
            <div className="flex items-center gap-x-5 bg-colorText p-2 rounded text-colorBody h-[3rem]">
              <div className="relative w-[35px] h-[35px]">
                <Image
                  src="/images/tech-stack/reactjs.svg"
                  // height={50}

                  // width={50}
                  layout="fill"
                  alt="react-icon"
                />
              </div>
              <span className="uppercase">React Js</span>
            </div>
          </div>
        </div>
        <span className="text-xl absolute bottom-3 right-3">
          <FaAnglesDown />
        </span>
      </div>
    </>
  );
};

export default Projects;
