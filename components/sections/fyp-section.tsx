import Link from "next/link";
import { GraduationCap, ArrowRight, FileCheck, Code2, BookOpen, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/section-reveal";

const FYP_DELIVERABLES = [
  {
    title: "Proposal & Novelty Framing",
    description: "Guidance on literature review, research gap identification, and committee-approved scope definitions.",
    icon: FileCheck,
  },
  {
    title: "Production Working Build",
    description: "Modular, commented, and fully runnable codebase (web, mobile, or PyTorch ML) that passes all evaluation test benches.",
    icon: Code2,
  },
  {
    title: "IEEE / LaTeX Documentation",
    description: "Complete thesis drafting, architectural flowcharts, methodology diagrams, and benchmark evaluation tables.",
    icon: BookOpen,
  },
  {
    title: "Viva & Defense Simulations",
    description: "Mock cross-examination sessions on algorithms, computational complexity, and edge cases to ensure confidence.",
    icon: Mic,
  },
];

export function FypSection() {
  return (
    <section className="w-full border-y border-[var(--border)] bg-[var(--surface)] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <Badge variant="signal" dot className="py-0.5">
                  ACADEMIC CAPSTONE PROGRAM
                </Badge>
              </div>
              <h2 className="section-heading text-[var(--fg)]">
                Final Year Project (FYP) Engineering & Mentorship
              </h2>
              <p className="body-text text-base md:text-lg">
                We bridge the gap between academic theory and production reality.
                We engineer the system with you, teaching you the underlying
                architecture so you can defend every algorithm with certainty.
              </p>
            </div>

            <div className="shrink-0">
              <Link href="/contact?service=fyp">
                <Button size="lg" variant="signal" className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Book FYP Strategy Session</span>
                </Button>
              </Link>
            </div>
          </div>
        </SectionReveal>

        {/* 4 Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FYP_DELIVERABLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SectionReveal key={item.title} delay={idx * 0.08}>
                <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-2)] space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--signal)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-medium text-[var(--fg)]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 font-mono text-[10px] text-[var(--fg-muted)]">
                    DELIVERABLE 0{idx + 1}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Honest Mentorship & Turnaround Banner */}
        <SectionReveal delay={0.2}>
          <div className="p-6 md:p-8 rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface-2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="eyebrow text-[var(--signal)]">
                OUR COMMITMENT TO ACADEMIC INTEGRITY
              </span>
              <p className="text-sm font-medium text-[var(--fg)]">
                “We don’t believe in black-box code dumps. If you can’t explain the architecture in front of your external examiner, we haven’t done our job.”
              </p>
            </div>
            <div className="text-xs font-mono text-[var(--fg-muted)] shrink-0 space-y-1">
              <div>TYPICAL TURNAROUND: 3–5 WEEKS</div>
              <div className="text-[var(--signal)]">100% SUCCESSFUL DEFENSE RATE</div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
