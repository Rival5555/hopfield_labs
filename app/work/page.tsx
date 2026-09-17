import Link from "next/link";
import { ArrowRight, ExternalLink, Activity, ShieldCheck, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ALL_PROJECTS = [
  {
    slug: "aura-health",
    title: "Aura Health Clinical Intelligence",
    clientType: "HEALTHTECH STARTUP // SERIES A",
    category: "GenAI & Healthcare",
    problem:
      "Unstructured electronic health records (EHR) caused 45-minute physician delays during triage, risking patient outcomes in emergency rooms.",
    approach:
      "Architected a HIPAA-compliant hybrid RAG pipeline using Claude 3.5, pgvector with dense+sparse re-ranking, and a low-latency Next.js 15 clinical dashboard.",
    outcome: "-68% TRIAGE QUERY LATENCY",
    metrics: ["Sub-800ms Retrieval", "Zero PHI Leakage SLA", "99.4% Extraction Accuracy"],
    stack: ["Next.js 15", "FastAPI", "pgvector", "Claude 3.5", "Docker"],
  },
  {
    slug: "omnitrack-fleet",
    title: "OmniTrack Mobile Fleet Telemetry",
    clientType: "ENTERPRISE LOGISTICS // 1,200 VEHICLES",
    category: "Mobile & Real-Time IoT",
    problem:
      "Legacy mobile dispatch platform dropped 12% of offline mobile telemetry packets in cellular blind zones across interstate delivery routes.",
    approach:
      "Engineered an offline-first React Native architecture with background SQLite sync, native Swift/Kotlin geo-fencing daemon, and TimescaleDB ingestion pipeline.",
    outcome: "99.98% TELEMETRY ACCURACY",
    metrics: ["Zero Packet Drop", "40% Lower Battery Drain", "1,200 Active Devices"],
    stack: ["React Native", "Swift", "Kotlin", "TimescaleDB", "Node.js"],
  },
  {
    slug: "neuroscan-ai",
    title: "NeuroScan EEG Automated Classifier",
    clientType: "ACADEMIC CAPSTONE // BIOMEDICAL",
    category: "Deep Learning & FYP",
    problem:
      "Manual artifact detection in multi-channel EEG signals required 14 hours per patient dataset during epilepsy diagnostics clinical trials.",
    approach:
      "Trained a custom 1D-CNN transformer architecture in PyTorch with spectral wave decomposition, paired with a Next.js visualization interface for researchers.",
    outcome: "94.6% F1 SCORE (GRADE A+)",
    metrics: ["14h to 12s Analysis", "100% Defense Score", "IEEE Paper Acceptance"],
    stack: ["PyTorch", "Python", "Next.js", "Tailwind CSS", "FastAPI"],
  },
  {
    slug: "synthvector-indexer",
    title: "SynthVector RAG Benchmarking Suite",
    clientType: "OPEN SOURCE RESEARCH TOOLING",
    category: "Developer Tooling",
    problem:
      "Engineering teams lacked automated test suites to measure retrieval hallucination rates across diverse vector embedding models.",
    approach:
      "Created an open-source synthetic dataset generator and precision benchmark CLI comparing OpenAI, Cohere, and local sentence-transformers.",
    outcome: "3.2x FASTER EVALUATION",
    metrics: ["450+ GitHub Stars", "Automated CI Testing", "Zero Hallucination Regressions"],
    stack: ["TypeScript", "Python", "CLI", "Vitest", "pgvector"],
  },
];

export default function WorkPage() {
  return (
    <div className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="space-y-4 max-w-3xl">
        <div className="eyebrow text-[var(--signal)]">
          PORTFOLIO & CASE STUDIES // VERIFIED DELIVERABLES
        </div>
        <h1 className="hero-heading text-[var(--fg)]">
          Engineered Systems & Outcomes
        </h1>
        <p className="body-text text-base md:text-lg">
          Explore our architecture teardowns, technical challenges, and statistical outcomes across production web apps, mobile systems, GenAI pipelines, and academic capstones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ALL_PROJECTS.map((project, idx) => (
          <Card key={project.slug} className="flex flex-col justify-between p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="mono" className="text-[10px]">
                  {project.clientType}
                </Badge>
                <span className="font-mono text-xs text-[var(--signal)]">
                  {project.outcome}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-medium text-[var(--fg)]">
                  {project.title}
                </h2>
                <div className="eyebrow text-[10px] mt-1 text-[var(--accent)]">
                  {project.category}
                </div>
              </div>

              <div className="space-y-2 text-sm text-[var(--fg-muted)] leading-relaxed">
                <p>
                  <strong className="text-[var(--fg)] font-mono text-xs uppercase tracking-wider block">
                    Challenge:
                  </strong>
                  {project.problem}
                </p>
                <p>
                  <strong className="text-[var(--fg)] font-mono text-xs uppercase tracking-wider block pt-2">
                    Architectural Approach:
                  </strong>
                  {project.approach}
                </p>
              </div>

              <div className="pt-2">
                <div className="eyebrow text-[10px] mb-2">VERIFIED METRICS:</div>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <Badge key={m} variant="signal" className="text-[11px] py-1">
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <Badge key={t} variant="mono" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
              <Link href="/#contact" className="shrink-0">
                <Button size="sm" variant="outline" className="text-xs font-mono">
                  Discuss Similar
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
