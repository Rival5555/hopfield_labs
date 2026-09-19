import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Cpu,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Terminal,
  Zap,
  Users,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Careers & Jobs // Hopfield Labs",
  description:
    "Explore engineering, AI research, and architecture opportunities at Hopfield Labs. Build high-impact systems without bureaucracy.",
};

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  tags: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

const POSITIONS: JobPosition[] = [
  {
    id: "senior-fullstack-systems-engineer",
    title: "Senior Full-Stack Systems Engineer",
    department: "Core Engineering",
    location: "Islamabad / Remote (Pakistan)",
    type: "Full-Time",
    experience: "3+ Years",
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Supabase", "TailwindCSS"],
    summary:
      "Architect and ship mission-critical web applications, high-throughput serverless APIs, and resilient data layers for international startups and enterprises.",
    responsibilities: [
      "Lead end-to-end full-stack development using Next.js App Router, React 19, and TypeScript.",
      "Design normalized PostgreSQL schemas with Row-Level Security (RLS) and performant indexing on Supabase.",
      "Build low-latency streaming endpoints, background worker queues, and third-party integrations.",
      "Champion zero-technical-debt practices: strict typing, automated CI/CD, and comprehensive unit/integration testing.",
    ],
    requirements: [
      "Deep proficiency in modern TypeScript, Next.js, and React component lifecycles.",
      "Proven track record designing scalable relational databases and transactional workflows in PostgreSQL.",
      "High comfort with serverless runtimes, edge functions, and Docker containerization.",
      "Obsession with performance: sub-100ms response times, zero layout shifts, and semantic web standards.",
    ],
  },
  {
    id: "applied-ai-engineer",
    title: "Applied AI & GenAI Systems Engineer",
    department: "AI Systems Group",
    location: "Islamabad / Remote",
    type: "Full-Time",
    experience: "2+ Years",
    tags: ["PyTorch", "pgvector", "RAG", "LLMs", "FastAPI", "ONNX"],
    summary:
      "Engineer deterministic Retrieval-Augmented Generation (RAG) pipelines, fine-tune open-weights models, and optimize low-latency inference for applied production systems.",
    responsibilities: [
      "Build hybrid vector search and reranking architectures utilizing pgvector, BM25, and Cross-Encoders.",
      "Fine-tune open-source models (Llama, Mistral, Qwen) using LoRA/QLoRA for domain-specific tasks.",
      "Develop evaluation harnesses and hallucination guardrails to benchmark prompt variations and model performance.",
      "Deploy inference pipelines with ONNX Runtime, vLLM, or TensorRT for ultra-low latency token streaming.",
    ],
    requirements: [
      "Strong background in Python, PyTorch, embedding spaces, and transformer architectures.",
      "Hands-on experience deploying vector databases, chunking strategies, and production RAG systems.",
      "Understanding of model quantization (GGUF, AWQ) and cost/latency tradeoffs in cloud vs. local inference.",
      "Strong mathematical foundation in linear algebra, probability, and neural networks.",
    ],
  },
  {
    id: "mobile-systems-architect",
    title: "Mobile Systems Architect",
    department: "Mobile Engineering",
    location: "Islamabad / Hybrid",
    type: "Full-Time",
    experience: "3+ Years",
    tags: ["React Native", "Expo", "TypeScript", "Offline-First", "Swift"],
    summary:
      "Design and deliver buttery-smooth, offline-first mobile applications across iOS and Android with native performance and local storage synchronization.",
    responsibilities: [
      "Develop cross-platform applications with React Native, Expo, and TypeScript maintaining consistent 60fps animations.",
      "Architect offline-first data replication layers using SQLite, WatermelonDB, or MMKV.",
      "Implement hardware integrations including camera processing, Bluetooth LE, and native biometric security.",
      "Manage automated iOS and Android build pipelines, App Store deployments, and over-the-air (OTA) updates.",
    ],
    requirements: [
      "Proven portfolio of published apps on Apple App Store and Google Play Store.",
      "Deep understanding of React Native bridge/JSI architecture and memory profiling.",
      "Experience writing custom native modules in Swift or Kotlin when standard packages fall short.",
      "Eye for micro-interactions, haptic feedback, and gestures that feel distinctly native.",
    ],
  },
  {
    id: "academic-capstone-fellow",
    title: "Academic Research & Capstone Fellow",
    department: "Mentoring & Research",
    location: "Islamabad / Remote",
    type: "Part-Time / Contract",
    experience: "BS/MS in CS or AI",
    tags: ["Mentorship", "System Design", "PyTorch", "Research", "LaTeX"],
    summary:
      "Guide final-year university students through technical architecture, algorithmic formulation, and proof-of-concept implementation for their capstone projects.",
    responsibilities: [
      "Conduct 1-on-1 technical advisory sessions on system architecture, model selection, and dataset prep.",
      "Review student codebases and research methodology to ensure technical depth and rigor.",
      "Help students prepare for viva defense examinations by asking sharp, probing technical questions.",
      "Uphold academic integrity standards, ensuring students truly comprehend the engineering behind their projects.",
    ],
    requirements: [
      "Degree in Computer Science, Software Engineering, or Artificial Intelligence with outstanding academic records.",
      "Exceptional communication skills and a passion for teaching complex engineering concepts.",
      "Strong practical skills in modern web frameworks, machine learning, or mobile development.",
      "Track record of having delivered a top-tier final-year project or published research paper.",
    ],
  },
];

