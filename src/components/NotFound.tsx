import React from "react";
import { ArrowLeft, Home, Mail, FileDown } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../config/portfolio";

export const NotFound: React.FC = () => {
  const { profile, theme } = PORTFOLIO_CONFIG;

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f2efe9] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.accent }}
      />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Brand badge */}
        <div className="w-12 h-12 rounded-xl bg-[#ff5c3d] text-black font-black flex items-center justify-center text-lg font-mono mb-6 shadow-xl">
          UK
        </div>

        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff5c3d] mb-2">
          Error 404 · Route Not Found
        </span>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter text-white mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-200 mb-3">
          Lost in Digital Space
        </h2>

        <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed mb-8 max-w-md">
          The page or subpath you requested does not exist or has moved. Return to the main portfolio to explore Ugesh's projects, credentials, and work.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleGoHome}
            className="px-6 py-3 rounded-full bg-[#ff5c3d] text-black text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>

          <a
            href="/Ugesh_Kumar_Resume.pdf"
            download="Ugesh_Kumar_Resume.pdf"
            className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all"
          >
            <FileDown className="w-4 h-4" />
            Resume (PDF)
          </a>

          <a
            href="mailto:ugesh.official13@gmail.com"
            className="px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:border-white/30 transition-all"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 text-xs font-mono text-gray-500">
        © {new Date().getFullYear()} {profile.name} · Bengaluru, India
      </div>
    </div>
  );
};

export default NotFound;

