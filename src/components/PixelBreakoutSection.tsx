import React, { useState, Suspense } from "react";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { Gamepad2, RotateCcw, ArrowDown } from "lucide-react";

// Performance: Lazy-load the arcade game engine with React.lazy
const InteractivePixelBreakout = React.lazy(() =>
  import("./InteractivePixelBreakout").then((m) => ({ default: m.InteractivePixelBreakout }))
);

export const PixelBreakoutSection: React.FC = () => {
  const { breakout, theme } = PORTFOLIO_CONFIG;
  const [headline, setHeadline] = useState<string[]>(breakout.headline);
  const [line1, setLine1] = useState(breakout.headline[0]);
  const [line2, setLine2] = useState(breakout.headline[1]);

  const handleUpdateText = (e: React.FormEvent) => {
    e.preventDefault();
    const l1 = line1.trim().toUpperCase() || "FRONTEND";
    const l2 = line2.trim().toUpperCase() || "DEV";
    setHeadline([l1, l2]);
  };

  const handleReset = () => {
    setLine1(breakout.headline[0]);
    setLine2(breakout.headline[1]);
    setHeadline(breakout.headline);
  };

  return (
    <section
      id="play"
      aria-label="Interactive Arcade Showcase"
      className="bg-[#050505] text-white py-20 md:py-28 px-4 sm:px-6 md:px-16 border-t border-white/5 relative overflow-hidden"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header with visible Skip Game link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
              <Gamepad2 className="w-4 h-4 text-[#ff5c3d]" />
              <span className="text-xs font-mono tracking-wider uppercase text-gray-300">
                Interactive Canvas Arcade
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Break It If You Can
            </h2>
            <p className="mt-1 text-xs text-gray-400 max-w-lg">
              {breakout.caption} Keyboard and mouse enabled; mobile touch scrolls normally.
            </p>
          </div>

          {/* Visible Skip Game link */}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-gray-300 hover:text-white text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 hover:border-[#ff5c3d] transition-colors shrink-0 cursor-pointer"
          >
            Skip game <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* The Breakout Game Component — Lazy Loaded & Mobile-safe */}
        <div className="touch-pan-y focus:outline-none">
          <Suspense
            fallback={
              <div className="aspect-[5/6] sm:aspect-[4/3] lg:aspect-[16/9] bg-white/[0.02] border border-white/10 rounded-2xl flex items-center justify-center text-gray-500 font-mono text-xs">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-[#ff5c3d] animate-pulse" />
                  Loading arcade engine...
                </span>
              </div>
            }
          >
            <InteractivePixelBreakout
              lines={headline}
              caption="Destructible 5x7 ASCII Bitmap Font Matrix"
              accentColor={theme.accent}
              panelClassName="aspect-[5/6] sm:aspect-[4/3] lg:aspect-[16/9]"
            />
          </Suspense>
        </div>

        {/* Dynamic Text Customizer Bar */}
        <form
          onSubmit={handleUpdateText}
          className="mt-6 p-4 rounded-2xl bg-[#0b0b0b] border border-white/10 flex flex-wrap items-center justify-between gap-4 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <input
              type="text"
              maxLength={8}
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              placeholder="FRONTEND"
              className="w-1/2 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-[#ff5c3d]"
              aria-label="First word in arcade banner"
            />
            <input
              type="text"
              maxLength={8}
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              placeholder="DEV"
              className="w-1/2 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-[#ff5c3d]"
              aria-label="Second word in arcade banner"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#ff5c3d] text-black font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Update Bricks
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Reset wordmark"
              aria-label="Reset wordmark"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PixelBreakoutSection;
