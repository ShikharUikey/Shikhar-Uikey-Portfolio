"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { animateSectionFadeUp } from "@/animations/engine";
import { projectsContent } from "@/content";
import React from "react";
import Link from "next/link";

// Sub-component for Advanced Parallax Card
const ProjectCard = ({ project }: { project: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  const Component: any = project.link ? motion.a : motion.div;

  return (
    <Component 
      href={project.link}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`focus-item group relative h-[500px] rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] flex flex-col justify-end p-8 border border-[var(--color-border)] shadow-xl block ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-60"></div>
      
      {/* Dynamic Image Placeholder based on content */}
      <motion.div 
        style={{ translateZ: -50 }}
        className={`absolute inset-0 ${project.imagePlaceholder} z-0 transition-transform duration-700 group-hover:scale-110`}
      >
        {project.image && (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
        )}
      </motion.div>
      
      <motion.div 
        style={{ translateZ: 50 }}
        className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-4"
      >
        <span className="cursive-accent text-2xl mb-2 block text-[var(--color-accent-matcha)]">
          {project.id} / {project.category}
        </span>
        <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 drop-shadow-md">
          {project.title}
        </h3>
        <p className="text-[var(--color-text-secondary)]">
          {project.description}
        </p>

        {((project.subProjects && project.subProjects.length > 0) || (project.galleryItems && project.galleryItems.length > 0)) && (
          <div className="mt-6 flex flex-col items-start gap-4">
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
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] rounded-full font-bold hover:bg-[var(--color-accent-matcha)] hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <span>View Showcase Page ✨</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}

            {project.id === "02" && (
              <Link 
                href="/gallery" 
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] rounded-full font-bold hover:bg-[var(--color-accent-matcha)] hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <span>Enter Exhibition 🖼️</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </Component>
  );
};

export const ProjectScene = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={animateSectionFadeUp}
      className="cinematic-section bg-[var(--color-bg-primary)]"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="mb-16 text-center md:text-left">
          <span className="text-sm tracking-[0.2em] uppercase font-bold text-[var(--color-accent-matcha)]">
            {projectsContent.sectionLabel}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-2 text-[var(--color-text-primary)]">
            {projectsContent.sectionTitle}
          </h2>
        </div>
        
        {/* Signature Element: Camera Focus Effect */}
        <div className="camera-focus-container grid grid-cols-1 md:grid-cols-2 gap-12" style={{ perspective: "1000px" }}>
          {projectsContent.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
