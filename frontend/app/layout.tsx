import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "World Cup 2026 Family Pool",
  description: "Family Pick 'em App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Sleek stark white background with highly readable dark slate text */}
      <body className={`${montserrat.className} antialiased bg-white text-slate-900`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}