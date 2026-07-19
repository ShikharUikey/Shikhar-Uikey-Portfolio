"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsContent } from "@/content";
import Link from "next/link";
import Image from "next/image";

const VideoThumbnail = ({ src, isHovered }: { src: string; isHovered: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="none"
      className="w-full h-full object-cover select-none pointer-events-none"
    />
  );
};

export default function GalleryPage() {
  const galleryProject = projectsContent.projects.find(p => p.id === "02");
  const items = galleryProject?.galleryItems || [];
  
  const [selectedItem, setSelectedItem] = useState<{type: string, url: string, quoteJP: string, quoteEN: string} | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [radius, setRadius] = useState({ rx: 320, ry: 220 });
  const [dimensions, setDimensions] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ w, h });
      if (w < 640) {
        setRadius({ rx: w * 0.32, ry: h * 0.15 });
      } else if (w < 1024) {
        setRadius({ rx: w * 0.28, ry: h * 0.18 });
      } else {
        setRadius({ rx: w * 0.25, ry: h * 0.22 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

  return (
    <main className="relative h-screen w-screen bg-black text-[var(--color-text-primary)] overflow-hidden flex items-center justify-center">
      {/* Constellation SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Draw radial rays from center to cards */}
        {items.map((_, idx) => {
          const angle = (idx / items.length) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius.rx;
          const y = Math.sin(angle) * radius.ry;
          const cx = dimensions.w / 2;
          const cy = dimensions.h / 2;

          const isHovered = hoveredIdx === idx;

          return (
            <motion.line
              key={`ray-${idx}`}
              x1={cx}
              y1={cy}
              x2={cx + x}
              y2={cy + y}
              initial={false}
              animate={{
                stroke: isHovered ? "rgba(0, 230, 118, 0.4)" : "rgba(255, 255, 255, 0.05)",
                strokeWidth: isHovered ? 1.5 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}

        {/* Draw orbit constellation lines connecting cards */}
        {items.map((_, idx) => {
          const angle1 = (idx / items.length) * 2 * Math.PI - Math.PI / 2;
          const angle2 = (((idx + 1) % items.length) / items.length) * 2 * Math.PI - Math.PI / 2;

          const x1 = Math.cos(angle1) * radius.rx;
          const y1 = Math.sin(angle1) * radius.ry;
          const x2 = Math.cos(angle2) * radius.rx;
          const y2 = Math.sin(angle2) * radius.ry;

          const cx = dimensions.w / 2;
          const cy = dimensions.h / 2;

          const isLineActive = hoveredIdx === idx || hoveredIdx === (idx + 1) % items.length;

          return (
            <motion.line
              key={`orbit-${idx}`}
              x1={cx + x1}
              y1={cy + y1}
              x2={cx + x2}
              y2={cy + y2}
              initial={false}
              animate={{
                stroke: isLineActive ? "rgba(0, 230, 118, 0.5)" : "rgba(255, 255, 255, 0.1)",
                strokeWidth: isLineActive ? 2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </svg>
      {/* Return Button */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 z-30"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-matcha)] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span className="font-mono tracking-widest uppercase text-xs">Return</span>
        </Link>
      </motion.div>

      {/* Orbit Centerpiece */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border border-white/10 rounded-full border-dashed"
          />
          <div className="absolute w-2 h-2 bg-[var(--color-accent-matcha)] rounded-full animate-ping" />
          <span className="absolute text-[8px] font-mono tracking-[0.3em] text-white/40 mt-20">EXHB.02</span>
        </div>
      </div>

      {/* Circular Carousel */}
      <div className="relative w-full h-full max-w-7xl max-h-[80vh] z-10">
        {items.map((item, idx) => {
          // Angle offset by -90 deg so the first item starts at the top center
          const angle = (idx / items.length) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius.rx;
          const y = Math.sin(angle) * radius.ry;

          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isAnyHovered ? (isHovered ? 1.0 : 0.25) : 0.75,
                scale: isHovered ? 1.35 : 1.0,
                x,
                y,
                filter: isAnyHovered ? (isHovered ? "grayscale(0%) blur(0px)" : "grayscale(80%) blur(1px)") : "grayscale(50%) blur(0px)",
                zIndex: isHovered ? 40 : 10
              }}
              transition={{ 
                type: "spring", 
                stiffness: 120, 
                damping: 18,
                opacity: { duration: 0.3 }
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-15 sm:w-32 sm:h-24 md:w-52 md:h-36 rounded-md overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setSelectedItem(item as any)}
            >
              {item.type === "photo" ? (
                <Image 
                  src={item.url} 
                  alt={`Exhibition piece ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 128px, 208px"
                  className="object-cover select-none pointer-events-none"
                  loading="lazy"
                />
              ) : (
                <VideoThumbnail src={item.url} isHovered={isHovered} />
              )}
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Editorial Details Panel */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center select-none pointer-events-none z-30">
        <AnimatePresence mode="wait">
          {hoveredIdx !== null ? (
            <motion.div
              key={hoveredIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] font-mono text-[var(--color-accent-matcha)] tracking-[0.3em] uppercase mb-1">
                Piece 0{hoveredIdx + 1}
              </span>
              <h2 className="text-xl sm:text-3xl font-japanese font-bold text-white tracking-widest mb-1.5" style={{ fontFamily: 'var(--font-japanese)' }}>
                {items[hoveredIdx].quoteJP}
              </h2>
              <p className="text-[10px] sm:text-xs text-[var(--color-text-secondary)] italic uppercase tracking-[0.2em] font-light">
                "{items[hoveredIdx].quoteEN}"
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-[var(--color-text-secondary)] font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] font-light"
            >
              <span>EXHIBITION 02 — THE DIGITAL GALLERY</span>
              <span className="text-[9px] mt-1.5 text-gray-600 tracking-[0.2em]">HOVER TO EXPLORE FRAMES</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors z-[60]"
              onClick={() => setSelectedItem(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "photo" ? (
                <img 
                  src={selectedItem.url} 
                  alt="Gallery Preview"
                  className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm"
                />
              ) : (
                <video 
                  src={selectedItem.url} 
                  autoPlay 
                  controls 
                  playsInline
                  className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm"
                />
              )}
              
              {/* Quote below the media preview */}
              <div className="mt-8 text-center px-4">
                <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-text-primary)] mb-2 tracking-widest font-light">
                  {selectedItem.quoteJP}
                </h3>
                <p className="text-sm md:text-base text-[var(--color-accent-matcha)] italic font-light tracking-wide uppercase">
                  "{selectedItem.quoteEN}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
