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
      className="h-8 px-2.5 font-mono text-xs gap-1.5"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-3.5 w-3.5 text-[var(--signal)]" />
          <span>LIGHT MODE</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>DARK MODE</span>
        </>
      )}
    </Button>
  );
}
