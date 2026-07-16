import { Variants } from "framer-motion";

// -----------------------------------------------------------------------------
// Core Animation Engine (Framer Motion Variants)
// Defines consistent motion rules as per the Master Prompt (Fast/Medium/Slow).
// -----------------------------------------------------------------------------

export const TRANSITION_FAST = { duration: 0.3, ease: "easeOut" };
export const TRANSITION_MEDIUM = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }; // Cinematic ease out
export const TRANSITION_SLOW = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
export const TRANSITION_HERO = { duration: 2.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export const animateHeroText: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: TRANSITION_HERO 
  }
};

export const animateSectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: TRANSITION_MEDIUM 
  }
};

export const animateStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const animateStaggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: TRANSITION_MEDIUM }
};

// Scroll-based parallax values mapped in hooks where needed
