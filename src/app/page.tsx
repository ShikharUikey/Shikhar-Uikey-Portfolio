"use client";

import { HeroScene, AboutScene, ExperienceScene, ProjectScene, ContactScene } from "@/components/scenes";

export default function Home() {

  return (
    <main className="relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      
      {/* 
        SCENE ORCHESTRATION 
        Following the Master Prompt v2.0 Architecture, each scene handles its own 
        layout, animations, and data fetching from the content config layer.
      */}
      
      <HeroScene />
      
      <AboutScene />
      
      <ExperienceScene />
      
      <ProjectScene />
      
      <ContactScene />

    </main>
  );
}
