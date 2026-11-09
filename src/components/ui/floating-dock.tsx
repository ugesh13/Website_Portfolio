import React, { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

export interface FloatingDockProps {
  items: DockItem[];
  activeHref?: string;
  desktopClassName?: string;
  mobileClassName?: string;
  className?: string;
}

const smoothScrollTo = (href: string) => {
  if (!href.startsWith("#")) return;
  if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", href);
    return;
  }
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  }
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  isActive,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Compute distance from mouseX to icon center in viewport coordinates
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const showTooltip = hovered || focused;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: prefersReducedMotion ? 40 : width,
        height: prefersReducedMotion ? 40 : height,
      }}
      aria-label={title}
      tabIndex={0}
      className={cn(
        "aspect-square rounded-full bg-neutral-800 flex items-center justify-center relative cursor-pointer outline-none border transition-colors duration-200",
        isActive
          ? "border-[#ff5c3d]/60 text-[#ff5c3d] shadow-[0_0_12px_rgba(255,92,61,0.25)]"
          : "border-white/10 text-neutral-300 hover:text-white hover:border-white/20",
        "focus-visible:ring-2 focus-visible:ring-[#ff5c3d] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
      )}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 3, x: "-50%" }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className="px-2.5 py-1 whitespace-nowrap rounded-md bg-neutral-900/95 border border-white/10 text-white text-xs font-medium shadow-xl absolute left-1/2 bottom-full mb-2 pointer-events-none z-50 backdrop-blur-sm"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{
          width: prefersReducedMotion ? 20 : widthIcon,
          height: prefersReducedMotion ? 20 : heightIcon,
        }}
        className="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
      >
        {icon}
      </motion.div>

      {/* Active orange dot indicator */}
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#ff5c3d] shadow-[0_0_8px_#ff5c3d]"
        />
      )}
    </motion.a>
  );
}

const FloatingDockDesktop: React.FC<{
  items: DockItem[];
  activeHref?: string;
  className?: string;
}> = ({ items, activeHref, className }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-3 lg:gap-4 items-end rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/10 px-4 pb-3 shadow-2xl shadow-black/60",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          key={item.title}
          mouseX={mouseX}
          title={item.title}
          icon={item.icon}
          href={item.href}
          isActive={
            Boolean(activeHref) &&
            (activeHref === item.href ||
              activeHref?.replace("#", "") === item.href.replace("#", ""))
          }
        />
      ))}
    </motion.div>
  );
};

const FloatingDockMobile: React.FC<{
  items: DockItem[];
  activeHref?: string;
  className?: string;
}> = ({ items, activeHref, className }) => {
  return (
    <div
      className={cn(
        "flex md:hidden items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 max-w-[calc(100vw-16px)] overflow-x-auto",
        className
      )}
    >
      {items.map((item) => {
        const isActive =
          Boolean(activeHref) &&
          (activeHref === item.href ||
            activeHref?.replace("#", "") === item.href.replace("#", ""));

        return (
          <a
            key={item.title}
            href={item.href}
            aria-label={item.title}
            title={item.title}
            onClick={(e) => {
              if (item.href.startsWith("#")) {
                e.preventDefault();
                smoothScrollTo(item.href);
              }
            }}
            className={cn(
              "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center relative transition-all duration-200 outline-none shrink-0 touch-manipulation",
              "focus-visible:ring-2 focus-visible:ring-[#ff5c3d] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
              isActive
                ? "bg-neutral-800 border border-[#ff5c3d]/60 text-[#ff5c3d] shadow-[0_0_10px_rgba(255,92,61,0.35)]"
                : "bg-neutral-800/80 border border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800"
            )}
          >
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {item.icon}
            </div>
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#ff5c3d] shadow-[0_0_6px_#ff5c3d]"
              />
            )}
          </a>
        );
      })}
    </div>
  );
};

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  activeHref,
  desktopClassName,
  mobileClassName,
  className,
}) => {
  return (
    <nav
      aria-label="Floating Navigation Dock"
      style={{
        bottom: "max(1rem, calc(0.5rem + env(safe-area-inset-bottom, 0px)))",
      }}
      className={cn("fixed left-1/2 -translate-x-1/2 z-50 pointer-events-auto", className)}
    >
      <FloatingDockDesktop
        items={items}
        activeHref={activeHref}
        className={desktopClassName}
      />
      <FloatingDockMobile
        items={items}
        activeHref={activeHref}
        className={mobileClassName}
      />
    </nav>
  );
};

export default FloatingDock;

