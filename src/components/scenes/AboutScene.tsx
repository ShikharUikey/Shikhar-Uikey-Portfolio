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
      className="cinematic-section bg-[#060608] border-y border-[var(--color-border)] min-h-screen md:min-h-[120vh] flex items-center relative snap-start overflow-hidden"
    >
      {/* Atmospheric Radial Gradients & Vignette */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[35rem] h-[35rem] rounded-full bg-[#00F0FF] opacity-[0.05] blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] rounded-full bg-[#00F0FF] opacity-[0.04] blur-[160px]" />
        
        {/* Technical Coordinate Markers */}
        <div className="absolute top-12 left-10 text-[10px] font-mono tracking-[0.25em] text-white/30 flex flex-col gap-1">
          <span className="text-[#00F0FF] font-bold">[ CREATIVE ARCHIVE // SECTION 02 ]</span>
          <span>IDENTITY &amp; PHILOSOPHY</span>
        </div>
        <div className="absolute top-12 right-10 text-[10px] font-mono tracking-[0.25em] text-white/30 flex flex-col gap-1 text-right">
          <span className="text-[#00F0FF] font-bold">GRID 28°36&apos;N 77°12&apos;E</span>
          <span>JANUS DUALITY FIELD</span>
        </div>

        {/* Top & Bottom Gradient Edge Blends */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto w-full p-4 md:p-16 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-14">
        
        {/* Glassmorphic Photo Container with Parallax & Hover Reveal */}
        <motion.div 
          onClick={() => setShowPreview(true)}
          style={{ 
            y: yImage, 
            opacity: opacityImage,
          }}
          className="relative w-full md:w-1/2 h-[380px] sm:h-[480px] md:h-[580px] group cursor-pointer p-2 sm:p-3 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/20 shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-500 hover:border-white/35 hover:shadow-[0_20px_60px_rgba(0,240,255,0.18)]"
        >
          {/* Internal Specular Glass Highlight */}
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30" />
          
          <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
            {/* Primary Base Image */}
            <Image 
              src="/images/about-me.jpg" 
              alt="Shikhar Uikey"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
            />

            {/* Hover Reveal Alternate Samurai Image */}
            <Image 
              src="/images/about-me-hover.jpg" 
              alt="Shikhar Uikey Samurai Alter-Ego"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            />
            
            {/* Japanese Text Overlay in Frosted Glass Capsule (Fades out smoothly on hover to reveal Samurai calligraphy) */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none drop-shadow-md transition-all duration-500 group-hover:opacity-0 group-hover:scale-90 group-hover:pointer-events-none">
              <div className="inline-block p-3.5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <span className="text-white text-4xl sm:text-5xl tracking-[0.5em] opacity-95" style={{ fontFamily: 'var(--font-japanese)', writingMode: 'vertical-rl' }}>
                  創造者
                </span>
              </div>
            </div>

            {/* Hover Hint Pill at Bottom Right */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none transition-all duration-500 opacity-70 group-hover:opacity-0">
              <div className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
                <span>Hover: Alter-Ego</span>
              </div>
            </div>
            
            {/* Subtle Gradient Blend at Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#060608]/90 via-[#060608]/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Glassmorphic Written Statement Container on the Right Side */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 rounded-[2rem] bg-black/45 backdrop-blur-2xl border border-white/15 shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.15)] relative overflow-hidden"
        >
          {/* Subtle Glass Refractive Sheen */}
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mb-6 md:mb-8">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--color-accent-matcha)] block mb-2 font-bold">
              [ 02 // CREATIVE IDENTITY ]
            </span>
            <CinematicTitle
              text={aboutContent.sectionTitle}
              className="italic font-black text-3xl md:text-5xl text-left text-[var(--color-text-primary)] tracking-tight"
            />
          </div>
          
          {/* Bold, Cinematic Hindi Reveal (कलाकार) */}
          <CinematicRevealText 
            revealText="कलाकार" 
            revealFontFamily="var(--font-hindi)"
            textSizeClass="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            trackingClass="tracking-tight"
            maskRadius={135}
          >
            <div className="space-y-5 text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-light">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </CinematicRevealText>
        </motion.div>
      </div>

      {/* Photo Preview Lightbox Modal with Dual-Avatar Switcher */}
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
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-auto max-h-[75vh] flex items-center justify-center">
                <Image 
                  src="/images/about-me-hover.jpg" 
                  alt="Shikhar Uikey Samurai Preview"
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain shadow-2xl rounded-2xl border border-white/20"
                />
              </div>
              <div className="mt-4 text-center flex flex-col items-center gap-1">
                <span className="text-sm font-mono text-[#00F0FF] tracking-[0.3em] uppercase font-bold">
                  Shikhar Uikey — 「場所が、考えてくれる。」
                </span>
                <span className="text-xs text-white/50 font-mono tracking-widest">
                  THE SAMURAI VISION • 創造者
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
