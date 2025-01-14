import { useEffect, useState } from "react";
import { useCursorPosition } from "../utils/stores/cursorPosition";

const useCustomCursor = () => {
  const mousePositionX = useCursorPosition((state) => state.x);
  const mousePositionY = useCursorPosition((state) => state.y);
  const setMousePositionX = useCursorPosition((state) => state.setX);
  const setMousePositionY = useCursorPosition((state) => state.setY);
  // detecting if the mouse is moving or not
  const isMoving = useCursorPosition((state) => state.isMoving);

  const setIsMoving = useCursorPosition((state) => state.setIsMoving);
  // detecting the clicked
  const isClicked = useCursorPosition((state) => state.isClicked);
  const setIsClicked = useCursorPosition((state) => state.setIsClicked);

  // using the timeout
  const [timeoutId, setTimeoutId] = useState(null);
  // using time out for the click
  const [timoutIdClick, setTimeoutIdClick] = useState(null);

  // using useEffect in order to detect the current position
  useEffect(() => {
    const mouseMoveHandler = (event) => {
      // console.log(event);
      const { clientX, clientY } = event;
      // setMousePosition({ x: clientX, y: clientY });

      setMousePositionY(clientY);
      setMousePositionX(clientX);

      // Clear any existing timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // whenever this function runs it means mouse is moving, so setting it to true instanly when mouse mouve
      setIsMoving(true);

      // Set a new timer to detect when the mouse stops moving
      const newTimeoutId = setTimeout(() => {
        setIsMoving(false); // Mouse has stopped moving
      }, 10000);

      setTimeoutId(newTimeoutId);
    };

    // handling click
    const handleClickHandler = (event) => {
      if (timoutIdClick) {
        clearTimeout(setTimeoutIdClick);
      }
      if (event) {
        setIsClicked(true);
      }
      const newTimeoutIdClick = setTimeout(() => {
        setIsClicked(false);
      }, 100);
      setTimeoutIdClick(newTimeoutIdClick);
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("click", handleClickHandler);

    return () => {
      // Cleanup logic (runs when the component unmounts or before the effect re-runs)
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("click", handleClickHandler);
      // clear the timout here, if you got any timeoutid
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (timoutIdClick) {
        clearTimeout(timoutIdClick);
      }
    };
  }, []);
  // console.log(mousePositionX, mousePositionY);
  // return mousePosition;
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
