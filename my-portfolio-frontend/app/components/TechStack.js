import Image from "next/image";
import React from "react";
import TechCard from "./TechCard";
import { useTechStack } from "../utils/stores/techStackStore";

const TechStack = ({ image, text, alt, mblVersionTechIndex }) => {
  // console.log(mblVersionTechIndex);
  // reading the tech stack which is being updated in projectCard.js
  const techStackUsed = useTechStack((state) => state.techStackUsed);
  console.log(techStackUsed);

  return (
    <div>
      <p className="uppercase mb-2 text-xl md:block hidden">Tech stack Used</p>
      <div className=" gap-2 xl:grid-cols-3 grid-cols-2 hidden md:grid">
        {techStackUsed &&
          techStackUsed.map((e, i) => {
            return <TechCard image={e.name} name={e.tech} key={i} />;
          })}
      </div>
      <div>
        {/* <div className=" gap-2 xl:grid-cols-3 grid-cols-2 hidden md:grid">
           <TechCard image={e.name} name={e.tech} key={i} />;
           
        </div> */}
      </div>
    </div>
  );
};

export default TechStack;
