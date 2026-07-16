"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { HeroScene, AboutScene, ProjectScene, ContactScene } from "@/components/scenes";

export default function Home() {
  // Initialize Global Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Gives a snappy, natural native feel
      wheelMultiplier: 1,
      touchMultiplier: 1,
      smoothWheel: true,
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
