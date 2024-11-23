import React from "react";
import HeadingTypeOne from "../components/HeadingTypeOne";
import SkillsComponent from "../components/SkillsComponent";

const Skills = () => {
  return (
    <>
      <HeadingTypeOne text={"My Skills"} />
      <div className="flex items-center h-[100%]">
        <SkillsComponent />
      </div>
    </>
  );
};

export default Skills;
