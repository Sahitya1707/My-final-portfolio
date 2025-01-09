import React from "react";

const CrudBtn = ({ text, bgColor, color, handleButton }) => {
  return (
    <button
      className="px-4  py-2 rounded-md text-lg"
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      onClick={handleButton}
    >
      {text}{" "}
    </button>
  );
};

export default CrudBtn;
