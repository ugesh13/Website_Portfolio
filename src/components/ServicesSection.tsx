import React from "react";
import { ArrowUpRight, Code, Zap, Layers } from "lucide-react";
import { useSectionReveals } from "../hooks/useSectionReveals";

export const ServicesSection: React.FC = () => {
  const sectionRef = useSectionReveals<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#050505] text-white py-20 px-4 sm:px-6 md:px-16 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div data-reveal="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5c3d]" />
              <span className="text-xs font-mono font-medium tracking-wider text-gray-400 uppercase">
                Core Capabilities
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
              What I Do
            </h2>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-[#ff5c3d] text-black text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md self-start md:self-auto cursor-pointer"
          >
            Let's talk <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Two focused engineering capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div data-reveal="up" className="p-5 sm:p-8 rounded-3xl bg-white/[0.025] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ff5c3d]/10 border border-[#ff5c3d]/20 flex items-center justify-center text-[#ff5c3d] mb-4">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Frontend Development &amp; Interactive UI
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4">
                I build fast, accessible web applications using React, TypeScript, and modern CSS. My priority is clean modular components, smooth responsive layouts, and bug-free user experiences that feel natural on any device.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 text-xs font-mono text-gray-400">
              <span className="px-2 py-0.5 rounded bg-white/5">React</span>
              <span className="px-2 py-0.5 rounded bg-white/5">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Three.js</span>
            </div>
          </div>

          <div data-reveal="up" className="p-5 sm:p-8 rounded-3xl bg-white/[0.025] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Rapid AI-Assisted Prototyping
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4">
                Leveraging modern AI assistants and targeted prompt techniques to scaffold, test, and ship functional products with velocity. From early requirements to working production interfaces ready for user testing.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 text-xs font-mono text-gray-400">
              <span className="px-2 py-0.5 rounded bg-white/5">Claude &amp; Cursor</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Vite</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Vercel</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Agile Shipping</span>
            </div>
          </div>
        </div>

        {/* Short "Also experienced in" line replacing bloated agency cards */}
        <div data-reveal="up" className="mt-6 p-4 md:p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs font-light text-gray-400">
          <span className="font-mono text-gray-200 uppercase tracking-wider font-semibold shrink-0">
            Also experienced in:
          </span>
          <span>
            FastAPI and Node.js REST services, PostgreSQL relational database modeling, automated pytest suites (117+ tests), and basic machine learning signal processing.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
