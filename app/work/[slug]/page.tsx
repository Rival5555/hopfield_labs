import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Activity } from "lucide-react";
import { ALL_PROJECTS } from "@/lib/work-data";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>All Case Studies</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="signal">{project.outcome}</Badge>
          <span className="text-xs font-mono text-[var(--accent)]">
            {project.clientType}
          </span>
          <span className="text-xs font-mono text-[var(--fg-muted)]">
            {project.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold text-[var(--fg)] tracking-tight">
          {project.title}
        </h1>
        <p className="body-text text-base md:text-lg max-w-3xl">
          {project.problem}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {project.metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] flex items-center gap-3"
          >
            <Activity className="h-5 w-5 text-[var(--signal)] shrink-0" />
            <span className="text-sm font-medium text-[var(--fg)]">{m}</span>
          </div>
        ))}
      </div>

      {/* Case Study Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-medium text-[var(--fg)]">
            Engineering Approach & Execution
          </h2>
          <div className="space-y-4 body-text text-sm md:text-base leading-relaxed">
            <p>{project.approach}</p>
            {project.fullCaseStudy?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Sidebar Architecture */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-base font-medium text-[var(--fg)]">
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="font-mono text-xs">
                  {tech}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <div className="eyebrow text-[var(--signal)]">PRODUCTION GRADE</div>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Every system delivered by Hopfield Labs is backed by automated CI/CD pipelines, strict type validation, and 30-day warranty.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-5 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="eyebrow text-[var(--signal)]">SIMILAR SPECIFICATIONS?</div>
          <h3 className="text-xl font-medium text-[var(--fg)]">
            Let&apos;s engineer your solution
          </h3>
          <p className="text-sm text-[var(--fg-muted)]">
            Discuss your architecture, timeline, and deliverables with our team.
          </p>
        </div>
        <Link href="/#contact" className="w-full sm:w-auto shrink-0">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            <span>Start a project</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