const CULTURE_POINTS = [
  {
    icon: Terminal,
    title: "Principal-Only Model",
    description:
      "No account managers or bureaucratic telephone games. You collaborate directly with experienced architects, founders, and research partners.",
  },
  {
    icon: Zap,
    title: "High-Agency Deep Work",
    description:
      "We minimize meetings and eliminate busywork. You are trusted to own your systems from initial schema design to production deployment.",
  },
  {
    icon: Cpu,
    title: "Cutting-Edge Tooling",
    description:
      "Work with the modern stack: React 19, Next.js 15, PostgreSQL pgvector, PyTorch, and low-latency cloud infrastructure.",
  },
  {
    icon: Users,
    title: "Transparent & Flexible",
    description:
      "Flexible hybrid and remote options based in Islamabad. Top-tier compensation, performance bonuses, and hardware allowances.",
  },
];

export default function JobsPage() {
  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Studio Overview</span>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="space-y-6 border-b border-[var(--border)] pb-10">
        <div className="eyebrow text-[var(--signal)] flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>CAREERS &amp; OPPORTUNITIES // HOPFIELD LABS</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
            Build Systems That Matter.
          </h1>
          <p className="text-base sm:text-lg text-[var(--fg-muted)] max-w-3xl leading-relaxed">
            We are a specialized engineering studio building dependable web platforms, native mobile apps, and applied AI systems. We hire thoughtful, high-agency engineers who take craftsmanship seriously and want to work on ambitious technical challenges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--fg-muted)] pt-2">
          <span className="flex items-center gap-1.5 text-[var(--signal)]">
            <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
            4 OPEN ROLES
          </span>
          <span>•</span>
          <span>LOCATION: ISLAMABAD / REMOTE</span>
          <span>•</span>
          <span>ZERO BUREAUCRACY</span>
        </div>
      </header>

      {/* Engineering Culture Matrix */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="eyebrow text-[var(--accent)]">HOW WE WORK</div>
          <h2 className="text-2xl font-semibold text-[var(--fg)]">
            Our Engineering Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CULTURE_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2 hover:border-[var(--signal)]/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-[var(--fg)]">
                  <div className="p-2 rounded-lg bg-[var(--surface-2)] text-[var(--signal)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{point.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed pl-1">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div className="space-y-1">
            <div className="eyebrow text-[var(--signal)]">CURRENT OPENINGS</div>
            <h2 className="text-2xl font-semibold text-[var(--fg)]">
              Available Positions
            </h2>
          </div>
          <p className="text-xs text-[var(--fg-muted)] font-mono">
            Direct application • Fast 3-stage process
          </p>
        </div>

        <div className="space-y-6">
          {POSITIONS.map((pos) => (
            <div
              key={pos.id}
              className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--signal)]/50 transition-all space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Badge variant="outline" className="font-mono text-[10px] text-[var(--signal)] border-[var(--signal)]/40">
                      {pos.department}
                    </Badge>
                    <span className="text-xs text-[var(--fg-muted)] font-mono">
                      {pos.experience}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--fg)]">
                    {pos.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--fg-muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[var(--signal)]" />
                    {pos.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {pos.type}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                {pos.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pos.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[var(--surface-2)] text-[var(--fg-muted)] border border-[var(--border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Responsibilities & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-[var(--fg-muted)]">
                <div className="space-y-2 p-3.5 rounded-lg bg-[var(--surface-2)]/50 border border-[var(--border)]/60">
                  <div className="font-semibold text-[var(--fg)] font-mono text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--signal)]" />
                    <span>WHAT YOU&apos;LL BUILD:</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 marker:text-[var(--signal)] leading-relaxed">
                    {pos.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-3.5 rounded-lg bg-[var(--surface-2)]/50 border border-[var(--border)]/60">
                  <div className="font-semibold text-[var(--fg)] font-mono text-[11px] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span>WHAT WE&apos;RE LOOKING FOR:</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 marker:text-[var(--accent)] leading-relaxed">
                    {pos.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Apply action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-[var(--border)]/60">
                <div className="text-xs text-[var(--fg-muted)]">
                  Interested in this position? Send your GitHub/portfolio directly to our engineering desk.
                </div>
                <Button asChild size="sm" className="gap-2 shrink-0">
                  <a href={`mailto:careers@hopfieldlabs.com?subject=Application for ${encodeURIComponent(pos.title)}`}>
                    <span>Apply for Role</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring Process */}
      <section className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] space-y-6">
        <div className="space-y-1">
          <div className="eyebrow text-[var(--signal)]">TRANSPARENT EVALUATION</div>
          <h2 className="text-xl font-semibold text-[var(--fg)]">
            Our 3-Stage Hiring Process
          </h2>
          <p className="text-xs text-[var(--fg-muted)]">
            No whiteboard brainteasers. No multi-week waiting games.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <div className="font-mono text-xs text-[var(--signal)] font-bold">01 // CODE &amp; PORTFOLIO</div>
            <div className="text-sm font-semibold text-[var(--fg)]">Async Review</div>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              We look at software you&apos;ve actually built—public GitHub repositories, live websites, or past architectural designs.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <div className="font-mono text-xs text-[var(--signal)] font-bold">02 // ARCHITECTURE DEEP DIVE</div>
            <div className="text-sm font-semibold text-[var(--fg)]">Technical Discussion</div>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              A 45-minute technical conversation with a principal architect discussing system design tradeoffs, database indexing, or model pipelines.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <div className="font-mono text-xs text-[var(--signal)] font-bold">03 // DIRECT OFFER</div>
            <div className="text-sm font-semibold text-[var(--fg)]">Collaboration Decision</div>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              We extend a competitive offer with clear compensation, expectations, and immediate start onboarding.
            </p>
          </div>
        </div>
      </section>

      {/* General Application Footer CTA */}
      <section className="p-8 rounded-xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-2)] text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-[var(--signal)]/10 text-[var(--signal)] mb-1">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-[var(--fg)]">
          Don&apos;t See Your Exact Role?
        </h2>
        <p className="text-sm text-[var(--fg-muted)] max-w-lg mx-auto leading-relaxed">
          We always make room for exceptional builders. If you are an experienced software engineer, ML researcher, or UI/UX designer who wants to build high-caliber products, reach out.
        </p>
        <div className="pt-2">
          <Button asChild variant="outline" className="gap-2">
            <a href="mailto:careers@hopfieldlabs.com?subject=General Engineering Inquiry">
              <Mail className="h-4 w-4" />
              <span>Email careers@hopfieldlabs.com</span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
