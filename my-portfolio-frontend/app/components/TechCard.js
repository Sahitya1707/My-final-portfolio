import Image from "next/image";
import React, { useEffect } from "react";
import { backendURI } from "../utils/secret";

const TechCard = ({ imageName }) => {
  // use of useEffect

  return (
    <div className="flex items-center gap-x-3 bg-colorText p-2  rounded-md lg:rounded-xl text-colorBody h-[2rem] sm:h-[3rem] md:mt-0 mt-2 ">
      <div className="relative lg:w-[35px] lg:h-[35px] sm:w-[30px] sm:h-[30px] h-[20px] w-[20px]">
        <Image
          src={`${backendURI}/admin/images/${imageName}`}
          // height={50}

          // width={50}
          fill
          alt={`${imageName.slice(0, -4)}- icon`}
        />
      </div>
      <span className="uppercase text-[0.7rem] xl:text-sm">
        {imageName.slice(0, -4)}
      </span>
    </div>
  );
};

// copy of techCard
export const TechCard2 = ({ image, name }) => {
  return (
    <div className="flex items-center gap-x-3 bg-colorText p-2 rounded-md lg:rounded-xl text-colorBody h-[3rem] md:mt-0 mt-2">
      <div className="relative lg:w-[35px] lg:h-[35px] w-[30px] h-[30px]">
        <Image
          src={`/images/tech-stack/html.svg`}
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
