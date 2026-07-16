export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  imagePlaceholder: string;
}

export const projectsContent = {
  sectionLabel: "Selected Works",
  sectionTitle: "What I Create",
  projects: [
    {
      id: "01",
      category: "Case Study",
      title: "AI Vision System",
      description: "Combining computer vision with cinematic aesthetics for real-time video processing.",
      imagePlaceholder: "bg-[#D3CDC4]"
    },
    {
      id: "02",
      category: "Cinematic",
      title: "The Digital Gallery",
      description: "A premium WebGL exhibition space designed to showcase high-end photography.",
      imagePlaceholder: "bg-[#E5E0D8]"
    }
  ] as Project[]
};
