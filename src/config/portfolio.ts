export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  role: string;
  result: string;
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
  footnote?: string;
}

export interface Education {
  institution: string;
  shortInstitution: string;
  degree: string;
  collaboration: string;
  expectedGraduation: string;
  currentSemester: string;
  location: string;
  sgpa: {
    sem1: string;
    sem2: string;
  };
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface StackGroup {
  label: string;
  items: string[];
  copies: number;
  duration: number;
  reverse?: boolean;
}

export interface Interest {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: "gamepad" | "code" | "sparkles";
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
  type: "course" | "hackathon";
  verificationUrl?: string;
  width?: number;
  height?: number;
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
    subtitleLine: "B.Tech CSBS @ Jain University · React · TypeScript · FastAPI · Bengaluru",
    tagline:
      "Detail-oriented CSBS student skilled in developing full-stack apps with React, TypeScript, Tailwind, FastAPI and Node.js.",
    availabilityBadge: "Open to internships · Bengaluru · Remote",
    availabilityText: "Open to frontend internships and freelance projects",
    location: "Bengaluru, India · Open to Remote",
    email: "ugesh.official13@gmail.com",
    portraitCutout: "/my photo_1.png",
    portraitUrl: "/my photo_1.png",
    portraitFallback: "/my photo_1.png",
    portraitWidth: 235,
    portraitHeight: 158,
    resumeUrl: "/Ugesh_Kumar_Resume.pdf",
    socials: {
      github: "https://github.com/ugesh13",
      linkedin: "https://www.linkedin.com/in/ugesh16",
    },
  },

  education: {
    institution: "Jain University, Faculty of Engineering and Technology (FET)",
    shortInstitution: "Jain University FET",
    degree: "B.Tech in Computer Science and Business Systems (CSBS)",
    collaboration: "In association with Tata Consultancy Services (TCS)",
    expectedGraduation: "Expected April 2029",
    currentSemester: "Currently in Semester 3",
    location: "Bengaluru, Karnataka, India",
    sgpa: {
      sem1: "9.09",
      sem2: "9.24",
    },
    highlights: [
      "Rigorous CS & Business Systems curriculum developed in association with TCS",
      "Core focus on Data Structures, Algorithms, Software Engineering & Systems Architecture",
      "Academic distinction with SGPA 9.09 (Semester 1) and 9.24 (Semester 2)",
      "Active participant in collegiate hackathons and academic research",
    ],
  } as Education,

  theme: {
    accent: "#ff5c3d", // High-Energy Neon Orange
    accentHover: "#ff7a5f",
    bg: "#050505",
    bgCard: "#0d0d0d",
    border: "rgba(255, 255, 255, 0.1)",
  },

  /* Real impact metrics — all 4 verified against portfolio and resume */
  metrics: [
    {
      value: "3",
      label: "Apps (2 Live)",
      detail: "Full-stack web applications engineered and deployed to production with active users.",
    },
    {
      value: "117",
      label: "Backend Tests",
      detail: "Automated test suite verifying brand governance, quote matching, and API reliability.",
      footnote: "pytest, backend",
    },
    {
      value: "2",
      label: "Hackathons",
      detail: "Participant in Smart India Hackathon & AVISHKAR 2026 Alumni-Led Hackathon.",
    },
    {
      value: "9.09 / 9.24",
      label: "SGPA (Sem 1 / Sem 2)",
      detail: "Academic distinction in B.Tech CSBS in association with TCS.",
    },
  ] as Metric[],

  /* Static 12–15 skills organized in 3 clean groups — no repeating marquees */
  skillGroups: [
    {
      category: "Frontend & UI",
      skills: ["React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3", "Three.js", "GSAP Animation"],
    },
    {
      category: "Backend & Data",
      skills: ["FastAPI", "Node.js", "Python", "PostgreSQL", "SQL", "Pytest"],
    },
    {
      category: "Tools & Workflow",
      skills: ["Git & GitHub", "Vercel", "Vite", "REST APIs", "Rapid Prototyping"],
    },
  ] as SkillCategory[],

