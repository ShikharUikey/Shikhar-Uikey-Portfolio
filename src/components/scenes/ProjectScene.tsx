"use client";

import { motion } from "framer-motion";
import { animateSectionFadeUp } from "@/animations/engine";
import { projectsContent } from "@/content";

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
        <div className="camera-focus-container grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsContent.projects.map((project) => (
            <div 
              key={project.id}
              className="focus-item group relative h-[500px] rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] flex flex-col justify-end p-8 cursor-pointer border border-[var(--color-border)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent opacity-80 z-10 transition-opacity group-hover:opacity-60"></div>
              
              {/* Dynamic Image Placeholder based on content */}
              <div className={`absolute inset-0 ${project.imagePlaceholder} z-0 transition-transform duration-700 group-hover:scale-105`}></div>
              
              <div className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-4">
                <span className="cursive-accent text-2xl mb-2 block">
                  {project.id} / {project.category}
                </span>
                <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
