"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceContent, ExperienceItem } from "@/content";
import { CinematicTitle } from "@/components/ui/CinematicTitle";
import { CinematicRevealText } from "@/components/ui/CinematicRevealText";

const TimelineItem = ({ item }: { item: ExperienceItem }) => {
  const itemRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 90%", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ opacity, y }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:grid md:grid-cols-5 gap-8 items-start relative group">
        
        {/* Mobile timeline line */}
        <div className="md:hidden absolute left-0 top-2 bottom-[-2rem] w-px bg-gradient-to-b from-[var(--color-accent-matcha)] to-[var(--color-border)] opacity-50"></div>
        <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[var(--color-accent-matcha)] shadow-[0_0_10px_var(--color-accent-matcha)]"></div>

        {/* Date / Period Column */}
        <div className="col-span-1 md:text-right pt-1 mb-2 md:mb-0">
          <CinematicRevealText revealText={item.periodJap} maskRadius={60} textSizeClass="text-sm tracking-wider font-bold">
            <span className="text-sm font-bold tracking-widest text-[var(--color-text-secondary)] uppercase block">
              {item.period}
            </span>
          </CinematicRevealText>
        </div>

        {/* Desktop timeline line & dot */}
        <div className="hidden md:flex col-span-1 justify-center relative">
          <div className="absolute top-2 bottom-[-4rem] w-px bg-gradient-to-b from-[var(--color-border)] via-[var(--color-border)] to-transparent group-hover:from-[var(--color-accent-matcha)] transition-colors duration-500"></div>
          <div className="absolute top-2 w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-border)] group-hover:border-[var(--color-accent-matcha)] group-hover:shadow-[0_0_15px_var(--color-accent-matcha)] transition-all duration-500 z-10"></div>
        </div>

        {/* Content Column */}
        <div className="col-span-3 pb-12">
          <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              {item.role}
            </h3>
            <h4 className={`text-lg font-medium mb-4 ${item.isEducation ? 'text-[var(--color-accent-warm)]' : 'text-[var(--color-accent-matcha)]'}`}>
              {item.internalRoute ? (
                <Link href={item.internalRoute} className="hover:underline underline-offset-4 decoration-2 transition-all inline-flex items-center gap-1.5">
                  <span>{item.company}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              ) : item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-2 transition-all">
                  {item.company}
                </a>
              ) : (
                item.company
              )}
            </h4>
            <p className="text-[var(--color-text-secondary)] leading-relaxed font-light mb-4">
              {item.description}
            </p>

            {/* Direct Project Showcase Link Button */}
            {item.internalRoute && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href={item.internalRoute}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent-matcha)] text-black font-semibold text-sm rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,230,118,0.25)] group/btn"
                >
                  <span>{item.actionLabel || "View Project Showcase"}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover/btn:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceScene = () => {
  return (
    <section className="cinematic-section bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] py-32">
      <div className="max-w-5xl mx-auto w-full relative z-10 px-6">
        
        <div className="mb-20 text-center md:text-left">
          <div className="inline-block p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="text-sm tracking-[0.2em] uppercase font-bold text-[var(--color-accent-warm)] block mb-2">
              {experienceContent.sectionLabel}
            </span>
            <CinematicRevealText revealText="経歴と教育" maskRadius={100} textSizeClass="text-4xl md:text-6xl">
              <CinematicTitle
                text={experienceContent.sectionTitle}
                className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)]"
              />
            </CinematicRevealText>
          </div>
        </div>

        <div className="relative">
          {experienceContent.items.map((item) => (
            <TimelineItem key={item.id} item={item as ExperienceItem} />
          ))}
        </div>
        
      </div>
    </section>
  );
};
