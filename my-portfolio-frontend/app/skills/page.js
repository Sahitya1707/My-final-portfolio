import React from "react";
import HeadingTypeOne from "../components/HeadingTypeOne";
import SkillsComponent from "../components/SkillsComponent";

const Skills = () => {
  return (
    <>
      <HeadingTypeOne text={"My Skills"} />
      <div className="flex lg:items-start items-center min-h-[inherit] lg:h-[60%] h-[60%]">
        <SkillsComponent />
      </div>
    </>
  );
};

export default Skills;
