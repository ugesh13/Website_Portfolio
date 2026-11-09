import { useEffect, useState } from "react";
import HeroPreloader from "./components/HeroPreloader";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import CertificatesSection from "./components/CertificatesSection";
import ProjectsSection from "./components/ProjectsSection";
import InterestsSection from "./components/InterestsSection";
import PixelBreakoutSection from "./components/PixelBreakoutSection";
import ContactSection from "./components/ContactSection";
import { initScrollRefresh } from "./hooks/useSectionReveals";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";
import {
  Home,
  User,
  Briefcase,
  Award,
  FolderGit2,
  Sparkles,
  Gamepad2,
  Mail,
} from "lucide-react";

const DOCK_ITEMS: DockItem[] = [
  { title: "Home", icon: <Home className="w-full h-full" />, href: "#home" },
  { title: "About", icon: <User className="w-full h-full" />, href: "#about" },
  {
    title: "Services",
    icon: <Briefcase className="w-full h-full" />,
    href: "#services",
  },
  {
    title: "Certificates",
    icon: <Award className="w-full h-full" />,
    href: "#certificates",
  },
  {
    title: "Projects",
    icon: <FolderGit2 className="w-full h-full" />,
    href: "#projects",
  },
  {
    title: "Interests",
    icon: <Sparkles className="w-full h-full" />,
    href: "#interests",
  },
  {
    title: "Play",
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

  useEffect(() => {
    initScrollRefresh();
  }, []);

  // Scroll-spy observer on section IDs
  useEffect(() => {
    if (!contentReady) return;

    const sectionIds = [
      "home",
      "about",
      "services",
      "certificates",
      "projects",
      "interests",
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
  }, [contentReady]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f2efe9] overflow-x-hidden selection:bg-[#ff5c3d] selection:text-[#050505]">
      {/* Main Content with Preloader Transition */}
      <main>
        {/* Hero Section with Decryption Ticker & Horizontal Split */}
        <HeroPreloader onPreloadComplete={() => setContentReady(true)} />

        {/* Remaining Sections Fade in */}
        {contentReady && (
          <>
            {/* macOS Floating Dock */}
            <FloatingDock items={DOCK_ITEMS} activeHref={activeSection} />
            <div className="animate-fade-in-up">
              {/* Word-by-word Scrubbed About Section */}
              <AboutSection />

              {/* What We Can Do — Services We Offer */}
              <ServicesSection />

              {/* Verified Certifications & Credentials */}
              <CertificatesSection />

              {/* Featured Projects & Showcase */}
              <ProjectsSection />

              {/* Personal Interests & Creative Pursuits */}
              <InterestsSection />

              {/* Signature Interactive Pixel Breakout Arcade */}
              <PixelBreakoutSection />

              {/* Contact & Footer */}
              <ContactSection />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
