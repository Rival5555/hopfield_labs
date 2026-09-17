import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Clock, Zap } from "lucide-react";
import { SERVICES_DETAILED } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DETAILED.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DETAILED.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb / Back */}
      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>All Services</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent">{service.eyebrow}</Badge>
          <span className="text-xs font-mono text-[var(--fg-muted)]">
            TIMELINE: {service.timeline}
          </span>
          <span className="text-xs font-mono text-[var(--signal)]">
            FROM {service.startingFrom}
          </span>
        </div>
        <div className="flex items-start gap-4 pt-2">
          <div className="w-14 h-14 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] shrink-0">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--fg)] tracking-tight">
              {service.title}
            </h1>
            <p className="body-text text-base md:text-lg max-w-3xl mt-2">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Deliverables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 sm:p-6 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-medium text-[var(--fg)] flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[var(--signal)]" />
              <span>Core Deliverables</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            {service.capabilities.map((cap) => (
              <div key={cap} className="flex items-start gap-2.5 text-sm text-[var(--fg-muted)]">
                <span className="text-[var(--signal)] font-mono">✓</span>
                <span>{cap}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="p-5 sm:p-6 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-medium text-[var(--fg)] flex items-center gap-2">
              <Zap className="h-5 w-5 text-[var(--accent)]" />
              <span>Architectural Guarantees</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            {service.architectureDetails.map((detail) => (
              <div key={detail} className="flex items-start gap-2.5 text-sm text-[var(--fg-muted)]">
                <span className="text-[var(--accent)] font-mono">▸</span>
                <span>{detail}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CTA Box */}
      <div className="p-5 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="eyebrow text-[var(--signal)]">READY TO PROCEED?</div>
          <h3 className="text-xl font-medium text-[var(--fg)]">
            Initiate your {service.title} engagement
          </h3>
          <p className="text-sm text-[var(--fg-muted)]">
            Guaranteed 12-hour response and architectural consultation with principal engineers.
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
