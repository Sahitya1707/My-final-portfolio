import Image from "next/image";
import React from "react";

const SkillCard = ({ image, name }) => {
  return (
    <div
      className="flex gap-2 flex-col items-center p-4 justify-center"
      id="skillCard"
    >
      <div className="h-[4rem] w-[4rem] relative ">
        <Image src={`/images/tech-stack/${image}.svg`} fill alt={`${image}`} />
      </div>
      <p className="uppercase text-lg tracking-wider text-center">{name}</p>
    </div>
  );
};

export default SkillCard;
