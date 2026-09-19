import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Engineering Blog // Hopfield Labs",
  description:
    "Technical deep dives into production GenAI pipelines, high-throughput web systems, offline mobile runtimes, and engineering architecture.",
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
}

const POSTS: BlogPost[] = [
  {
    id: "deterministic-rag-architecture",
    title: "Deterministic RAG: Eliminating Hallucinations in High-Stakes Enterprise Systems",
    slug: "deterministic-rag-architecture",
    category: "Applied AI",
    date: "September 18, 2026",
    readTime: "8 min read",
    author: "AI Systems Group",
    featured: true,
    excerpt:
      "Why naive cosine similarity on raw chunk embeddings fails in production. How we architected hybrid BM25 + dense vector reranking with Cross-Encoders, metadata pre-filtering, and automated hallucination guardrails in Supabase pgvector.",
    tags: ["pgvector", "RAG", "Cross-Encoders", "PostgreSQL", "Python"],
  },
  {
    id: "zero-layout-shift-pill-navigation",
    title: "Zero-Layout-Shift Pill Navigators in React 19 & Framer Motion",
    slug: "zero-layout-shift-pill-navigation",
    category: "Frontend Architecture",
    date: "September 14, 2026",
    readTime: "5 min read",
    author: "Hassan Rival",
    excerpt:
      "Eliminating indicator stutter and layout thrashing across dynamic routes. A deep dive into isomorphic layout synchronization, click debounce guards, and GPU-composited spring transitions.",
    tags: ["React 19", "Framer Motion", "Performance", "TypeScript"],
  },
  {
    id: "supabase-row-level-security-deep-dive",
    title: "Why We Chose Supabase Row-Level Security Over Middleware Authorization",
    slug: "supabase-row-level-security-deep-dive",
    category: "Database & Security",
    date: "August 28, 2026",
    readTime: "7 min read",
    author: "Core Engineering",
    excerpt:
      "A defense-in-depth approach to tenant data isolation. Why pushing authorization checks down to the PostgreSQL query planner guarantees data safety even if edge route handlers are compromised.",
    tags: ["PostgreSQL", "RLS", "Supabase", "Security", "Next.js"],
  },
  {
    id: "edge-slm-quantization-onnx",
    title: "Fine-Tuning Small Language Models (SLMs) for Low-Latency Edge Inference",
    slug: "edge-slm-quantization-onnx",
    category: "Deep Learning",
    date: "August 12, 2026",
    readTime: "11 min read",
    author: "AI Systems Group",
    excerpt:
      "Quantizing 3B to 7B parameter models with ONNX Runtime and TensorRT to run sub-40ms local inference on mobile runtimes without cloud latency or prohibitive compute costs.",
    tags: ["ONNX", "PyTorch", "Quantization", "Edge AI", "CUDA"],
  },
  {
    id: "academic-capstone-blueprint",
    title: "The Capstone Blueprint: Structuring a Winning Computer Science Final Year Project",
    slug: "academic-capstone-blueprint",
    category: "Academic Research",
    date: "July 24, 2026",
    readTime: "6 min read",
    author: "Research Mentoring",
    excerpt:
      "From problem definition and empirical benchmarking to live demonstration protocols: our proven methodology for defending university capstones before rigorous academic panels.",
    tags: ["Academic", "FYP", "Research", "System Design"],
  },
];

const CATEGORIES = [
  { label: "All Topics", icon: BookOpen },
  { label: "Applied AI", icon: Cpu },
  { label: "Frontend Architecture", icon: Layers },
  { label: "Database & Security", icon: ShieldCheck },
  { label: "Academic Research", icon: GraduationCap },
];

export default function BlogPage() {
  const featuredPost = POSTS.find((p) => p.featured) || POSTS[0];
  const regularPosts = POSTS.filter((p) => p.id !== featuredPost.id);

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

      {/* Header */}
      <header className="space-y-6 border-b border-[var(--border)] pb-10">
        <div className="eyebrow text-[var(--signal)] flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span>ENGINEERING LOG // RESEARCH, ARCHITECTURE &amp; INSIGHTS</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
            Systems, Models &amp; Architecture.
          </h1>
          <p className="text-base sm:text-lg text-[var(--fg-muted)] max-w-3xl leading-relaxed">
            Technical write-ups, architecture teardowns, and engineering notes directly from our studio. We write about what we build: distributed systems, production GenAI pipelines, and high-throughput web applications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <span
                key={cat.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[var(--surface)] border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--signal)]/40 transition-colors cursor-pointer select-none"
              >
                <Icon className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>{cat.label}</span>
              </span>
            );
          })}
        </div>
      </header>

      {/* Featured Article */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="eyebrow text-[var(--signal)] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FEATURED DEEP DIVE</span>
          </div>
          <span className="text-xs font-mono text-[var(--fg-muted)]">EDITOR&apos;S PICK</span>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-2)] space-y-6 hover:border-[var(--signal)]/60 transition-all group">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--fg-muted)]">
            <Badge variant="outline" className="font-mono text-[10px] text-[var(--signal)] border-[var(--signal)]/40">
              {featuredPost.category}
            </Badge>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {featuredPost.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {featuredPost.readTime}
            </span>
            <span>•</span>
            <span>BY {featuredPost.author}</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--fg)] group-hover:text-[var(--signal)] transition-colors leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed">
              {featuredPost.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--border)]/60">
            <div className="flex flex-wrap gap-1.5">
              {featuredPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--fg-muted)] border border-[var(--border)]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--signal)] group-hover:translate-x-1 transition-transform">
              <span>Read Deep Dive</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Technical Articles */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border)] pb-3">
          <div className="eyebrow text-[var(--accent)]">ARCHIVE</div>
          <h2 className="text-2xl font-semibold text-[var(--fg)]">
            Technical Publications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--signal)]/50 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
                  <span className="text-[var(--signal)]">{post.category}</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[var(--fg)] group-hover:text-[var(--signal)] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)]/60 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--fg-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--fg-muted)]">
                    {post.date}
                  </span>
                  <span className="text-[var(--signal)] font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read article</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Discussion / CTA */}
      <section className="p-8 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] space-y-4 text-center">
        <div className="eyebrow text-[var(--signal)]">COLLABORATION &amp; INQUIRIES</div>
        <h2 className="text-2xl font-semibold text-[var(--fg)]">
          Have an Architecture Challenge?
        </h2>
        <p className="text-sm text-[var(--fg-muted)] max-w-lg mx-auto leading-relaxed">
          Whether you are looking to benchmark a custom RAG pipeline, rebuild a slow web application, or architect an applied AI system, our principal engineers are ready to collaborate.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="gap-2">
            <Link href="/start">
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              <span>Book an Architecture Review</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
