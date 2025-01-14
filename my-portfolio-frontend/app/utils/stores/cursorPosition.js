import { create } from "zustand";

export const useCursorPosition = create((set) => {
  return {
    x: "",
    y: "",
    isMoving: false,
    setX: (x) => set(() => ({ x })),
  };
});
