"use client";

import { motion } from "framer-motion";
import { animateSectionFadeUp, animateStaggerContainer, animateStaggerItem } from "@/animations/engine";
import { aboutContent } from "@/content";

export const AboutScene = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={animateSectionFadeUp}
      className="cinematic-section bg-white/60 backdrop-blur-xl border-y border-[var(--color-border)]"
    >
      <div className="max-w-4xl mx-auto w-full p-10 md:p-16 relative z-10">
        <motion.h3 
          variants={animateStaggerItem}
          className="cursive-accent text-4xl md:text-5xl mb-10 text-center"
        >
          {aboutContent.sectionTitle}
        </motion.h3>
        
        <motion.div 
          variants={animateStaggerContainer}
          className="space-y-6 text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-light"
        >
          {aboutContent.paragraphs.map((paragraph, index) => (
            <motion.p key={index} variants={animateStaggerItem}>
              {/* Highlight specific keywords if needed, for now just render text */}
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
