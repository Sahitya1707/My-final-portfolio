import "./globals.css";

import { Sour_Gummy, Inter, Poppins } from "next/font/google";

import AppLayout from "./AppLayout";
import Provider from "./components/activeNavProvider";

// importing the font from google
const sourGummy = Sour_Gummy({
  subsets: ["latin"],
});

// added another font's
const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Sahitya Portfolio",
  description:
    "This is portfolio of Sahitya Neupane who is eager to get into the web field learning each and doing mistakes everyday.",
};

export default function RootLayout({ children }) {
  // const { theme } = useContext(ThemeContext);
  return (
    <html lang="en" className={`${sourGummy.className}  ${poppins.variable}`}>
      =
      <AppLayout children={children} />=
    </html>
  );
}
