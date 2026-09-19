import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting: 15 queries per IP per 10 minutes
const ipRateLimits = new Map<string, { count: number; expiresAt: number }>();

const SYSTEM_KNOWLEDGE = `
You are the Hopfield Labs Engineering Concierge. Hopfield Labs is an elite software & AI studio specializing in:
1. Web Development: High-performance Next.js 15, TypeScript, Tailwind, resilient serverless architecture.
2. Mobile App Development: React Native, Swift (iOS), Kotlin (Android), 60fps interaction and offline sync.
3. GenAI Integration: Production RAG pipelines, autonomous agents, vector embeddings, Claude/OpenAI/Gemini APIs, LangChain.
4. AI/ML in Web & Apps: Custom vision, recommendation systems, PyTorch models, ONNX, edge inference.
5. FYP / Final Year Projects: Academic capstone builds, proposal assistance, IEEE documentation, 1-on-1 viva defense mentoring.

Pricing & Engagements:
- Fixed-scope sprint blocks (typically 4-6 weeks for an MVP).
- Full IP & source code ownership handed to the client upon completion.
- Rigorous CI/CD, unit testing (target >90% coverage), and 30-day post-launch warranty.
- FYP mentoring includes both working software and architectural defense coaching.

Rules:
- Keep answers concise, technical, precise, and polite (max 3 short paragraphs).
- STRICTLY refuse off-topic inquiries (e.g. general knowledge, poetry, politics) by politely stating you are calibrated exclusively to answer questions about Hopfield Labs engineering services and capabilities.
`;

export async function POST(req: NextRequest) {
  void SYSTEM_KNOWLEDGE;
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();

    // Check rate limit
    const record = ipRateLimits.get(ip);
    if (record && record.expiresAt > now) {
      if (record.count >= 15) {
        return new NextResponse(
          "Rate limit exceeded. Maximum 15 questions per 10 minutes per IP.",
          { status: 429 }
        );
      }
      record.count += 1;
    } else {
      ipRateLimits.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    }

    const { message } = await req.json();
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return new NextResponse("Invalid query", { status: 400 });
    }

    const cleanQuery = message.trim().slice(0, 500);

    // Knowledge response generator
    const generateResponse = (q: string): string => {
      const lower = q.toLowerCase();

      // Check for off-topic queries
      const offTopicKeywords = ["poem", "joke", "recipe", "who is the president", "capital of", "weather", "horoscope"];
      if (offTopicKeywords.some((k) => lower.includes(k))) {
        return "I am the Hopfield Labs Concierge, calibrated specifically for engineering inquiries. I can only assist with questions regarding our software architecture, mobile builds, GenAI integrations, or FYP capstone engagements.";
      }

      if (lower.includes("fyp") || lower.includes("capstone") || lower.includes("viva") || lower.includes("student")) {
        return "Our FYP / Academic Capstone service is an end-to-end partnership: we help refine your proposal, architect a fully working prototype (web, mobile, or AI/ML), generate IEEE/LaTeX documentation, and conduct 1-on-1 viva defense simulations so you can explain every equation and design decision with confidence.";
      }

      if (lower.includes("rag") || lower.includes("genai") || lower.includes("llm") || lower.includes("agent")) {
        return "We build production-grade GenAI systems. Rather than basic wrapper scripts, we engineer deterministic RAG architectures with hybrid search (dense embeddings + sparse keyword), reranking models, metadata filtering in pgvector/Pinecone, and autonomous tool-calling agents backed by Claude 3.5, OpenAI, or Gemini.";
      }

      if (lower.includes("timeline") || lower.includes("how long") || lower.includes("fast")) {
        return "Our standard MVP delivery window is 4 to 6 weeks. We work in disciplined two-week sprints with staging releases every Friday. Production deployments include automated CI/CD, telemetry, and 30 days of post-launch stabilization.";
      }

      if (lower.includes("pricing") || lower.includes("cost") || lower.includes("budget")) {
        return "We offer transparent fixed-price sprint contracts for well-scoped MVPs (starting from $3,500 - $8,000 depending on complexity) as well as monthly dedicated engineering retainers for ongoing product iterations. All contracts include complete IP ownership from day one.";
      }

      if (lower.includes("stack") || lower.includes("tech") || lower.includes("framework")) {
        return "Our core stack is strictly type-safe and modern: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, React Native, Swift, Kotlin, PyTorch, FastAPI, Supabase / PostgreSQL, and pgvector. We avoid bloat and prioritize maintainability.";
      }

      return `Thank you for asking about "${cleanQuery}". At Hopfield Labs, we engineer resilient software across Full-Stack Web, Native Mobile (iOS/Android), and Production GenAI/ML systems. Every build is covered by strict type-safety, verified performance benchmarks, and full intellectual property assignment. Would you like to schedule a strategy call to review your exact specifications?`;
    };

    const text = generateResponse(cleanQuery);

    // Stream the text tokens chunk by chunk
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = text.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));
          // Micro delay to emulate realistic token streaming
          await new Promise((res) => setTimeout(res, 22));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return new NextResponse(errorMsg, { status: 500 });
  }
}
