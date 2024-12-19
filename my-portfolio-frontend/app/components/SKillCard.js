import Image from "next/image";
import React from "react";

const SkillCard = ({ image, name }) => {
  return (
    <div
      className="flex gap-2 flex-col items-center md:p-4 justify-center p-3"
      id="skillCard"
    >
      <div className="xl:h-[4rem] xl:w-[4rem] sm:h-[3rem] sm:w-[3rem] h-[4rem] w-[4rem] relative ">
        <Image src={`/images/tech-stack/${image}.svg`} fill alt={`${image}`} />
      </div>
      <p className="uppercase xl:text-lg sm:text-sm tracking-wider text-center text-lg">
        {name}
      </p>
    </div>
  );
};

export default SkillCard;
