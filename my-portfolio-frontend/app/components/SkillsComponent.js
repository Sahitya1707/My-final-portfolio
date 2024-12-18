import React from "react";
import SkillCard from "./SillCard";
import { SkillsData } from "../utils/skillsData";

const SkillsComponent = () => {
  return (
    <div
      className="bg-colorNav   w-[80%] xl:w-[70%] mx-auto mg:mt-auto lg:mt-[5rem] my-auto   rounded-xl grid grid-cols-5 shadow-lg shadow-colorText/5"
      id="skillComponent"
    >
      {SkillsData.map((e, i) => {
        return <SkillCard key={i} name={e.name} image={e.image} />;
      })}
    </div>
  );
};

export default SkillsComponent;
