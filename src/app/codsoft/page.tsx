"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { projectsContent } from "@/content";
import Link from "next/link";
import Image from "next/image";

// Metadata mapping for collage grid structure
const projectMetadata = [
  {
    image: "/images/codsoft/chatbot.jpg",
    spanClass: "col-span-1 md:col-span-2",
    flexClass: "flex-col md:flex-row-reverse",
    imgContainerClass: "w-full md:w-[40%] h-52 md:h-auto min-h-[220px] relative",
  },
  {
    image: "/images/codsoft/tictactoe.jpg",
    spanClass: "col-span-1",
    flexClass: "flex-col",
    imgContainerClass: "w-full h-48 sm:h-56 relative",
  },
  {
    image: "/images/codsoft/captioning.jpg",
    spanClass: "col-span-1",
    flexClass: "flex-col",
    imgContainerClass: "w-full h-48 sm:h-56 relative",
  },
  {
    image: "/images/codsoft/recommendation.jpg",
    spanClass: "col-span-1 md:col-span-3",
    flexClass: "flex-col md:flex-row",
    imgContainerClass: "w-full md:w-[45%] h-56 md:h-auto min-h-[260px] relative",
  },
  {
    image: "/images/codsoft/face.jpg",
    spanClass: "col-span-1 md:col-span-2",
    flexClass: "flex-col md:flex-row",
    imgContainerClass: "w-full md:w-[40%] h-52 md:h-auto min-h-[220px] relative",
  },
];

export default function CodsoftPage() {
  const codsoftProject = projectsContent.projects.find(p => p.id === "01");
  const subProjects = codsoftProject?.subProjects || [];

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
            <span className="font-mono tracking-widest uppercase text-xs">Back to Home</span>
          </Link>
        </motion.div>

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 text-center md:text-left"
        >
          <span className="cursive-accent text-3xl md:text-4xl block text-[var(--color-accent-matcha)] mb-4">
            AI & Machine Learning
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 tracking-tight uppercase">
            CODSOFT INTERNSHIP
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-light">
            {codsoftProject?.description}
          </p>
        </motion.div>

        {/* Staggered Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-flow-dense">
          {subProjects.map((project, idx) => {
            const meta = projectMetadata[idx] || projectMetadata[0];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex ${meta.flexClass} ${meta.spanClass} transition-all duration-500 hover:border-[var(--color-accent-matcha)]/40`}
              >
                {/* Thumbnail Image Container */}
                <div className={meta.imgContainerClass}>
                  <Image 
                    src={meta.image} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none md:hidden" />
                </div>

                {/* Card Text Content */}
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 relative z-10">
                  <div>
                    {/* Index count */}
                    <div className="text-xs font-mono text-[var(--color-accent-matcha)] tracking-widest mb-3 uppercase">
                      Project 0{idx + 1}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-matcha)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-6 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                      {project.tech?.map((techItem, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-white/10 text-white/60 bg-white/5"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-xs hover:bg-[var(--color-accent-matcha)] hover:text-white transition-colors shadow-md"
                      >
                        <span>GitHub</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </a>
                      
                      {project.linkedinUrl && (
                        <a 
                          href={project.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a66c2] text-white rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-xs hover:bg-[#004182] transition-colors shadow-md"
                        >
                          <span>Video</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </main>
  );
}
