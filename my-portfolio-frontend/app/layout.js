import "./globals.css";

import { Sour_Gummy } from "next/font/google";
import AppLayout from "./AppLayout";
import Provider from "./components/activeNavProvider";

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
  return (
    <html lang="en">
      <body className={`${sourGummy.className} bg-colorBody light`}>
        <Provider>
          <AppLayout children={children} />
        </Provider>
      </body>
    </html>
  );
}
