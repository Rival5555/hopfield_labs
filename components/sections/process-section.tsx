import { Search, Compass, Cpu, Rocket } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    eyebrow: "ARCHITECTURE & SCOPE",
    description:
      "Deep dive into functional requirements, API interfaces, data pipelines, and security constraints. We deliver a concrete technical spec.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    eyebrow: "SYSTEM & INTERFACE",
    description:
      "Interactive high-fidelity prototypes, database schema modeling, and state machine design to remove ambiguity before writing code.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Build",
    eyebrow: "AGILE IMPLEMENTATION",
    description:
      "Disciplined two-week development sprints with type-safe code, comprehensive test suites, and staging builds reviewed every Friday.",
    icon: Cpu,
  },
  {
    number: "04",
    title: "Ship & Support",
    eyebrow: "DEPLOYMENT & WARRANTY",
    description:
      "Zero-downtime production deployment, telemetry integration, repository handover, and 30-day post-launch warranty support.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionReveal>
        <div className="space-y-3">
          <div className="eyebrow">ENGINEERING LIFECYCLE</div>
          <h2 className="section-heading text-[var(--fg)]">
            How We Build & Deliver
          </h2>
          <p className="body-text max-w-xl">
            A linear, milestone-driven protocol designed to eliminate scope drift
            and maintain continuous visibility throughout the project.
          </p>
        </div>
      </SectionReveal>

      {/* Horizontal stepper on desktop, vertical on mobile, connected by a 1px line */}
      <div className="relative">
        {/* Connecting 1px line behind steps (desktop) */}
        <div
          className="hidden md:block absolute top-7 left-12 right-12 h-[1px] bg-[var(--border)] -z-0"
          aria-hidden="true"
        />
        {/* Connecting 1px line behind steps (mobile vertical) */}
        <div
          className="block md:hidden absolute top-7 bottom-7 left-7 w-[1px] bg-[var(--border)] -z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <SectionReveal key={step.number} delay={idx * 0.1}>
                <div className="flex flex-col space-y-4">
                  {/* Step node icon */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-md border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--fg)] shrink-0 shadow-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--surface-2)]">
                      <Icon className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[var(--signal)]">
                      {step.number} {"//"}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="space-y-1.5 pt-1">
                    <div className="eyebrow text-[10px]">{step.eyebrow}</div>
                    <h3 className="text-xl font-medium text-[var(--fg)]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
