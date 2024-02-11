import "./globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Inter } from "next/font/google";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
