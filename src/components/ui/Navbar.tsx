"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <>
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
          {/* Logo / Name linking back to top */}
          <Link href="/" className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] cursor-pointer select-none hover:opacity-80 transition-opacity">
            S<span className="text-[var(--color-accent-warm)]">.</span>Uikey
          </Link>

          {/* Links (Desktop) */}
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-[var(--color-text-secondary)]">
            <a href="#about" className="hover:text-[var(--color-accent-warm)] transition-colors">About</a>
            <a href="#work" className="hover:text-[var(--color-accent-warm)] transition-colors">Work</a>
            <a href="#contact" className="hover:text-[var(--color-accent-warm)] transition-colors">Contact</a>
          </div>
          
          {/* Menu Toggle (Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 focus:outline-none"
          >
            <div className="w-6 h-[2px] bg-[var(--color-text-primary)]"></div>
            <div className="w-4 h-[2px] bg-[var(--color-text-primary)] ml-auto"></div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Glassmorphic Dropdown Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[100] bg-black/95 backdrop-blur-2xl border-b border-white/10 py-10 px-8 shadow-2xl flex flex-col items-center gap-8 md:hidden"
          >
            {/* Close Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Mobile Menu"
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo in Drawer */}
            <div className="text-2xl font-bold tracking-tight text-white mb-4">
              S<span className="text-[var(--color-accent-warm)]">.</span>Uikey
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center gap-6 text-base font-semibold tracking-widest uppercase text-white/75">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--color-accent-warm)] hover:scale-105 transition-all"
              >
                About
              </a>
              <a 
                href="#work" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--color-accent-warm)] hover:scale-105 transition-all"
              >
                Work
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--color-accent-warm)] hover:scale-105 transition-all"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
