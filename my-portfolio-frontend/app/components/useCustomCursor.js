import { useEffect } from "react";

const useCustomCursor = () => {
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add("primary-cursor");
    };

    const handleMouseUp = () => {
      document.body.classList.remove("primary-cursor");
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
};

export default useCustomCursor;
