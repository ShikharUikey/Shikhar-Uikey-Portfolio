"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { projectsContent } from "@/content";
import Link from "next/link";

export default function CodsoftPage() {
  // Find the Codsoft project data
  const codsoftProject = projectsContent.projects.find(p => p.id === "01");
  const subProjects = codsoftProject?.subProjects || [];

  // Scroll to top on mount in case we came from a scrolled position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto w-full px-6 relative z-10">
        
        {/* Back Button */}
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
            <span className="font-medium tracking-wider uppercase text-sm">Back to Home</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 text-center md:text-left"
        >
          <span className="cursive-accent text-3xl md:text-4xl block text-[var(--color-accent-matcha)] mb-4">
            AI & Machine Learning
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 drop-shadow-lg tracking-tight">
            CODSOFT <br className="hidden md:block"/> INTERNSHIP
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
            {codsoftProject?.description}
          </p>
        </motion.div>

        {/* Grid Layout for Showcases */}
        <div className="grid grid-cols-1 gap-12">
          {subProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-col md:flex-row p-5 sm:p-8 md:p-12 gap-6 md:gap-8 shadow-2xl transition-all duration-500 hover:border-[var(--color-accent-matcha)]"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-r from-[var(--color-accent-matcha)] to-transparent pointer-events-none"></div>
              
              {/* Number indicator */}
              <div className="hidden md:block text-8xl font-black text-[var(--color-text-secondary)] opacity-10 font-mono tracking-tighter absolute -right-4 -top-8 select-none">
                0{idx + 1}
              </div>

              <div className="flex-1 flex flex-col justify-center relative z-10">
                <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-matcha)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-6 md:mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-10">
                  {project.tech?.map((techItem, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[var(--color-text-secondary)] text-[var(--color-text-secondary)] group-hover:border-[var(--color-accent-matcha)]/50 transition-colors"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 md:px-8 md:py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:scale-105 hover:bg-[var(--color-accent-matcha)] transition-all shadow-lg"
                  >
                    <span>View on GitHub</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                  
                  {project.linkedinUrl && (
                    <a 
                      href={project.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 md:px-8 md:py-4 bg-[#0a66c2] text-white rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:scale-105 hover:bg-[#004182] transition-all shadow-lg"
                    >
                      <span>Video on LinkedIn</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </main>
  );
}
