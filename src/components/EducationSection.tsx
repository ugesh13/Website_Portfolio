import React from "react";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { GraduationCap, Award, BookOpen, Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { useSectionReveals } from "../hooks/useSectionReveals";

export const EducationSection: React.FC = () => {
  const { education, theme } = PORTFOLIO_CONFIG;
  const sectionRef = useSectionReveals<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="education"
      className="bg-[#050505] text-white py-24 md:py-32 px-4 sm:px-6 md:px-16 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div data-reveal="up" className="mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{ backgroundColor: theme.accent }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className="text-xs font-mono font-medium tracking-wider text-gray-400 uppercase">
              Academic Foundations
            </span>
          </div>
          <h2
            data-reveal-lines
            className="text-3xl md:text-5xl font-black tracking-tight uppercase"
          >
            {["Formal", "Education"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="line block">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Education Hero Card */}
        <div
          data-reveal="up"
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-8 md:p-12 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        >
          {/* Subtle top accent gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${theme.accent} 0%, #fb923c 50%, #38bdf8 100%)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 cols: Main degree & university */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-300 inline-flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#ff5c3d]" />
                  {education.currentSemester}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ff5c3d]/10 border border-[#ff5c3d]/30 text-xs font-mono uppercase tracking-wider text-[#ff5c3d] font-semibold inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {education.expectedGraduation}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
                  {education.degree}
                </h3>
                <div className="mt-2 text-sm md:text-base font-medium text-[#ff5c3d] flex items-center gap-2">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>{education.collaboration}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-sm md:text-base text-gray-300">
                <p className="font-semibold text-white">{education.institution}</p>
                <p className="text-xs md:text-sm font-mono text-gray-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  {education.location}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-2 flex flex-col gap-2.5">
                {education.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5c3d] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Academic Performance Metric Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4 w-full">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Academic Standing
                  </span>
                  <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Top Tier
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Semester 1 */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                      Semester 1
                    </span>
                    <span className="text-3xl font-black font-mono text-white mt-1">
                      {education.sgpa.sem1}
                    </span>
                    <span className="text-xs font-mono text-gray-400 mt-1">
                      SGPA / 10.0
                    </span>
                  </div>

                  {/* Semester 2 */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                      Semester 2
                    </span>
                    <span className="text-3xl font-black font-mono text-[#ff5c3d] mt-1">
                      {education.sgpa.sem2}
                    </span>
                    <span className="text-xs font-mono text-gray-400 mt-1">
                      SGPA / 10.0
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-400 leading-relaxed font-light">
                  Cumulative high-distinction grade point average across foundational engineering, algorithms, discrete mathematics, and computational logic.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-200 font-semibold">
                    Industry-Aligned Syllabus
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Jointly designed with Tata Consultancy Services to bridge software theory and enterprise practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

