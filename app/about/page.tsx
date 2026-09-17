import Link from "next/link";
import { ArrowRight, ShieldCheck, Terminal, Cpu, Users, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PRINCIPLES = [
  {
    title: "100% IP & Repository Handover",
    description: "You own every line of code, Dockerfile, and architecture diagram from day one. No vendor lock-in, no proprietary licensing traps.",
    icon: ShieldCheck,
  },
  {
    title: "Zero Technical Debt Protocol",
    description: "Strict TypeScript types, automated CI/CD pipelines, high test coverage, and clear documentation. Code written for long-term maintainability.",
    icon: Terminal,
  },
  {
    title: "Principal Engineers Only",
    description: "No junior outsourcing or account manager telephone games. You collaborate directly with experienced software architects and machine learning engineers.",
    icon: Users,
  },
  {
    title: "Honest Academic Mentorship",
    description: "For capstone students: we never deliver black-box code. We ensure you understand every equation and algorithmic nuance for your defense.",
    icon: Award,
  },
];

const TEAM = [
  {
    name: "Hassan Rival",
    role: "Founding Principal Architect",
    specialty: "Full-Stack Architecture & Distributed Systems",
    bio: "Passionate about high-throughput web systems, offline-first mobile runtimes, and resilient cloud engineering.",
    skills: ["Next.js", "TypeScript", "Distributed Systems", "Postgres"],
  },
  {
    name: "AI & ML Systems Group",
    role: "Deep Learning & Applied AI Lead",
    specialty: "RAG Pipelines & Edge Vision Models",
    bio: "Engineers deterministic RAG architectures, custom fine-tuned PyTorch pipelines, and low-latency ONNX inference engines.",
    skills: ["PyTorch", "pgvector", "RAG", "CUDA"],
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero */}
      <div className="space-y-4 max-w-3xl">
        <div className="eyebrow text-[var(--accent)]">
          STUDIO ETHOS & ORIGIN // ABOUT HOPFIELD LABS
        </div>
        <h1 className="hero-heading text-[var(--fg)]">
          Engineering Software Like an Instrument
        </h1>
        <p className="body-text text-base md:text-lg">
          Named in homage to associative memory networks, Hopfield Labs is a specialized software and AI studio.
          We build dependable web applications, native mobile experiences, and production-grade GenAI integrations for founders and researchers.
        </p>
      </div>

      {/* 4 Core Principles */}
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="eyebrow">OUR COMMITMENTS</div>
          <h2 className="section-heading text-[var(--fg)]">
            How We Work With You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="p-5 sm:p-6 md:p-8 space-y-4">
                <div className="w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--signal)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-medium text-[var(--fg)]">
                  {p.title}
                </h3>
                <p className="body-text text-sm leading-relaxed">
                  {p.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team / Studio Setup */}
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="eyebrow">THE COLLECTIVE</div>
          <h2 className="section-heading text-[var(--fg)]">
            Studio Leadership & Engineering
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member) => (
            <Card key={member.name} className="p-5 sm:p-6 md:p-8 space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[var(--signal)]">{member.role}</div>
                <h3 className="text-2xl font-medium text-[var(--fg)]">{member.name}</h3>
                <div className="text-xs font-mono text-[var(--fg-muted)]">{member.specialty}</div>
              </div>
              <p className="body-text text-sm leading-relaxed">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {member.skills.map((s) => (
                  <Badge key={s} variant="mono" className="text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-5 sm:p-8 md:p-12 border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl font-medium text-[var(--fg)]">
            Have a project in mind?
          </h3>
          <p className="body-text text-sm">
            We review technical specifications within 12 hours. Let’s talk architecture, timelines, and deliverables.
          </p>
        </div>
        <Link href="/#contact" className="w-full sm:w-auto shrink-0">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            <span>Commence Project Brief</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
