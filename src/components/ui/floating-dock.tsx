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
import { PanelBottomOpen, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={cn("relative block md:hidden", className)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="mobile-dock-nav"
            className="absolute bottom-full mb-3 inset-x-0 flex flex-col gap-2.5 items-center p-2 rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            {items.map((item, idx) => {
              const isActive =
                Boolean(activeHref) &&
                (activeHref === item.href ||
                  activeHref?.replace("#", "") === item.href.replace("#", ""));

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.8,
                    transition: { delay: idx * 0.03 },
                  }}
                  transition={{
                    delay: (items.length - 1 - idx) * 0.04,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <a
                    href={item.href}
                    aria-label={item.title}
                    title={item.title}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        smoothScrollTo(item.href);
                      }
                      setOpen(false);
                    }}
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center relative transition-all duration-200 outline-none",
                      "focus-visible:ring-2 focus-visible:ring-[#ff5c3d] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                      isActive
                        ? "bg-neutral-800 border border-[#ff5c3d]/60 text-[#ff5c3d] shadow-[0_0_12px_rgba(255,92,61,0.3)]"
                        : "bg-neutral-800/90 border border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800"
                    )}
                  >
                    <div className="h-5 w-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                      {item.icon}
                    </div>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#ff5c3d] shadow-[0_0_6px_#ff5c3d]"
                      />
                    )}
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        className={cn(
          "h-10 w-10 rounded-full bg-neutral-900/90 backdrop-blur-md border border-white/15 flex items-center justify-center text-neutral-200 shadow-2xl transition-all duration-200 hover:text-white active:scale-95 outline-none cursor-pointer",
          "focus-visible:ring-2 focus-visible:ring-[#ff5c3d] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          open && "border-[#ff5c3d]/50 text-[#ff5c3d]"
        )}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <PanelBottomOpen className="h-5 w-5" />
        )}
      </button>
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
      className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto", className)}
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

