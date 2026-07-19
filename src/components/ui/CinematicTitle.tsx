"use client";

import { motion } from "framer-motion";

interface CinematicTitleProps {
  text: string;
  className?: string;
}

export const CinematicTitle = ({ text, className = "" }: CinematicTitleProps) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 24, 
      filter: "blur(6px)",
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], // cinematic smooth ease-out
      },
    },
  };

  return (
    <motion.h2 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      className={`flex flex-wrap gap-x-[0.3em] ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};
