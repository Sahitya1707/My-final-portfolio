import "./globals.css";

import { Sour_Gummy } from "next/font/google";

import AppLayout from "./AppLayout";
import Provider from "./components/activeNavProvider";
import ThemeProviderWrapper from "./components/themeProvider";
// import { useContext } from "react";
import { ActiveNavContext } from "./components/activeNavContext";
import { cookies } from "next/headers";
import { ThemeContext } from "./components/themeContext";

// importing the font from google
const sourGummy = Sour_Gummy({
  subsets: ["latin"],
});

export const metadata = {
  title: "Sahitya Portfolio",
  description:
    "This is portfolio of Sahitya Neupane who is eager to get into the web field learning each and doing mistakes everyday.",
};

export default function RootLayout({ children }) {
  // const { theme } = useContext(ThemeContext);
  return (
    <ThemeProviderWrapper>
      <html lang="en" className={`${sourGummy.className}`}>
        <Provider>
          <AppLayout children={children} />
        </Provider>
      </html>
    </ThemeProviderWrapper>
  );
}
