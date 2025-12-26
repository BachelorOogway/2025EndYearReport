import type { Metadata } from "next";
import localFont from "next/font/local";
import { Italiana } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
});

const abhayaLibre = localFont({
  src: "./fonts/AbhayaLibre-ExtraBold.ttf",
  variable: "--font-abhaya-libre",
  weight: "800",
});

export const metadata = {
title: "2025年年度报告",
description: "这是2025年年度报告的页面",
viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abhayaLibre.variable} ${italiana.variable}`}>
        {children}
      </body>
    </html>
  );
}
