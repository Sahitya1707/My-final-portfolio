import "./globals.css";

import { Sour_Gummy, Poppins, Quicksand, Outfit } from "next/font/google";

import AppLayout from "./AppLayout";

const quickSand = Quicksand({
  subsets: ["latin"],
});

console.log("quick");
console.log(quickSand);
// importing the font from google
const sourGummy = Sour_Gummy({
  subsets: ["latin"],
});
const outfit = Outfit({
  subsets: ["latin"],
});

// added another font's
const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Sahitya Portfolio | Software Developer",
  description:
    "This is portfolio of Sahitya Neupane who is eager to get into the web field learning each and doing mistakes everyday.",
};

export default function RootLayout({ children }) {
  // const { theme } = useContext(ThemeContext);
  return (
    <html lang="en" className={`${outfit.className} ${poppins.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="Tl4yrauYYf_veX_JQ_9e8PZOxLmqmDtwGQ-MYxPwVtU"
        />
      </head>

      <AppLayout children={children} />
    </html>
  );
}
