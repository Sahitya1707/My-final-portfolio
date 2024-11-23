import Image from "next/image";
import React from "react";

const SkillCard = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center p-2 justify-center">
      <div className="h-[5rem] w-[5rem] relative ">
        <Image src={`/images/tech-stack/${image}.svg`} fill alt={`${image}`} />
      </div>
      <p className="uppercase text-xl tracking-wider text-center">{name}</p>
    </div>
  );
};

export default SkillCard;
