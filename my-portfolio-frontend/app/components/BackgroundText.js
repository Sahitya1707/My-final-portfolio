import React from "react";

const BackgroundText = ({ text, style }) => {
  console.log(style);
  return (
    <span
      className="text-colorText/5  text-[10rem] lg:text-[15rem] stroke-none font-poppins-500 rotate-[-10deg] md:opacity-80  opacity-20 md:static fixed"
      style={style}
    >
      {text}
    </span>
  );
};

export default BackgroundText;
