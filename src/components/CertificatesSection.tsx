import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PORTFOLIO_CONFIG, type Certificate } from "../config/portfolio";
import {
  CertificateAccordion,
  type Certificate as AccordionItem,
} from "@/components/ui/interactive-image-accordion";
import {
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { useSectionReveals } from "../hooks/useSectionReveals";

export const CertificatesSection: React.FC = () => {
  const { certificates, theme } = PORTFOLIO_CONFIG;
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const courseCerts = certificates.filter((c) => c.type === "course");
  const hackathonCerts = certificates.filter((c) => c.type === "hackathon");

  const [activeCourse, setActiveCourse] = useState<Certificate>(courseCerts[0]);

  const sectionRef = useSectionReveals<HTMLElement>();

  const accordionItems: AccordionItem[] = courseCerts.map((c, idx) => ({
    id: idx + 1,
    title: c.title,
    issuer: c.issuer,
    imageUrl: c.image,
    width: c.width,
    height: c.height,
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

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (diff > 45) {
      handlePrev();
    } else if (diff < -45) {
      handleNext();
    }
  };

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
            <span className="text-xs font-mono font-medium tracking-wider text-gray-400 uppercase">
              5 Certificates &amp; Participations
            </span>
          </div>
          <h2
            data-reveal-lines
            className="text-3xl md:text-5xl font-black tracking-tight uppercase"
          >
            {["Credentials &", "Participations"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 font-light max-w-xl">
            Verified learning credentials across AI foundations and core programming, followed by competitive collegiate hackathon participations.
          </p>
        </div>

        {/* Row 1: The Three Coursework Credentials */}
        <div data-reveal="up" className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-4 h-4 text-[#ff5c3d]" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-gray-200 font-semibold">
              Course Credentials (3)
            </h3>
          </div>

          <CertificateAccordion
            items={accordionItems}
            defaultActiveId={1}
            onActiveChange={(item) => {
              const match = courseCerts.find(
                (c) => c.image === item.imageUrl || c.title === item.title
              );
              if (match) setActiveCourse(match);
            }}
            onCertificateClick={(item) => {
              const match = courseCerts.find(
                (c) => c.image === item.imageUrl || c.title === item.title
              );
              if (match) setSelectedCert(match);
            }}
          />

          {/* Active Course Card */}
          {activeCourse && (
            <div className="mt-6 p-6 rounded-2xl bg-[#0b0b0b] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ff5c3d]/15 border border-[#ff5c3d]/30 text-[#ff5c3d] font-bold uppercase tracking-wider">
                    {activeCourse.badge}
                  </span>
                  <span className="text-gray-300 font-semibold">
                    {activeCourse.issuer}
                  </span>
                  {activeCourse.date && (
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeCourse.date}
                    </span>
                  )}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                  {activeCourse.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed mb-3">
                  {activeCourse.description}
                </p>
                {activeCourse.skills && (
                  <div className="flex flex-wrap gap-1.5">
                    {activeCourse.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-row md:flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedCert(activeCourse)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  View Full <ExternalLink className="w-3.5 h-3.5" />
                </button>
                {activeCourse.verificationUrl && (
                  <a
                    href={activeCourse.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                  >
                    Issuer Page ➔
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Row 2: Separate Hackathons Row (2 Participations) */}
        <div data-reveal="up" className="pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-gray-200 font-semibold">
              Hackathon Participations (2)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathonCerts.map((hack) => (
              <div
                key={hack.id}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedCert(hack)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCert(hack);
                      }
                    }}
                    className="group relative block w-full aspect-[16/11] rounded-xl overflow-hidden border border-white/10 mb-4 cursor-pointer"
                  >
                    <img
                      src={hack.image}
                      alt={`${hack.title} — certificate of participation`}
                      width={hack.width || 1600}
                      height={hack.height || 1066}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-mono">
                        Click to enlarge
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                      {hack.badge}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{hack.date}</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                    {hack.title}
                  </h4>
                  <p className="text-xs font-mono text-gray-400 mb-3">{hack.issuer}</p>
                  <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                    {hack.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(hack)}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-200 text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  View Certificate <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Touch Swipe & Fullscreen on Phones */}
      {selectedCert &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-2xl animate-fade-in-up"
            onClick={() => setSelectedCert(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full max-w-4xl bg-[#0c0c0c] border border-white/20 rounded-none sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-full sm:h-auto max-h-[100dvh] sm:max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ff5c3d] font-bold">
                    {selectedCert.badge}
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold text-white">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Certificate Image — pinch-zoom friendly */}
              <div
                style={{ touchAction: "pan-x pan-y pinch-zoom" }}
                className="p-4 md:p-6 flex-1 overflow-auto flex items-center justify-center bg-black/80 min-h-[250px]"
              >
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} certificate awarded by ${selectedCert.issuer}`}
                  width={selectedCert.width || 1600}
                  height={selectedCert.height || 1200}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl border border-white/10 shadow-2xl"
                />
              </div>

              {/* Modal Footer with 44px Touch Arrows */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-[#080808] flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="truncate max-w-[200px] sm:max-w-none">{selectedCert.issuer}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next certificate"
                  >
                    <ChevronRight className="w-5 h-5" />
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
