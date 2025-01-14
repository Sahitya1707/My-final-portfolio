import { useEffect, useState } from "react";

const useCustomCursor = () => {
  console.log("usecustom cursor");
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);
  console.log(mousePosition);
  return mousePosition;
  // const handleMouseDown = () => {
  //   document.body.classList.add("primary-cursor");
  // };

  // const handleMouseUp = () => {
  //   document.body.classList.remove("primary-cursor");
  // };

  // document.addEventListener("mousedown", handleMouseDown);
  // document.addEventListener("mouseup", handleMouseUp);

  // Cleanup event listeners on component unmount
  // return () => {
  //   // document.removeEventListener("mousedown", handleMouseDown);
  //   // document.removeEventListener("mouseup", handleMouseUp);
  // };
};

export default useCustomCursor;
