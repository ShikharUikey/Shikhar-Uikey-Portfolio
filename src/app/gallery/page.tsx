"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsContent } from "@/content";
import Link from "next/link";

export default function GalleryPage() {
  const galleryProject = projectsContent.projects.find(p => p.id === "02");
  const items = galleryProject?.galleryItems || [];
  
  const [selectedItem, setSelectedItem] = useState<{type: string, url: string, quoteJP: string, quoteEN: string} | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <main className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-matcha)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span className="font-medium tracking-wider uppercase text-sm">Return to Lobby</span>
          </Link>
        </motion.div>

        {/* Exhibition Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 md:mb-24 text-center border-b border-[var(--color-border)] pb-10 md:pb-16"
        >
          <span className="cursive-accent text-3xl block text-[var(--color-accent-matcha)] mb-6">
            The Digital Gallery
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 md:mb-8 drop-shadow-xl tracking-tighter uppercase">
            EXHIBITION 02
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed px-2">
            A curated space of ephemeral moments, guided by the timeless wisdom of Ikigai.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              {/* Media Container */}
              <div 
                className="relative group overflow-hidden rounded-sm bg-[#111] shadow-2xl mb-8 border border-[var(--color-border)] cursor-pointer"
                onClick={() => setSelectedItem(item as any)}
              >
                {item.type === "photo" ? (
                  <img 
                    src={item.url} 
                    alt={`Gallery exhibition piece ${idx + 1}`}
                    className="w-full h-auto aspect-[3/4] sm:aspect-[4/5] md:aspect-square object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                ) : (
                  <video 
                    src={item.url} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto aspect-[3/4] sm:aspect-[4/5] md:aspect-square object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                )}
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Typography / Quote */}
              <div className="flex flex-col items-center text-center px-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--color-text-primary)] mb-3 md:mb-4 tracking-widest font-light">
                  {item.quoteJP}
                </h3>
                <p className="text-sm sm:text-lg text-[var(--color-accent-matcha)] italic font-light tracking-wide uppercase">
                  "{item.quoteEN}"
                </p>
                
                {/* Decorative Line */}
                <div className="w-12 h-[1px] bg-[var(--color-text-secondary)]/30 mt-8"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-primary)]/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
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
