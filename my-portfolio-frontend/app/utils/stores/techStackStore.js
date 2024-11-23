import { create } from "zustand";

export const useTechStack = create((set) => ({
  // creating empty object for the tech state used
  // this will be through zustand
  techStackUsed: [],
  updateTechStackUsed: (techStackUsed) =>
    set((state) => ({ techStackUsed: techStackUsed })),
}));
