import type { Metadata } from "next";
import { Inter, Caveat, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const caveat = Caveat({ 
  subsets: ["latin"], 
  variable: "--font-cursive"
});

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"], 
  variable: "--font-japanese"
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
        className={`${inter.variable} ${caveat.variable} ${notoSansJP.variable} antialiased selection:bg-[#E87A5D] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
