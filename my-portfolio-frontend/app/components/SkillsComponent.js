import React from "react";
import SkillCard from "./SKillCard";
import { SkillsData } from "../utils/skillsData";

const SkillsComponent = () => {
  return (
    <div
      className="bg-colorNav w-[90%]   md:w-[80%] xl:w-[70%] mx-auto mg:mt-auto lg:mt-[5rem] sm:my-auto   rounded-xl grid md:grid-cols-5 shadow-lg shadow-colorText/5 sm:grid-cols-3 grid-cols-1 py-3 my-6"
      id="skillComponent"
    >
      {SkillsData.map((e, i) => {
        return <SkillCard key={i} name={e.name} image={e.image} />;
      })}
    </div>
  );
};

export default SkillsComponent;
