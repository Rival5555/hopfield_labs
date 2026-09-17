"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryTheme = params.get("theme") as "dark" | "light" | null;
    const stored = localStorage.getItem("hopfield-theme") as "dark" | "light" | null;
    const initialTheme = queryTheme || stored || "dark";
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("hopfield-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:h-9 px-2.5 sm:px-3 font-mono text-xs gap-1.5"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4 text-[var(--signal)]" />
          <span className="hidden sm:inline">LIGHT MODE</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-[var(--accent)]" />
          <span className="hidden sm:inline">DARK MODE</span>
        </>
      )}
    </Button>
  );
}
