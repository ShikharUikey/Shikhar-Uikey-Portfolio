"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { aboutContent } from "@/content";
import { CinematicTitle } from "@/components/ui/CinematicTitle";
import { CinematicRevealText } from "@/components/ui/CinematicRevealText";

export const AboutScene = () => {
  const containerRef = useRef(null);
  
  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  });

  // Map scroll progress to dynamic parallax values
  const yText = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  const yImage = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacityImage = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section 
      id="about"
      ref={containerRef}
      className="cinematic-section bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] min-h-screen md:min-h-[120vh] flex items-center relative snap-start"
    >
      <div className="max-w-6xl mx-auto w-full p-4 md:p-16 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        
        {/* Interactive Image Overlay with Scroll Parallax */}
        <motion.div 
          style={{ 
            y: yImage, 
            opacity: opacityImage,
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
          }}
          className="relative w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[600px] group"
        >
          {/* Glassmorphic/Blurred Border Effect container */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] mix-blend-overlay"></div>
          
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <Image 
              src="/images/about-me.jpg" 
              alt="Shikhar Uikey"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Japanese Text Overlay */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none drop-shadow-md">
              <div className="inline-block p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                <span className="text-white text-5xl tracking-[0.5em] opacity-90" style={{ fontFamily: 'var(--font-japanese)', writingMode: 'vertical-rl' }}>
                  創造者
                </span>
              </div>
            </div>
            
            {/* Dark gradient at bottom to blend image */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent"></div>
          </div>
        </motion.div>

        {/* Text Content with Scroll Parallax */}
        <div className="w-full md:w-1/2">
          <motion.div 
            style={{ y: yText, opacity: opacityText }}
            className="inline-block p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] mb-6 md:mb-10"
          >
            <CinematicTitle
              text={aboutContent.sectionTitle}
              className="italic font-black text-3xl md:text-6xl text-left text-[var(--color-text-primary)] tracking-tight"
            />
          </motion.div>
          
          <CinematicRevealText revealText="アーティスト">
            <div className="space-y-6 text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-light">
              {aboutContent.paragraphs.map((paragraph, index) => {
                // Creating a staggered parallax effect for each paragraph
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const pY = useTransform(scrollYProgress, [0, 0.8 + (index * 0.1)], [100 + (index * 20), 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const pOp = useTransform(scrollYProgress, [0, 0.7 + (index * 0.1)], [0, 1]);
                
                return (
                  <motion.p 
                    key={index} 
                    style={{ y: pY, opacity: pOp }}
                  >
                    {paragraph}
                  </motion.p>
                )
              })}
            </div>
          </CinematicRevealText>
        </div>
      </div>
    </section>
  );
};
