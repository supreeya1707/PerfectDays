import type { Metadata } from "next";
import {  Kanit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });



const inter = Kanit({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});
const fkanit = Kanit({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});
export const metadata: Metadata = {
  title: "PerfectDays",
  description: "PerfectDays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}><Suspense>{children}</Suspense></body>
    </html>
  );
}
