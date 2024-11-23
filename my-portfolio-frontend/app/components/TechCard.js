import Image from "next/image";
import React from "react";

const TechCard = () => {
  return (
    <div className="flex items-center gap-x-3 bg-colorText p-2 rounded-xl text-colorBody h-[3rem]">
      <div className="relative w-[35px] h-[35px]">
        <Image
          src="/images/tech-stack/reactjs.svg"
          // height={50}

          // width={50}
          layout="fill"
          alt="react-icon"
        />
      </div>
      <span className="uppercase">React Js</span>
    </div>
  );
};

export default TechCard;
