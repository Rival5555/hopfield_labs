"use client";

import * as React from "react";
import { BUDGET_OPTIONS, BudgetId } from "@/lib/intake-types";
import { cn } from "@/lib/utils";
import { Check, DollarSign, HelpCircle } from "lucide-react";

interface StepBudgetProps {
  value: BudgetId;
  onChange: (budget: BudgetId) => void;
}

export function StepBudget({ value, onChange }: StepBudgetProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <div className="eyebrow tracking-[0.16em]">STEP 3 OF 5 // BUDGET PARAMETERS</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Select your anticipated investment range
        </h2>
        <p className="text-sm text-[var(--fg-muted)] max-w-xl">
          We engineer within clear constraints. If you’re unsure, select &ldquo;Not sure yet&rdquo; and we&rsquo;ll provide an instant ballpark estimate on the next step.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {BUDGET_OPTIONS.map((opt) => {
          const isSelected = value === opt.id;
          const isUndecided = opt.id === "undecided";

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                "relative flex flex-col justify-between p-5 rounded-[var(--radius)] border text-left transition-all cursor-pointer min-h-[125px]",
                isSelected
                  ? "border-[var(--signal)] bg-[var(--surface-active)] shadow-sm ring-1 ring-[var(--signal)]/50"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              )}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isUndecided ? (
                      <HelpCircle className="h-4 w-4 text-[var(--fg-muted)]" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-[var(--signal)]" />
                    )}
                    <span className="text-base font-semibold text-[var(--fg)]">
                      {opt.label}
                    </span>
                  </div>

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

                <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                  {opt.subtitle}
                </p>
              </div>

              {isUndecided && (
                <div className="pt-2 text-[10px] font-mono text-[var(--signal)] uppercase tracking-wider">
                  Instant estimate provided next →
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
