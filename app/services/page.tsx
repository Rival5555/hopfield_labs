import Link from "next/link";
import { ArrowRight, Globe, Smartphone, Sparkles, Brain, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SERVICES_DETAILED = [
  {
    slug: "web-development",
    title: "Full-Stack Web Development",
    eyebrow: "NEXT.JS 15 // REACT 19 // TAILWIND",
    icon: Globe,
    description:
      "We engineer enterprise-grade, high-throughput web applications with sub-second page transitions, strict TypeScript type safety, and resilient serverless architectures.",
    capabilities: [
      "Next.js 15 App Router & React Server Components",
      "Tailwind CSS v4 engineered design systems",
      "PostgreSQL, Supabase & pgvector databases",
      "Stripe payment integration & custom auth workflows",
      "Automated CI/CD pipelines & edge caching",
    ],
    timeline: "3–6 weeks",
    startingFrom: "$3,500",
  },
  {
    slug: "mobile-development",
    title: "Native Mobile App Development",
    eyebrow: "IOS (SWIFT) // ANDROID (KOTLIN) // REACT NATIVE",
    icon: Smartphone,
    description:
      "Native and cross-platform mobile systems designed for silky smooth 60fps animations, rock-solid offline sync, and strict App Store & Google Play compliance.",
    capabilities: [
      "Cross-platform React Native / Expo architectures",
      "Native Swift (iOS) and Kotlin (Android) modules",
      "Offline-first SQLite / WatermelonDB local caching",
      "Real-time push notifications & background telemetry",
      "Hardware sensor integrations (Bluetooth, Camera, GPS)",
    ],
    timeline: "4–8 weeks",
    startingFrom: "$4,500",
  },
  {
    slug: "genai-integration",
    title: "GenAI & Autonomous Agent Systems",
    eyebrow: "RAG PIPELINES // VECTOR EMBEDDINGS // CLAUDE & OPENAI",
    icon: Sparkles,
    description:
      "Deterministic, production-ready AI architectures. We don't build toys—we engineer hybrid-search RAG pipelines, tool-calling agents, and custom fine-tuned workflows.",
    capabilities: [
      "Hybrid dense + sparse RAG retrieval pipelines",
      "Autonomous tool-calling agents & state machines",
      "Custom vector embeddings in pgvector and Pinecone",
      "Deterministic prompt engineering & evaluation suites",
      "Streaming Route Handlers with IP rate limiting",
    ],
    timeline: "2–5 weeks",
    startingFrom: "$3,800",
  },
  {
    slug: "aiml-solutions",
    title: "Applied AI/ML in Web & Apps",
    eyebrow: "PYTORCH // COMPUTER VISION // PREDICTIVE ANALYTICS",
    icon: Brain,
    description:
      "Custom deep learning and machine learning models trained on proprietary datasets and optimized for ultra-low latency on edge devices and GPU clusters.",
    capabilities: [
      "Custom PyTorch convolutional & transformer models",
      "Computer vision (object detection, image segmentation)",
      "Collaborative filtering & vector recommendation engines",
      "ONNX Runtime quantization & edge inference",
      "FastAPI microservices wrapped in Docker containers",
    ],
    timeline: "4–8 weeks",
    startingFrom: "$5,000",
  },
  {
    slug: "fyp-mentoring",
    title: "Final Year Project (FYP) & Capstone Mentorship",
    eyebrow: "NOVEL ARCHITECTURES // IEEE PAPERS // VIVA SIMULATION",
    icon: GraduationCap,
    description:
      "Comprehensive academic capstone partnership for university students and researchers. We build the working prototype and mentor you to defend every equation with confidence.",
    capabilities: [
      "Research gap identification & literature review framing",
      "Fully functional, cleanly documented codebase",
      "IEEE / LaTeX thesis formatting and result graphing",
      "1-on-1 mock viva defense cross-examination sessions",
      "Algorithmic explanation & theoretical deep-dives",
    ],
    timeline: "3–5 weeks",
    startingFrom: "$1,200",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="space-y-4 max-w-3xl">
        <div className="eyebrow text-[var(--accent)]">
          PRACTICE AREAS // SYSTEM CAPABILITIES
        </div>
        <h1 className="hero-heading text-[var(--fg)]">
          Software & AI Engineering Services
        </h1>
        <p className="body-text text-base md:text-lg">
          We operate across 5 dedicated software and artificial intelligence verticals.
          Every engagement includes full intellectual property transfer, strict type-safety,
          and a 30-day post-launch warranty.
        </p>
      </div>

      <div className="space-y-8">
        {SERVICES_DETAILED.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.slug} className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="eyebrow text-[10px]">{service.eyebrow}</div>
                    <h2 className="text-2xl font-medium text-[var(--fg)]">
                      {service.title}
                    </h2>
                    <p className="body-text max-w-2xl text-sm leading-relaxed pt-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-[var(--border)]">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-[var(--fg-muted)]">TYPICAL SPRINT</div>
                    <div className="text-sm font-mono text-[var(--fg)]">{service.timeline}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-[var(--fg-muted)]">TIER STARTING</div>
                    <div className="text-base font-mono text-[var(--signal)] font-medium">{service.startingFrom}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border)]/60 pt-6">
                <div className="eyebrow text-[10px] mb-3">WHAT’S DELIVERED:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {service.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-[var(--fg)] font-mono">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--signal)] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link href={`/#contact`}>
                  <Button size="sm" className="gap-1.5 font-medium">
                    <span>Scope {service.title.split(" ")[0]} Project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
