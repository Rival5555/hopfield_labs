"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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

  // Find active route index
  const activeIndex = React.useMemo(() => {
    if (!pathname) return 0;
    // Exact match first
    const exactIdx = items.findIndex((item) => item.href === pathname);
    if (exactIdx !== -1) return exactIdx;

    // Sub-route match (e.g. /services/web-development matches /services)
    const subIdx = items.findIndex(
      (item) => item.href !== "/" && pathname.startsWith(item.href)
    );
    return subIdx !== -1 ? subIdx : 0;
  }, [pathname, items]);

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);
  const [isPressed, setIsPressed] = React.useState(false);

  // High-performance Framer Motion values for magnetic cursor-follow without React re-renders
  const mouseOffsetX = useMotionValue(0);
  const mouseOffsetY = useMotionValue(0);
  const springOffsetX = useSpring(mouseOffsetX, {
    stiffness: 400,
    damping: 26,
  });
  const springOffsetY = useSpring(mouseOffsetY, {
    stiffness: 400,
    damping: 26,
  });

  // Sync clickedIndex with pathname changes
  React.useEffect(() => {
    setClickedIndex(null);
  }, [pathname]);

  // Global mouseup safeguard
  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsPressed(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  // Target item index currently highlighted by indicator
  const targetIndex =
    hoveredIndex !== null
      ? hoveredIndex
      : clickedIndex !== null
      ? clickedIndex
      : focusedIndex !== null
      ? focusedIndex
      : activeIndex >= 0
      ? activeIndex
      : null;

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

  // Synchronous layout effect to measure without visual layout flash
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

  // Handle magnetic cursor-follow movement directly on MotionValues
  const updateCursorMagneticPull = React.useCallback(
    (clientX: number, clientY: number, activeIdx: number | null) => {
      if (prefersReducedMotion || activeIdx === null) return;
      const targetEl = itemRefs.current[activeIdx];
      if (!targetEl) return;

      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Magnetic pull toward cursor (up to ±12px X, ±4px Y)
      const deltaX = (clientX - centerX) * 0.32;
      const deltaY = (clientY - centerY) * 0.32;
      const clampedX = Math.max(-12, Math.min(12, deltaX));
      const clampedY = Math.max(-4, Math.min(4, deltaY));

      mouseOffsetX.set(clampedX);
      mouseOffsetY.set(clampedY);
    },
    [prefersReducedMotion, mouseOffsetX, mouseOffsetY]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCursorMagneticPull(e.clientX, e.clientY, targetIndex);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPressed(true);
    updateCursorMagneticPull(e.clientX, e.clientY, targetIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    mouseOffsetX.set(0);
    mouseOffsetY.set(0);
    setIsPressed(false);
  };

  // Clicking directly on the navigation bar padding snaps to the nearest item
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

    setClickedIndex(closestIdx);
    updateCursorMagneticPull(e.clientX, e.clientY, closestIdx);
    itemRefs.current[closestIdx]?.click();
  };

  const transitionConfig: Transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.7,
      };

  return (
    <nav
      id={id}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        "relative inline-flex items-center rounded-full bg-[var(--surface-2)] p-1 border border-[var(--border)] shadow-xs select-none",
        className
      )}
      aria-label="Main"
    >
      {/* Sliding indicator pill with cursor-follow magnetic dynamics */}
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
          style={{
            x: springOffsetX,
            y: springOffsetY,
          }}
          animate={{
            scale: isPressed ? 0.95 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Nav items */}
      {items.map((item, index) => {
        const isTarget = targetIndex === index;
        const isActive = activeIndex === index;

        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => {
              setClickedIndex(index);
              setHoveredIndex(index);
            }}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative z-10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-colors duration-200 outline-none select-none cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--surface-2)]",
              isTarget
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

