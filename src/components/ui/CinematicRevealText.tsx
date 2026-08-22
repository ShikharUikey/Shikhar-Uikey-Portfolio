"use client";

import React, { useState, useRef, useCallback } from "react";

export const CinematicRevealText = ({ 
  children, 
  revealText, 
  textSizeClass = "text-6xl sm:text-7xl md:text-9xl",
  maskRadius = 120,
  revealFontFamily = "var(--font-japanese)",
  trackingClass = "tracking-wide"
}: { 
  children: React.ReactNode; 
  revealText: string;
  textSizeClass?: string;
  maskRadius?: number;
  revealFontFamily?: string;
  trackingClass?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--reveal-x", `${x}px`);
    containerRef.current.style.setProperty("--reveal-y", `${y}px`);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Default initial coordinates
        ["--reveal-x" as string]: "50%",
        ["--reveal-y" as string]: "50%",
      }}
      className="relative w-full"
    >
      {/* Base Layer: The English paragraph text */}
      <div 
        className="relative z-10 transition-all duration-300"
        style={{
          WebkitMaskImage: isHovered 
            ? `radial-gradient(circle ${maskRadius}px at var(--reveal-x) var(--reveal-y), transparent 50%, black 100%)` 
            : "none",
          maskImage: isHovered 
            ? `radial-gradient(circle ${maskRadius}px at var(--reveal-x) var(--reveal-y), transparent 50%, black 100%)` 
            : "none",
        }}
      >
        {children}
      </div>

      {/* Hidden Overlay Layer */}
      {/* This layer sits on top but is only visible where the cursor highlights it */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-20"
      >
        <span 
          className={`${textSizeClass} ${trackingClass} font-black text-[var(--color-accent-warm)] transition-opacity duration-300 text-center block w-full`}
          style={{
            fontFamily: revealFontFamily,
            opacity: isHovered ? 1.0 : 0,
            WebkitMaskImage: `radial-gradient(circle ${maskRadius}px at var(--reveal-x) var(--reveal-y), black 50%, transparent 100%)`,
            maskImage: `radial-gradient(circle ${maskRadius}px at var(--reveal-x) var(--reveal-y), black 50%, transparent 100%)`,
          }}
        >
          {revealText}
        </span>
      </div>
    </div>
  );
};
