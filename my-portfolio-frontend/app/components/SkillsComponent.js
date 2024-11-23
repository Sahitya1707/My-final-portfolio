import React from "react";
import SkillCard from "./SillCard";
import { SkillsData } from "../utils/skillsData";

const SkillsComponent = () => {
  return (
    <div className="bg-colorNav p-6 w-[70%] mx-auto my-2 rounded-xl grid grid-cols-5 gap-10">
      {SkillsData.map((e, i) => {
        return <SkillCard key={i} name={e.name} image={e.image} />;
      })}
    </div>
  );
};

export default SkillsComponent;
