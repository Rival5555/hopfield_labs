"use client";

import * as React from "react";
import { SERVICE_OPTIONS, ServiceId } from "@/lib/intake-types";
import { Globe, Smartphone, Sparkles, Brain, GraduationCap, Wrench, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<ServiceId, React.ComponentType<{ className?: string }>> = {
  "web-development": Globe,
  "mobile-development": Smartphone,
  "genai-integration": Sparkles,
  "aiml-solutions": Brain,
  "fyp-mentoring": GraduationCap,
  "something-else": Wrench,
};

interface StepServiceProps {
  value: ServiceId;
  onChange: (service: ServiceId) => void;
}

export function StepService({ value, onChange }: StepServiceProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <div className="eyebrow tracking-[0.16em]">STEP 1 OF 5 // PRACTICE AREA</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)]">
          What domain are we engineering?
        </h2>
        <p className="text-sm text-[var(--fg-muted)] max-w-xl">
          Select the core technical discipline for your project. We assemble dedicated senior engineering squads tailored to each domain.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {SERVICE_OPTIONS.map((service) => {
          const Icon = ICONS[service.id];
          const isSelected = value === service.id;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onChange(service.id)}
              className={cn(
                "group relative flex flex-col justify-between p-5 rounded-[var(--radius)] border text-left transition-all duration-200 cursor-pointer min-h-[190px]",
                isSelected
                  ? "border-[var(--signal)] bg-[var(--surface-active)] shadow-sm ring-1 ring-[var(--signal)]/50"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-md border flex items-center justify-center transition-colors",
                      isSelected
                        ? "border-[var(--signal)]/40 bg-[var(--signal)]/10 text-[var(--signal)]"
                        : "border-[var(--border)] bg-[var(--surface-hover)] text-[var(--fg-muted)] group-hover:text-[var(--fg)]"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                      isSelected
                        ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                        : "border-[var(--border)] group-hover:border-[var(--border-strong)]"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono tracking-wider text-[var(--fg-muted)] uppercase">
                    {service.eyebrow}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--fg)] leading-snug">
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[var(--fg-muted)] leading-relaxed pt-2">
                {service.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
