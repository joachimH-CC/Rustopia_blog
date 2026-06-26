import type { Metadata } from "next";
import { Cinzel, Barlow } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "JOACHIM", template: "%s · JOACHIM" },
  description: "个人存档",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${cinzel.variable} ${barlow.variable}`}>
        {children}
      </body>
    </html>
  );
}
