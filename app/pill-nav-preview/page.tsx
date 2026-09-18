"use client";

import * as React from "react";
import { PillNav } from "@/components/nav/PillNav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PillNavPreviewPage() {
  return (
    <div className="min-h-screen p-8 sm:p-16 flex flex-col items-center justify-center space-y-12 bg-[var(--bg)] text-[var(--fg)]">
      <div className="text-center space-y-3 max-w-xl">
        <div className="eyebrow tracking-[0.16em] text-[var(--signal)]">
          INTERACTIVE DEMO // COMPONENT PREVIEW
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          PillNav Component Preview
        </h1>
        <p className="text-sm text-[var(--fg-muted)]">
          Featuring smooth spring cursor-follow sliding indicator, keyboard Tab accessibility, and CSS token theming.
        </p>
      </div>

      {/* Primary PillNav component demo */}
      <div className="p-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg flex flex-col items-center space-y-8 max-w-3xl w-full">
        <div className="flex items-center justify-between w-full border-b border-[var(--border)] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
            Desktop Header Reference
          </span>
          <ThemeToggle />
        </div>

        <div className="py-6 flex justify-center w-full">
          <PillNav id="demo-pill-nav" />
        </div>

        <div className="text-xs font-mono text-[var(--fg-muted)] text-center max-w-md leading-relaxed">
          Hover items to see the indicator slide smoothly with spring dynamics. Press{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-2)] text-[var(--fg)]">
            Tab
          </kbd>{" "}
          to test keyboard navigation. Move mouse away to see it return to the active route.
        </div>
      </div>
    </div>
  );
}
