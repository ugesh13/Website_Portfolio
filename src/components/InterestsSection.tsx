import React from "react";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { Gamepad2, FolderGit2, Sparkles, ArrowRight } from "lucide-react";
import { useSectionReveals } from "../hooks/useSectionReveals";

export const InterestsSection: React.FC = () => {
  const { interests, theme } = PORTFOLIO_CONFIG;
  const sectionRef = useSectionReveals<HTMLElement>();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "gamepad":
        return <Gamepad2 className="w-6 h-6 text-[#ff5c3d]" />;
      case "code":
        return <FolderGit2 className="w-6 h-6 text-amber-400" />;
      case "sparkles":
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="interests"
      className="bg-[#050505] text-white py-24 md:py-36 px-6 md:px-16 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-reveal="up" className="mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{ backgroundColor: theme.accent }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className="text-xs font-mono font-medium tracking-wider text-gray-400">
              Personal Pursuits
            </span>
          </div>
          <h2
            data-reveal-lines
            className="text-3xl md:text-5xl font-black tracking-tight uppercase"
          >
            {["Passions &", "Interests"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 font-light max-w-xl">
            Things I enjoy outside of work that spark fresh ideas and keep me curious about building.
          </p>
        </div>

        {/* Interests Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {interests.map((item, idx) => (
            <div
              key={item.id}
              data-reveal="up"
              className="group relative p-8 md:p-10 rounded-2xl md:rounded-3xl bg-[#0b0b0b] border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-xs font-mono text-gray-400 tracking-wider">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-2 block">
                  {item.category}
                </span>

                <h3 className="text-2xl font-black tracking-tight text-white mb-4 group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                  Core Pursuit <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
