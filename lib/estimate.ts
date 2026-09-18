import { ServiceId, StageId, BudgetId } from "./intake-types";

export interface EstimateResult {
  low: number;
  high: number;
  note: string;
  caveat: string;
  isAcademicTrack: boolean;
  serviceTitle: string;
}

interface EstimateKeyData {
  low: number;
  high: number;
  note: string;
}

/**
 * Explicit lookup table keyed by:
 * [service][stage][budget]
 *
 * All amounts are in USD.
 * Kept strictly as explicit data (no opaque formulas/magic multipliers)
 * for effortless manual calibration.
 */
export const ESTIMATE_LOOKUP_TABLE: Record<
  ServiceId,
  Record<StageId, Record<BudgetId, EstimateKeyData>>
> = {
  "web-development": {
    "solo-founder": {
      "under-3k": {
        low: 2400,
        high: 3800,
        note: "Focused lean MVP: auth, database schemas, responsive UI, and essential Stripe billing.",
      },
      "3k-6k": {
        low: 3500,
        high: 5800,
        note: "Standard production Next.js 15 web app with transactional emails, API endpoints, and admin panels.",
      },
      "6k-12k": {
        low: 6200,
        high: 10500,
        note: "Complex multi-role SaaS platform with real-time sync, team permissions, and advanced analytics.",
      },
      "12k-plus": {
        low: 12000,
        high: 18500,
        note: "Enterprise-grade web ecosystem with custom integrations, micro-frontends, and high-concurrency architecture.",
      },
      undecided: {
        low: 3800,
        high: 6500,
        note: "Typical early-stage founder web build covering full end-to-end architecture and launch readiness.",
      },
    },
    "funded-startup": {
      "under-3k": {
        low: 3000,
        high: 4500,
        note: "Fast prototype / internal tooling sprint designed for quick hypothesis testing.",
      },
      "3k-6k": {
        low: 4500,
        high: 7500,
        note: "High-velocity MVP built to institutional standards with comprehensive automated tests and CI/CD.",
      },
      "6k-12k": {
        low: 7500,
        high: 12500,
        note: "Scale-ready production application with edge caching, pgvector support, and audited security controls.",
      },
      "12k-plus": {
        low: 14000,
        high: 24000,
        note: "Comprehensive multi-tenant platform with SOC2-ready architecture and custom integrations.",
      },
      undecided: {
        low: 6500,
        high: 11000,
        note: "Benchmark funded startup scope: polished design system, sub-second LCP, and robust data persistence.",
      },
    },
    "agency-business": {
      "under-3k": {
        low: 3000,
        high: 4800,
        note: "Targeted module rewrite, speed optimization, or custom interactive component build.",
      },
      "3k-6k": {
        low: 4800,
        high: 8000,
        note: "Production client portal, headless CMS integration, or modernized web storefront.",
      },
      "6k-12k": {
        low: 8000,
        high: 13500,
        note: "Full-scale digital operations hub or customer-facing enterprise portal with ERP/CRM sync.",
      },
      "12k-plus": {
        low: 15000,
        high: 26000,
        note: "End-to-end company web transformation with dedicated SLA and custom backend pipelines.",
      },
      undecided: {
        low: 7000,
        high: 12000,
        note: "Standard agency/business baseline: scalable headless web infrastructure with seamless CMS management.",
      },
    },
    "university-student": {
      "under-3k": {
        low: 1200,
        high: 2400,
        note: "Academic web project / prototype with clean modular code, architectural documentation, and viva defense coaching.",
      },
      "3k-6k": {
        low: 2400,
        high: 4200,
        note: "Comprehensive academic capstone web platform with experimental test harness and LaTeX thesis framing.",
      },
      "6k-12k": {
        low: 4200,
        high: 7500,
        note: "Graduate research-grade web deployment with empirical benchmarking and conference publication support.",
      },
      "12k-plus": {
        low: 7500,
        high: 12000,
        note: "University lab collaborative platform or departmental research infrastructure build.",
      },
      undecided: {
        low: 1600,
        high: 3200,
        note: "Recommended student track: complete working web application with comprehensive code defense briefing.",
      },
    },
  },

  "mobile-development": {
    "solo-founder": {
      "under-3k": {
        low: 2800,
        high: 4200,
        note: "Core cross-platform MVP (React Native / Expo) covering primary flow and store compliance.",
      },
      "3k-6k": {
        low: 4500,
        high: 7200,
        note: "Polished iOS & Android release with offline local storage, push notifications, and in-app subscriptions.",
      },
      "6k-12k": {
        low: 7200,
        high: 12800,
        note: "Feature-rich mobile platform with real-time sockets, Bluetooth/camera hardware APIs, and high rating UX.",
      },
      "12k-plus": {
        low: 13500,
        high: 22000,
        note: "Native iOS (Swift) & Android (Kotlin) dual build with high-throughput custom backend sync.",
      },
      undecided: {
        low: 4800,
        high: 8000,
        note: "Standard mobile launch package: cross-platform iOS & Android app ready for App Store & Play Store.",
      },
    },
    "funded-startup": {
      "under-3k": {
        low: 3500,
        high: 5000,
        note: "Rapid POC build demonstrating core interactive physics or novel UX concept.",
      },
      "3k-6k": {
        low: 5500,
        high: 9000,
        note: "Production cross-platform mobile app with telemetry, crash logging, and automated Fastlane CI.",
      },
      "6k-12k": {
        low: 9000,
        high: 14500,
        note: "High-retention mobile product featuring smooth 60fps micro-animations and zero-latency caching.",
      },
      "12k-plus": {
        low: 16000,
        high: 28000,
        note: "Flagship mobile ecosystem with multi-platform parity and dedicated backend orchestration.",
      },
      undecided: {
        low: 8000,
        high: 13500,
        note: "Recommended funded startup scope: polished, scalable React Native mobile architecture.",
      },
    },
    "agency-business": {
      "under-3k": {
        low: 3500,
        high: 5200,
        note: "Companion mobile utility or targeted internal employee tablet interface.",
      },
      "3k-6k": {
        low: 5800,
        high: 9500,
        note: "Business-to-consumer mobile app with account syncing and custom branding tokens.",
      },
      "6k-12k": {
        low: 9500,
        high: 15500,
        note: "Enterprise field operations or fleet mobile app with offline SQLite sync and security auditing.",
      },
      "12k-plus": {
        low: 17000,
        high: 30000,
        note: "Large-scale organizational mobile transformation across iOS, iPadOS, and Android tablets.",
      },
      undecided: {
        low: 8500,
        high: 14000,
        note: "Standard business mobile deployment with enterprise auth and backend systems integration.",
      },
    },
    "university-student": {
      "under-3k": {
        low: 1400,
        high: 2800,
        note: "Academic mobile app prototype with local database, clean architecture, and thesis defense materials.",
      },
      "3k-6k": {
        low: 2800,
        high: 4800,
        note: "Complete capstone mobile solution with hardware sensor integration and simulated viva evaluation.",
      },
      "6k-12k": {
        low: 4800,
        high: 8000,
        note: "Advanced research mobile application benchmarked for academic paper submission.",
      },
      "12k-plus": {
        low: 8000,
        high: 13500,
        note: "University lab mobile testbed with distributed telemetry collection.",
      },
      undecided: {
        low: 1800,
        high: 3500,
        note: "Student mobile capstone package: working app prototype + full algorithmic explanation.",
      },
    },
  },

  "genai-integration": {
    "solo-founder": {
      "under-3k": {
        low: 2500,
        high: 4000,
        note: "Targeted RAG pipeline with chunking, pgvector store, and streaming route handlers.",
      },
      "3k-6k": {
        low: 4200,
        high: 7000,
        note: "Hybrid search RAG system with Cohere re-ranking, multi-query expansion, and conversational history.",
      },
      "6k-12k": {
        low: 7000,
        high: 12000,
        note: "Autonomous multi-tool agent state machine with deterministic prompt guardrails and evaluation tests.",
      },
      "12k-plus": {
        low: 13000,
        high: 22000,
        note: "Enterprise AI agent platform: multi-modal routing, fine-tuned adapters, and low-latency streaming clusters.",
      },
      undecided: {
        low: 4500,
        high: 7800,
        note: "Typical GenAI founder MVP: hybrid-search RAG with prompt caching and sub-40ms token streaming.",
      },
    },
    "funded-startup": {
      "under-3k": {
        low: 3200,
        high: 4800,
        note: "Focused AI feature POC or prompt evaluation benchmark suite.",
      },
      "3k-6k": {
        low: 5200,
        high: 8500,
        note: "Production RAG engine with automated evaluation, hallucination detection, and semantic caching.",
      },
      "6k-12k": {
        low: 8500,
        high: 14500,
        note: "Multi-agent autonomous workflow system executing external tools, SQL generation, and schema checks.",
      },
      "12k-plus": {
        low: 15500,
        high: 28000,
        note: "Flagship AI product core: custom fine-tuned models, pgvector indexing, and enterprise security guardrails.",
      },
      undecided: {
        low: 7500,
        high: 13000,
        note: "Benchmark startup AI architecture: deterministic RAG pipeline with observability and cost telemetry.",
      },
    },
    "agency-business": {
      "under-3k": {
        low: 3200,
        high: 5000,
        note: "Internal knowledge base RAG or customer support AI prototype.",
      },
      "3k-6k": {
        low: 5500,
        high: 9200,
        note: "Automated document processing & synthesis pipeline with vector search and role-based permissions.",
      },
      "6k-12k": {
        low: 9200,
        high: 15500,
        note: "Custom enterprise AI assistant integrated into internal ERP, Slack, or customer support ticketing.",
      },
      "12k-plus": {
        low: 16500,
        high: 30000,
        note: "Company-wide GenAI orchestration layer with private deployment options and data compliance.",
      },
      undecided: {
        low: 8000,
        high: 14000,
        note: "Standard enterprise AI rollout: private RAG pipeline with high security isolation and audited responses.",
      },
    },
    "university-student": {
      "under-3k": {
        low: 1300,
        high: 2600,
        note: "Academic RAG / GenAI thesis build: working pipeline with comparative evaluation vs baselines and viva prep.",
      },
      "3k-6k": {
        low: 2600,
        high: 4500,
        note: "Complete AI capstone: multi-agent system, hallucination benchmarking, LaTeX paper draft, and defense coaching.",
      },
      "6k-12k": {
        low: 4500,
        high: 7800,
        note: "Novel algorithmic GenAI research implementation with ablation experiments for conference submission.",
      },
      "12k-plus": {
        low: 7800,
        high: 13000,
        note: "Academic lab multi-model evaluation testbed with distributed benchmarking.",
      },
      undecided: {
        low: 1700,
        high: 3400,
        note: "Recommended student GenAI track: working prototype + comparative performance metrics for thesis.",
      },
    },
  },

  "aiml-solutions": {
    "solo-founder": {
      "under-3k": {
        low: 2600,
        high: 4200,
        note: "Scoping & data preparation sprint: baseline scikit-learn / LightGBM model with inference API.",
      },
      "3k-6k": {
        low: 4500,
        high: 7500,
        note: "Custom deep learning model (PyTorch), trained on domain data with REST inference endpoint.",
      },
      "6k-12k": {
        low: 7500,
        high: 13000,
        note: "Computer vision or NLP production pipeline: ONNX quantization, edge acceleration, and batch processing.",
      },
      "12k-plus": {
        low: 14000,
        high: 24000,
        note: "Full-scale predictive AI platform with real-time streaming inference and MLflow tracking.",
      },
      undecided: {
        low: 5000,
        high: 8500,
        note: "Standard custom ML prototype: data pipeline, model training, evaluation metrics, and fast API wrapper.",
      },
    },
    "funded-startup": {
      "under-3k": {
        low: 3500,
        high: 5200,
        note: "Feasibility study and algorithmic benchmark against public datasets.",
      },
      "3k-6k": {
        low: 6000,
        high: 9800,
        note: "Production recommendation or classification service with low latency and automated retraining triggers.",
      },
      "6k-12k": {
        low: 9800,
        high: 16000,
        note: "State-of-the-art vision or sequence model optimized for GPU cluster deployment.",
      },
      "12k-plus": {
        low: 17000,
        high: 32000,
        note: "Proprietary model development, synthetic data generation, and full MLOps automation.",
      },
      undecided: {
        low: 8500,
        high: 15000,
        note: "Benchmark startup ML engineering: high-accuracy PyTorch pipeline with automated evaluation.",
      },
    },
    "agency-business": {
      "under-3k": {
        low: 3500,
        high: 5500,
        note: "Data exploration sprint and predictive modeling proof-of-concept.",
      },
      "3k-6k": {
        low: 6200,
        high: 10500,
        note: "Applied ML module integrated into existing enterprise backend (churn prediction, demand forecasting).",
      },
      "6k-12k": {
        low: 10500,
        high: 17500,
        note: "Automated vision quality control or document classification engine with human-in-the-loop review.",
      },
      "12k-plus": {
        low: 18000,
        high: 34000,
        note: "Enterprise ML infrastructure overhaul with automated drift detection and multi-tenant pipelines.",
      },
      undecided: {
        low: 9000,
        high: 16000,
        note: "Standard business ML solution: robust predictive model connected to existing business data sources.",
      },
    },
    "university-student": {
      "under-3k": {
        low: 1400,
        high: 2800,
        note: "Academic ML / Deep Learning capstone: novel model architecture with training graphs, ablation tests, and defense coaching.",
      },
      "3k-6k": {
        low: 2800,
        high: 4800,
        note: "Complete research capstone: PyTorch implementation, baseline comparison, LaTeX paper formatting, and mock viva.",
      },
      "6k-12k": {
        low: 4800,
        high: 8200,
        note: "Advanced Master's / PhD research implementation targeted for IEEE/ACM paper publication.",
      },
      "12k-plus": {
        low: 8200,
        high: 14000,
        note: "Departmental research testbed and multi-GPU benchmarking suite.",
      },
      undecided: {
        low: 1800,
        high: 3600,
        note: "Student ML capstone package: complete trained model, evaluation metrics, and thesis defense guidance.",
      },
    },
  },

  "fyp-mentoring": {
    "solo-founder": {
      "under-3k": {
        low: 1200,
        high: 2200,
        note: "Academic proof-of-concept prototype with clean code and theoretical justification.",
      },
      "3k-6k": {
        low: 2200,
        high: 3800,
        note: "Full functional prototype with comprehensive technical documentation and code walk-through.",
      },
      "6k-12k": {
        low: 3800,
        high: 6500,
        note: "Multi-tier research project with publication-grade empirical results and comparative graphs.",
      },
      "12k-plus": {
        low: 6500,
        high: 11000,
        note: "Comprehensive institutional academic prototype and multi-stakeholder defense preparation.",
      },
      undecided: {
        low: 1500,
        high: 2800,
        note: "Standard capstone sprint: working codebase + technical defense coaching.",
      },
    },
    "funded-startup": {
      "under-3k": {
        low: 1400,
        high: 2400,
        note: "Academic collaboration prototype demonstrating core research claims.",
      },
      "3k-6k": {
        low: 2400,
        high: 4200,
        note: "University-industry partnership build with rigorous benchmarks.",
      },
      "6k-12k": {
        low: 4200,
        high: 7500,
        note: "Advanced prototype bridging academic novelty and startup product validation.",
      },
      "12k-plus": {
        low: 7500,
        high: 12500,
        note: "Large-scale joint research platform with multi-institution evaluation.",
      },
      undecided: {
        low: 2000,
        high: 3800,
        note: "Startup capstone collaboration package.",
      },
    },
    "agency-business": {
      "under-3k": {
        low: 1400,
        high: 2500,
        note: "Corporate sponsored student project prototype and architecture documentation.",
      },
      "3k-6k": {
        low: 2500,
        high: 4500,
        note: "Industry-sponsored capstone application with practical business problem demonstration.",
      },
      "6k-12k": {
        low: 4500,
        high: 8000,
        note: "Commercial R&D university partnership build.",
      },
      "12k-plus": {
        low: 8000,
        high: 13000,
        note: "Enterprise academic laboratory development and testing.",
      },
      undecided: {
        low: 2200,
        high: 4000,
        note: "Sponsored capstone engineering package.",
      },
    },
    "university-student": {
      "under-3k": {
        low: 1100,
        high: 2200,
        note: "Complete working prototype codebase, architectural diagrams, and 1-on-1 code defense walk-through.",
      },
      "3k-6k": {
        low: 2200,
        high: 3800,
        note: "Full FYP package: prototype + LaTeX/IEEE thesis structuring, experimental result graphs, and mock viva simulation.",
      },
      "6k-12k": {
        low: 3800,
        high: 6500,
        note: "Graduate / Master's research build with novel algorithm formulation and publication support.",
      },
      "12k-plus": {
        low: 6500,
        high: 10500,
        note: "Multi-group or PhD research system with comprehensive ablation studies.",
      },
      undecided: {
        low: 1400,
        high: 2800,
        note: "Most student FYP projects run $1,400–$2,800: working prototype + code defense mentoring included.",
      },
    },
  },

  "something-else": {
    "solo-founder": {
      "under-3k": {
        low: 2200,
        high: 3500,
        note: "Architecture audit, database optimization, or technical scoping sprint.",
      },
      "3k-6k": {
        low: 3500,
        high: 6000,
        note: "Custom engineering sprint solving high-friction bottlenecks or third-party integrations.",
      },
      "6k-12k": {
        low: 6000,
        high: 11000,
        note: "Comprehensive system refactoring or legacy codebase migration to modern stack.",
      },
      "12k-plus": {
        low: 12000,
        high: 20000,
        note: "Dedicated fractional engineering team delivery across multi-week milestones.",
      },
      undecided: {
        low: 3600,
        high: 6500,
        note: "Targeted engineering sprint with senior full-stack guidance.",
      },
    },
    "funded-startup": {
      "under-3k": {
        low: 3000,
        high: 4500,
        note: "Code review, security audit, and performance profiling benchmark.",
      },
      "3k-6k": {
        low: 5000,
        high: 8500,
        note: "High-impact infrastructure scaling sprint or mission-critical API overhaul.",
      },
      "6k-12k": {
        low: 8500,
        high: 14500,
        note: "Core system re-architecture to support 10x user growth with zero downtime.",
      },
      "12k-plus": {
        low: 15000,
        high: 26000,
        note: "Dedicated senior engineering pod embedded with your team.",
      },
      undecided: {
        low: 7000,
        high: 12500,
        note: "Custom startup advisory and technical execution sprint.",
      },
    },
    "agency-business": {
      "under-3k": {
        low: 3000,
        high: 4800,
        note: "Technical feasibility study and vendor integration roadmap.",
      },
      "3k-6k": {
        low: 5200,
        high: 9000,
        note: "Targeted legacy software remediation and cloud infrastructure modernization.",
      },
      "6k-12k": {
        low: 9000,
        high: 15500,
        note: "Full custom workflow automation or database consolidation project.",
      },
      "12k-plus": {
        low: 16000,
        high: 28000,
        note: "Enterprise digital transformation sprint with dedicated senior staff.",
      },
      undecided: {
        low: 7500,
        high: 13500,
        note: "Standard custom engineering and technical modernization scope.",
      },
    },
    "university-student": {
      "under-3k": {
        low: 1100,
        high: 2200,
        note: "Custom academic software development with theoretical framing and defense coaching.",
      },
      "3k-6k": {
        low: 2200,
        high: 3800,
        note: "Comprehensive capstone project with code review, viva preparation, and documentation.",
      },
      "6k-12k": {
        low: 3800,
        high: 6800,
        note: "Advanced research prototype with experimental verification for thesis.",
      },
      "12k-plus": {
        low: 6800,
        high: 11500,
        note: "University lab collaborative research platform.",
      },
      undecided: {
        low: 1400,
        high: 2800,
        note: "Student academic track: customized prototype + code defense mentoring.",
      },
    },
  },
};

