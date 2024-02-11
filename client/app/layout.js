import { Inter } from "next/font/google";
import "./globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import FirebaseWrapper from "./reactfire";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SoloQuest",
  description: "Extend your life by playing",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <FirebaseWrapper>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </FirebaseWrapper>
    </ClerkProvider>
  );
}
