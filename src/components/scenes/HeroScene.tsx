"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { animateHeroText } from "@/animations/engine";
import { heroContent } from "@/content";

const SocialBubble = ({ 
  href, 
  icon, 
  isFaceHovered, 
  style,
  onMouseEnter,
  onMouseLeave
}: { 
  href: string; 
  icon: "instagram" | "linkedin" | "github"; 
  isFaceHovered: boolean; 
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isFaceHovered ? 1 : 0, 
        opacity: isFaceHovered ? 1 : 0
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 200, damping: 15 },
        opacity: { duration: 0.25 }
      }}
      className={`absolute z-30 pointer-events-auto p-4 sm:p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white hover:text-[var(--color-accent-matcha)] hover:border-[var(--color-accent-matcha)] hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer ${
        isFaceHovered ? "animate-float-gentle" : ""
      }`}
    >
      {icon === "instagram" && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )}
      {icon === "linkedin" && (
        <svg fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
          <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
        </svg>
      )}
      {icon === "github" && (
        <svg fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      )}
    </motion.a>
  );
};

export const HeroScene = () => {
  const [isFaceHovered, setIsFaceHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 1000, h: 800 });
  const [origin, setOrigin] = useState({ x: 580, y: 400 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ w, h });
      if (w < 768) {
        // Mobile coordinates next to ear profile
        setOrigin({ x: w * 0.54, y: h * 0.44 });
      } else {
        // Desktop coordinates positioned to place curves immediately behind/after the visible ear
        setOrigin({ x: w * 0.57, y: h * 0.48 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Frame tick timer loop for the breathing constellation lines
  useEffect(() => {
    if (!isFaceHovered) return;
    let animationFrameId: number;
    const tick = () => {
      setTime(prev => prev + 0.035);
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFaceHovered]);

  // Helper offsets for responsive circular constellation elements (including live breathing offsets)
  const getOffsets = () => {
    const isMobile = dimensions.w < 768;
    
    // Subtle sinusoidal floating values
    const floatAmp = isMobile ? 3 : 8;
    const float1 = isFaceHovered ? Math.sin(time) * floatAmp : 0;
    const float2 = isFaceHovered ? Math.sin(time + 2.0) * floatAmp : 0;
    const float3 = isFaceHovered ? Math.sin(time + 4.0) * floatAmp : 0;

    return {
      r1: isMobile ? 35 : 55,
      r2: isMobile ? 55 : 85,
      insta: isMobile 
        ? { dx: 110, dy: -70 + float1 } 
        : { dx: 260, dy: -140 + float1 },
      linkedin: isMobile 
        ? { dx: 135, dy: 0 + float2 } 
        : { dx: 320, dy: 0 + float2 },
      github: isMobile 
        ? { dx: 110, dy: 70 + float3 } 
        : { dx: 260, dy: 130 + float3 }
    };
  };

  const offsets = getOffsets();
  const rad = Math.PI / 4.2; // ~42 degrees arc bounds

  // Inner arc coords (centered on origin, arc renders to the right of origin)
  const ix1 = origin.x + offsets.r1 * Math.cos(-rad);
  const iy1 = origin.y + offsets.r1 * Math.sin(-rad);
  const ix2 = origin.x + offsets.r1 * Math.cos(rad);
  const iy2 = origin.y + offsets.r1 * Math.sin(rad);
  const pathInner = `M ${ix1} ${iy1} A ${offsets.r1} ${offsets.r1} 0 0 1 ${ix2} ${iy2}`;

  // Outer arc coords
  const ox1 = origin.x + offsets.r2 * Math.cos(-rad);
  const oy1 = origin.y + offsets.r2 * Math.sin(-rad);
  const ox2 = origin.x + offsets.r2 * Math.cos(rad);
  const oy2 = origin.y + offsets.r2 * Math.sin(rad);
  const pathOuter = `M ${ox1} ${oy1} A ${offsets.r2} ${offsets.r2} 0 0 1 ${ox2} ${oy2}`;

  // Connecting lines start coords on outer arc
  const l_rad = Math.PI / 6.2; // Spreading angle
  const sx1 = origin.x + offsets.r2 * Math.cos(-l_rad);
  const sy1 = origin.y + offsets.r2 * Math.sin(-l_rad);
  const sx2 = origin.x + offsets.r2;
  const sy2 = origin.y;
  const sx3 = origin.x + offsets.r2 * Math.cos(l_rad);
  const sy3 = origin.y + offsets.r2 * Math.sin(l_rad);

  // Bubble center coordinates (real-time updating with float)
  const ex1 = origin.x + offsets.insta.dx;
  const ey1 = origin.y + offsets.insta.dy;
  const ex2 = origin.x + offsets.linkedin.dx;
  const ey2 = origin.y + offsets.linkedin.dy;
  const ex3 = origin.x + offsets.github.dx;
  const ey3 = origin.y + offsets.github.dy;

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black snap-start">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Cinematic Background" 
          fill 
          priority
          className="object-cover object-center opacity-90 animate-[fade-in_1s_ease-out]"
        />
        {/* Cinematic Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-black/20 to-transparent"></div>
      </div>
      
      {/* Minimal vertical text on the side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-xs font-bold tracking-[0.3em] uppercase text-white/50 hidden md:block z-10">
        Shikhar Uikey — Portfolio
      </div>

      {/* Main Typography (Editorial Italic Style) */}
      <motion.div 
        className="relative z-10 text-left w-full max-w-7xl mx-auto px-6 md:px-24 pointer-events-none select-none"
        initial="hidden"
        animate={{ 
          opacity: isFaceHovered ? 0 : 1,
          scale: isFaceHovered ? 0.96 : 1,
          filter: isFaceHovered ? "blur(8px)" : "blur(0px)"
        }}
        variants={animateHeroText}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="italic font-semibold text-2xl md:text-4xl mb-2 text-gray-300">
          {heroContent.subheadline}
        </h2>
        <h1 className="italic font-black text-4xl sm:text-6xl md:text-[10rem] leading-[0.9] tracking-tighter mb-6 md:mb-8 text-white drop-shadow-lg">
          {heroContent.headline}
        </h1>
        <div className="inline-block p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl">
            {heroContent.description}
          </p>
        </div>
      </motion.div>
      
      {/* Ikigai Quote (Bottom Left) */}
      <motion.div 
        className="absolute bottom-10 left-6 md:bottom-16 md:left-24 z-10 pointer-events-none select-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: isFaceHovered ? 0 : 1,
          x: isFaceHovered ? -15 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-block p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col gap-1 border-l-4 border-[var(--color-accent-warm)] pl-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
              Philosophy
            </span>
            <span className="text-2xl md:text-4xl font-black mt-2 text-white">
              {heroContent.backgroundQuote}
            </span>
            <span className="text-sm italic text-gray-400 mt-1">
              "{heroContent.quoteTranslation}"
            </span>
          </div>
        </div>
      </motion.div>

      {/* CTA Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFaceHovered ? 0 : 0.6 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-[5vh] right-6 md:right-16 flex flex-col items-center gap-4 z-10 pointer-events-none select-none"
      >
        <span 
          className="text-[10px] tracking-[0.3em] uppercase font-bold text-white rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          {heroContent.cta}
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>

      {/* Glowing Star Arcs & Constellation Connections SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <filter id="glow-accent" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric Inner Arc (Styling Only, positioned behind ear) */}
        <motion.path 
          d={pathInner}
          fill="none"
          stroke="rgba(0, 230, 118, 0.75)"
          strokeWidth={1.8}
          filter="url(#glow-accent)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isFaceHovered ? 1 : 0,
            opacity: isFaceHovered ? 1 : 0 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Concentric Outer Arc (Connected to branches) */}
        <motion.path 
          d={pathOuter}
          fill="none"
          stroke="rgba(0, 230, 118, 0.75)"
          strokeWidth={1.8}
          filter="url(#glow-accent)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isFaceHovered ? 1 : 0,
            opacity: isFaceHovered ? 1 : 0 
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />

        {/* Line 1 (Instagram connection) */}
        <motion.line 
          x1={sx1} y1={sy1}
          x2={ex1} y2={ey1}
          stroke="rgba(0, 230, 118, 0.65)"
          strokeWidth={1.4}
          filter="url(#glow-accent)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isFaceHovered ? 1 : 0,
            opacity: isFaceHovered ? 1 : 0 
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        />

        {/* Line 2 (LinkedIn connection) */}
        <motion.line 
          x1={sx2} y1={sy2}
          x2={ex2} y2={ey2}
          stroke="rgba(0, 230, 118, 0.65)"
          strokeWidth={1.4}
          filter="url(#glow-accent)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isFaceHovered ? 1 : 0,
            opacity: isFaceHovered ? 1 : 0 
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        />

        {/* Line 3 (GitHub connection) */}
        <motion.line 
          x1={sx3} y1={sy3}
          x2={ex3} y2={ey3}
          stroke="rgba(0, 230, 118, 0.65)"
          strokeWidth={1.4}
          filter="url(#glow-accent)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isFaceHovered ? 1 : 0,
            opacity: isFaceHovered ? 1 : 0 
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        />
      </svg>

      {/* Floating Social Handles (placed relative to main viewport to prevent container clipping, keeping mouse listeners active) */}
      <SocialBubble 
        href="https://instagram.com/" 
        icon="instagram" 
        isFaceHovered={isFaceHovered} 
        style={{ 
          left: ex1, 
          top: ey1, 
          transform: "translate(-50%, -50%)",
          animationDelay: "0s" 
        }}
        onMouseEnter={() => setIsFaceHovered(true)}
        onMouseLeave={() => setIsFaceHovered(false)}
      />
      <SocialBubble 
        href="https://www.linkedin.com/in/shikharuikey/" 
        icon="linkedin" 
        isFaceHovered={isFaceHovered} 
        style={{ 
          left: ex2, 
          top: ey2, 
          transform: "translate(-50%, -50%)",
          animationDelay: "1.3s" 
        }}
        onMouseEnter={() => setIsFaceHovered(true)}
        onMouseLeave={() => setIsFaceHovered(false)}
      />
      <SocialBubble 
        href="https://github.com/ShikharUikey" 
        icon="github" 
        isFaceHovered={isFaceHovered} 
        style={{ 
          left: ex3, 
          top: ey3, 
          transform: "translate(-50%, -50%)",
          animationDelay: "2.6s" 
        }}
        onMouseEnter={() => setIsFaceHovered(true)}
        onMouseLeave={() => setIsFaceHovered(false)}
      />

      {/* Face Interactive Hover Trigger Zone */}
      <div 
        className="absolute right-0 top-0 w-full md:w-[48%] h-full z-20"
        onMouseEnter={() => setIsFaceHovered(true)}
        onMouseLeave={() => setIsFaceHovered(false)}
      >
        {/* Invisible Clickable Trigger */}
        <div className="absolute inset-0 cursor-pointer" />
      </div>
    </section>
  );
};
