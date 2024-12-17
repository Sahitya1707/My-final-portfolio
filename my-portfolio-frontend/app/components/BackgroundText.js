import React from "react";

const BackgroundText = ({ text, style }) => {
  console.log(style);
  return (
    <span
      className="text-colorText/5 text-[15rem] stroke-none font-poppins-500 rotate-[-10deg] "
      style={style}
    >
      {text}
    </span>
  );
};

export default BackgroundText;
