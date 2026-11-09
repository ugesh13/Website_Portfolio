import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Maximize2, Award } from "lucide-react";

export type Certificate = {
  id: number;
  title: string;
  issuer?: string;
  imageUrl: string;
  width?: number;
  height?: number;
};

export interface CertificateAccordionProps {
  items: Certificate[];
  defaultActiveId?: number;
  className?: string;
  onActiveChange?: (certificate: Certificate) => void;
  onCertificateClick?: (certificate: Certificate) => void;
}

/**
 * Interactive Image Accordion Strip for Certificates
 *
 * Horizontal row of vertical panels where hovering, clicking, or focusing
 * expands a certificate in high-fidelity `object-contain` without text cropping,
 * while collapsed panels display neat vertical spine titles using CSS writing-mode.
 */
export function CertificateAccordion({
  items,
  defaultActiveId,
  className,
  onActiveChange,
  onCertificateClick,
}: CertificateAccordionProps) {
  const [activeId, setActiveId] = useState<number>(
    defaultActiveId ?? (items.length > 0 ? items[0].id : 0)
  );

  if (!items || items.length === 0) {
    return null;
  }

  const changeActive = (cert: Certificate) => {
    setActiveId(cert.id);
    onActiveChange?.(cert);
  };

  const handleSelect = (cert: Certificate) => {
    if (activeId === cert.id) {
      onCertificateClick?.(cert);
    } else {
      changeActive(cert);
    }
  };

  return (
    <div
      role="region"
      aria-label="Certificates interactive accordion showcase"
      className={cn(
        "flex flex-row items-stretch justify-start w-full gap-2 sm:gap-3 py-2",
        "overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {items.map((cert) => {
        const isActive = activeId === cert.id;

        return (
          <div
            key={cert.id}
            {...(!isActive
              ? {
                  role: "button",
                  tabIndex: 0,
                  "aria-expanded": false,
                  "aria-label": `Expand ${cert.title}${cert.issuer ? ` by ${cert.issuer}` : ""} certificate`,
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      changeActive(cert);
                    }
                  },
                }
              : {
                  role: "group",
                  "aria-roledescription": "active certificate slide",
                  "aria-label": `${cert.title} certificate`,
                })}
            onMouseEnter={() => changeActive(cert)}
            onFocus={() => {
              if (!isActive) changeActive(cert);
            }}
            onClick={() => handleSelect(cert)}
            className={cn(
              "group relative h-[380px] sm:h-[420px] md:h-[460px] rounded-2xl overflow-hidden cursor-pointer outline-none",
              "transition-all duration-700 ease-in-out select-none border",
              "focus-visible:ring-2 focus-visible:ring-[#ff5c3d] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              isActive
                ? "flex-[6] min-w-[200px] xs:min-w-[240px] sm:min-w-[460px] md:min-w-[560px] lg:min-w-[620px] max-w-full border-white/25 shadow-[0_12px_40px_rgba(0,0,0,0.85)] bg-[#070707]"
                : "flex-1 min-w-[36px] sm:min-w-[58px] md:min-w-[68px] max-w-[50px] sm:max-w-[76px] md:max-w-[84px] border-white/10 hover:border-white/20 bg-[#0c0c0c]"
            )}
          >
            {/* Certificate Image Frame */}
            <div className="relative w-full h-full flex items-center justify-center bg-black/40">
              <picture className="w-full h-full flex items-center justify-center">
                <source srcSet={cert.imageUrl} type="image/webp" />
                <img
                  src={cert.imageUrl.endsWith('.webp') ? cert.imageUrl.replace('.webp', '.jpeg') : cert.imageUrl}
                  alt={`${cert.title}${cert.issuer ? ` certificate awarded by ${cert.issuer}` : ''}`}
                  width={cert.width || 1600}
                  height={cert.height || 1200}
                  loading="lazy"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.opacity = "0.3";
                  }}
                  className={cn(
                    "w-full h-full transition-all duration-700 ease-in-out",
                    isActive
                      ? "object-contain p-2 sm:p-4 drop-shadow-xl"
                      : "object-cover object-center brightness-60 contrast-105 group-hover:brightness-75 group-hover:scale-105"
                  )}
                />
              </picture>

              {/* Inactive Overlay & Dark Gradient */}
              {!isActive && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85 transition-opacity duration-500 group-hover:from-black/40 group-hover:to-black/70"
                />
              )}

              {/* Collapsed Spine Title — uses CSS vertical-rl writing-mode without rotate-90 clipping */}
              {!isActive && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 flex flex-col items-center justify-between py-6 px-1 pointer-events-none"
                >
                  <Award className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-mono tracking-[0.18em] text-gray-300 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-h-[300px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {cert.title}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                </div>
              )}

              {/* Active Badge (Top-Left) */}
              {isActive && (
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono tracking-wider text-gray-200 shadow-md">
                  <Award className="w-3 h-3 text-[#ff5c3d]" />
                  <span>{cert.issuer || "Verified Credential"}</span>
                </div>
              )}

              {/* Active Fullscreen/Lightbox Affordance (Top-Right) */}
              {isActive && onCertificateClick && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCertificateClick(cert);
                  }}
                  title="Open full certificate in lightbox"
                  aria-label="Open full certificate in lightbox"
                  className="absolute top-3.5 right-3.5 z-20 inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 min-h-[44px] min-w-[44px] rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white uppercase tracking-wider hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3 text-[#ff5c3d]" />
                  <span className="hidden sm:inline">Enlarge</span>
                </button>
              )}

              {/* Active Bottom Caption Bar */}
              {isActive && (
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 sm:p-5 pt-10 flex items-end justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {cert.issuer && (
                      <span className="inline-block text-xs font-mono tracking-wider text-[#ff5c3d] font-bold mb-1">
                        {cert.issuer}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate drop-shadow-md">
                      {cert.title}
                    </h3>
                  </div>

                  {onCertificateClick && (
                    <span className="text-xs font-mono text-gray-400 hidden md:inline-flex items-center gap-1 shrink-0">
                      Click to view full image →
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CertificateAccordion;
