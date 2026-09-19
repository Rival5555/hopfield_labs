"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AttractorField } from "@/components/motif/attractor-field";
import {
  ArrowRight,
  Cpu,
  Layers,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";

export default function StyleguidePage() {
  const [loadingDemo, setLoadingDemo] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("user@example.com");

  const tokens = [
    {
      name: "--bg",
      hexDark: "#08090C",
      hexLight: "#FAFAFB",
      role: "Page base background",
      varClass: "bg-[var(--bg)]",
      borderClass: "border-[var(--border-strong)]",
    },
    {
      name: "--surface",
      hexDark: "#101319",
      hexLight: "#FFFFFF",
      role: "Cards, panels & nav container",
      varClass: "bg-[var(--surface)]",
      borderClass: "border-[var(--border)]",
    },
    {
      name: "--surface-2",
      hexDark: "#161A22",
      hexLight: "#F1F3F7",
      role: "Raised surfaces, chips, hover states",
      varClass: "bg-[var(--surface-2)]",
      borderClass: "border-[var(--border)]",
    },
    {
      name: "--border",
      hexDark: "#232935",
      hexLight: "#E1E5ED",
      role: "Default 1px structural outlines",
      varClass: "bg-[var(--border)]",
      borderClass: "border-[var(--border-strong)]",
    },
    {
      name: "--border-strong",
      hexDark: "#323A4A",
      hexLight: "#C4CBD6",
      role: "Hover outlines & high-emphasis dividers",
      varClass: "bg-[var(--border-strong)]",
      borderClass: "border-[var(--border)]",
    },
    {
      name: "--fg",
      hexDark: "#E9ECF2",
      hexLight: "#0A0B0F",
      role: "Primary text, headers, prominent UI",
      varClass: "bg-[var(--fg)]",
      borderClass: "border-[var(--border)]",
    },
    {
      name: "--fg-muted",
      hexDark: "#939CB0",
      hexLight: "#535D71",
      role: "Body copy, subtitles, mono labels (≥ 4.5:1)",
      varClass: "bg-[var(--fg-muted)]",
      borderClass: "border-[var(--border)]",
    },
    {
      name: "--accent",
      hexDark: "#4F7DFF",
      hexLight: "#3A69F0",
      role: "Primary CTAs, links, focus ring",
      varClass: "bg-[var(--accent)]",
      borderClass: "border-[var(--accent)]",
    },
    {
      name: "--accent-soft",
      hexDark: "rgba(79, 125, 255, 0.1)",
      hexLight: "rgba(58, 105, 240, 0.08)",
      role: "Soft contextual highlight backgrounds",
      varClass: "bg-[var(--accent-soft)]",
      borderClass: "border-[var(--accent)]/30",
    },
    {
      name: "--signal",
      hexDark: "#00D6A4",
      hexLight: "#00A880",
      role: "Active dots, metric counters, metrics",
      varClass: "bg-[var(--signal)]",
      borderClass: "border-[var(--signal)]",
    },
    {
      name: "--danger",
      hexDark: "#FF5C5C",
      hexLight: "#E03636",
      role: "Validation errors & critical alerts",
      varClass: "bg-[var(--danger)]",
      borderClass: "border-[var(--danger)]",
    },
  ];

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Top bar */}
        <header className="border-b border-[var(--border)] pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm tracking-[0.16em] uppercase font-bold text-[var(--fg)]">
                HOPFIELD LABS
              </span>
              <span className="text-[var(--border-strong)]">/</span>
              <span className="eyebrow">DESIGN SYSTEM SPEC v1.0</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight">
              Energy Landscape Tokens & Primitives
            </h1>
            <p className="body-text max-w-2xl">
              Dark-first, engineered, restrained visual language. No gradient
              soup, no drop shadows. Precise 1px structural borders, Geist
              typography, and energy-minimizing attractor fields.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="signal" dot pulse>
              CALIBRATED
            </Badge>
            <ThemeToggle />
          </div>
        </header>

        {/* Section 1: Color Tokens */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="eyebrow">01 // COLOR SPECIFICATION</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Design Tokens Matrix
            </h2>
            <p className="body-text">
              11 core variables defined in <code>app/globals.css</code>. Inverts
              seamlessly to light mode while preserving strict contrast ratios
              (body copy ≥ 6.5:1).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tokens.map((token) => (
              <div
                key={token.name}
                className="interactive-surface p-4 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-semibold text-[var(--fg)]">
                      {token.name}
                    </span>
                    <p className="text-xs text-[var(--fg-muted)] leading-snug">
                      {token.role}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-md border ${token.varClass} ${token.borderClass} shadow-inner shrink-0`}
                  />
                </div>
                <div className="pt-2 border-t border-[var(--border)] flex justify-between items-center text-[11px] font-mono text-[var(--fg-muted)]">
                  <span>DARK: {token.hexDark}</span>
                  <span>LIGHT: {token.hexLight}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typography */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="eyebrow">02 // TYPOGRAPHY HIERARCHY</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Geist Sans & Geist Mono Type Scale
            </h2>
            <p className="body-text">
              Engineered readability: Hero clamp, tight tracking on headings,
              wide mono tracking on eyebrows and instrumentation readouts.
            </p>
          </div>

          <div className="border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] divide-y divide-[var(--border)]">
            {/* Hero clamp */}
            <div className="p-6 md:p-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
                <span>HERO CLAMP — clamp(2.75rem, 6vw, 4.5rem) / font-medium / leading-[0.95]</span>
                <Badge variant="mono">GEIST SANS</Badge>
              </div>
              <p className="hero-heading text-[var(--fg)]">
                We engineer intelligent software.
              </p>
            </div>

            {/* Section heading */}
            <div className="p-6 md:p-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
                <span>SECTION HEADING — text-3xl md:text-4xl / font-medium / tracking-tight</span>
                <Badge variant="mono">GEIST SANS</Badge>
              </div>
              <h3 className="section-heading text-[var(--fg)]">
                Production-Grade AI & Web Architecture
              </h3>
            </div>

            {/* Mono Eyebrow & Stat Numbers */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-[var(--fg-muted)]">
                  MONO EYEBROW — text-xs / tracking-[0.12em] / uppercase
                </div>
                <div className="eyebrow">SOFTWARE & AI STUDIO // CAPABILITIES</div>
                <div className="eyebrow text-[var(--accent)]">
                  SYSTEM STATUS: OPERATIONAL
                </div>
                <div className="eyebrow text-[var(--signal)]">
                  TAKING PROJECTS FOR APRIL 2026
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[var(--fg-muted)]">
                  STAT METRIC — text-4xl / font-mono / text-[--signal]
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-mono font-medium text-[var(--signal)]">
                    99.4%
                  </span>
                  <span className="text-xs font-mono text-[var(--fg-muted)]">
                    TEST COVERAGE
                  </span>
                  <span className="text-4xl font-mono font-medium text-[var(--signal)]">
                    4-6w
                  </span>
                  <span className="text-xs font-mono text-[var(--fg-muted)]">
                    AVG DELIVERY
                  </span>
                </div>
              </div>
            </div>

            {/* Body Copy */}
            <div className="p-6 md:p-8 space-y-2">
              <div className="text-xs font-mono text-[var(--fg-muted)]">
                BODY COPY — text-[15px] / leading-relaxed / text-[--fg-muted] (Contrast ≥ 6.5:1)
              </div>
              <p className="body-text max-w-3xl">
                We build dependable web applications, native mobile experiences,
                and custom GenAI integrations. Every deliverable is structured
                for long-term maintainability with comprehensive tests, clear
                documentation, and measurable outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Button Variants & States */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="eyebrow">03 // INTERACTIVE PRIMITIVES</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Button States & Variants
            </h2>
            <p className="body-text">
              Engineered with 150ms transitions, subtle active compression
              (scale 0.98), and visible focus rings.
            </p>
          </div>

          <div className="border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] p-6 md:p-8 space-y-8">
            {/* Variants */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider block">
                VARIANTS
              </span>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="default">
                  <span>Start a project</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline">See our work</Button>
                <Button variant="subtle">Technical Specs</Button>
                <Button variant="ghost">Learn more</Button>
                <Button variant="signal">
                  <Zap className="h-4 w-4" />
                  <span>Book a call</span>
                </Button>
                <Button variant="danger">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Terminate Run</span>
                </Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider block">
                SIZES
              </span>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm" variant="default">
                  Small (32px)
                </Button>
                <Button size="default" variant="default">
                  Default (40px)
                </Button>
                <Button size="lg" variant="default">
                  Large (48px)
                </Button>
                <Button size="icon" variant="outline" aria-label="Icon test">
                  <Activity className="h-4 w-4 text-[var(--signal)]" />
                </Button>
              </div>
            </div>

            {/* States: Loading & Disabled */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider block">
                DYNAMIC STATES (LOADING & DISABLED)
              </span>
              <div className="flex flex-wrap gap-4 items-center">
                <Button
                  variant="default"
                  isLoading={loadingDemo}
                  onClick={() => {
                    setLoadingDemo(true);
                    setTimeout(() => setLoadingDemo(false), 2000);
                  }}
                >
                  {loadingDemo ? "Submitting action..." : "Click to test loading state"}
                </Button>

                <Button variant="default" disabled>
                  Disabled Primary
                </Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Card States & Surfaces */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="eyebrow">04 // SURFACE SPECIFICATION</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Card Treatments & Hover Behavior
            </h2>
            <p className="body-text">
              Zero drop shadows. 1px <code>--border</code> outlines that lift to{" "}
              <code>--border-strong</code> and <code>--surface-2</code> upon
              hover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard static card */}
            <Card>
              <CardHeader>
                <div className="w-9 h-9 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center mb-3 text-[var(--accent)]">
                  <Cpu className="h-4 w-4" />
                </div>
                <CardTitle>GenAI Integration</CardTitle>
                <CardDescription>
                  Production RAG pipelines, autonomous agents, and custom LLM API
                  orchestration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="mono">RAG</Badge>
                  <Badge variant="mono">VECTOR DB</Badge>
                  <Badge variant="mono">LANGCHAIN</Badge>
                </div>
              </CardContent>
              <CardFooter className="text-xs font-mono text-[var(--fg-muted)]">
                STATIC SURFACE (CARD)
              </CardFooter>
            </Card>

            {/* Interactive hover card */}
            <Card interactive>
              <CardHeader>
                <div className="w-9 h-9 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center mb-3 text-[var(--signal)]">
                  <Layers className="h-4 w-4" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  <span>Full-Stack Web</span>
                  <ArrowRight className="h-4 w-4 text-[var(--fg-muted)] group-hover:text-[var(--fg)]" />
                </CardTitle>
                <CardDescription>
                  High-performance web applications built on Next.js 15,
                  TypeScript, and resilient serverless architectures.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="mono">NEXT.JS</Badge>
                  <Badge variant="mono">TYPESCRIPT</Badge>
                  <Badge variant="mono">TAILWIND</Badge>
                </div>
              </CardContent>
              <CardFooter className="text-xs font-mono text-[var(--signal)]">
                HOVER TO TEST SURFACE LIFT →
              </CardFooter>
            </Card>

            {/* Metric Instrument Card */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="eyebrow">STATISTICAL OUTCOME</span>
                  <Activity className="h-4 w-4 text-[var(--signal)]" />
                </div>
                <div className="pt-4">
                  <div className="text-4xl font-mono font-medium text-[var(--signal)]">
                    42%
                  </div>
                  <div className="text-sm font-medium text-[var(--fg)] mt-1">
                    Latency Reduction
                  </div>
                  <CardDescription className="mt-1">
                    Achieved for medical image inference platform through edge
                    caching.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="border-t border-[var(--border)] pt-4 text-xs font-mono text-[var(--fg-muted)]">
                CLIENT CASE STUDY METRIC
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Section 5: Form Inputs */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="eyebrow">05 // FORM CONTROLS</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Inputs, Textareas & Validation
            </h2>
            <p className="body-text">
              Precision inputs with <code>--accent</code> focus rings and{" "}
              <code>--danger</code> error indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] p-6 md:p-8">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                  Default Input
                </label>
                <Input
                  placeholder="e.g. Founder or Team Lead"
                  defaultValue="Hopfield Partner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                  Focus State (Click to see --accent ring)
                </label>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter email..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--danger)] flex items-center justify-between">
                  <span>Error State</span>
                  <span className="text-[11px] normal-case">Invalid project scope</span>
                </label>
                <Input error defaultValue="Invalid format input" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                  Textarea (Project Description)
                </label>
                <Textarea
                  placeholder="Tell us about the project: deliverables, timeline, technical requirements..."
                  rows={5}
                />
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-[var(--fg-muted)]">
                <span>MAX 1000 CHARACTERS</span>
                <span>ZOD VALIDATED</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Signature Motif (AttractorField) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="eyebrow">06 // SIGNATURE MOTIF</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Attractor Field (Hopfield Network Motif)
            </h2>
            <p className="body-text">
              Dynamic node-graph settling into energy minima basins. Max opacity
              ≤ 0.35, radial edge fade mask, interactive mouse perturbation, and
              static fallback for <code>prefers-reduced-motion</code>.
            </p>
          </div>

          <div className="relative h-80 w-full border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] overflow-hidden flex flex-col justify-between p-6">
            {/* Background attractor field */}
            <div className="absolute inset-0 z-0">
              <AttractorField nodeCount={48} connectionDistance={150} opacity={0.4} />
            </div>

            {/* Overlaid UI content demonstrating text contrast */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1">
                <Badge variant="mono" dot pulse dotColor="signal">
                  HOPFIELD BASIN MINIMA // ACTIVE
                </Badge>
                <h3 className="text-xl font-medium tracking-tight text-[var(--fg)] mt-2">
                  Energy Landscape Simulation
                </h3>
              </div>
              <Badge variant="outline">CANVAS 2D / DPR SCALED</Badge>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-[var(--border)]/50 pt-4">
              <p className="text-xs font-mono text-[var(--fg-muted)] max-w-md">
                Hover over the field with your cursor to perturb nodes. Watch
                them settle back toward stable equilibrium points.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Inspect Canvas
                </Button>
                <Button size="sm" variant="default">
                  Simulate Perturbation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Styleguide Footer */}
        <footer className="pt-12 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--fg-muted)]">
          <span>HOPFIELD LABS // DESIGN SYSTEM v1.0</span>
          <span>COMPLIANT: NEXT.JS 15 • TAILWIND V4 • RADIX UI</span>
          <span>© 2026 HOPFIELD LABS</span>
        </footer>
      </div>
    </div>
  );
}
