"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { HeroScene, AboutScene, ProjectScene, ContactScene } from "@/components/scenes";

export default function Home() {
  // Initialize Global Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      
      {/* 
        SCENE ORCHESTRATION 
        Following the Master Prompt v2.0 Architecture, each scene handles its own 
        layout, animations, and data fetching from the content config layer.
      */}
      
      <HeroScene />
      
      <AboutScene />
      
      <ProjectScene />
      
      <ContactScene />

    </main>
  );
}
