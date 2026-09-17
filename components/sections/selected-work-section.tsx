import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/section-reveal";

const CASE_STUDIES = [
  {
    slug: "aura-health",
    title: "Aura Health Clinical Intelligence",
    clientType: "HEALTHTECH STARTUP // SERIES A",
    problem: "Unstructured EHR records caused 45-minute physician delays during urgent admissions.",
    outcome: "-68% TRIAGE LATENCY",
    stack: ["Next.js 15", "Claude 3.5", "pgvector", "FastAPI"],
    accentGradient: "from-blue-500/10 to-transparent",
  },
  {
    slug: "omnitrack-fleet",
    title: "OmniTrack Telemetry & Route System",
    clientType: "ENTERPRISE LOGISTICS // 1,200 VEHICLES",
    problem: "Legacy dispatch platform dropped 12% of offline mobile telemetry packets in blind zones.",
    outcome: "99.98% TELEMETRY ACCURACY",
    stack: ["React Native", "Swift", "Kotlin", "TimescaleDB"],
    accentGradient: "from-emerald-500/10 to-transparent",
  },
  {
    slug: "neuroscan-ai",
    title: "NeuroScan EEG Automated Classifier",
    clientType: "ACADEMIC CAPSTONE // BIOMEDICAL",
    problem: "Manual EEG artifact annotation required 14 hours per patient dataset during clinical trials.",
    outcome: "94.6% F1 SCORE (GRADE A+)",
    stack: ["PyTorch", "FastAPI", "Next.js", "Docker"],
    accentGradient: "from-purple-500/10 to-transparent",
  },
];

export function SelectedWorkSection() {
  return (
    <section id="work" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="eyebrow">PORTFOLIO & PROVEN RESULTS</div>
            <h2 className="section-heading text-[var(--fg)]">
              Selected Case Studies
            </h2>
            <p className="body-text max-w-xl">
              Engineered deliverables backed by measurable performance metrics,
              production SLAs, and verifiable academic recognition.
            </p>
          </div>
          <Link
            href="/work"
            className="text-sm font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
          >
            <span>EXPLORE ALL PROJECTS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionReveal>

      {/* 3 Case Study Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CASE_STUDIES.map((study, idx) => (
          <SectionReveal key={study.slug} delay={idx * 0.1}>
            <Link href={`/work/${study.slug}`} className="block h-full group">
              <Card interactive className="h-full flex flex-col justify-between overflow-hidden">
                {/* Visual Header / Synthetic Display */}
                <div
                  className={`h-40 w-full border-b border-[var(--border)] bg-gradient-to-br ${study.accentGradient} bg-[var(--surface-2)] p-6 flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="flex justify-between items-center text-xs font-mono text-[var(--fg-muted)]">
                    <span>CASE_ID // 0{idx + 1}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-mono text-[var(--signal)]">
                      OUTCOME METRIC
                    </div>
                    <div className="text-2xl font-mono font-medium text-[var(--signal)]">
                      {study.outcome}
                    </div>
                  </div>
                </div>

                <CardHeader className="space-y-3">
                  <div className="eyebrow text-[10px] text-[var(--fg-muted)]">
                    {study.clientType}
                  </div>
                  <CardTitle className="text-xl group-hover:text-white transition-colors">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {study.problem}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {study.stack.map((item) => (
                      <Badge key={item} variant="mono" className="text-[10px]">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-[var(--border)]/60 text-xs font-mono text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                  <span>READ ARCHITECTURE TEARDOWN</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