const SERVICE_TITLES: Record<ServiceId, string> = {
  "web-development": "Web Development",
  "mobile-development": "Mobile App",
  "genai-integration": "GenAI & Agent",
  "aiml-solutions": "Applied AI/ML",
  "fyp-mentoring": "FYP & Academic Capstone",
  "something-else": "Custom Engineering",
};

/**
 * Computes an instant ballpark estimate purely on the client side.
 * Returns low, high, note, caveat, and academic status.
 */
export function getBallparkEstimate(params: {
  service: ServiceId;
  stage: StageId;
  budget: BudgetId;
}): EstimateResult {
  const { service, stage, budget } = params;

  const serviceTable = ESTIMATE_LOOKUP_TABLE[service] || ESTIMATE_LOOKUP_TABLE["web-development"];
  const stageTable = serviceTable[stage] || serviceTable["solo-founder"];
  const budgetEntry = stageTable[budget] || stageTable["undecided"];

  const isAcademic = stage === "university-student" || service === "fyp-mentoring";
  const serviceTitle = isAcademic && service !== "fyp-mentoring"
    ? `Academic ${SERVICE_TITLES[service]}`
    : SERVICE_TITLES[service] || "Software";

  return {
    low: budgetEntry.low,
    high: budgetEntry.high,
    note: budgetEntry.note,
    caveat: "Final quote depends on scope — this isn't a commitment",
    isAcademicTrack: isAcademic,
    serviceTitle,
  };
}

/**
 * Formats a number as a clean USD currency string (e.g. 3500 -> "$3,500")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
