import type { Metadata, Viewport } from "next";
import { Inter, Caveat, Kaisei_Opti, Rozha_One } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import { Preloader } from "@/components/ui/Preloader";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

const kaiseiOpti = Kaisei_Opti({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-japanese",
  display: "swap",
});

const rozhaOne = Rozha_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-hindi",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Shikhar Uikey | Where Code Meets Cinema",
  description: "Creative technologist combining software development, AI, editing, cinematography, photography, and storytelling.",
  metadataBase: new URL("https://shikharuikey.com"),
  openGraph: {
    title: "Shikhar Uikey | Where Code Meets Cinema",
    description: "Creative technologist combining software development, AI, editing, cinematography, photography, and storytelling.",
    url: "https://shikharuikey.com",
    siteName: "Shikhar Uikey Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shikhar Uikey | Where Code Meets Cinema",
    description: "Creative technologist combining software development, AI, editing, cinematography, photography, and storytelling.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${caveat.variable} ${kaiseiOpti.variable} ${rozhaOne.variable} font-sans antialiased selection:bg-[#E87A5D] selection:text-white md:cursor-none`}
      >
        <div className="film-grain" />
        <Preloader />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
