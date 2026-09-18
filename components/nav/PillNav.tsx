"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Transition } from "framer-motion";
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

  // Target item index currently highlighted by indicator
  const targetIndex =
    hoveredIndex !== null
      ? hoveredIndex
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

  const transitionConfig: Transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 380,
        damping: 30,
        mass: 0.8,
      };

  return (
    <nav
      id={id}
      ref={containerRef}
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        "relative inline-flex items-center rounded-full bg-[var(--surface-2)] p-1 border border-[var(--border)] shadow-xs",
        className
      )}
      aria-label="Main"
    >
      {/* Sliding indicator pill */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 rounded-full bg-[var(--fg)] pointer-events-none z-0"
        initial={false}
        animate={{
          x: indicator.x,
          y: indicator.y,
          width: indicator.width,
          height: indicator.height,
          opacity: indicator.opacity,
        }}
        transition={transitionConfig}
      />

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
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative z-10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-colors duration-200 outline-none select-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--surface-2)]",
              isTarget
                ? "text-[var(--bg)] font-semibold"
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
