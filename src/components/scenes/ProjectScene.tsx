"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { animateSectionFadeUp } from "@/animations/engine";
import { projectsContent } from "@/content";
import { CinematicTitle } from "@/components/ui/CinematicTitle";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  imagePlaceholder?: string;
  link?: string;
  subProjects?: { title: string; link: string }[];
  galleryItems?: { type: string; url: string; quoteJP: string; quoteEN: string }[];
}

// Sub-component for Advanced Parallax Card face
const CardFace = ({ 
  project, 
  isBack = false,
  activeTab
}: { 
  project: Project; 
  isBack?: boolean; 
  activeTab: "created" | "featured";
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  
  // Center back-face card at 180deg, front-face card at 0deg
  const rotateY = useTransform(
    mouseXSpring, 
    [-0.5, 0.5], 
    isBack ? ["170deg", "190deg"] : ["-10deg", "10deg"]
  );

  // Reset tilt coordinates when tabs toggle to ensure cards flip in a flat, clean alignment
  useEffect(() => {
    x.set(0);
    y.set(0);
  }, [activeTab, x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isFaceActive = isBack ? activeTab === "featured" : activeTab === "created";

  const cardContent = (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-60"></div>
      
      {/* Dynamic Image Placeholder based on content using optimized next/image */}
      <motion.div 
        style={{ translateZ: -50 }}
        className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
      >
        {project.image ? (
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover opacity-60"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full ${project.imagePlaceholder}`} />
        )}
      </motion.div>
      
      <motion.div 
        style={{ translateZ: 50 }}
        className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-4"
      >
        <span className="cursive-accent text-2xl mb-2 block text-[var(--color-accent-matcha)]">
          {project.id} / {project.category}
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2 sm:mb-4 drop-shadow-md">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] line-clamp-2 sm:line-clamp-none">
          {project.description}
        </p>

        {((project.subProjects && project.subProjects.length > 0) || (project.galleryItems && project.galleryItems.length > 0)) && (
          <div className="mt-4 sm:mt-6 flex flex-col items-start gap-3 sm:gap-4">
            {project.subProjects && project.subProjects.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.subProjects.map((sub: { title: string; link: string }, idx: number) => (
                  <a
                    key={idx}
                    href={sub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-accent-matcha)] hover:text-black hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <span>{sub.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
            
            {project.id === "01" && (
              <Link 
                href="/codsoft" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent-matcha)] text-black rounded-full text-sm font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-md pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View CodSoft Works</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}

            {project.id === "02" && (
              <Link 
                href="/gallery" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent-warm)] text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-md pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Full Gallery ({project.galleryItems?.length || 4} photos)</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </>
  );

  if (project.link) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] flex flex-col justify-end p-5 sm:p-8 border border-[var(--color-border)] shadow-xl cursor-pointer ${
          isFaceActive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden"
      }}
      className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] flex flex-col justify-end p-5 sm:p-8 border border-[var(--color-border)] shadow-xl cursor-default ${
        isFaceActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {cardContent}
    </motion.div>
  );
};

// 3D Flipping Project Card
const ProjectCard = ({ 
  createdProject, 
  featuredProject, 
  activeTab, 
  index,
  isFocused,
  isAnyHovered
}: { 
  createdProject: Project; 
  featuredProject: Project; 
  activeTab: "created" | "featured"; 
  index: number;
  isFocused: boolean;
  isAnyHovered: boolean;
}) => {
  const isFlipped = activeTab === "featured";

  // React-driven camera-focus optimization: applying scale, opacity, blur on parent wrapper
  const scale = isAnyHovered ? (isFocused ? 1.02 : 0.96) : 1;
  const opacity = isAnyHovered ? (isFocused ? 1 : 0.4) : 1;
  const blurVal = isAnyHovered ? (isFocused ? 0 : 5) : 0;

  return (
    <motion.div 
      animate={{ 
        scale,
        opacity,
        filter: `blur(${blurVal}px)`
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full" 
      style={{ perspective: "1500px" }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 85, 
          damping: 18,
          delay: index * 0.12 // Domino stagger delay
        }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Card Face (What I Created) */}
        <CardFace project={createdProject} isBack={false} activeTab={activeTab} />

        {/* Back Card Face (Featured) */}
        <CardFace project={featuredProject} isBack={true} activeTab={activeTab} />
      </motion.div>
    </motion.div>
  );
};

export const ProjectScene = () => {
  const [activeTab, setActiveTab] = useState<"created" | "featured">("created");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const createdProjects = projectsContent.projects;
  const featuredProjects = projectsContent.featuredProjects || [];

  return (
    <motion.section 
      id="work"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={animateSectionFadeUp}
      className="cinematic-section bg-[var(--color-bg-primary)] snap-start"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Double Tab Header Toggle */}
        <div className="mb-16 flex justify-center md:justify-start">
          <div className="inline-block p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[var(--color-accent-matcha)] block mb-3 text-center md:text-left select-none">
              {projectsContent.sectionLabel}
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
              <button
                onClick={() => setActiveTab("created")}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-matcha)] rounded-lg transition-all"
              >
                <CinematicTitle
                  text="What I Created"
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight transition-colors duration-300 ${
                    activeTab === "created" 
                      ? "text-[var(--color-text-primary)]" 
                      : "text-white/20 hover:text-white/50"
                  }`}
                />
              </button>
              <span className="text-2xl sm:text-4xl font-light text-white/10 select-none hidden sm:inline">/</span>
              <button
                onClick={() => setActiveTab("featured")}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-matcha)] rounded-lg transition-all"
              >
                <CinematicTitle
                  text="Featured"
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight transition-colors duration-300 ${
                    activeTab === "featured" 
                      ? "text-[var(--color-text-primary)]" 
                      : "text-white/20 hover:text-white/50"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* Camera Focus Effect grid layout with React-driven triggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ perspective: "1500px" }}>
          {createdProjects.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="w-full h-full"
            >
              <ProjectCard 
                createdProject={project} 
                featuredProject={featuredProjects[idx] || project}
                activeTab={activeTab}
                index={idx}
                isFocused={hoveredIdx === idx}
                isAnyHovered={hoveredIdx !== null}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
