"use client";

import * as React from "react";
import {
  ServiceId,
  StageId,
  STAGE_OPTIONS,
  SCOPE_TIERS_BY_SERVICE,
} from "@/lib/intake-types";
import { cn } from "@/lib/utils";
import { Check, GraduationCap, Clock, Layers, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface StepScopeStageProps {
  service: ServiceId;
  scopeTier: string;
  stage: StageId;
  scopeNotes: string;
  onScopeTierChange: (tierId: string) => void;
  onStageChange: (stage: StageId) => void;
  onScopeNotesChange: (notes: string) => void;
}

export function StepScopeStage({
  service,
  scopeTier,
  stage,
  scopeNotes,
  onScopeTierChange,
  onStageChange,
  onScopeNotesChange,
}: StepScopeStageProps) {
  const tiers = SCOPE_TIERS_BY_SERVICE[service] || SCOPE_TIERS_BY_SERVICE["web-development"];
  const isStudent = stage === "university-student";

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="space-y-2 text-center md:text-left">
        <div className="eyebrow tracking-[0.16em]">STEP 2 OF 5 // SCOPE & STAGE</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Define your scope and organization stage
        </h2>
        <p className="text-sm text-[var(--fg-muted)] max-w-xl">
          We tune our engineering workflow, code reviews, and delivery milestones to match your stage and technical requirements.
        </p>
      </div>

      {/* 1. Stage Selector (Mandatory single-select) */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-[var(--signal)]" />
          <span>Select Your Organization / Project Stage *</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STAGE_OPTIONS.map((opt) => {
            const isSelected = stage === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onStageChange(opt.id)}
                className={cn(
                  "relative flex flex-col justify-between p-4 rounded-[var(--radius)] border text-left transition-all cursor-pointer min-h-[110px]",
                  isSelected
                    ? "border-[var(--signal)] bg-[var(--surface-active)] ring-1 ring-[var(--signal)]/50"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--fg)]">
                      {opt.label}
                    </span>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                        isSelected
                          ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                          : "border-[var(--border)]"
                      )}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto-routing Banner for University Student */}
      {isStudent && (
        <div className="p-4 rounded-[var(--radius)] border border-[var(--signal)]/40 bg-[var(--signal)]/10 text-[var(--fg)] space-y-1.5 transition-all animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--signal)] font-semibold">
            <GraduationCap className="h-4 w-4" />
            <span>Academic Capstone & FYP Track Auto-Routed</span>
          </div>
          <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
            Because you selected <strong>University student</strong>, we automatically adapt this project to meet university thesis rubrics. Alongside delivering your working prototype, you’ll receive dedicated code defense mentoring, algorithmic breakdown sessions, and IEEE / LaTeX documentation support.
          </p>
        </div>
      )}

      {/* 2. Scope Package / Tier Selection */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>Select Scope Package *</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {tiers.map((tier) => {
            const isSelected = scopeTier === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onScopeTierChange(tier.id)}
                className={cn(
                  "flex flex-col justify-between p-4 rounded-[var(--radius)] border text-left transition-all cursor-pointer min-h-[140px]",
                  isSelected
                    ? "border-[var(--signal)] bg-[var(--surface-active)] ring-1 ring-[var(--signal)]/50"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--fg-muted)] flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {tier.timeline}
                    </span>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                        isSelected
                          ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                          : "border-[var(--border)]"
                      )}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-[var(--fg)]">
                    {tier.title}
                  </h4>
                  <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Optional Scope Notes */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] flex justify-between">
          <span>Specific Scope Details or Must-Have Features (Optional)</span>
          <span className="text-[11px] text-[var(--fg-muted)]/70">e.g. integrations, deadlines, tech stack</span>
        </label>
        <Textarea
          placeholder="e.g. Needs Postgres with vector search, Stripe subscriptions, sub-second latency, and delivery before May 15..."
          rows={3}
          value={scopeNotes}
          onChange={(e) => onScopeNotesChange(e.target.value)}
        />
      </div>
    </div>
  );
}
