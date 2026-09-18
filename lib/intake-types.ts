import { z } from "zod";

export const SERVICE_OPTIONS = [
  {
    id: "web-development",
    title: "Full-Stack Web Development",
    eyebrow: "NEXT.JS 15 // REACT 19 // TAILWIND",
    description: "Enterprise-grade web apps, sub-second latency, robust APIs, and modern Postgres schemas.",
    defaultLinkPlaceholder: "https://figma.com/file/...",
    linkLabel: "Figma link or spec URL (optional)",
  },
  {
    id: "mobile-development",
    title: "Native Mobile App",
    eyebrow: "IOS // ANDROID // REACT NATIVE",
    description: "Silky 60fps animations, rock-solid offline sync, native device modules, and App Store readiness.",
    defaultLinkPlaceholder: "https://figma.com/file/...",
    linkLabel: "Figma link or app demo URL (optional)",
  },
  {
    id: "genai-integration",
    title: "GenAI & Autonomous Agents",
    eyebrow: "RAG // EMBEDDINGS // CLAUDE & OPENAI",
    description: "Production RAG retrieval pipelines, autonomous multi-tool agents, and deterministic guardrails.",
    defaultLinkPlaceholder: "https://github.com/...",
    linkLabel: "GitHub repo or architecture doc (optional)",
  },
  {
    id: "aiml-solutions",
    title: "Applied AI/ML Systems",
    eyebrow: "PYTORCH // COMPUTER VISION // INFERENCE",
    description: "Custom PyTorch architectures, quantized edge inference, recommendation engines, and MLflow.",
    defaultLinkPlaceholder: "https://github.com/...",
    linkLabel: "GitHub repo or dataset link (optional)",
  },
  {
    id: "fyp-mentoring",
    title: "FYP & Academic Capstone",
    eyebrow: "IEEE PAPERS // CODE DEFENSE // PROTOTYPES",
    description: "Complete working prototype builds with 1-on-1 code defense mentoring and LaTeX thesis guidance.",
    defaultLinkPlaceholder: "https://docs.google.com/document/...",
    linkLabel: "Proposal doc link or rubric (optional)",
  },
  {
    id: "something-else",
    title: "Custom Engineering & Advisory",
    eyebrow: "ARCHITECTURE // AUDIT // SPRINT",
    description: "Technical feasibility audit, infrastructure scaling, code refactoring, or senior team augmentation.",
    defaultLinkPlaceholder: "https://...",
    linkLabel: "Project link or brief URL (optional)",
  },
] as const;

export type ServiceId = (typeof SERVICE_OPTIONS)[number]["id"];

export const STAGE_OPTIONS = [
  {
    id: "solo-founder",
    label: "Solo founder",
    description: "Bootstrapping an MVP or validating product-market fit.",
  },
  {
    id: "funded-startup",
    label: "Funded startup",
    description: "Seed / Series A team seeking velocity and engineering excellence.",
  },
  {
    id: "agency-business",
    label: "Agency or business",
    description: "Established company modernizing core software or expanding products.",
  },
  {
    id: "university-student",
    label: "University student",
    description: "Undergrad, Master's, or PhD researcher building capstone / FYP / thesis.",
  },
] as const;

export type StageId = (typeof STAGE_OPTIONS)[number]["id"];

export const BUDGET_OPTIONS = [
  {
    id: "under-3k",
    label: "Under $3,000",
    subtitle: "Scoping, proof-of-concept, or FYP prototype sprint",
  },
  {
    id: "3k-6k",
    label: "$3,000 – $6,000",
    subtitle: "Standard production MVP sprint (3–5 weeks)",
  },
  {
    id: "6k-12k",
    label: "$6,000 – $12,000",
    subtitle: "Complete multi-feature platform or complex agent system",
  },
  {
    id: "12k-plus",
    label: "$12,000+",
    subtitle: "Enterprise scale, multi-platform build, or large ML deployment",
  },
  {
    id: "undecided",
    label: "Not sure yet",
    subtitle: "Looking for technical scoping and ballpark recommendations",
  },
] as const;

export type BudgetId = (typeof BUDGET_OPTIONS)[number]["id"];

export const HEARD_FROM_OPTIONS = [
  { id: "google", label: "Google search" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "referral", label: "Referral / Word of mouth" },
  { id: "university", label: "University / Academic faculty" },
  { id: "other", label: "Other" },
] as const;

export type HeardFromId = (typeof HEARD_FROM_OPTIONS)[number]["id"];

export interface ScopeTier {
  id: string;
  title: string;
  timeline: string;
  description: string;
}

