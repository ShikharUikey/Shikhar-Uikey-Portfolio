"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { animateSectionFadeUp } from "@/animations/engine";
import { FlippingTitle } from "@/components/ui/FlippingTitle";

const SocialLink = ({ href, icon, delay }: { href: string; icon: string; delay: number }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: delay 
      }}
      className="p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white hover:text-[var(--color-accent-warm)] hover:border-[var(--color-accent-warm)]/40 hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
    >
      {icon === "instagram" && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )}
      {icon === "linkedin" && (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
          <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
        </svg>
      )}
      {icon === "github" && (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      )}
    </motion.a>
  );
};

export const ContactScene = () => {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <motion.section 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={animateSectionFadeUp}
      className="relative bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex flex-col items-center text-center pt-20 md:pt-32 px-4 snap-start"
    >
      <div className="max-w-2xl relative z-10 flex flex-col items-center justify-center min-h-[40vh]">
        <div className="inline-block p-8 md:p-12 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] mb-8 md:mb-12 text-center">
          <FlippingTitle />
          <p className="text-base sm:text-xl text-[var(--color-text-secondary)] font-light px-2 max-w-2xl mx-auto">
            I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        <div className="h-20 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {!showSocials ? (
              <motion.button
                key="btn"
                onClick={() => setShowSocials(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-[var(--color-accent-warm)] hover:text-white transition-colors duration-300 shadow-xl"
              >
                Start a Conversation
              </motion.button>
            ) : (
              <motion.div
                key="socials"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="flex items-center justify-center gap-6"
              >
                <SocialLink href="https://instagram.com/" icon="instagram" delay={0} />
                <SocialLink href="https://www.linkedin.com/in/shikharuikey/" icon="linkedin" delay={0.1} />
                <SocialLink href="https://github.com/ShikharUikey" icon="github" delay={0.2} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cinematic End Credits / Production Sheet Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-16 border-t border-[var(--color-border)] mt-24 relative z-10 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 md:gap-x-12 max-w-2xl mx-auto text-left">
          
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Directed & Coded By</span>
            <span className="text-[var(--color-text-primary)] font-bold">Shikhar Uikey</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Starring Framework</span>
            <span className="text-[var(--color-text-primary)] font-bold">Next.js & React</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Styling Engine</span>
            <span className="text-[var(--color-text-primary)] font-bold">Tailwind CSS</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Choreography & Motion</span>
            <span className="text-[var(--color-text-primary)] font-bold">Framer Motion</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Executive Producer</span>
            <span className="text-[var(--color-text-primary)] font-bold">Coffee & Curiosity</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)]/30 pb-2">
            <span className="text-gray-500 font-bold">Release Version</span>
            <span className="text-[var(--color-text-primary)] font-bold">2026.07.19-Main</span>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px]">
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/shikharuikey/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-warm)] transition-colors">LinkedIn</a>
            <a href="https://github.com/ShikharUikey" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-warm)] transition-colors">GitHub</a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Shikhar Uikey. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.section>
  );
};
