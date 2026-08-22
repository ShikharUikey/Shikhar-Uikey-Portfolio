"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { animateHeroText } from "@/animations/engine";
import { heroContent } from "@/content";

const emptySubscribe = () => () => {};

const SocialBubble = ({ 
  href, 
  icon, 
  isFaceHovered, 
  style,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
  tooltip
}: { 
  href: string; 
  icon: "instagram" | "linkedin" | "github"; 
  isFaceHovered: boolean; 
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ariaLabel: string;
  tooltip: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
      aria-label={ariaLabel}
      title={ariaLabel}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isFaceHovered ? (isHovered ? 1.15 : 1) : 0, 
        opacity: isFaceHovered ? 1 : 0
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 240, damping: 18 },
        opacity: { duration: 0.25 }
      }}
      className={`group absolute z-30 p-4 sm:p-5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white hover:text-[var(--color-accent-matcha)] hover:border-[var(--color-accent-matcha)] transition-all duration-300 flex items-center justify-center cursor-pointer ${
        isFaceHovered ? "pointer-events-auto animate-float-gentle" : "pointer-events-none"
      }`}
    >
      {/* Tooltip Tag */}
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase font-mono text-[var(--color-accent-matcha)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
        {tooltip}
      </div>

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
  const [origin, setOrigin] = useState({ x: 600, y: 350 });
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 120, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Background Parallax translations
  const bgX = useTransform(smoothMouseX, [-500, 500], [18, -18]);
  const bgY = useTransform(smoothMouseY, [-500, 500], [18, -18]);
  const textParallaxX = useTransform(smoothMouseX, [-500, 500], [-10, 10]);
  const textParallaxY = useTransform(smoothMouseY, [-500, 500], [-10, 10]);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ w, h });
      if (w < 768) {
        setOrigin({ x: w * 0.58, y: h * 0.40 });
      } else {
        setOrigin({ x: w * 0.61, y: h * 0.43 });
      }
    };

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    handleResize();
    window.addEventListener("resize", debouncedResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const getOffsets = () => {
    const isMobile = dimensions.w < 768;
    return {
      r1: isMobile ? 35 : 55,
      r2: isMobile ? 55 : 85,
      insta: isMobile ? { dx: 110, dy: -70 } : { dx: 260, dy: -140 },
      linkedin: isMobile ? { dx: 135, dy: 0 } : { dx: 320, dy: 0 },
      github: isMobile ? { dx: 110, dy: 70 } : { dx: 260, dy: 130 }
    };
  };

  const offsets = getOffsets();
  const rad = Math.PI / 4.2;

  const ix1 = origin.x + offsets.r1 * Math.cos(-rad);
  const iy1 = origin.y + offsets.r1 * Math.sin(-rad);
  const ix2 = origin.x + offsets.r1 * Math.cos(rad);
  const iy2 = origin.y + offsets.r1 * Math.sin(rad);
  const pathInner = `M ${ix1} ${iy1} A ${offsets.r1} ${offsets.r1} 0 0 1 ${ix2} ${iy2}`;

  const ox1 = origin.x + offsets.r2 * Math.cos(-rad);
  const oy1 = origin.y + offsets.r2 * Math.sin(-rad);
  const ox2 = origin.x + offsets.r2 * Math.cos(rad);
  const oy2 = origin.y + offsets.r2 * Math.sin(rad);
  const pathOuter = `M ${ox1} ${oy1} A ${offsets.r2} ${offsets.r2} 0 0 1 ${ox2} ${oy2}`;

  const l_rad = Math.PI / 6.2;
  const sx1 = origin.x + offsets.r2 * Math.cos(-l_rad);
  const sy1 = origin.y + offsets.r2 * Math.sin(-l_rad);
  const sx2 = origin.x + offsets.r2;
  const sy2 = origin.y;
  const sx3 = origin.x + offsets.r2 * Math.cos(l_rad);
  const sy3 = origin.y + offsets.r2 * Math.sin(l_rad);

  const ex1 = origin.x + offsets.insta.dx;
  const ey1 = origin.y + offsets.insta.dy;
  const ex2 = origin.x + offsets.linkedin.dx;
  const ey2 = origin.y + offsets.linkedin.dy;
  const ex3 = origin.x + offsets.github.dx;
  const ey3 = origin.y + offsets.github.dy;

  const skillPills = [
    { label: "CREATIVE TECHNOLOGIST", id: "01" },
    { label: "CINEMATOGRAPHER & EDITOR", id: "02" },
    { label: "AI & WEB ARCHITECT", id: "03" }
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="h-screen flex flex-col justify-between relative overflow-hidden bg-[#050505] snap-start select-none pt-24 pb-8 md:pb-12"
    >
      {/* Background Image Parallax Setup */}
      <motion.div 
        style={{ x: bgX, y: bgY, scale: 1.05 }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Cinematic Background" 
          fill 
          priority
          className="object-cover object-[75%_center] md:object-center opacity-90 transition-opacity duration-1000"
        />
        {/* Cinematic Vignette & Ambient Gradient for Maximum Left-Side Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent lg:w-[75%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-black/40" />
      </motion.div>

      {/* Atmospheric Floating Light Specks / Bokeh Dust */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-[25%] left-[15%] w-1.5 h-1.5 rounded-full bg-[var(--color-accent-matcha)] opacity-40 blur-[1px] animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute top-[65%] left-[20%] w-1 h-1 rounded-full bg-white opacity-30 blur-[0.5px] animate-pulse" style={{ animationDuration: "3s" }} />
        <div className="absolute top-[40%] right-[25%] w-2 h-2 rounded-full bg-[var(--color-accent-warm)] opacity-35 blur-[1px] animate-pulse" style={{ animationDuration: "5s" }} />
      </div>

      {/* Main Content Container (Left Aligned, Clear of Portrait) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 my-auto flex flex-col items-start">
        <motion.div 
          style={{ x: textParallaxX, y: textParallaxY }}
          className="w-full lg:max-w-2xl text-left pointer-events-none select-none will-change-transform"
          initial="hidden"
          animate={{ 
            opacity: isFaceHovered ? 0 : 1,
            scale: isFaceHovered ? 0.96 : 1,
            filter: isFaceHovered ? "blur(8px)" : "blur(0px)"
          }}
          variants={animateHeroText}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-matcha)] animate-pulse shadow-[0_0_8px_var(--color-accent-matcha)]" />
            <span className="text-[11px] font-mono tracking-widest text-white/80 font-medium uppercase">
              AVAILABLE FOR COMMISSIONS • 2026
            </span>
          </div>

          {/* Eyebrow / Subheadline */}
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-[1.5px] bg-[var(--color-accent-warm)]" />
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[var(--color-accent-warm)] font-semibold">
              {heroContent.subheadline}
            </h2>
          </div>

          {/* Hero Title */}
          <h1 className="italic font-black text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.92] tracking-tighter mb-5 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
            {heroContent.headline}
          </h1>

          {/* Floating Interactive Skill Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-5 pointer-events-auto">
            {skillPills.map((pill) => (
              <motion.div
                key={pill.id}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-[var(--color-accent-matcha)] transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-default"
              >
                <span className="text-[10px] font-mono text-[var(--color-accent-matcha)] font-bold">
                  {pill.id}
                </span>
                <span className="text-[11px] sm:text-xs font-mono tracking-wider text-gray-200">
                  {pill.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Description Glass Container */}
          <div className="inline-block p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-lg">
            <p className="text-sm sm:text-base md:text-lg font-light text-gray-300 leading-relaxed">
              {heroContent.description}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Bar: Philosophy Card (Left) & Magnetic Scroll Pill (Right) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        {/* Ikigai Philosophy Quote (Bottom Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: isFaceHovered ? 0 : 1,
            x: isFaceHovered ? -15 : 0
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none select-none"
        >
          <div className="inline-block p-3.5 sm:p-4 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-0.5 border-l-2 border-[var(--color-accent-warm)] pl-3">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 font-mono">
                CORE PHILOSOPHY
              </span>
              <span className="text-lg sm:text-xl font-black text-white" style={{ fontFamily: 'var(--font-japanese)' }}>
                {heroContent.backgroundQuote}
              </span>
              <span className="text-[11px] italic text-gray-400">
                &quot;{heroContent.quoteTranslation}&quot;
              </span>
            </div>
          </div>
        </motion.div>

        {/* Magnetic Interactive Scroll CTA (Bottom Right) */}
        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isFaceHovered ? 0 : 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/15 hover:border-[var(--color-accent-matcha)] text-white/80 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer group mb-1 sm:mb-0"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-gray-300 group-hover:text-[var(--color-accent-matcha)] transition-colors">
            {heroContent.cta} WORKS
          </span>
          <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[var(--color-accent-matcha)] group-hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5 group-hover:translate-y-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </motion.a>
      </div>

      {/* Glowing Star Arcs & Constellation Connections SVG Overlay */}
      {isMounted && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <defs>
            <filter id="glow-accent" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Concentric Inner Arc */}
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

          {/* Concentric Outer Arc */}
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
            stroke="rgba(0, 230, 118, 0.75)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
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
            stroke="rgba(0, 230, 118, 0.75)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
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
            stroke="rgba(0, 230, 118, 0.75)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            filter="url(#glow-accent)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isFaceHovered ? 1 : 0,
              opacity: isFaceHovered ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          />
        </svg>
      )}

      {/* Floating Social Handles with Tooltips */}
      {isMounted && (
        <>
          <SocialBubble 
            href="https://instagram.com/" 
            icon="instagram" 
            isFaceHovered={isFaceHovered} 
            ariaLabel="Instagram"
            tooltip="@shikhar.uikey"
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
            ariaLabel="LinkedIn"
            tooltip="Connect on LinkedIn"
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
            ariaLabel="GitHub"
            tooltip="View GitHub Repos"
            style={{ 
              left: ex3, 
              top: ey3, 
              transform: "translate(-50%, -50%)",
              animationDelay: "2.6s" 
            }}
            onMouseEnter={() => setIsFaceHovered(true)}
            onMouseLeave={() => setIsFaceHovered(false)}
          />
        </>
      )}

      {/* Face Interactive Hover Trigger Zone */}
      <div 
        className="absolute right-0 top-0 w-full md:w-[48%] h-full z-30"
        onMouseEnter={() => setIsFaceHovered(true)}
        onMouseLeave={() => setIsFaceHovered(false)}
      >
        <div className="absolute inset-0 cursor-pointer" />
      </div>
    </section>
  );
};
