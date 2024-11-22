// we will use zustand for the global state management, and will remove react context after the assignment :) https://walk.hashnode.dev/how-to-implement-zustand-in-your-nextjs-app, https://walk.hashnode.dev/how-to-implement-zustand-in-your-nextjs-app https://dev.to/franklin030601/using-zustand-with-react-js-9di
import { create } from "zustand";

export const useBackgroundText = create((set) => ({
  backgroundText: "</>",
  position: "",
  updateBackgroundText: (backgroundText) =>
    set((state) => ({ backgroundText: backgroundText })),
  updatePosition: (position) => set((state) => ({ position: position })),
}));

/* 

  ------------------------------------ Reading and updating value through global state manage using Zustand --------------------------
  reading the value of backgroundText through store using zustand
  const backgroundText = useBackgroundText((state) => state.backgroundText);
  const position = useBackgroundText((state) => state.position);
  const updateBackgroundText = useBackgroundText(
    (state) => state.updateBackgroundText
  );
  const updatePosition = useBackgroundText((state) => state.updatePosition);
  // ------------------------------------

*/