  /* Certificates: 3 Learning Credentials First, 2 Hackathons in separate category */
  certificates: [
    {
      id: "linkedin-generative-ai",
      title: "What Is Generative AI?",
      issuer: "LinkedIn Learning",
      date: "August 8, 2026",
      duration: "1h 3m",
      type: "course",
      skills: ["Generative AI Tools", "Artificial Intelligence (AI)", "Prompt Engineering"],
      description:
        "Hands-on introduction to generative AI models, core capabilities, real-world tools, and ethical content synthesis.",
      image: "/certificates/linkedin-learning-generative-ai.webp",
      badge: "Course Credential",
      verificationUrl: "https://www.linkedin.com/learning/certificates/",
      width: 1600,
      height: 1236,
    },
    {
      id: "anthropic-ai-fluency",
      title: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "January 2026",
      type: "course",
      skills: ["AI Fluency", "Model Capabilities", "Targeted Prompting", "AI Strategy"],
      description:
        "Specialized learning program focused on AI fluency, understanding model reasoning, and structured human-AI collaboration.",
      image: "/certificates/anthropic-ai-fluency.webp",
      badge: "Course Credential",
      verificationUrl: "https://anthropic.com",
      width: 1600,
      height: 1236,
    },
    {
      id: "sololearn-coding-foundations",
      title: "Coding Foundations",
      issuer: "SoloLearn",
      date: "July 21, 2025",
      type: "course",
      skills: ["Core Programming", "Logic & Control Structures", "Algorithms Basics"],
      description:
        "Foundational credential in computer programming logic, clean syntax structure, and algorithmic problem-solving.",
      image: "/certificates/sololearn-coding-foundations.webp",
      badge: "Course Credential",
      verificationUrl: "https://www.sololearn.com",
      width: 1600,
      height: 1129,
    },
    {
      id: "sih-2026",
      title: "SIH 2026, Internal Round, JAIN FET",
      issuer: "JAIN (Deemed-to-be University) FET",
      date: "September 11–12, 2026",
      type: "hackathon",
      skills: ["Rapid Prototyping", "Teamwork", "Problem Solving", "Hackathon"],
      description:
        "Certificate of Participation, Smart India Hackathon 2026 Internal Round held at JAIN Faculty of Engineering and Technology (FET).",
      image: "/certificates/smart-india-hackathon-2026.webp",
      badge: "Internal Round, JAIN FET",
      width: 1600,
      height: 1066,
    },
    {
      id: "avishkar-2026",
      title: "AVISHKAR 2026 Alumni-Led Hackathon",
      issuer: "JAIN Faculty of Engineering & Technology (FET), Bengaluru",
      date: "October 31 – November 1, 2026",
      type: "hackathon",
      skills: ["Technical Acumen", "Rapid Prototyping", "Hackathon", "Collaboration"],
      description:
        "Certificate of Participation, AVISHKAR 2026 Alumni-Led Hackathon (Oct 31 to Nov 1, 2026)",
      image: "/certificates/avishkar-hackathon-2026.webp",
      badge: "Alumni-Led Hackathon",
      width: 1280,
      height: 896,
    },
  ] as Certificate[],

