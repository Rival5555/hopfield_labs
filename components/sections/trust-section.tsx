import { SectionReveal } from "@/components/section-reveal";

const STATS = [
  { label: "PROJECTS DELIVERED", value: "48+", subtext: "Web, mobile & GenAI" },
  { label: "AVG DELIVERY TIME", value: "4-6w", subtext: "From spec to production" },
  { label: "STACK COVERAGE", value: "100%", subtext: "Type-safe Next.js, PyTorch" },
  { label: "CLIENT RETENTION", value: "96%", subtext: "Long-term engineering partners" },
];

const STACK_LOGOS = [
  { name: "Next.js 15", category: "Full-Stack Web" },
  { name: "TypeScript Strict", category: "Core Runtime" },
  { name: "PyTorch & CUDA", category: "Deep Learning" },
  { name: "FastAPI & Python", category: "Inference Engine" },
  { name: "Swift & Kotlin", category: "Native Mobile" },
  { name: "Supabase & Postgres", category: "Vector & Relational DB" },
];

export function TrustSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]/60 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionReveal>
          {/* 4-up stat row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`space-y-1.5 ${idx > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""}`}
              >
                <div className="text-3xl sm:text-4xl font-mono font-medium text-[var(--signal)]">
                  {stat.value}
                </div>
                <div className="eyebrow">{stat.label}</div>
                <p className="text-xs text-[var(--fg-muted)]">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Monochrome tech stack strip at 50% opacity */}
        <SectionReveal delay={0.1}>
          <div className="pt-8 border-t border-[var(--border)]/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <span className="eyebrow whitespace-nowrap">
              VERIFIED ARCHITECTURE STACK //
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 opacity-60">
              {STACK_LOGOS.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)]" />
                  <span className="font-mono text-xs text-[var(--fg)] tracking-wider">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
