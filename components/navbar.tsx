"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { PillNav } from "@/components/nav/PillNav";

const NAV_LINKS = [
  { href: "/#services", label: "Services", targetId: "services" },
  { href: "/#work", label: "Work", targetId: "work" },
  { href: "/#about", label: "About", targetId: "about" },
  { href: "/#contact", label: "Contact", targetId: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-xs"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Wordmark logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-[0.16em] uppercase font-bold text-[var(--fg)] hover:text-white transition-colors"
        >
          <Logo
            variant="mark"
            size={22}
            className="text-[var(--signal)] group-hover:scale-110 transition-transform"
            title="Hopfield Labs Logo"
          />
          <span>HOPFIELD LABS</span>
        </Link>

        {/* Desktop pill nav with sliding cursor-follow indicator */}
        <div className="hidden md:flex items-center justify-center">
          <PillNav id="header-pill-nav" />
        </div>

        {/* Desktop actions: Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/start">
            <Button size="sm" variant="default" className="gap-1.5 h-9 font-medium">
              <span>Start a project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 min-h-[44px] min-w-[44px]"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm flex flex-col justify-between">
              <div>
                <SheetHeader className="pb-6 border-b border-[var(--border)]">
                  <SheetTitle className="font-mono text-sm tracking-[0.16em] uppercase font-bold text-[var(--fg)] flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[var(--signal)]" />
                    HOPFIELD LABS
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 py-8">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.targetId)}
                        className="text-base py-2 border-b border-[var(--border)]/40 transition-colors text-[var(--fg-muted)] hover:text-[var(--fg)]"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/styleguide"
                      className="text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] py-2 uppercase tracking-wider"
                    >
                      Design System Spec
                    </Link>
                  </SheetClose>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
                  <span>SYSTEM AVAILABILITY</span>
                  <span className="text-[var(--signal)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
                    OPEN FOR Q2
                  </span>
                </div>
                <SheetClose asChild>
                  <Link href="/start" className="w-full block">
                    <Button className="w-full gap-2">
                      <span>Start a project</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