  /* Featured Projects with explicit Problem, Role, Stack, and Result */
  projects: [
    {
      id: "momentum-job-tracker",
      title: "Job Search Momentum",
      subtitle: "AI-powered job search and career planning tracker with 3D graphics.",
      problem: "Job seekers lose track of multi-stage interview pipelines and struggle to tie their real repository code to job requirements.",
      role: "Designed and built full-stack architecture, Kanban drag-and-drop state, Three.js 3D career orbit graphics, and PostgreSQL backend.",
      result: "Live on Vercel with active user sessions, sub-100ms API response times, and persistent Postgres data storage.",
      description:
        "A smart job tracker with a drag-and-drop Kanban board, a visual stage timeline, and 3D career graphics. Analyzes job descriptions and links your technical skills to portfolio code.",
      tags: ["React", "TypeScript", "Three.js", "Node.js", "PostgreSQL", "TailwindCSS"],
      category: "Full-Stack Web App",
      image: "/projects/interactive-web-app.webp",
      accentColor: "#ff5c3d",
      demoUrl: "https://momentum-job-tracker.vercel.app/",
      githubUrl: "https://github.com/ugesh13/Job_Application_Tracker",
      architecture: [
        "Dual-mode application tracker with Kanban drag-and-drop and visual stage timeline",
        "WebGL 3D career object and real-time orbit telemetry built with Three.js",
        "Evidence matrix correlating technical skills to verified portfolio repositories",
        "Job description deconstruction into core requirements and application strategy simulator",
      ],
      metrics: ["Live on Vercel", "Three.js 3D", "PostgreSQL"],
    },
    {
      id: "citecheck-ai",
      title: "CiteCheck AI",
      subtitle: "Evidence-first brand governance platform where AI suggests and humans decide.",
      problem: "Marketing teams face brand guideline violations from unverified generative AI copy without deterministic quote tracking.",
      role: "Architected FastAPI REST service, SQLModel database schema, 5-gate evidence validation engine, and reactive Tailwind UI.",
      result: "117 automated pytest tests passing with 100% policy verification precision on enterprise brand documents.",
      description:
        "Checks marketing drafts against brand guidelines to catch policy conflicts. Only flags issues when backed by exact quotes from approved sources. Built with React, FastAPI, and SQLModel with 117 automated pytest tests.",
      tags: ["React", "FastAPI", "Python", "SQLModel", "Pytest", "TailwindCSS"],
      category: "AI Brand Governance",
      image: "/projects/ai-assisted-prototype.webp",
      accentColor: "#ff5c3d",
      demoUrl: "https://citecheck-jet.vercel.app/",
      githubUrl: "https://github.com/ugesh13/CiteCheck_AI",
      architecture: [
        "Five-gate verification pipeline validating exact quotes, fact IDs, and brand rule compliance",
        "Brand Kit claim repository with proactive date expiry alerts and sign-off enforcement",
        "Secure Word DOCX parsing and living Guideline Gap Radar for policy remediation",
        "Strict evidence-first sign-off workflow preventing publication of unverified AI claims",
      ],
      metrics: ["117 Tests (pytest)", "Live on Vercel", "FastAPI"],
    },
    {
      id: "memguard-ai",
      title: "MemGuard AI",
      subtitle: "Fine-tuned model audit workflow & data leakage defense dashboard.",
      problem: "Fine-tuned LLMs frequently leak sensitive training data and PII through adversarial extraction prompts.",
      role: "Engineered automated extraction probe simulator, leakage scoring pipeline (exact match, embedding similarity, PII), and judge dashboard.",
      result: "Built and deployed live audit dashboard for AVISHKAR hackathon evaluation with real-time threat risk categorization.",
      description:
        "Designed an audit workflow for fine-tuned models: register a model, generate extraction probes, detect leakage (exact match, semantic similarity, PII), and score risk from Low to Critical with remediation steps.",
      tags: ["AI Security", "React", "Python", "Model Auditing", "TailwindCSS"],
      category: "AI Security & Governance",
      image: "/projects/memguard-ai.webp",
      accentColor: "#ff5c3d",
      githubUrl: "https://github.com/ugesh13",
      architecture: [
        "Automated extraction probe generator assessing memorization in fine-tuned models",
        "Multi-factor leakage detection (exact match, semantic embedding similarity, regex PII)",
        "Risk scoring matrix categorizing audit vulnerabilities from Low to Critical",
        "Interactive dashboard displaying test telemetry and actionable remediation steps",
      ],
      metrics: ["Hackathon Project", "Leakage Defense", "Risk Scoring"],
    },
    {
      id: "ecg-arrhythmia",
      title: "ECG Arrhythmia Detection",
      subtitle: "Biomedical ML signal processing pipeline & clinical web classifier.",
      problem: "Cardiac arrhythmias require prompt diagnosis, yet raw electrocardiogram signals contain noise and baseline drift.",
      role: "Collaborated on digital signal preprocessing, QRS peak detection, feature extraction, and built web presentation interface.",
      result: "Presented live ML classification telemetry to university faculty with high sensitivity across irregular heartbeat anomalies.",
      description:
        "Collaborated in a team to build an ML pipeline for arrhythmia detection from electrocardiogram (ECG) signals, with a deployed web interface to present classification outcomes and diagnostic metrics to faculty.",
      tags: ["Machine Learning", "Python", "Signal Processing", "Web UI", "Healthcare"],
      category: "Biomedical ML",
      image: "/projects/ecg-arrhythmia.webp",
      accentColor: "#38bdf8",
      githubUrl: "https://github.com/ugesh13",
      architecture: [
        "Digital signal preprocessing, baseline wander removal, and QRS peak extraction",
        "Machine learning classification model trained on cardiac heartbeat anomalies",
        "Inference pipeline streaming real-time ECG telemetry and rhythm classifications",
        "Deployed web interface built for demonstration and faculty review",
      ],
      metrics: ["ML Pipeline", "Signal Processing", "Faculty Review"],
    },
    {
      id: "oulad-research",
      title: "Student Performance Prediction & XAI",
      subtitle: "IEEE-style research paper analyzing student outcomes with Explainable AI.",
      problem: "Higher-education online courses suffer high dropout rates due to late identification of at-risk students.",
      role: "Analyzed Open University Learning Analytics Dataset (OULAD), trained predictive models, and applied Explainable AI (SHAP).",
      result: "Authored IEEE-style research study published on GitHub web repository with interactive visual factor attribution.",
      description:
        "Authored an IEEE-style research study predicting student outcomes on the Open University Learning Analytics Dataset (OULAD) with machine learning models and Explainable AI (XAI) to identify key factors influencing student academic progression.",
      tags: ["IEEE Research", "Machine Learning", "Explainable AI (XAI)", "Python", "OULAD Dataset"],
      category: "Research & Publication",
      image: "/projects/oulad-research.webp",
      accentColor: "#a855f7",
      githubUrl: "https://github.com/ugesh13/IEEE_Research_Web",
      architecture: [
        "Large-scale educational data processing across clickstream, assessment, and demographic tables",
        "Predictive classification modeling benchmarking student pass, fail, and distinction cohorts",
        "Explainable AI (SHAP / feature attribution) quantifying critical early intervention signals",
        "Deployed research web companion providing interactive exploration of paper findings",
      ],
      metrics: ["IEEE-Style Paper", "Explainable AI", "OULAD Dataset"],
    },
  ] as Project[],

