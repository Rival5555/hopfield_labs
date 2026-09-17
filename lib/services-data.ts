import { Globe, Smartphone, Sparkles, Brain, GraduationCap, LucideIcon } from "lucide-react";

export interface ServiceDetail {
  slug: string;
  title: string;
  eyebrow: string;
  icon: LucideIcon;
  description: string;
  capabilities: string[];
  timeline: string;
  startingFrom: string;
  architectureDetails: string[];
}

export const SERVICES_DETAILED: ServiceDetail[] = [
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
    architectureDetails: [
      "Sub-800ms First Contentful Paint globally via Vercel Edge Network",
      "Strict TypeScript strictNullChecks and Zod runtime payload boundary validation",
      "Atomic transactional state management with PostgreSQL row-level locks",
    ],
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
    architectureDetails: [
      "60fps gesture-driven navigation with Reanimated 3",
      "Two-way delta sync reconciling offline changes upon reconnection",
      "Automated fastlane deployment pipelines directly to TestFlight and Play Internal",
    ],
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
    architectureDetails: [
      "BM25 + cosine similarity hybrid re-ranking with Cohere Rerank models",
      "Deterministic guardrails eliminating prompt injection and hallucinations",
      "Real-time token streaming with sub-40ms chunk intervals",
    ],
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
    architectureDetails: [
      "INT8 post-training quantization reducing model memory footprints by 75%",
      "CUDA-accelerated microservices with auto-scaling Kubernetes worker pods",
      "End-to-end MLflow experiment tracking and model registry",
    ],
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
    architectureDetails: [
      "Novel mathematical framing with rigorous benchmark baseline comparisons",
      "Clean git history showing authentic iterative commit progression",
      "Complete defense slide decks with architecture block diagrams",
    ],
  },
];
