import React, { useState } from "react";
import { colorMapping } from "../utils/Colors";
import Link from "next/link";

const ButtonTypeOne = ({
  color,
  bgColor,
  text,
  link,
  target,
  handleClick,
  btnType,
}) => {
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
    <>
      {link ? (
        <Link href={link} target={target ? "_blank" : "_self"}>
          <button
            style={buttonStyle}
            className="lg:px-3 px-2 py-2 mt-4 rounded-md lg:rounded-lg text-sm lg:text-md capitalize hover:ease-in duration-75"
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
      ) : (
        <button
          style={buttonStyle}
          className="lg:px-3 px-2 py-2 mt-4 rounded-md lg:rounded-lg text-sm lg:text-md capitalize hover:ease-in duration-75"
          type={btnType ? btnType : ""}
          onMouseEnter={() => {
            setButtonStyle(hoverStyle);
          }}
          onMouseLeave={() => {
            setButtonStyle(initialStyle);
          }}
          onClick={handleClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default ButtonTypeOne;
