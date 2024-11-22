import React from "react";

const TechStack = ({ image, text }) => {
  return (
    <>
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
    </>
  );
};

export default TechStack;
