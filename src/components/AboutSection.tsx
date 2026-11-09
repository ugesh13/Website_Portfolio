import React from "react";
import gsap from "gsap";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { Cpu, ShieldCheck, Zap, Layers, Sparkles, Terminal, Code2, Wrench } from "lucide-react";
import {
  useSectionReveals,
  REVEAL_EASE,
  REVEAL_DURATION,
} from "../hooks/useSectionReveals";

const STATEMENT =
  "Detail-oriented CSBS student skilled in developing full-stack apps with React, TypeScript, Tailwind, FastAPI and Node.js. Focused on engineering high-performance interactive interfaces, test-backed API backends, and rapid AI-assisted prototyping.";

const EMPHASIS = new Set([
  "CSBS",
  "full-stack",
  "React",
  "TypeScript",
  "Tailwind",
  "FastAPI",
  "Node.js",
  "interactive",
  "interfaces",
  "test-backed",
  "prototyping",
]);

const METRIC_ICONS = [
  <Cpu key="cpu" className="w-5 h-5 text-[#ff5c3d]" />,
  <ShieldCheck key="shield" className="w-5 h-5 text-emerald-400" />,
  <Zap key="zap" className="w-5 h-5 text-amber-400" />,
  <Layers key="layers" className="w-5 h-5 text-cyan-400" />,
];

export const AboutSection: React.FC = () => {
  const { metrics, theme, skillGroups, interestsNote } = PORTFOLIO_CONFIG;

  const sectionRef = useSectionReveals<HTMLElement>(({ scope, desktop }) => {
    const intro = gsap.utils.toArray<HTMLElement>("[data-intro]", scope);
    if (intro.length) {
      gsap.from(intro, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: REVEAL_EASE,
        scrollTrigger: { trigger: scope, start: "top 75%", once: true },
      });
    }

    const textEl = scope.querySelector<HTMLElement>("[data-scrub]");
    if (!textEl) return;

    if (desktop) {
      gsap.fromTo(
        textEl.querySelectorAll(".word"),
        { color: "#9ca3af", opacity: 0.4 },
        {
          color: "#ffffff",
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: textEl,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    } else {
      gsap.from(textEl, {
        y: 24,
        opacity: 0,
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        scrollTrigger: { trigger: textEl, start: "top 90%", once: true },
      });
    }
  });

  const words = STATEMENT.split(" ");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 md:px-16 flex flex-col justify-center relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12 lg:gap-20 items-center">
          <div className="flex flex-col items-start">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#ff5c3d] mb-3">
              Profile &amp; Focus
            </span>
            <h2
              data-intro
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-700 leading-[0.9]"
            >
              About
            </h2>
          </div>

          {/* Scrubbed statement card */}
          <div className="relative bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/[0.05] transition-colors text-left">
            <p
              data-scrub
              lang="en"
              className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-light"
            >
              {words.map((word, i) => (
                <React.Fragment key={`${word}-${i}`}>
                  <span
                    className={`word ${
                      EMPHASIS.has(word.replace(/[.,;:]/g, ""))
                        ? "text-white font-medium text-white/95"
                        : ""
                    }`}
                  >
                    {word}
                  </span>
                  {i < words.length - 1 && " "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Impact metrics: 3 apps (2 live), 117 tests (pytest), 2 hackathons, SGPA 9.09 / 9.24 */}
        <div
          data-reveal-group="0.1"
          className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {metrics.map((item, idx) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-[#0b0b0b] border border-white/10 hover:border-white/20 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {METRIC_ICONS[idx % METRIC_ICONS.length]}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                    0{idx + 1}
                  </span>
                </div>
                <div
                  style={{ color: idx === 0 ? theme.accent : "#ffffff" }}
                  className="text-2xl md:text-3xl font-black font-mono tracking-tight"
                >
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-200 flex flex-wrap items-center gap-1.5">
                  <span>{item.label}</span>
                  {item.footnote && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-[#ff5c3d] font-normal border border-white/10">
                      {item.footnote}
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed font-light">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Stack: 12-15 static tags in 3 clean groups (no repeating marquee) */}
        <div data-reveal="up" className="mt-16 md:mt-24">
          <div className="flex items-center gap-2 mb-6">
            <span
              style={{ backgroundColor: theme.accent }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className="text-xs font-mono font-medium tracking-wider text-gray-400 uppercase">
              Technical Stack &amp; Tooling
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group, idx) => {
              const icons = [
                <Code2 key="code" className="w-4 h-4 text-[#ff5c3d]" />,
                <Terminal key="term" className="w-4 h-4 text-emerald-400" />,
                <Wrench key="wrench" className="w-4 h-4 text-cyan-400" />,
              ];

              return (
                <div
                  key={group.category}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-4 text-sm font-bold text-gray-200">
                      {icons[idx % icons.length]}
                      <span>{group.category}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:text-white hover:border-[#ff5c3d]/50 hover:bg-[#ff5c3d]/10 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Concise personal note — replacing bloated gaming cards */}
        <div data-reveal="up" className="mt-10 p-5 rounded-2xl bg-white/[0.015] border border-white/5 text-xs text-gray-400 font-light flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#ff5c3d] shrink-0" />
          <span>{interestsNote}</span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
