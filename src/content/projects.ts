export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  imagePlaceholder: string;
  link?: string;
  image?: string;
  subProjects?: { 
    title: string; 
    link: string;
    linkedinUrl?: string;
    description?: string;
    tech?: string[];
  }[];
  galleryItems?: {
    type: "photo" | "video";
    url: string;
    quoteJP: string;
    quoteEN: string;
  }[];
}

export const projectsContent = {
  sectionLabel: "Selected Works",
  sectionTitle: "What I Create",
  projects: [
    {
      id: "01",
      category: "AI & Machine Learning",
      title: "CODSOFT PROJECTS",
      description: "A collection of 5 distinct AI/ML and Python applications built during my Artificial Intelligence Internship at CodSoft.",
      imagePlaceholder: "bg-[#161b22]",
      image: "/images/codsoft.jpg",
      subProjects: [
        { 
          title: "Rule-Based Chatbot", 
          link: "https://github.com/ShikharUikey/CODSOFT-01.git",
          linkedinUrl: "https://www.linkedin.com/posts/shikharuikey_codsoft-artificialintelligence-python-ugcPost-7475905080949379073-qxS4/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGjy4ikBwIREJ3SanHnUVY_osXwf58RGoh0",
          description: "A Python GUI-based chatbot built with Tkinter featuring predefined rules, pattern matching, and an interactive dark-themed UI.",
          tech: ["Python", "Tkinter", "GUI", "Pattern Matching"]
        },
        { 
          title: "Tic Tac Toe AI", 
          link: "https://github.com/ShikharUikey/CODSOFT-02.git",
          linkedinUrl: "https://www.linkedin.com/posts/shikharuikey_codsoft-artificialintelligence-python-ugcPost-7475905758107164674-P_Nb/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGjy4ikBwIREJ3SanHnUVY_osXwf58RGoh0",
          description: "An unbeatable Tic Tac Toe game developed with an intelligent opponent powered by the Minimax algorithm.",
          tech: ["Python", "Minimax Algorithm", "Game Theory", "Tkinter"]
        },
        { 
          title: "Image Captioning", 
          link: "https://github.com/ShikharUikey/CODSOFT-03.git",
          linkedinUrl: "https://www.linkedin.com/posts/shikharuikey_codsoft-artificialintelligence-python-ugcPost-7475922260541800448-TUbm/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGjy4ikBwIREJ3SanHnUVY_osXwf58RGoh0",
          description: "An AI vision model capable of automatically generating natural language captions for input images.",
          tech: ["Python", "Deep Learning", "Computer Vision", "NLP"]
        },
        { 
          title: "Product Recommendation", 
          link: "https://github.com/ShikharUikey/CODSOFT-04.git",
          linkedinUrl: "https://www.linkedin.com/posts/shikharuikey_codsoft-artificialintelligence-python-ugcPost-7475923470976196609-NPVU/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGjy4ikBwIREJ3SanHnUVY_osXwf58RGoh0",
          description: "A machine learning system that suggests products to users based on ratings, prices, and intelligent scoring algorithms.",
          tech: ["Python", "Pandas", "Streamlit", "Machine Learning"]
        },
        { 
          title: "Face Detection AI", 
          link: "https://github.com/ShikharUikey/CODSOFT-05.git",
          linkedinUrl: "https://www.linkedin.com/posts/shikharuikey_codsoft-artificialintelligence-python-ugcPost-7475924185928740864-oFHk/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGjy4ikBwIREJ3SanHnUVY_osXwf58RGoh0",
          description: "Real-time human face detection application using OpenCV Haar Cascade Classifiers for live webcam feeds.",
          tech: ["Python", "OpenCV", "Haar Cascades", "Computer Vision"]
        }
      ]
    },
    {
      id: "02",
      category: "Cinematic",
      title: "The Digital Gallery",
      description: "A premium WebGL exhibition space designed to showcase high-end photography.",
      image: "/images/gallery.jpg",
      imagePlaceholder: "bg-[#E5E0D8]",
      galleryItems: [
        {
          type: "photo",
          url: "/images/gallery/photo4.jpg",
          quoteJP: "木漏れ日",
          quoteEN: "Sunlight filtering through trees."
        },
        {
          type: "photo",
          url: "/images/gallery/photo1.jpg",
          quoteJP: "いまここ",
          quoteEN: "Here, now."
        },
        {
          type: "photo",
          url: "/images/gallery/photo2.jpg",
          quoteJP: "しあわせはいつも自分の心がきめる",
          quoteEN: "Happiness is always determined by your heart."
        },
        {
          type: "photo",
          url: "/images/gallery/photo3.jpg",
          quoteJP: "七転び八起き",
          quoteEN: "Fall seven times, rise eight."
        },
        {
          type: "video",
          url: "/images/gallery/video1.mp4",
          quoteJP: "そのままでいいがな",
          quoteEN: "Keep going; don't change your path."
        },
        {
          type: "video",
          url: "/images/gallery/video2.mp4",
          quoteJP: "一期一会",
          quoteEN: "One life, one encounter."
        },
        {
          type: "video",
          url: "/images/gallery/video3.mp4",
          quoteJP: "花鳥風月",
          quoteEN: "The beauty of nature."
        },
        {
          type: "video",
          url: "/images/gallery/video4.mp4",
          quoteJP: "無常",
          quoteEN: "Nothing lasts forever."
        },
        {
          type: "video",
          url: "/images/gallery/video5.mp4",
          quoteJP: "侘寂",
          quoteEN: "Beauty in imperfection."
        }
      ]
    },
    {
      id: "03",
      category: "Landing Page",
      title: "iQOO Neo 7",
      description: "A high-performance promotional landing page built for the iQOO Neo 7 smartphone launch.",
      imagePlaceholder: "bg-[#111111]",
      link: "https://iqoo-neo7-landing-page.vercel.app/",
      image: "/images/iqoo.jpg"
    },
    {
      id: "04",
      category: "Web Application",
      title: "Directors Match",
      description: "An AI-powered cinematic location scouting platform that helps filmmakers discover perfect shooting locations using intelligent reference-image matching.",
      imagePlaceholder: "bg-[#1A1A1A]"
    }
  ] as Project[]
};
