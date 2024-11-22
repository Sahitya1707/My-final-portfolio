"use client";

import { useEffect } from "react";
import HomePageDescription from "./components/HomePageDescription";
import { useBackgroundText } from "./utils/stores/backgroundTextStore";

export default function Home() {
  const updateBackgroundText = useBackgroundText(
    (state) => state.updateBackgroundText
  );
  const updatePosition = useBackgroundText((state) => state.updatePosition);

  useEffect(() => {
    // updateBackgroundText("</>");
    // updatePosition("translate(-80%, -50%) rotate(165deg)");
  }, []);
  return <HomePageDescription />;
}
