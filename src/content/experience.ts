export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  isEducation?: boolean;
  url?: string;
}

export const experienceContent = {
  sectionLabel: "The Journey",
  sectionTitle: "Experience & Education",
  items: [
    {
      id: "01",
      role: "Artificial Intelligence Intern",
      company: "CodSoft",
      period: "Jun 2024 - Present",
      description: "Successfully completed virtual internship focused on Artificial Intelligence and Machine Learning model creation."
    },
    {
      id: "02",
      role: "Social Media Executive Intern",
      company: "Scratchly",
      period: "May 2024 - Present",
      description: "Contributing to content planning, audience engagement, and brand-building strategies across platforms. Gained practical exposure to startup operations and client collaboration."
    },
    {
      id: "03",
      role: "BCA, Information Technology",
      company: "SAGE University Bhopal",
      period: "Aug 2024 - May 2027",
      description: "Bachelor of Computer Applications student with interests in AI, Web Development, Data Analytics, and Digital Media.",
      isEducation: true,
      url: "https://sageuniversity.edu.in/"
    }
  ] as ExperienceItem[]
};
