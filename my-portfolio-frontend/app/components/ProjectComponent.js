import React from "react";

export const ProjectHeading = ({ text }) => {
  return (
    <p
      className="uppercase tracking-widest text-2xl text-colorBody"
      style={{
        WebkitTextStroke: "1px rgb(var(--color-text))",
        textShadow: " 2px 2px 10px rgb(var(--primary-clr))",
      }}
    >
      {text}
    </p>
  );
};
export const ProjectDescription = ({ text }) => {
  return <p className="text-[0.7rem] lg:text-sm">{text} </p>;
};
