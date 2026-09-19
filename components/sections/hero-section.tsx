import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AttractorField } from "@/components/motif/attractor-field";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[calc(100dvh-4rem)] flex items-center justify-center overflow-hidden pt-12 pb-24 md:py-32">
      {/* Faint radial glow top-center (accent at 6% opacity) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(79, 125, 255, 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Signature AttractorField motif behind hero */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <AttractorField nodeCount={46} connectionDistance={145} opacity={0.3} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center space-y-8">
        {/* Availability row */}
        <div className="inline-flex items-center gap-2">
          <Badge variant="signal" dot pulse className="py-1 px-3">
            TAKING PROJECTS FOR APRIL 2026
          </Badge>
        </div>

        {/* Mono eyebrow */}
        <div className="eyebrow tracking-[0.16em]">
          SOFTWARE & AI STUDIO
        </div>

        {/* Capability-led H1 (static paint for LCP) */}
        <h1 className="hero-heading max-w-4xl text-[var(--fg)]">
          Engineering resilient web, mobile & GenAI systems.
        </h1>

        {/* One-sentence subhead naming web, mobile, and AI */}
        <p className="body-text max-w-2xl text-base md:text-lg">
          We design and build production-grade web applications, native mobile apps, and custom AI integrations for startups, SMEs, and academic researchers.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full max-w-sm sm:max-w-none">
          <Link href="/start" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 h-12 px-7">
              <span>Start a project</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/work" className="w-full sm:w-auto">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto h-12 px-7 text-[var(--fg)] border border-[var(--border)]">
              <span>See our work</span>
              <Code2 className="h-4 w-4 ml-2 text-[var(--fg-muted)]" />
            </Button>
          </Link>
        </div>

        {/* Instrument telemetry baseline */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-[var(--fg-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
            FULL-STACK IP OWNERSHIP
          </span>
          <span className="hidden sm:inline text-[var(--border-strong)]">•</span>
          <span className="hidden sm:inline">ZERO TECHNICAL DEBT SPRINT PROTOCOL</span>
        </div>
      </div>
    </section>
  );
}
