export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  architecture?: string[];
  metrics?: string[];
  tags: string[];
  category: string;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  inDevelopment?: boolean;
  accentColor?: string;
}

export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export interface Capability {
  title: string;
  badge: string;
  description: string;
  features: string[];
  technologies: string[];
}

export interface StackGroup {
  label: string;
  items: string[];
  copies: number;
  duration: number;
  reverse?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  duration?: string;
  skills?: string[];
  description: string;
  image: string;
  badge?: string;
}

export interface Interest {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: "gamepad" | "code" | "sparkles";
}

export const PORTFOLIO_CONFIG = {
  profile: {
    name: "Ugesh Kumar",
    firstName: "Ugesh",
    lastName: "Kumar",
    wordmark: "UGESH",
    role: {
      bold: "Frontend",
      light: "Developer",
    },
    tagline:
      "Building interactive digital experiences through frontend development, creative problem-solving, and modern technology.",
    availability: "Available for Frontend Development",
    location: "Bengaluru, India · Open to Remote",
    // NOTE: Configurable contact details
    email: "ugesh.official13@gmail.com",
    portraitUrl: "/portrait.jpg",
    // NOTE: Configurable social links
    socials: {
      github: "https://github.com/ugesh13/",
      linkedin: "https://www.linkedin.com/in/ugesh16",
      twitter: "",
    },
  },

  theme: {
    accent: "#ff5c3d", // High-Energy Neon Orange
    accentHover: "#ff7a5f",
    bg: "#050505",
    bgCard: "#0d0d0d",
    border: "rgba(255, 255, 255, 0.1)",
  },

  metrics: [
    {
      value: "05",
      label: "Verified Credentials",
      detail: "Certifications in AI fluency, generative AI, coding foundations & hackathons",
    },
    {
      value: "02",
      label: "Hackathon Competitions",
      detail: "Active participant in Smart India Hackathon & AVISHKAR 2026 hackathons",
    },
    {
      value: "100%",
      label: "Hands-on Learning",
      detail: "Continuous learning and experimentation with frontend & modern AI tools",
    },
    {
      value: "0 → 1",
      label: "Idea to Prototype",
      detail: "Turning ideas and requirements into working, interactive digital products",
    },
  ] as Metric[],

  capabilities: [
    {
      title: "Frontend Development & Interactive UI",
      badge: "Core Engineering",
      description:
        "I build fast web apps using React and modern JavaScript. My focus is clean code, smooth animations, and simple layouts that work on any screen.",
      features: [
        "Modular, maintainable React component architecture & hooks",
        "Responsive cross-device layouts with modern CSS & styling",
        "Interactive DOM experiences, event handling & dynamic state management",
      ],
      technologies: ["JavaScript (ES6+)", "React", "HTML5", "CSS3", "DOM API"],
    },
    {
      title: "AI-Assisted Development & Vibe Coding",
      badge: "Modern Workflow",
      description:
        "Using AI coding tools and prompt techniques to build prototypes faster. From idea to working code, I build and debug with speed.",
      features: [
        "Rapid prototyping and vibe coding workflows with AI assistants",
        "Targeted prompt engineering for UI generation and component scaffolding",
        "Enhanced development velocity with Claude, Cursor, ChatGPT, Antigravity & Gemini",
      ],
      technologies: ["Claude", "Antigravity", "Cursor", "ChatGPT", "Gemini", "Prompt Engineering"],
    },
    {
      title: "Data Analytics & Dashboarding",
      badge: "Analytics & Insights",
      description:
        "Turning raw data into clear visual reports. I use Excel formulas and pivot tables to find key trends and help teams make smart choices.",
      features: [
        "Data analysis, cleaning, and metric formulation",
        "Advanced Excel formulas, pivot tables, and automated summarization",
        "Visual reporting dashboards for actionable decision-making",
      ],
      technologies: ["Data Analysis", "Advanced Excel", "Excel Formulas", "Pivot Tables", "Dashboards"],
    },
    {
      title: "Database Querying & Schema Design",
      badge: "Data Foundations",
      description:
        "Storing and searching data using SQL and NoSQL. I set up clean database tables so apps load fast and keep records safe.",
      features: [
        "Relational database querying with SQL and table schema modeling",
        "NoSQL document structures for flexible application data persistence",
        "Structured data modeling connecting frontend interfaces to databases",
      ],
      technologies: ["SQL", "NoSQL", "Data Modeling", "Relational Schemas"],
    },
  ] as Capability[],

  /* Tech stack marquees — one row per layer (About section) */
  stack: [
    {
      label: "Frontend & UI",
      items: [
        "JavaScript (ES6+)",
        "React",
        "HTML5",
        "CSS3",
        "Component Architecture",
        "Responsive UI",
        "State Management",
        "Interactive DOM",
      ],
      copies: 2,
      duration: 50,
    },
    {
      label: "AI Tools & Workflows",
      items: [
        "Vibe Coding",
        "Prompt Engineering",
        "Claude",
        "Antigravity",
        "Cursor",
        "ChatGPT",
        "Gemini",
        "Rapid Prototyping",
      ],
      copies: 2,
      duration: 44,
      reverse: true,
    },
    {
      label: "Data & Analytics",
      items: [
        "Data Analysis",
        "Advanced Excel",
        "Excel Formulas",
        "Pivot Tables",
        "Dashboards",
        "Data Modeling",
        "Reporting",
      ],
      copies: 2,
      duration: 52,
    },
    {
      label: "Databases & Strengths",
      items: [
        "SQL",
        "NoSQL",
        "Problem Solving",
        "Turning Ideas to Products",
        "Rapid Prototyping",
        "Exploring New Tech",
      ],
      copies: 2,
      duration: 46,
      reverse: true,
    },
  ] as StackGroup[],

  certificates: [
    {
      id: "linkedin-generative-ai",
      title: "What Is Generative AI?",
      issuer: "LinkedIn Learning",
      date: "August 8, 2026",
      duration: "1h 3m",
      skills: ["Generative AI Tools", "Artificial Intelligence (AI)", "Generative AI"],
      description:
        "A hands-on introduction to generative AI. Covers core concepts, real-world tools, and how to create AI content.",
      image: "/certificates/linkedin-learning-generative-ai.jpeg",
      badge: "AI Foundations",
    },
    {
      id: "sololearn-coding-foundations",
      title: "Coding Foundations",
      issuer: "SoloLearn",
      date: "July 21, 2025",
      skills: ["Core Programming", "Logic & Structures", "Algorithms Basics"],
      description:
        "A foundational course in coding basics. Covers essential logic, clean code, and program structure.",
      image: "/certificates/sololearn-coding-foundations.jpeg",
      badge: "Programming",
    },
    {
      id: "anthropic-ai-fluency",
      title: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "2026",
      skills: ["AI Fluency", "Model Capabilities", "Prompting", "AI Strategy"],
      description:
        "An introductory learning program focused on AI fluency, understanding AI capabilities, and developing a more effective approach to working with AI systems.",
      image: "/certificates/anthropic-ai-fluency.jpeg",
      badge: "AI Systems",
    },
    {
      id: "sih-2026",
      title: "Smart India Hackathon 2026",
      issuer: "JAIN (Deemed-to-be University) / MoE Innovation Cell / AICTE",
      date: "September 11–12, 2026",
      skills: ["Rapid Prototyping", "Teamwork", "Problem Solving", "Hackathon"],
      description:
        "Certificate of Participation awarded to Ugesh Kumar for participating in the Smart India Hackathon 2026 Internal Hackathon held at JAIN (Deemed-to-be University) – Faculty of Engineering and Technology.",
      image: "/certificates/smart-india-hackathon-2026.jpeg",
      badge: "Hackathon",
    },
    {
      id: "avishkar-2026",
      title: "AVISHKAR 2026 Hackathon",
      issuer: "JAIN Faculty of Engineering & Technology (FET), Bengaluru",
      date: "October 31 – November 1, 2026",
      skills: ["Technical Acumen", "Creative Prototyping", "Hackathon", "Collaboration"],
      description:
        "Awarded for creative problem solving and strong technical skills. Earned at the AVISHKAR 2026 Alumni Hackathon.",
      image: "/certificates/avishkar-hackathon-2026.jpeg",
      badge: "Hackathon",
    },
  ] as Certificate[],

  interests: [
    {
      id: "gaming",
      title: "Gaming",
      category: "Interactive Worlds",
      description:
        "Playing strategy and adventure games. Studying their game mechanics and world design sparks creative ideas for responsive web UI.",
      iconName: "gamepad",
    },
    {
      id: "building-side-projects",
      title: "Building Side Projects",
      category: "Hands-on Creation",
      description:
        "Building side projects from scratch. Trying out small apps lets me test new UI ideas, learn fresh tools, and write cleaner code.",
      iconName: "code",
    },
    {
      id: "exploring-new-tech",
      title: "Exploring New Technologies",
      category: "Continuous Learning",
      description:
        "I love trying new dev tools and AI assistants like Claude and Cursor. Testing fresh web ideas helps me write better, faster code.",
      iconName: "sparkles",
    },
  ] as Interest[],

  /* Configurable project slots ready for Ugesh's published projects */
  projects: [
    {
      id: "momentum-job-tracker",
      title: "Job Search Momentum",
      subtitle: "AI-powered job search and career planning that keeps applications moving.",
      description:
        "A smart job tracker with a drag-and-drop Kanban board, a visual stage timeline, and 3D career graphics. Analyzes job descriptions and links your technical skills to portfolio code.",
      tags: ["React", "Three.js", "Node.js", "PostgreSQL", "TailwindCSS"],
      category: "Full-Stack Web App",
      image: "/projects/interactive-web-app.jpg",
      accentColor: "#ff5c3d",
      demoUrl: "https://momentum-job-tracker.vercel.app/",
      githubUrl: "https://github.com/ugesh13/Job_Application_Tracker",
      architecture: [
        "Dual-mode application tracker with Kanban drag-and-drop and visual stage timeline",
        "WebGL 3D career object and real-time orbit telemetry built with Three.js",
        "Evidence matrix correlating technical skills to verified portfolio repositories",
        "Job description deconstruction into core requirements and application strategy simulator",
      ],
      metrics: ["React + Vite", "Three.js 3D", "Neon Postgres"],
    },
    {
      id: "citecheck-ai",
      title: "Evidence-First Brand Governance",
      subtitle: "Evidence-first brand governance platform where AI suggests and humans decide.",
      description:
        "Checks marketing drafts against brand guidelines to catch policy conflicts. Only flags issues when backed by exact quotes from approved sources. Built with React, FastAPI, and SQLModel.",
      tags: ["React", "FastAPI", "SQLModel", "AI Governance", "TailwindCSS"],
      category: "AI Brand Governance",
      image: "/projects/ai-assisted-prototype.jpg",
      accentColor: "#ff5c3d",
      demoUrl: "https://citecheck-jet.vercel.app/",
      githubUrl: "https://github.com/ugesh13/CiteCheck_AI",
      architecture: [
        "Five-gate verification pipeline validating exact quotes, fact IDs, and brand rule compliance",
        "Brand Kit claim repository with proactive date expiry alerts and sign-off enforcement",
        "Secure Word DOCX parsing and living Guideline Gap Radar for policy remediation",
        "Strict evidence-first sign-off workflow preventing publication of unverified AI claims",
      ],
      metrics: ["117 Tests Passed*", "Five-Gate Engine", "React + FastAPI"],
    },
    {
      id: "secureclass",
      title: "Digital Classroom Security",
      subtitle: "A secure digital classroom and academic assessment management platform.",
      description:
        "A secure web app for online exams and student privacy. Built to prevent test cheating while keeping student records safe. Now in active development.",
      tags: ["Education Tech", "Security", "Assessment", "In Development"],
      category: "Academic Security",
      image: "/projects/analytics-dashboard.jpg",
      accentColor: "#10b981",
      githubUrl: "https://github.com/ugesh13/SecureClass",
      inDevelopment: true,
      architecture: [
        "Academic assessment integrity and distraction prevention engine",
        "Privacy-preserving student data masking and policy enforcement",
        "Modern classroom management architecture currently under active development",
      ],
      metrics: ["In Development", "Academic Focus", "Privacy First"],
    },
  ] as Project[],

  breakout: {
    headline: ["FRONTEND", "DEV"],
    caption: "Break the barrier. Interactive brick-breaker arcade showcase.",
    startingLives: 3,
  },
};
