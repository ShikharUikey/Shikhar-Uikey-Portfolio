"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { animateHeroText } from "@/animations/engine";
import { heroContent } from "@/content";

export const HeroScene = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Cinematic Background" 
          fill 
          priority
          className="object-cover object-center opacity-90"
        />
        {/* Cinematic Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-black/20 to-transparent"></div>
      </div>
      {/* Minimal vertical text on the side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-xs font-bold tracking-[0.3em] uppercase text-white/50 hidden md:block z-10">
        Shikhar Uikey — Portfolio
      </div>

      {/* Main Typography (Editorial Italic Style) */}
      <motion.div 
        className="relative z-10 text-left w-full max-w-7xl mx-auto px-6 md:px-24"
        initial="hidden"
        animate="visible"
        variants={animateHeroText}
      >
        <h2 className="italic font-semibold text-2xl md:text-4xl mb-2 text-gray-300">
          {heroContent.subheadline}
        </h2>
        <h1 className="italic font-black text-4xl sm:text-6xl md:text-[10rem] leading-[0.9] tracking-tighter mb-6 md:mb-8 text-white drop-shadow-lg">
          {heroContent.headline}
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl">
          {heroContent.description}
        </p>
      </motion.div>
      
      {/* Ikigai Quote (Bottom Left) */}
      <motion.div 
        className="absolute bottom-10 left-6 md:bottom-16 md:left-24 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="flex flex-col gap-1 border-l-4 border-[var(--color-accent-warm)] pl-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
            Philosophy
          </span>
          <span className="text-2xl md:text-4xl font-black mt-2 text-white">
            {heroContent.backgroundQuote}
          </span>
          <span className="text-sm italic text-gray-400 mt-1">
            "{heroContent.quoteTranslation}"
          </span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-[5vh] right-6 md:right-16 flex flex-col items-center gap-4 z-10"
      >
        <span 
          className="text-[10px] tracking-[0.3em] uppercase font-bold text-white rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          {heroContent.cta}
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </section>
  );
};
