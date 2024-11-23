import React from "react";
import { ProjectDescription, ProjectHeading } from "./ProjectComponent";
import ButtonTypeOne from "./ButtonTypeOne";
import TechStack from "./TechStack";

const ProjectCard = ({
  heading,
  description,
  viewSource,
  liveProject,
  techUsed,
}) => {
  return (
    <div
      className="flex justify-evenly gap-x-4 
     gap-y-[5rem] h-[50%]"
    >
      <div className=" ">
        <ProjectHeading text={"Youtube Clone"} />
        <ProjectDescription
          text={`  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolore corrupti quidem accusantium, corporis reiciendis magnam
              tenetur itaque fugit omnis vero obcaecati architecto assumenda
              quos pariatur.`}
        />

        <div className="flex gap-x-6">
          <ButtonTypeOne
            text={"View Source"}
            color={"primary"}
            bgColor={"colorNav"}
            link={"/"}
          />
          <ButtonTypeOne
            text={"View Live Project"}
            color={"colorText"}
            bgColor={"colorNav"}
            link={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
