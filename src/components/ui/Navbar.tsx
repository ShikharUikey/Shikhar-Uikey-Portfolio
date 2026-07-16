"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? "bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-[var(--color-border)] py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo / Name */}
        <div className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] cursor-pointer">
          S<span className="text-[var(--color-accent-warm)]">.</span>Uikey
        </div>

        {/* Links (Desktop) */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-[var(--color-text-secondary)]">
          <a href="#about" className="hover:text-[var(--color-accent-warm)] transition-colors">About</a>
          <a href="#work" className="hover:text-[var(--color-accent-warm)] transition-colors">Work</a>
          <a href="#contact" className="hover:text-[var(--color-accent-warm)] transition-colors">Contact</a>
        </div>
        
        {/* Menu Toggle (Mobile) */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2">
          <div className="w-6 h-[2px] bg-[var(--color-text-primary)]"></div>
          <div className="w-4 h-[2px] bg-[var(--color-text-primary)] ml-auto"></div>
        </div>
      </div>
    </motion.nav>
  );
};
