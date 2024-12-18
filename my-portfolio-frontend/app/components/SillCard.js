import Image from "next/image";
import React from "react";

const SkillCard = ({ image, name }) => {
  return (
    <div
      className="flex gap-2 flex-col items-center p-4 justify-center"
      id="skillCard"
    >
      <div className="xl:h-[4rem] xl:w-[4rem] h-[3rem] w-[3rem] relative ">
        <Image src={`/images/tech-stack/${image}.svg`} fill alt={`${image}`} />
      </div>
      <p className="uppercase xl:text-lg text-sm tracking-wider text-center">
        {name}
      </p>
    </div>
  );
};

export default SkillCard;
