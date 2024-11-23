import Image from "next/image";
import React from "react";
import TechCard from "./TechCard";

const TechStack = ({ image, text, alt }) => {
  return (
    <div>
      <p className="uppercase my-2 text-xl">Tech stack</p>
      <div className="grid gap-4 grid-cols-3">
        <TechCard />
        <TechCard />
        <TechCard />
      </div>
    </div>
  );
};

export default TechStack;
