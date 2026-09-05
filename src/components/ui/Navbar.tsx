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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#0e100f]/90 backdrop-blur-md border-b border-[#42433d] py-3.5" 
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand Wordmark */}
          <Link 
            href="/" 
            className="text-[19px] font-semibold tracking-tight text-[#fffce1] hover:opacity-90 transition-opacity"
          >
            Shikhar Uikey<span className="text-[#0ae448]">.</span>
          </Link>

          {/* GSAP Ghost Nav Links (Tight 8-16px gap, 16px Mori font) */}
          <div className="hidden md:flex items-center gap-6 text-[16px]">
            <a href="#about" className="ghost-nav-link px-2 py-1">About</a>
            <a href="#work" className="ghost-nav-link px-2 py-1">Work</a>
            <a href="#experience" className="ghost-nav-link px-2 py-1">Experience</a>
            <a href="#contact" className="ghost-nav-link px-2 py-1">Contact</a>
          </div>

          {/* Right Action: Gradient-Stroked CTA Pill */}
          <div className="hidden md:flex items-center">
            <a 
              href="#contact" 
              className="btn-pill-gradient text-[15px] !py-2 !px-5"
            >
              <span>{'{ Let\'s Talk }'}</span>
            </a>
          </div>
          
          {/* Menu Toggle (Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 focus:outline-none"
          >
            <div className="w-6 h-[1.5px] bg-[#fffce1]"></div>
            <div className="w-4 h-[1.5px] bg-[#fffce1] ml-auto"></div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[100] bg-[#191919] border-b border-[#42433d] py-10 px-8 flex flex-col items-center gap-8 md:hidden"
          >
            {/* Close Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="absolute top-6 right-6 text-[#7c7c6f] hover:text-[#fffce1] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo in Drawer */}
            <div className="text-xl font-semibold tracking-tight text-[#fffce1]">
              Shikhar Uikey<span className="text-[#0ae448]">.</span>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col items-center gap-6 text-[18px]">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="ghost-nav-link text-[#fffce1]"
              >
                About
              </a>
              <a 
                href="#work" 
                onClick={() => setMobileMenuOpen(false)}
                className="ghost-nav-link text-[#fffce1]"
              >
                Work
              </a>
              <a 
                href="#experience" 
                onClick={() => setMobileMenuOpen(false)}
                className="ghost-nav-link text-[#fffce1]"
              >
                Experience
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="ghost-nav-link text-[#fffce1]"
              >
                Contact
              </a>
            </div>

            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-pill-gradient text-[15px] !py-2.5 !px-6 mt-2"
            >
              <span>{'{ Let\'s Talk }'}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
