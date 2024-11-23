import React, { useState } from "react";
import { colorMapping } from "../utils/Colors";
import Link from "next/link";

const ButtonTypeOne = ({ color, bgColor, text, link }) => {
  // since I was not able to chang ethe color dynamically thorugh tailwind , i have made the varibale of all the css color in the Color asset so I will be using that.
  const initialStyle = {
    color: `${colorMapping[color]}`,
    border: `1px solid ${colorMapping[color]}`,
    backgroundColor: `${colorMapping[bgColor]}`,
  };
  const hoverStyle = {
    color: `${colorMapping[bgColor]}`,
    border: `1px solid ${colorMapping[bgColor]}`,
    backgroundColor: `${colorMapping[color]}`,
  };

  const [buttonStyle, setButtonStyle] = useState(initialStyle);

  return (
    <Link href={link}>
      <button
        style={buttonStyle}
        className="px-3 py-2 mt-2 rounded-lg text-lg capitalize hover:ease-in duration-75"
        onMouseEnter={() => {
          setButtonStyle(hoverStyle);
        }}
        onMouseLeave={() => {
          setButtonStyle(initialStyle);
        }}
      >
        {text}
      </button>
    </Link>
  );
};

export default ButtonTypeOne;
