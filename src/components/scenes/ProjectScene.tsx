"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { animateSectionFadeUp } from "@/animations/engine";
import { projectsContent } from "@/content";
import React from "react";

// Sub-component for Advanced Parallax Card
const ProjectCard = ({ project }: { project: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="focus-item group relative h-[500px] rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] flex flex-col justify-end p-8 cursor-pointer border border-[var(--color-border)] shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-60"></div>
      
      {/* Dynamic Image Placeholder based on content */}
      <motion.div 
        style={{ translateZ: -50 }}
        className={`absolute inset-0 ${project.imagePlaceholder} z-0 transition-transform duration-700 group-hover:scale-110`}
      ></motion.div>
      
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
      </motion.div>
    </motion.div>
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
