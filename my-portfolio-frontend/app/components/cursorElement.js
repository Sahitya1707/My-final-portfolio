import { useCursorPosition } from "../utils/stores/cursorPosition";

export const Dot = () => {
  const mousePositionX = useCursorPosition((state) => state.x);
  const mousePositionY = useCursorPosition((state) => state.y);
  const isClicked = useCursorPosition((state) => state.isClicked);
  const isMoving = useCursorPosition((state) => state.isMoving);

  return (
    <span
      className={`h-2 w-2  bg-primary pointer-events-none fixed z-[5000]  ease-linear duration-150 rounded-full top-[-100%] right-[100%] hidden sm:block ${
        isClicked ? "bg-[red]" : null
      }`}
      style={{
        // opacity: `${isMoving ? 1 : 0}`,
        backgroundColor: `${isClicked ? "red" : ""}`,
        transformOrigin: `100% 100%`,
        transform: `translate(-50%, -50%)`,
        top: `${mousePositionY}px`,
        left: `${mousePositionX}px`,
      }}
    ></span>
  );
};

export const Circle = () => {
  const isMoving = useCursorPosition((state) => state.isMoving);

  const mousePositionX = useCursorPosition((state) => state.x);
  const mousePositionY = useCursorPosition((state) => state.y);
  return (
    <span
      className="w-8 h-8 border-2 border-colorText pointer-events-none fixed rounded-full  z-[5000] top-[-100%] right-[100%] hidden sm:block"
      style={{
        // opacity: `${isMoving ? 1 : 0}`,
        transformOrigin: `100% 100%`,
        transform: `translate(-50%, -50%)`,
        top: `${mousePositionY}px`,
        left: `${mousePositionX}px`,
      }}
    ></span>
  );
};
