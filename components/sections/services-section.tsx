import Link from "next/link";
import { ArrowRight, Globe, Smartphone, Sparkles, Brain, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/section-reveal";

const SERVICES = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "High-throughput web applications with sub-second page transitions, resilient API layers, and clean component systems.",
    icon: Globe,
    chips: ["Next.js 15", "TypeScript", "Tailwind CSS", "Server Actions"],
    isWide: true,
  },
  {
    slug: "mobile-development",
    title: "Mobile App Development",
    description: "Native Android & iOS applications delivering smooth 60fps interaction, offline sync, and strict platform compliance.",
    icon: Smartphone,
    chips: ["React Native", "Swift", "Kotlin", "Offline Cache"],
    isWide: true,
  },
  {
    slug: "genai-integration",
    title: "GenAI Integration",
    description: "Production RAG pipelines, autonomous agents, and enterprise LLM integrations engineered for deterministic output.",
    icon: Sparkles,
    chips: ["RAG Pipelines", "Vector DBs", "Claude / OpenAI", "LangChain"],
    isWide: false,
  },
  {
    slug: "aiml-solutions",
    title: "AI/ML in Web & Apps",
    description: "Custom computer vision, recommendation systems, and predictive algorithms deployed at low latency on edge & cloud.",
    icon: Brain,
    chips: ["PyTorch", "ONNX Runtime", "FastAPI", "Edge Inference"],
    isWide: false,
  },
  {
    slug: "fyp-mentoring",
    title: "FYP / Capstone Projects",
    description: "Comprehensive engineering for academic capstones: working prototypes, IEEE documentation, and rigorous viva preparation.",
    icon: GraduationCap,
    chips: ["Working Build", "IEEE Papers", "Viva Prep", "1-on-1 Mentoring"],
    isWide: false,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="eyebrow">CAPABILITIES & PRACTICE AREAS</div>
            <h2 className="section-heading text-[var(--fg)]">
              Core Engineering Services
            </h2>
            <p className="body-text max-w-xl">
              We operate across 5 dedicated software and artificial intelligence verticals, delivering end-to-end builds from raw concept to verified deployment.
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionReveal>

      {/* Bento Grid: 2 wide on top row, 3 below */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          const colSpan = service.isWide ? "md:col-span-3" : "md:col-span-2";

          return (
            <SectionReveal key={service.slug} delay={index * 0.08} className={colSpan}>
              <Link href={`/services/${service.slug}`} className="block h-full group">
                <Card interactive className="h-full flex flex-col justify-between p-2">
                  <CardHeader className="space-y-4">
                    {/* Lucide icon in a bordered square */}
                    <div className="w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/50 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="space-y-1.5">
                      <CardTitle className="text-xl group-hover:text-white transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {service.chips.map((chip) => (
                        <Badge key={chip} variant="mono" className="text-[10px]">
                          {chip}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t border-[var(--border)]/60 text-xs font-mono text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                    <span>LEARN MORE</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </CardFooter>
                </Card>
              </Link>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
