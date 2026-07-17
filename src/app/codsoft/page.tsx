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
    <main className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pt-32 pb-24">
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
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg tracking-tight">
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
              className="group relative rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-col md:flex-row p-8 md:p-12 gap-8 shadow-2xl transition-all duration-500 hover:border-[var(--color-accent-matcha)]"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-r from-[var(--color-accent-matcha)] to-transparent pointer-events-none"></div>
              
              {/* Number indicator */}
              <div className="hidden md:block text-8xl font-black text-[var(--color-text-secondary)] opacity-10 font-mono tracking-tighter absolute -right-4 -top-8 select-none">
                0{idx + 1}
              </div>

              <div className="flex-1 flex flex-col justify-center relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-matcha)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech?.map((techItem, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[var(--color-text-secondary)] text-[var(--color-text-secondary)] group-hover:border-[var(--color-accent-matcha)]/50 transition-colors"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 self-start px-8 py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 hover:bg-[var(--color-accent-matcha)] transition-all shadow-lg"
                >
                  <span>View on GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </main>
  );
}
