import Image from "next/image";
import React from "react";

const TechCard = ({ image, name }) => {
  return (
    <div className="flex items-center gap-x-3 bg-colorText p-2 rounded-md lg:rounded-xl text-colorBody h-[3rem] md:mt-0 mt-2">
      <div className="relative lg:w-[35px] lg:h-[35px] w-[30px] h-[30px]">
        <Image
          src={`/images/tech-stack/${image}.svg`}
          // height={50}

          // width={50}
          fill
          alt={`${name}- icon`}
        />
      </div>
      <span className="uppercase text-[0.7rem] xl:text-sm">{name}</span>
    </div>
  );
};

export default TechCard;
