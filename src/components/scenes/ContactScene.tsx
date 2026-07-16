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
      className="cinematic-section bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex items-center justify-center text-center"
    >
      <div className="max-w-2xl relative z-10">
        <h2 className="cursive-accent text-5xl md:text-7xl mb-8">Let's Build Together</h2>
        <p className="text-xl text-[var(--color-text-secondary)] mb-12 font-light">
          I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <button className="px-10 py-5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold tracking-widest uppercase text-sm hover:bg-[var(--color-accent-warm)] hover:text-white transition-colors duration-300">
          Start a Conversation
        </button>
      </div>
    </motion.section>
  );
};
