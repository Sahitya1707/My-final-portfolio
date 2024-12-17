import Image from "next/image";
import React from "react";
import TechCard from "./TechCard";
import { useTechStack } from "../utils/stores/techStackStore";

const TechStack = ({ image, text, alt }) => {
  // reading the tech stack which is being updated in projectCard.js
  const techStackUsed = useTechStack((state) => state.techStackUsed);

  return (
    <div>
      <p className="uppercase my-2 text-2xl">Tech stack</p>
      <div className="grid gap-4 grid-cols-3">
        {techStackUsed &&
          techStackUsed.map((e, i) => {
            return <TechCard image={e.name} name={e.tech} key={i} />;
          })}
      </div>
    </div>
  );
};

export default TechStack;