export const SCOPE_TIERS_BY_SERVICE: Record<ServiceId, ScopeTier[]> = {
  "web-development": [
    {
      id: "mvp-web",
      title: "Core MVP Web Application",
      timeline: "3–4 weeks",
      description: "Fast-to-market Next.js 15 app with authentication, database models, and responsive UI.",
    },
    {
      id: "production-platform",
      title: "Full Production Platform",
      timeline: "5–8 weeks",
      description: "Complete platform with Stripe payments, complex dashboards, automated CI/CD, and edge caching.",
    },
    {
      id: "enterprise-scale",
      title: "Enterprise Architecture & Scale",
      timeline: "8+ weeks",
      description: "High-concurrency microservices, multi-tenant schemas, real-time sync, and compliance.",
    },
  ],
  "mobile-development": [
    {
      id: "mobile-mvp",
      title: "Cross-Platform Mobile MVP",
      timeline: "4–6 weeks",
      description: "iOS & Android app via React Native with core UX, push notifications, and offline caching.",
    },
    {
      id: "mobile-hardware",
      title: "Native Modules & Hardware Sync",
      timeline: "6–10 weeks",
      description: "Bluetooth/BLE integration, camera processing, background location, and audio playback.",
    },
    {
      id: "mobile-suite",
      title: "Enterprise Multi-Platform Suite",
      timeline: "10+ weeks",
      description: "Complete companion ecosystem across phone, tablet, and web with automated fastlane pipelines.",
    },
  ],
  "genai-integration": [
    {
      id: "rag-pipeline",
      title: "Production RAG & Search Pipeline",
      timeline: "2–3 weeks",
      description: "Hybrid vector search, dense embeddings, re-ranking, and streaming chat route handlers.",
    },
    {
      id: "agentic-system",
      title: "Autonomous Multi-Tool Agent",
      timeline: "3–5 weeks",
      description: "State-machine agents with tool calling, database execution, and hallucination guardrails.",
    },
    {
      id: "custom-pipeline",
      title: "Fine-Tuned Models & Edge Inference",
      timeline: "5–8 weeks",
      description: "Dataset curation, LoRA fine-tuning, ONNX quantization, and sub-100ms inference clusters.",
    },
  ],
  "aiml-solutions": [
    {
      id: "ml-engine",
      title: "Predictive ML & Recommendations",
      timeline: "4–6 weeks",
      description: "Feature engineering, collaborative filtering, and scikit-learn/LightGBM production APIs.",
    },
    {
      id: "cv-deeplearning",
      title: "Computer Vision / Deep Learning",
      timeline: "6–8 weeks",
      description: "PyTorch object detection, segmentation, video pipeline processing, and CUDA optimization.",
    },
    {
      id: "ml-infrastructure",
      title: "Enterprise MLOps & Real-Time Sync",
      timeline: "8+ weeks",
      description: "Automated retraining pipelines, model registry, drift monitoring, and Kubernetes GPU pods.",
    },
  ],
  "fyp-mentoring": [
    {
      id: "fyp-prototype",
      title: "Working Prototype & Algorithm Sprint",
      timeline: "3–4 weeks",
      description: "Functional code implementation solving the proposed problem statement cleanly.",
    },
    {
      id: "fyp-complete",
      title: "Full Capstone: Code, Thesis & Defense",
      timeline: "4–6 weeks",
      description: "Complete application + IEEE/LaTeX formatting, experimental graphs, and 1-on-1 mock viva sessions.",
    },
    {
      id: "fyp-research",
      title: "Novel Research Lab & Paper Support",
      timeline: "5–8 weeks",
      description: "Novel algorithm benchmarking against baseline papers, ablation studies, and publication prep.",
    },
  ],
  "something-else": [
    {
      id: "audit-scoping",
      title: "Architecture Audit & Feasibility",
      timeline: "1–2 weeks",
      description: "Deep dive code review, performance profiling, and actionable technical roadmap.",
    },
    {
      id: "custom-sprint",
      title: "Targeted Engineering Sprint",
      timeline: "3–6 weeks",
      description: "High-impact execution sprint tackling complex features, migrations, or integrations.",
    },
    {
      id: "advisory-fractional",
      title: "Fractional CTO & Senior Advisory",
      timeline: "Ongoing",
      description: "Direct engineering leadership, architecture sign-offs, and technical hiring guidance.",
    },
  ],
};

export interface IntakeState {
  // Step 1: Service
  service: ServiceId;
  // Step 2: Scope & Stage
  scopeTier: string;
  stage: StageId;
  scopeNotes: string;
  // Step 3: Budget
  budget: BudgetId;
  // Step 4: Estimate
  estimateShownLow: number;
  estimateShownHigh: number;
  estimateNote: string;
  // Step 5: Contact, Attachments & Attribution
  name: string;
  email: string;
  company: string;
  message: string;
  heardFrom: string;
  linkUrl: string;
  attachmentPaths: string[];
  // Flow metadata
  step: number; // 1 to 5
  draftToken: string;
  draftEmail?: string;
  isDraftSaved?: boolean;
}

export const initialIntakeState: IntakeState = {
  service: "web-development",
  scopeTier: "mvp-web",
  stage: "solo-founder",
  scopeNotes: "",
  budget: "3k-6k",
  estimateShownLow: 3500,
  estimateShownHigh: 6000,
  estimateNote: "Standard full-stack web application build.",
  name: "",
  email: "",
  company: "",
  message: "",
  heardFrom: "",
  linkUrl: "",
  attachmentPaths: [],
  step: 1,
  draftToken: "",
};

// Zod schemas for validation
export const contactStepSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please provide a valid email address"),
  company: z.string().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Project brief must be at least 10 characters")
    .max(1500, "Brief cannot exceed 1500 characters"),
  heardFrom: z.string().optional().or(z.literal("")),
  linkUrl: z
    .string()
    .url("Please enter a valid URL (including https://)")
    .optional()
    .or(z.literal("")),
  attachmentPaths: z.array(z.string()).max(3, "Maximum of 3 files allowed").default([]),
});

export const intakeLeadSubmissionSchema = z.object({
  service: z.string(),
  stage: z.string(),
  scopeTier: z.string(),
  scopeNotes: z.string().optional().default(""),
  budget: z.string(),
  estimateShownLow: z.number().optional().default(0),
  estimateShownHigh: z.number().optional().default(0),
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().default(""),
  message: z.string().min(10),
  heardFrom: z.string().optional().default(""),
  linkUrl: z.string().optional().default(""),
  attachmentPaths: z.array(z.string()).default([]),
  source: z.string().default("start_flow"),
  draftToken: z.string().optional(),
});

export type IntakeSubmissionData = z.infer<typeof intakeLeadSubmissionSchema>;
