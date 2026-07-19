"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FlippingWord = ({ eng, jap, delay }: { eng: string; jap: string; delay: number }) => {
  const [showJap, setShowJap] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowJap(true);
      const interval = setInterval(() => {
        setShowJap(prev => !prev);
      }, 3500);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <span className="relative inline-flex items-center justify-center px-1 sm:px-2 h-[1.4em] perspective-[1000px] overflow-visible">
      {/* Invisible spacer to maintain container width matching the longer word */}
      <span className="cursive-accent text-3xl sm:text-5xl md:text-7xl opacity-0 select-none pointer-events-none">
        {eng}
      </span>
      
      <motion.span
        animate={{ rotateX: showJap ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        {/* English Front */}
        <span 
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex items-center justify-center cursive-accent text-3xl sm:text-5xl md:text-7xl text-[var(--color-accent-warm)]"
        >
          {eng}
        </span>
        
        {/* Japanese Back */}
        <span 
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateX(180deg)",
            fontFamily: "var(--font-japanese)"
          }}
          className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider"
        >
          {jap}
        </span>
      </motion.span>
    </span>
  );
};

export const FlippingTitle = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 md:gap-x-3 mb-4 select-none">
      <FlippingWord eng="Let's" jap="共に" delay={400} />
      <FlippingWord eng="Build" jap="創り" delay={1400} />
      <FlippingWord eng="Together" jap="ましょう" delay={2400} />
    </div>
  );
};
