"use client";
import React, { createContext, useState } from "react";

export const ActiveNavContext = createContext();

export const ActiveNavProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState(0);
  return (
    <ActiveNavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </ActiveNavContext.Provider>
  );
};
