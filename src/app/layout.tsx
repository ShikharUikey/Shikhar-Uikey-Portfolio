import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import { Preloader } from "@/components/ui/Preloader";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "Shikhar Uikey | Where Code Meets Cinema",
  description: "Creative technologist combining software development, AI, editing, cinematography, photography, and storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased selection:bg-[#E87A5D] selection:text-white cursor-none`}
      >
        <Preloader />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
