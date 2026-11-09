import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PORTFOLIO_CONFIG, type Certificate } from "../config/portfolio";
import {
  CertificateAccordion,
  type Certificate as AccordionItem,
} from "@/components/ui/interactive-image-accordion";
import {
  Calendar,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import { useSectionReveals } from "../hooks/useSectionReveals";

export const CertificatesSection: React.FC = () => {
  const { certificates, theme } = PORTFOLIO_CONFIG;
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeCert, setActiveCert] = useState<Certificate>(certificates[0]);

  const sectionRef = useSectionReveals<HTMLElement>();

  // Map portfolio certificates to Accordion item format
  const accordionItems: AccordionItem[] = certificates.map((c, idx) => ({
    id: idx + 1,
    title: c.title,
    issuer: c.issuer,
    imageUrl: c.image,
  }));

  // Lock scroll when preview modal is active
  useEffect(() => {
    if (!selectedCert) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCert]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  const currentIndex = selectedCert
    ? certificates.findIndex((c) => c.id === selectedCert.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setSelectedCert(certificates[certificates.length - 1]);
    } else {
      setSelectedCert(certificates[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= certificates.length - 1) {
      setSelectedCert(certificates[0]);
    } else {
      setSelectedCert(certificates[currentIndex + 1]);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="bg-[#050505] text-white py-24 md:py-36 px-6 md:px-16 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div data-reveal="up" className="mb-14 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{ backgroundColor: theme.accent }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className="text-xs font-mono font-medium tracking-wider text-gray-400">
              Verified Credentials
            </span>
          </div>
          <h2
            data-reveal-lines
            className="text-3xl md:text-5xl font-black tracking-tight uppercase"
          >
            {["Continuous", "Learning"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 font-light max-w-xl">
            Verified credentials in AI, core programming, and national hackathons. Each badge marks practical skills put to work.
          </p>
        </div>

        {/* Interactive Image-Accordion Strip */}
        <div data-reveal="up" className="w-full">
          <CertificateAccordion
            items={accordionItems}
            defaultActiveId={1}
            onActiveChange={(item) => {
              const match = certificates.find(
                (c) => c.image === item.imageUrl || c.title === item.title
              );
              if (match) setActiveCert(match);
            }}
            onCertificateClick={(item) => {
              const match = certificates.find(
                (c) => c.image === item.imageUrl || c.title === item.title
              );
              if (match) setSelectedCert(match);
            }}
          />
        </div>

        {/* Dynamic Detail Card for Active Certificate */}
        {activeCert && (
          <div
            data-reveal="up"
            className="mt-8 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#0b0b0b] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 shadow-xl"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2.5 text-xs font-mono">
                <span
                  style={{
                    backgroundColor: "rgba(255, 92, 61, 0.15)",
                    borderColor: "rgba(255, 92, 61, 0.3)",
                    color: theme.accent,
                  }}
                  className="px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider"
                >
                  {activeCert.badge || "Verified Credential"}
                </span>
                <span className="text-gray-300 font-semibold tracking-wider">
                  {activeCert.issuer}
                </span>
                {activeCert.date && (
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeCert.date}
                  </span>
                )}
                {activeCert.duration && (
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {activeCert.duration}
                  </span>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                {activeCert.title}
              </h3>

              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-3xl mb-4">
                {activeCert.description}
              </p>

              {activeCert.skills && activeCert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono text-gray-300 bg-white/5 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedCert(activeCert)}
                style={{ backgroundColor: theme.accent }}
                className="px-5 py-2.5 rounded-full text-black text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <Maximize2 className="w-4 h-4" />
                View Full Lightbox
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Modal portaled to document.body */}
      {selectedCert && typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate preview: ${selectedCert.title}`}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in-up"
            onClick={() => setSelectedCert(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#0e0e0e] border border-white/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-xs font-mono font-bold uppercase tracking-wider">
                    {selectedCert.issuer}
                  </span>
                  <span className="text-xs font-mono text-gray-400 hidden sm:inline">
                    {selectedCert.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Navigation Controls */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Previous certificate (Left Arrow)"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Next certificate (Right Arrow)"
                    aria-label="Next certificate"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
                    title="Close preview (Escape)"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Display */}
              <div className="p-4 md:p-6 flex-1 overflow-auto flex items-center justify-center bg-black/60 min-h-[300px]">
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/img relative inline-block cursor-zoom-in"
                  title="Click to open full high-resolution certificate"
                >
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} full certificate preview`}
                    className="max-h-[62vh] w-auto max-w-full object-contain rounded-xl border border-white/10 shadow-2xl transition-transform duration-300 group-hover/img:scale-[1.01]"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" /> Click to enlarge
                  </div>
                </a>
              </div>

              {/* Modal Footer Information */}
              <div className="px-6 py-5 border-t border-white/10 bg-[#0c0c0c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg md:text-xl font-black tracking-tight text-white mb-1">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 font-light max-w-2xl">
                    {selectedCert.description}
                  </p>
                  {selectedCert.skills && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedCert.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-gray-300 border border-white/5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    Open Full Image
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    style={{ backgroundColor: theme.accent }}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default CertificatesSection;
