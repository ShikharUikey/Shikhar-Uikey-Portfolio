"use client";

import Image from "next/image";
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
      <div className="max-w-6xl mx-auto w-full p-10 md:p-16 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Interactive Image Overlay */}
        <motion.div 
          variants={animateStaggerItem}
          className="relative w-full md:w-1/2 h-[500px] group"
        >
          {/* Glassmorphic/Blurred Border Effect container */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl border border-white/20 shadow-[inset_0_0_40px_rgba(250,249,246,0.8)] mix-blend-overlay"></div>
          
          <div className="relative w-full h-full rounded-3xl overflow-hidden" 
               style={{ maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }}>
            <Image 
              src="/images/about-me.jpg" 
              alt="Shikhar Uikey"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Japanese Text Overlay */}
            <div className="absolute top-8 right-8 z-20 mix-blend-difference pointer-events-none">
              <span className="text-white text-5xl font-black opacity-80" style={{ writingMode: 'vertical-rl' }}>
                創造者
              </span>
            </div>
            
            {/* Dark gradient at bottom to blend image */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent opacity-50"></div>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <motion.h3 
            variants={animateStaggerItem}
            className="cursive-accent text-4xl md:text-5xl mb-10 text-left"
          >
            {aboutContent.sectionTitle}
          </motion.h3>
          
          <motion.div 
            variants={animateStaggerContainer}
            className="space-y-6 text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-light"
          >
            {aboutContent.paragraphs.map((paragraph, index) => (
              <motion.p key={index} variants={animateStaggerItem}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
