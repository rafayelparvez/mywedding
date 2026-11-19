import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Wedding - Plan Your Wedding, Your Way",
  description: "Wedding Planning & Vendor Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
