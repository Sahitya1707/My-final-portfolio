"use client";
import { ThemeProvider } from "./themeContext";

const ThemeProviderWrapper = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
