import React from "react";

export const ProjectHeading = ({ text }) => {
  return (
    <p className="uppercase tracking-widest text-3xl text-center">{text}</p>
  );
};
export const ProjectDescription = ({ text }) => {
  return <p>{text} </p>;
};
