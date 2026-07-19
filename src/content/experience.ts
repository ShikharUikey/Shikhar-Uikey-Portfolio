export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  periodJap: string;
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
      period: "June - July 2026",
      periodJap: "2026年6月〜7月",
      description: "Successfully completed virtual internship focused on Artificial Intelligence and Machine Learning model creation.",
      url: "https://www.codsoft.in/"
    },
    {
      id: "02",
      role: "Social Media Executive Intern",
      company: "Scratchly",
      period: "May 2026 - Present",
      periodJap: "2026年5月〜現在",
      description: "Contributing to content planning, audience engagement, and brand-building strategies across platforms. Gained practical exposure to startup operations and client collaboration.",
      url: "https://www.linkedin.com/company/scratchly/"
    },
    {
      id: "03",
      role: "BCA, Information Technology",
      company: "SAGE University Bhopal",
      period: "Aug 2024 - May 2027",
      periodJap: "2024年8月〜2027年5月",
      description: "Bachelor of Computer Applications student with interests in AI, Web Development, Data Analytics, and Digital Media.",
      isEducation: true,
      url: "https://sageuniversity.edu.in/"
    }
  ] as ExperienceItem[]
};
