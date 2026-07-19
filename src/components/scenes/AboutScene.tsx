"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { aboutContent } from "@/content";
import { CinematicTitle } from "@/components/ui/CinematicTitle";
import { CinematicRevealText } from "@/components/ui/CinematicRevealText";

export const AboutScene = () => {
  const containerRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  
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

  // Lock body scroll and register escape keypress listener when preview is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPreview(false);
    };

    if (showPreview) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPreview]);

  return (
    <section 
      id="about"
      ref={containerRef}
      className="cinematic-section bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] min-h-screen md:min-h-[120vh] flex items-center relative snap-start"
    >
      <div className="max-w-6xl mx-auto w-full p-4 md:p-16 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        
        {/* Interactive Image Overlay with Scroll Parallax */}
        <motion.div 
          onClick={() => setShowPreview(true)}
          style={{ 
            y: yImage, 
            opacity: opacityImage,
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
          }}
          className="relative w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[600px] group cursor-pointer"
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

      {/* Photo Preview Lightbox Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
            onClick={() => setShowPreview(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[60]"
              onClick={() => setShowPreview(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="/images/about-me.jpg" 
                alt="Shikhar Uikey Preview"
                className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-2xl border border-white/10"
              />
              <div className="mt-4 text-center">
                <span className="text-sm font-mono text-[var(--color-accent-matcha)] tracking-[0.3em] uppercase">
                  Shikhar Uikey — The Creator
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
