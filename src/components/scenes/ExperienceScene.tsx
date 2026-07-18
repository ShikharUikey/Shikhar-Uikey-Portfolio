"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceContent } from "@/content";

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
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
          <span className="text-sm font-bold tracking-widest text-[var(--color-text-secondary)] uppercase">
            {item.period}
          </span>
        </div>

        {/* Desktop timeline line & dot */}
        <div className="hidden md:flex col-span-1 justify-center relative">
          <div className="absolute top-2 bottom-[-4rem] w-px bg-gradient-to-b from-[var(--color-border)] via-[var(--color-border)] to-transparent group-hover:from-[var(--color-accent-matcha)] transition-colors duration-500"></div>
          <div className="absolute top-2 w-3 h-3 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-border)] group-hover:border-[var(--color-accent-matcha)] group-hover:shadow-[0_0_15px_var(--color-accent-matcha)] transition-all duration-500 z-10"></div>
        </div>

        {/* Content Column */}
        <div className="col-span-3 pb-12">
          <div className="inline-block p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              {item.role}
            </h3>
            <h4 className={`text-lg font-medium mb-4 ${item.isEducation ? 'text-[var(--color-accent-warm)]' : 'text-[var(--color-accent-matcha)]'}`}>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-2 transition-all">
                  {item.company}
                </a>
              ) : (
                item.company
              )}
            </h4>
            <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">
              {item.description}
            </p>
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
            <h2 className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)]">
              {experienceContent.sectionTitle}
            </h2>
          </div>
        </div>

        <div className="relative">
          {experienceContent.items.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
};
