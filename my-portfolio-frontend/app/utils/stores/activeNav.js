import { create } from "zustand";
export const useActiveNav = create((set) => {
  return {
    activeNav: "0",
    activeDashboard: 0,
    updateActiveNav: (activeNav) => set((state) => ({ activeNav: activeNav })),
    updateActiveDashboard: (activeDashboard) =>
      set((state) => ({ activeDashboard: activeDashboard })),
  };
});
