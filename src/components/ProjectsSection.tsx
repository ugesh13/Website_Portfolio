import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PORTFOLIO_CONFIG, type Project } from "../config/portfolio";
import { ArrowUpRight, Sparkles, X, CheckCircle, Hammer } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { useSectionReveals } from "../hooks/useSectionReveals";

const TitleWithAccent: React.FC<{ title: string }> = ({ title }) => {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return <>{title}</>;
  const lead = words.slice(0, -1).join(" ");
  const tail = words[words.length - 1];
  return (
    <>
      {lead}{" "}
      <span
        style={{ textTransform: "none" }}
        className="font-serif font-light italic tracking-normal text-gray-200"
      >
        {tail}
      </span>
    </>
  );
};

export const ProjectsSection: React.FC = () => {
  const { projects, theme, currentlyBuilding } = PORTFOLIO_CONFIG;
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Body scroll lock and Escape to close modal
  useEffect(() => {
    if (!activeProject) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  const sectionRef = useSectionReveals<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#050505] text-white py-24 md:py-36 px-4 sm:px-6 md:px-16 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-reveal="up" className="mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{ backgroundColor: theme.accent }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className="text-xs font-mono font-medium tracking-wider text-gray-400 uppercase">
              Selected Works &amp; Research
            </span>
          </div>
          <h2
            data-reveal-lines
            className="text-3xl md:text-5xl font-black tracking-tight uppercase"
          >
            {["Featured", "Projects"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="line block">{line}</span>
              </span>
            ))}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light max-w-xl">
            Live web applications, governance pipelines, and machine learning research with verifiable test suites and repositories.
          </p>
        </div>

        {/* Project showcase — alternating full-width rows */}
        <div className="flex flex-col gap-24 md:gap-32 lg:gap-36">
          {projects.map((project, idx) => {
            const imageLeft = idx % 2 === 0;

            return (
              <article
                key={project.id}
                className={`flex flex-col gap-8 md:gap-12 lg:gap-16 md:items-center ${
                  imageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Landscape Image with WebP & explicit dimensions */}
                <div
                  data-reveal={imageLeft ? "left" : "right"}
                  className="w-full md:w-1/2"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveProject(project);
                      }
                    }}
                    aria-label={`View deep-dive details for ${project.title}`}
                    className="group/image relative block w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 bg-white/[0.03] aspect-[16/10] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ff5c3d] focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-xl"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1 z-10 transition-opacity duration-300 opacity-80 group-hover/image:opacity-100"
                      style={{ backgroundColor: project.accentColor || theme.accent }}
                    />
                    {project.image && (
                      <picture>
                        <source srcSet={project.image} type="image/webp" />
                        <img
                          src={project.image.endsWith(".webp") ? project.image.replace(".webp", ".jpg") : project.image}
                          alt={`${project.title} — screenshot preview`}
                          width={1200}
                          height={750}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover/image:scale-[1.03]"
                        />
                      </picture>
                    )}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100" />
                    <span className="pointer-events-none absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black opacity-0 translate-y-2 transition-all duration-500 group-hover/image:opacity-100 group-hover/image:translate-y-0 shadow-md">
                      Architecture <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Project Information */}
                <div
                  data-reveal={imageLeft ? "right" : "left"}
                  className="w-full md:w-1/2 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-medium tracking-[0.2em] text-[#ff5c3d]">
                      0{idx + 1}
                    </span>
                    <span className="h-px w-6 bg-white/20" />
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3">
                    <TitleWithAccent title={project.title} />
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-gray-300 mb-4 font-mono">
                    {project.subtitle}
                  </p>

                  {/* Problem, Role, and Key Result breakdown */}
                  <div className="flex flex-col gap-2.5 mb-5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-xs text-gray-300 leading-relaxed">
                      <strong className="text-[#ff5c3d] font-mono uppercase tracking-wider">Problem: </strong>
                      {project.problem}
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed">
                      <strong className="text-emerald-400 font-mono uppercase tracking-wider">Role: </strong>
                      {project.role}
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed">
                      <strong className="text-cyan-400 font-mono uppercase tracking-wider">Result: </strong>
                      {project.result}
                    </div>
                  </div>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Live and GitHub action buttons visible directly on the card */}
                  <div className="flex flex-wrap items-center gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[#ff5c3d] text-black text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all cursor-pointer"
                      >
                        <GithubIcon className="h-3.5 w-3.5" /> GitHub
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                    >
                      Deep Dive ➔
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* "Currently Building" strip for in-progress projects */}
        {currentlyBuilding && (
          <div
            data-reveal="up"
            className="mt-20 md:mt-28 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/20 via-[#0d0d0d] to-emerald-950/20 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {currentlyBuilding.status}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-black text-white">
                {currentlyBuilding.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                {currentlyBuilding.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {currentlyBuilding.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={currentlyBuilding.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-emerald-400 hover:text-black transition-all shrink-0"
            >
              <GithubIcon className="w-4 h-4" /> View Repo
            </a>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {activeProject &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-fade-in-up"
            onClick={() => setActiveProject(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0c0c0c] border border-white/20 rounded-none sm:rounded-3xl p-6 md:p-8 max-h-[100dvh] sm:max-h-[90vh] h-full sm:h-auto overflow-y-auto shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {activeProject.image && (
                <picture>
                  <source srcSet={activeProject.image} type="image/webp" />
                  <img
                    src={activeProject.image.endsWith(".webp") ? activeProject.image.replace(".webp", ".jpg") : activeProject.image}
                    alt={`${activeProject.title} — full interface preview`}
                    width={1200}
                    height={750}
                    className="w-full aspect-[16/10] object-cover rounded-2xl border border-white/10 mb-6"
                  />
                </picture>
              )}

              <span className="text-xs font-mono uppercase tracking-widest text-[#ff5c3d]">
                {activeProject.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mt-1 mb-2">
                {activeProject.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6 font-light">
                {activeProject.description}
              </p>

              {activeProject.architecture && (
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff5c3d]" /> System Architecture
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.architecture.map((item, i) => (
                      <li key={i} className="text-xs md:text-sm text-gray-300 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#ff5c3d] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#ff5c3d] text-black text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:brightness-110 transition-all"
                  >
                    Open Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    <GithubIcon className="h-4 w-4" /> View GitHub Repo
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default ProjectsSection;
