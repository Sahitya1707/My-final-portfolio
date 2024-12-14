import { create } from "zustand";

export const useTheme = create((set) => {
  return {
    theme: "dark",
    updateTheme: (theme) => set((state) => ({ theme: theme })),
  };
});