  /* In-progress project displayed in "Currently building" strip */
  currentlyBuilding: {
    id: "secureclass",
    title: "SecureClass",
    subtitle: "Digital Classroom Security & Academic Assessment Management",
    description: "A secure web platform for online academic exams and student privacy protection. Designed to prevent examination malpractice while maintaining strict audit trails and student record integrity.",
    tags: ["Education Tech", "Security", "Assessment Engine", "In Active Development"],
    status: "In Active Development",
    githubUrl: "https://github.com/ugesh13/SecureClass",
  },

  /* Concise personal note — no bloated gaming cards */
  interestsNote:
    "Outside engineering, I explore game mechanics and world design in strategy titles, experiment with emerging AI developer tools, and tinker with open-source web experiments.",

  interests: [
    {
      id: "gaming",
      title: "Gaming & Interactive Worlds",
      category: "Creative Inspiration",
      description: "Studying game mechanics and world design in adventure games.",
      iconName: "gamepad",
    },
    {
      id: "building-side-projects",
      title: "Building Side Projects",
      category: "Hands-on Creation",
      description: "Experimenting with fresh developer tools, AI workflows, and clean UI.",
      iconName: "code",
    },
    {
      id: "exploring-new-tech",
      title: "Exploring New Tech",
      category: "Continuous Learning",
      description: "Testing emerging frontend tools, APIs, and open-source packages.",
      iconName: "sparkles",
    },
  ] as Interest[],

  stack: [] as StackGroup[],

  breakout: {
    headline: ["FRONTEND", "DEV"],
    caption: "Break the barrier. Interactive brick-breaker arcade showcase.",
    startingLives: 3,
  },
};
