"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const emptySubscribe = () => () => {};

export const CustomCursor = () => {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28, mass: 0.1 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Check if device supports fine cursor pointers (non-touch)
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      rawX.set(e.clientX - 16);
      rawY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer")
      );
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, rawX, rawY]);

  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovering ? 2.2 : 1,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.08)",
      }}
      transition={{
        scale: { type: "spring", stiffness: 350, damping: 20 },
        backgroundColor: { duration: 0.15 },
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--color-accent-warm)] pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center backdrop-blur-xs will-change-transform"
    >
      {/* Inner dot */}
      <motion.div 
        className="w-1 h-1 bg-[var(--color-accent-warm)] rounded-full"
        animate={{
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
};
