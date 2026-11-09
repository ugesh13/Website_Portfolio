import React, { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import DotWordAnimation from "./DotWordAnimation";

// Lazy-load WebGL mosaic portrait with React.lazy
const HeroTilePortrait = React.lazy(() => import("./HeroTilePortrait"));

interface HeroPreloaderProps {
  onPreloadComplete: () => void;
}

const WORD_CLASS =
  "flex items-center text-[clamp(1.7rem,8.2vw,7.5rem)] xl:text-[11rem] font-black tracking-tighter drop-shadow-2xl leading-[0.88] uppercase select-none";
const GRADIENT_CLASS =
  "text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800";
const HOLD_MS = 500;

export const HeroPreloader: React.FC<HeroPreloaderProps> = ({ onPreloadComplete }) => {
  const { profile, projects } = PORTFOLIO_CONFIG;

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const startWord = profile.wordmark; // "UGESH"
  const targetWord = "PORTFOLIO";

  const [displayText, setDisplayText] = useState(prefersReducedMotion ? targetWord : startWord);
  const [scrambleStarted, setScrambleStarted] = useState(prefersReducedMotion);
  const [showDots, setShowDots] = useState(!prefersReducedMotion);
  const [playPortrait, setPlayPortrait] = useState(prefersReducedMotion);
  const [introFinished, setIntroFinished] = useState(prefersReducedMotion);

  const headingWrapperRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLSpanElement>(null);
  const rightHalfRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null); // Centered Name Block
  const anchorRef = useRef<HTMLImageElement>(null);

  const dotsDone = useRef(false);
  const timers = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const doneRef = useRef(onPreloadComplete);
  useEffect(() => {
    doneRef.current = onPreloadComplete;
  }, [onPreloadComplete]);

  const splitIndex = 4; // "PORT" (4) + "FOLIO" (5)
  const leftText = displayText.slice(0, splitIndex);
  const rightText = displayText.slice(splitIndex);

  const thumbSpecs = useMemo(() => {
    const hues: Record<string, number> = {
      "Full-Stack Web App": 18,
      "AI Brand Governance": 25,
      "AI Security & Governance": 32,
      "Biomedical ML": 195,
      "Research & Publication": 270,
    };
    return projects.map((p) => ({
      label: p.title.split(" ")[0],
      hue: hues[p.category] ?? 30,
    }));
  }, [projects]);

  // Centered Name Block: vertical positioning in the middle of free space between PORTFOLIO and the dock
  const updateNameBlockPosition = useCallback(() => {
    if (!headingWrapperRef.current || !roleRef.current) return;
    const pRect = headingWrapperRef.current.getBoundingClientRect();
    const dockEl = document.querySelector('nav[aria-label="Floating Navigation Dock"]') as HTMLElement | null;
    const dockTop = dockEl
      ? dockEl.getBoundingClientRect().top
      : window.innerHeight - (window.innerWidth < 768 ? 48 : 88);

    const availableSpace = dockTop - pRect.bottom;
    const block = roleRef.current;

    // Check if block fits with tagline (at least 12px of space on each side, or hide if landscape mobile)
    block.classList.remove("hide-tagline");
    let blockHeight = block.offsetHeight;
    let margin = (availableSpace - blockHeight) / 2;

    if (margin < 12 || window.innerHeight <= 500) {
      block.classList.add("hide-tagline");
      blockHeight = block.offsetHeight;
      margin = (availableSpace - blockHeight) / 2;
    }

    const sectionEl = document.getElementById("home");
    const sectionTop = sectionEl ? sectionEl.getBoundingClientRect().top : 0;
    const targetCenterY = pRect.bottom + availableSpace / 2;
    const relativeTop = targetCenterY - blockHeight / 2 - sectionTop;

    block.style.top = `${Math.round(relativeTop)}px`;
  }, []);

  useLayoutEffect(() => {
    updateNameBlockPosition();

    const ro = new ResizeObserver(() => {
      updateNameBlockPosition();
    });

    if (headingWrapperRef.current) ro.observe(headingWrapperRef.current);
    if (roleRef.current) ro.observe(roleRef.current);
    const dockEl = document.querySelector('nav[aria-label="Floating Navigation Dock"]');
    if (dockEl) ro.observe(dockEl);

    window.addEventListener("resize", updateNameBlockPosition);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateNameBlockPosition);
    };
  }, [updateNameBlockPosition, introFinished]);

  // Handle immediate skip
  const handleSkip = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    document.body.style.overflow = "auto";
    setShowDots(false);
    setScrambleStarted(true);
    setDisplayText(targetWord);
    setPlayPortrait(true);
    setIntroFinished(true);

    const isMobile = window.innerWidth < 768;
    const split = isMobile
      ? window.innerWidth * 0.10
      : Math.min(220, window.innerWidth * 0.15);

    if (headingWrapperRef.current) {
      gsap.killTweensOf(headingWrapperRef.current);
      gsap.set(headingWrapperRef.current, { clearProps: "y" });
    }
    if (roleRef.current) {
      gsap.killTweensOf(roleRef.current);
      gsap.set(roleRef.current, { y: 0, opacity: 1 });
    }
    if (leftHalfRef.current) {
      gsap.killTweensOf(leftHalfRef.current);
      gsap.set(leftHalfRef.current, { x: -split / 2 });
    }
    if (rightHalfRef.current) {
      gsap.killTweensOf(rightHalfRef.current);
      gsap.set(rightHalfRef.current, { x: split / 2 });
    }

    requestAnimationFrame(() => updateNameBlockPosition());
    doneRef.current?.();
  }, [targetWord, updateNameBlockPosition]);

  // Play intro: if prefers-reduced-motion, complete immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(targetWord);
      setScrambleStarted(true);
      setShowDots(false);
      setPlayPortrait(true);
      setIntroFinished(true);
      doneRef.current?.();
      return;
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [prefersReducedMotion, targetWord]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Dot animation complete callback
  const handleDotsComplete = useCallback(() => {
    if (dotsDone.current || prefersReducedMotion) return;
    dotsDone.current = true;
    const t1 = window.setTimeout(() => {
      setScrambleStarted(true);
      const t2 = window.setTimeout(() => setShowDots(false), 200);
      timers.current.push(t2);
    }, HOLD_MS);
    timers.current.push(t1);
  }, [prefersReducedMotion]);

  // Morph animation — UGESH morphs to PORTFOLIO in exact center of screen
  useEffect(() => {
    if (!scrambleStarted || prefersReducedMotion || introFinished) return;
    let cancelled = false;
    let step = 0;

    const interval = window.setInterval(() => {
      if (cancelled) return;

      setDisplayText(
        targetWord
          .split("")
          .map((char, idx) =>
            idx < Math.floor(step)
              ? char
              : idx < startWord.length
                ? startWord[idx]
                : ""
          )
          .join("")
      );

      if (step >= targetWord.length) {
        window.clearInterval(interval);
        intervalRef.current = null;
        setDisplayText(targetWord);

        const isMobile = window.innerWidth < 768;
        const finalCenterY =
          (isMobile ? 0.38 : 0.55) * window.innerHeight + 0.14 * window.innerHeight;
        const deltaY = finalCenterY - window.innerHeight / 2;
        const split = isMobile
          ? window.innerWidth * 0.10
          : Math.min(220, window.innerWidth * 0.15);

        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "auto";
            if (headingWrapperRef.current) {
              gsap.set(headingWrapperRef.current, { clearProps: "y" });
            }
            setIntroFinished(true);
            requestAnimationFrame(() => updateNameBlockPosition());
            doneRef.current?.();
          },
        });

        tl.to(headingWrapperRef.current, {
          y: deltaY,
          duration: 0.9,
          ease: "power2.out",
        });

        tl.fromTo(
          roleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );

        tl.call(() => setPlayPortrait(true), undefined, "-=0.6");

        tl.to(leftHalfRef.current, { x: -split / 2, duration: 0.9, ease: "power2.out" }, "<");
        tl.to(rightHalfRef.current, { x: split / 2, duration: 0.9, ease: "power2.out" }, "<");
      }

      step += 1 / 2;
    }, 28);

    intervalRef.current = interval;

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      intervalRef.current = null;
    };
  }, [scrambleStarted, prefersReducedMotion, introFinished, startWord, targetWord, updateNameBlockPosition]);

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="relative min-h-[100vh] min-h-[100dvh] pb-32 md:pb-40 flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: `radial-gradient(circle, #1a1a1a 0%, #050505 85%)` }}
    >
      {/* Skip Intro button for preloader */}
      {!introFinished && (
        <button
          type="button"
          onClick={handleSkip}
          className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-white/10 hover:bg-[#ff5c3d] text-white hover:text-black border border-white/20 text-xs font-mono font-semibold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-lg"
          aria-label="Skip intro animation"
        >
          Skip Intro ➔
        </button>
      )}

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Anchor image with cutout portrait & explicit dimensions (z-0) */}
      <div className="absolute inset-x-0 top-[2vh] md:top-[1vh] z-0 text-center text-white flex flex-col items-center w-full pointer-events-none">
        <picture>
          <img
            ref={anchorRef}
            src={profile.portraitCutout}
            alt="Ugesh Kumar"
            width={profile.portraitWidth}
            height={profile.portraitHeight}
            // @ts-expect-error fetchpriority standard in modern browsers
            fetchpriority="high"
            className="invisible w-auto max-w-none h-[95vh] h-[95dvh] md:h-[130vh]"
          />
        </picture>
      </div>

      {/* Lazy-loaded WebGL tile-mosaic portrait (z-0) */}
      <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
        <HeroTilePortrait
          src={profile.portraitCutout}
          thumbs={thumbSpecs}
          anchorRef={anchorRef}
          play={playPortrait}
          label="Portrait of Ugesh Kumar — Frontend Developer"
          className="z-0"
        />
      </Suspense>

      {/* Soft dark gradient behind name block (z-10: between portrait z-0 and PORTFOLIO z-20) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-[220px] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(5, 5, 5, 0.85) 0%, rgba(5, 5, 5, 0.45) 50%, rgba(5, 5, 5, 0) 100%)",
        }}
      />

      {/* Preloader Centered Wrapper: fixed 100dvh grid during intro, absolute in hero after */}
      <div
        className={
          introFinished
            ? "hero-portfolio-wrapper absolute inset-0 pointer-events-none z-20"
            : "preloader-wrapper fixed inset-0 grid place-items-center h-[100dvh] pointer-events-none z-20"
        }
      >
        {/* Main title centerpiece (UGESH in intro ➔ PORTFOLIO in hero) */}
        <div
          ref={headingWrapperRef}
          data-portfolio-heading
          className={
            introFinished
              ? "absolute top-[38%] md:top-[55%] left-1/2 pointer-events-none select-none flex flex-col items-center md:items-start w-max"
              : "relative pointer-events-none select-none flex flex-col items-center w-max"
          }
          style={
            introFinished
              ? {
                  transform:
                    "translate(-50%, calc(-50% + var(--portfolio-offset, 14vh)))",
                }
              : undefined
          }
        >
          {/* Scrambled typography */}
          <div
            aria-hidden="true"
            className={`${WORD_CLASS} ${GRADIENT_CLASS} transition-opacity duration-300 ${
              scrambleStarted ? "opacity-100" : "opacity-0"
            }`}
          >
            <span ref={leftHalfRef} className="inline-block will-change-transform">
              {leftText}
            </span>
            <span ref={rightHalfRef} className="inline-block will-change-transform">
              {rightText}
            </span>
          </div>

          {/* Preloader Dot animation overlay */}
          {showDots && !prefersReducedMotion && (
            <div
              aria-hidden="true"
              className={`absolute top-0 left-0 transition-opacity duration-300 ${
                scrambleStarted ? "opacity-0" : "opacity-100"
              }`}
            >
              <DotWordAnimation
                word={profile.wordmark}
                pivotIndex={2}
                className={WORD_CLASS}
                letterClassName={GRADIENT_CLASS}
                dotClassName="bg-gray-200"
                speed={1.5}
                onComplete={handleDotsComplete}
              />
            </div>
          )}
        </div>
      </div>

      {/* Centered Name Block anchored in free space between PORTFOLIO and the dock (z-30) */}
      <div
        ref={roleRef}
        data-hero-info
        className={`hero-name-block transition-opacity duration-300 ${
          introFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Canonical H1 for SEO/Accessibility: "Ugesh Kumar" with ", Frontend Developer" in sr-only */}
        <h1 className="hero-name text-white font-bold tracking-tight">
          {profile.name}
          <span className="sr-only">, {profile.role.bold} {profile.role.light}</span>
        </h1>

        {/* Tagline centered directly under the name */}
        <p className="hero-tagline font-mono text-gray-200 tracking-wide mt-2">
          {profile.subtitleLine}
        </p>
      </div>
    </section>
  );
};

export default HeroPreloader;
