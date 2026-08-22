"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusPhrases = [
    "INITIALIZING SYSTEM...",
    "LOADING 3D ASSETS...",
    "CALIBRATING CINEMATICS...",
    "COMPOSING SOUNDSCAPES...",
    "WELCOME."
  ];

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    let current = 0;
    const startTime = performance.now();
    const duration = 1800; // 1.8s smooth counter duration

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      
      // Custom easing curve: starts swift, slows near 80%, then finishes smoothly at 100%
      const easeOutExpo = progressFraction === 1 ? 1 : 1 - Math.pow(2, -10 * progressFraction);
      current = Math.min(Math.round(easeOutExpo * 100), 100);
      setProgress(current);

      // Rotate status phrases based on progress
      if (current < 25) setStatusIndex(0);
      else if (current < 50) setStatusIndex(1);
      else if (current < 75) setStatusIndex(2);
      else if (current < 99) setStatusIndex(3);
      else setStatusIndex(4);

      if (progressFraction < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Complete state hold, then initiate liquid exit
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 350);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="fluid-preloader"
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col justify-between p-6 sm:p-10 md:p-14 pointer-events-auto select-none overflow-visible"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 0.9, 
              ease: [0.76, 0, 0.24, 1],
              when: "afterChildren"
            }
          }}
        >
          {/* Top Bar Status */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between text-xs tracking-[0.25em] uppercase font-mono text-white/40"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-matcha)] animate-pulse" />
              <span>[ SYSTEM ACTIVE ]</span>
            </div>
            <div className="hidden sm:block">
              <span>SHIKHAR UIKEY / PORTFOLIO © 2026</span>
            </div>
            <div className="text-[var(--color-accent-warm)]">
              <span>{statusPhrases[statusIndex]}</span>
            </div>
          </motion.div>

          {/* Center Main Typography */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            {/* Japanese Kanji Pill Accent */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,51,102,0.15)]"
            >
              <span className="text-xs font-semibold text-[var(--color-accent-warm)] tracking-widest" style={{ fontFamily: 'var(--font-japanese)' }}>
                生きがい
              </span>
              <span className="text-white/30 text-[10px]">•</span>
              <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                Where Code Meets Cinema
              </span>
            </motion.div>

            {/* Giant Masked Title */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-2xl"
              >
                SHIKHAR UIKEY
              </motion.h1>
            </div>

            {/* Sub-label */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-xs sm:text-sm md:text-base font-light tracking-[0.3em] uppercase text-gray-300"
              >
                Creative Technologist & Filmmaker
              </motion.p>
            </div>
          </div>

          {/* Bottom Loading Progress & Large Counter */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl mx-auto flex flex-col items-center gap-3"
          >
            <div className="w-full flex justify-between items-baseline text-xs font-mono text-white/50 tracking-widest">
              <span>LOADING EXPERIENCE</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-[var(--color-accent-matcha)]">
                {progress < 10 ? `0${progress}` : progress}%
              </span>
            </div>

            {/* Hairline Progress Bar */}
            <div className="w-full h-[2px] sm:h-[3px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--color-accent-warm)] via-[#FF7A00] to-[var(--color-accent-matcha)] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Glowing leading dot */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent-matcha)] blur-[2px] opacity-80"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
          </motion.div>

          {/* Liquid SVG Curve at the bottom of the preloader container */}
          <div className="absolute top-full left-0 w-full h-[120px] sm:h-[200px] pointer-events-none overflow-visible">
            <svg 
              viewBox="0 0 1000 200" 
              preserveAspectRatio="none" 
              className="w-full h-full fill-[#050505] drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
            >
              <motion.path
                initial={{ d: "M 0 0 Q 500 0 1000 0 L 1000 0 L 0 0 Z" }}
                exit={{ 
                  d: [
                    "M 0 0 Q 500 0 1000 0 L 1000 0 L 0 0 Z",
                    "M 0 0 Q 500 180 1000 0 L 1000 0 L 0 0 Z",
                    "M 0 0 Q 500 0 1000 0 L 1000 0 L 0 0 Z"
                  ],
                  transition: { 
                    duration: 0.9, 
                    times: [0, 0.45, 1],
                    ease: [0.76, 0, 0.24, 1] 
                  }
                }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
