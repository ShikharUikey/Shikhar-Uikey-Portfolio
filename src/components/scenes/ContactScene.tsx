"use client";

import { motion } from "framer-motion";
import { animateSectionFadeUp } from "@/animations/engine";
import { FlippingTitle } from "@/components/ui/FlippingTitle";

export const ContactScene = () => {
  return (
    <motion.section 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={animateSectionFadeUp}
      className="relative bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex flex-col items-center text-center pt-20 md:pt-32 px-4 snap-start"
    >
      <div className="max-w-2xl relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="inline-block p-8 md:p-12 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] mb-8 md:mb-12 text-center">
          <FlippingTitle />
          <p className="text-base sm:text-xl text-[var(--color-text-secondary)] font-light px-2 max-w-2xl mx-auto">
            I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>
        <button className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-[var(--color-accent-warm)] hover:text-white transition-colors duration-300">
          Start a Conversation
        </button>
      </div>

      {/* Cinematic End Credits / Production Sheet Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-16 border-t border-[var(--color-border)] mt-24 relative z-10 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 md:gap-x-12 max-w-2xl mx-auto text-left">
          
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Directed & Coded By</span>
            <span className="text-[var(--color-text-primary)] font-bold">Shikhar Uikey</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Starring Framework</span>
            <span className="text-[var(--color-text-primary)] font-bold">Next.js & React</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Styling Engine</span>
            <span className="text-[var(--color-text-primary)] font-bold">Tailwind CSS</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Choreography & Motion</span>
            <span className="text-[var(--color-text-primary)] font-bold">Framer Motion</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Executive Producer</span>
            <span className="text-[var(--color-text-primary)] font-bold">Coffee & Curiosity</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Release Version</span>
            <span className="text-[var(--color-text-primary)] font-bold">2026.07.19-Main</span>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px]">
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/shikharuikey/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-warm)] transition-colors">LinkedIn</a>
            <a href="https://github.com/ShikharUikey" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-warm)] transition-colors">GitHub</a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Shikhar Uikey. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.section>
  );
};
