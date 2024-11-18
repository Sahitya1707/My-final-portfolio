import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Sour_Gummy } from "next/font/google";

// importing the font from google
const sourGummy = Sour_Gummy({
  subsets: ["latin"],
});
console.log(sourGummy);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sahitya Portfolio",
  description:
    "This is portfolio of Sahitya Neupane who is eager to get into the web field learning each and doing mistakes everyday.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sourGummy.className} bg-colorBody`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
