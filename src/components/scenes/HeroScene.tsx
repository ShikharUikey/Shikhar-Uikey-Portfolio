"use client";

import { motion } from "framer-motion";
import { animateHeroText } from "@/animations/engine";
import { heroContent } from "@/content";

export const HeroScene = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Quote */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <span className="ikigai-quote text-[var(--color-bg-secondary)]">
          {heroContent.backgroundQuote}
        </span>
      </div>

      <motion.div 
        className="relative z-10 text-center max-w-4xl px-6"
        initial="hidden"
        animate="visible"
        variants={animateHeroText}
      >
        <h2 className="cursive-accent text-3xl md:text-5xl mb-4">
          {heroContent.subheadline}
        </h2>
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-[var(--color-text-primary)]">
          {heroContent.headline}
        </h1>
        <p className="text-xl md:text-2xl font-light text-[var(--color-text-secondary)]">
          {heroContent.description}
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-[10vh] flex flex-col items-center gap-4 z-10"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-bold text-[var(--color-accent-warm)]">
          {heroContent.cta}
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--color-accent-warm)] to-transparent"></div>
      </motion.div>
    </section>
  );
};
