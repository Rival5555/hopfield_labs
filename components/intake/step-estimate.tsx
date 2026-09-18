"use client";

import * as React from "react";
import { ServiceId, StageId, BudgetId } from "@/lib/intake-types";
import { getBallparkEstimate, formatCurrency } from "@/lib/estimate";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, CheckCircle2, Calculator, ShieldCheck } from "lucide-react";

interface StepEstimateProps {
  service: ServiceId;
  stage: StageId;
  budget: BudgetId;
  onContinue: (low: number, high: number, note: string) => void;
}

export function StepEstimate({
  service,
  stage,
  budget,
  onContinue,
}: StepEstimateProps) {
  const estimate = React.useMemo(() => {
    return getBallparkEstimate({ service, stage, budget });
  }, [service, stage, budget]);

  const handleContinue = () => {
    onContinue(estimate.low, estimate.high, estimate.note);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Heading */}
      <div className="space-y-2 text-center">
        <div className="eyebrow tracking-[0.16em] inline-flex items-center gap-1.5">
          <Calculator className="h-3.5 w-3.5 text-[var(--signal)]" />
          <span>STEP 4 OF 5 // INSTANT BALLPARK ESTIMATE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Estimated Engineering Investment
        </h2>
        <p className="text-sm text-[var(--fg-muted)]">
          Calculated in real-time based on your selected service discipline, stage, and scope parameters.
        </p>
      </div>

      {/* Main Ballpark Card */}
      <div className="p-7 sm:p-9 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-6 shadow-sm relative overflow-hidden">
        {/* Subtle accent glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 pointer-events-none -z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="text-center space-y-2 relative z-10">
          <div className="text-xs font-mono tracking-wider text-[var(--fg-muted)] uppercase">
            BALLPARK RANGE FOR {estimate.serviceTitle.toUpperCase()}
          </div>

          <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--fg)] py-1">
            {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
          </div>

          <p className="text-sm sm:text-base text-[var(--fg-muted)] font-medium">
            Most {estimate.serviceTitle.toLowerCase()} projects like this run{" "}
            <span className="text-[var(--fg)] font-semibold">
              {formatCurrency(estimate.low)}–{formatCurrency(estimate.high)}
            </span>
          </p>
        </div>

        {/* Note / Scope description */}
        <div className="p-4 rounded border border-[var(--border)] bg-[var(--surface-hover)] space-y-2 relative z-10">
          <div className="text-xs font-mono text-[var(--signal)] flex items-center gap-1.5 uppercase tracking-wider font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Scope Analysis</span>
          </div>
          <p className="text-xs text-[var(--fg)] leading-relaxed">
            {estimate.note}
          </p>
        </div>

        {/* Caveat & Disclaimer */}
        <div className="space-y-2 text-center text-xs text-[var(--fg-muted)] relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[var(--fg-muted)]">
            <Info className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
            <span className="font-medium text-[var(--fg)]">
              {estimate.caveat}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed max-w-lg mx-auto">
            This ballpark is an initial engineering baseline, not a formal binding quote. Following your brief submission on the next step, our engineering leads evaluate your detailed requirements and return a precise proposal with guaranteed sprint milestones.
          </p>
        </div>

        {/* Features included */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[var(--border)] text-xs text-[var(--fg-muted)] relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--signal)] shrink-0" />
            <span>100% Full IP & code ownership</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--signal)] shrink-0" />
            <span>Strict weekly code reviews & demo builds</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--signal)] shrink-0" />
            <span>Post-launch deployment & warranty support</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--signal)] shrink-0" />
            <span>Dedicated senior engineering pair</span>
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="text-center pt-2">
        <Button
          type="button"
          size="lg"
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 gap-2 font-medium h-12 text-sm"
        >
          <span>Looks good, continue</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
