import { useEffect, useState } from "react";
import HeroPreloader from "./components/HeroPreloader";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ServicesSection from "./components/ServicesSection";
import CertificatesSection from "./components/CertificatesSection";
import PixelBreakoutSection from "./components/PixelBreakoutSection";
import ContactSection from "./components/ContactSection";
import NotFound from "./components/NotFound";
import { initScrollRefresh } from "./hooks/useSectionReveals";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";
import {
  Home,
  User,
  GraduationCap,
  Briefcase,
  Award,
  FolderGit2,
  Gamepad2,
  Mail,
} from "lucide-react";

const DOCK_ITEMS: DockItem[] = [
  { title: "Home", icon: <Home className="w-full h-full" />, href: "#home" },
  { title: "About", icon: <User className="w-full h-full" />, href: "#about" },
  {
    title: "Projects",
    icon: <FolderGit2 className="w-full h-full" />,
    href: "#projects",
  },
  {
    title: "Education",
    icon: <GraduationCap className="w-full h-full" />,
    href: "#education",
  },
  {
    title: "Experience",
    icon: <Briefcase className="w-full h-full" />,
    href: "#services",
  },
  {
    title: "Certificates",
    icon: <Award className="w-full h-full" />,
    href: "#certificates",
  },
  {
    title: "Game",
    icon: <Gamepad2 className="w-full h-full" />,
    href: "#play",
  },
  {
    title: "Contact",
    icon: <Mail className="w-full h-full" />,
    href: "#contact",
  },
];

export function App() {
  const [contentReady, setContentReady] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Real 404 Route handling for client-side navigation
  const [is404, setIs404] = useState(() => {
    if (typeof window === "undefined") return false;
    const path = window.location.pathname;
    return path !== "/" && path !== "" && path !== "/index.html";
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setIs404(path !== "/" && path !== "" && path !== "/index.html");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    initScrollRefresh();
  }, []);

  // Scroll-spy observer on section IDs
  useEffect(() => {
    if (!contentReady || is404) return;

    const sectionIds = [
      "home",
      "about",
      "projects",
      "education",
      "services",
      "certificates",
      "play",
      "contact",
    ];

    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection("#home");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("#contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [contentReady, is404]);

  if (is404) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#f2efe9] overflow-x-hidden selection:bg-[#ff5c3d] selection:text-[#050505]">
      {/* Accessible skip link */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-2.5 focus:bg-[#ff5c3d] focus:text-black focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Main Content with Preloader Transition */}
      <main id="main-content">
        {/* Hero Section with Decryption Ticker & WebGL Portrait */}
        <HeroPreloader onPreloadComplete={() => setContentReady(true)} />

        {/* Content sections fade in after preloader */}
        {contentReady && (
          <>
            {/* macOS Floating Dock */}
            <FloatingDock items={DOCK_ITEMS} activeHref={activeSection} />

            <div className="animate-fade-in-up w-full max-w-[1440px] mx-auto min-w-0">
              {/* Word-by-word Scrubbed About Section — introduced first */}
              <AboutSection />

              {/* Featured Projects Section */}
              <ProjectsSection />

              {/* Education Section */}
              <EducationSection />

              {/* What I Do — Capabilities & Offerings */}
              <ServicesSection />

              {/* 5 Certificates & Participations */}
              <CertificatesSection />

              {/* Interactive Pixel Breakout Arcade with visible Skip link */}
              <PixelBreakoutSection />

              {/* Contact, Form, & Footer */}
              <ContactSection />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
