import { create } from "zustand";

export const useCursorPosition = create((set) => {
  return {
    x: "",
    y: "",
    isMoving: false,
    isClicked: false,
    setX: (x) => set(() => ({ x })),
    setY: (y) => set(() => ({ y })),
    setIsMoving: (isMoving) => set(() => ({ isMoving })),
    setIsClicked: (isClicked) => set(() => ({ isClicked })),
  };
});
