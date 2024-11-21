"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const currentTheme = getCookie("theme");
    console.log("theme provider");

    if (currentTheme === "dark") {
      setTheme("dark");
      return;
    } else if (currentTheme === "light") {
      setTheme("light");
      return;
    } else {
      // if browser theme is dark then set to null and vice versa

      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
      setCookie("theme", theme);
    }
    // console.log(currentTheme);
    // setTheme(currentTheme);
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
