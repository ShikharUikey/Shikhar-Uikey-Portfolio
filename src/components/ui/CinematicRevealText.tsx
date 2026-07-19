"use client";

import React, { useState, useRef } from "react";

export const CinematicRevealText = ({ children }: { children: React.ReactNode }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full"
    >
      {/* Base Layer: The English paragraph text */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hidden Overlay Layer: Giant Japanese "アーティスト" (Artist) */}
      {/* This layer sits on top but is only visible where the cursor highlights it */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-20"
      >
        <span 
          className="text-6xl sm:text-7xl md:text-9xl font-black text-[var(--color-accent-warm)] tracking-widest transition-opacity duration-300 text-center block w-full"
          style={{
            fontFamily: 'var(--font-japanese)',
            opacity: isHovered ? 0.8 : 0,
            WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
            maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
            mixBlendMode: "screen", // Creates a cool light-projection/cinematic overlay effect
          }}
        >
          アーティスト
        </span>
      </div>
    </div>
  );
};
