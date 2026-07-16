"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence for cinematic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[var(--color-bg-primary)] flex flex-col items-center justify-center pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-black tracking-[0.2em] uppercase text-[var(--color-text-primary)]"
        >
          Shikhar Uikey
        </motion.div>
      </div>
      <div className="overflow-hidden mt-4">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-lg md:text-xl font-light tracking-widest text-[var(--color-accent-warm)]"
        >
          生きがい
        </motion.div>
      </div>
    </motion.div>
  );
};
