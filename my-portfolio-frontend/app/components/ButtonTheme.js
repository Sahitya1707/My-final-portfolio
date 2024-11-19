import React from "react";

const ButtonTheme = ({ icon, handleTheme }) => {
  return <button onClick={handleTheme}>{icon}</button>;
};

export default ButtonTheme;
