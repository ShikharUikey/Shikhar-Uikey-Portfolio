"use client";

import { motion } from "framer-motion";
import { animateSectionFadeUp } from "@/animations/engine";

export const ContactScene = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={animateSectionFadeUp}
      className="relative bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex flex-col items-center text-center pt-32"
    >
      <div className="max-w-2xl relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="cursive-accent text-5xl md:text-7xl mb-8">Let's Build Together</h2>
        <p className="text-xl text-[var(--color-text-secondary)] mb-12 font-light">
          I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <button className="px-10 py-5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold tracking-widest uppercase text-sm hover:bg-[var(--color-accent-warm)] hover:text-white transition-colors duration-300">
          Start a Conversation
        </button>
      </div>

      {/* Elegant Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-[var(--color-border)] mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative z-10">
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">S.Uikey</span>
          <span className="text-sm text-[var(--color-text-secondary)] mt-2">Where Code Meets Cinema.</span>
        </div>
        
        <div className="flex gap-6 md:justify-center text-sm font-medium tracking-widest uppercase text-[var(--color-text-secondary)]">
          <a href="https://www.instagram.com/shikhar__uikey/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-warm)] transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/in/shikharuikey/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-warm)] transition-colors">LinkedIn</a>
          <a href="https://github.com/ShikharUikey" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-warm)] transition-colors">GitHub</a>
        </div>

        <div className="flex md:justify-end text-sm text-[var(--color-text-secondary)] font-light">
          &copy; {new Date().getFullYear()} Shikhar Uikey. All rights reserved.
        </div>
      </footer>
    </motion.section>
  );
};
