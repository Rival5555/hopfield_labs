"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  targetId?: string;
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#hero", targetId: "hero" },
  { label: "Services", href: "/#services", targetId: "services" },
  { label: "Work", href: "/#work", targetId: "work" },
  { label: "Jobs", href: "/jobs" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about", targetId: "about" },
  { label: "Contact", href: "/#contact", targetId: "contact" },
];

interface PillNavProps {
  id?: string;
  items?: NavItem[];
  className?: string;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function PillNav({
  id,
  items = DEFAULT_NAV_ITEMS,
  className,
}: PillNavProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [activeSection, setActiveSection] = React.useState<string>("hero");
  const [isPressed, setIsPressed] = React.useState(false);
  const isManualClickRef = React.useRef(false);

  // Scrollspy on homepage to keep indicator synchronized with viewport on manual scroll
  React.useEffect(() => {
    if (pathname !== "/") return;

    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (items.some((item) => item.targetId === hashId)) {
        setActiveSection(hashId);
      }
    }

    const handleScroll = () => {
      // Don't override active section while smooth scrolling from a manual click
      if (isManualClickRef.current) return;

      const scrollPosition = window.scrollY + 160;
      const sectionIds = ["contact", "about", "work", "services", "hero"];

      for (const sId of sectionIds) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, items]);

  // Find active route / section index
  const activeIndex = React.useMemo(() => {
    if (pathname === "/") {
      const idx = items.findIndex((item) => item.targetId === activeSection);
      return idx !== -1 ? idx : 0;
    }

    // Sub-route matching when on pages like /services, /work, /jobs, /blog
    const exactIdx = items.findIndex(
      (item) =>
        item.href === pathname ||
        (item.href !== "/" && pathname.startsWith(item.href)) ||
        (item.targetId && pathname.startsWith(`/${item.targetId}`))
    );
    if (exactIdx !== -1) return exactIdx;

    const subIdx = items.findIndex(
      (item) => item.targetId && pathname.startsWith(`/${item.targetId}`)
    );
    return subIdx !== -1 ? subIdx : 0;
  }, [pathname, activeSection, items]);

  // Indicator strictly tracks activeIndex — zero movement on cursor hover
  const targetIndex = activeIndex >= 0 ? activeIndex : null;

  const itemRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [indicator, setIndicator] = React.useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const updateIndicatorPosition = React.useCallback(() => {
    if (targetIndex === null || !containerRef.current) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const targetEl = itemRefs.current[targetIndex];
    const containerEl = containerRef.current;

    if (!targetEl || !containerEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    setIndicator({
      x: targetRect.left - containerRect.left,
      y: targetRect.top - containerRect.top,
      width: targetRect.width,
      height: targetRect.height,
      opacity: 1,
    });
  }, [targetIndex]);

  // Measure synchronously to prevent layout flash
  useIsomorphicLayoutEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  // Window resize listener
  React.useEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicatorPosition]);

  // Global mouseup safeguard
  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsPressed(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (pathname === "/") {
      if (item.targetId) {
        e.preventDefault();
        isManualClickRef.current = true;
        setActiveSection(item.targetId);

        setTimeout(() => {
          isManualClickRef.current = false;
        }, 900);

        if (item.targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        } else {
          const el = document.getElementById(item.targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${item.targetId}`);
          }
        }
      }
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== containerRef.current) return;

    let closestIdx = 0;
    let minDistance = Infinity;
    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(e.clientX - (rect.left + rect.width / 2));
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    const targetItem = items[closestIdx];
    if (targetItem) {
      if (pathname === "/" && targetItem.targetId) {
        isManualClickRef.current = true;
        setActiveSection(targetItem.targetId);

        setTimeout(() => {
          isManualClickRef.current = false;
        }, 900);

        if (targetItem.targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        } else {
          const el = document.getElementById(targetItem.targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${targetItem.targetId}`);
          }
        }
      } else {
        itemRefs.current[closestIdx]?.click();
      }
    }
  };

  // High-performance snappy spring for instant feedback on click
  const transitionConfig: Transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 450,
        damping: 32,
        mass: 0.6,
      };

  return (
    <nav
      id={id}
      ref={containerRef}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleContainerClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        "relative inline-flex items-center rounded-full bg-[var(--surface-2)] p-1 border border-[var(--border)] shadow-xs select-none",
        className
      )}
      aria-label="Main"
    >
      {/* Sliding indicator pill — moves strictly on click/active section */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none z-0"
        style={{ pointerEvents: "none" }}
        initial={false}
        animate={{
          x: indicator.x,
          y: indicator.y,
          width: indicator.width,
          height: indicator.height,
          opacity: indicator.opacity,
        }}
        transition={transitionConfig}
      >
        <motion.div
          className="w-full h-full rounded-full bg-[var(--fg)]"
          animate={{
            scale: isPressed ? 0.96 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Nav items */}
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={true}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={(e) => handleItemClick(e, item)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative z-10 px-3 py-1.5 sm:px-3.5 sm:py-2 lg:px-4.5 lg:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 outline-none select-none cursor-pointer whitespace-nowrap",
              "focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--surface-2)]",
              isActive
                ? "text-[var(--bg)] font-medium"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
