export interface ProjectDetail {
  slug: string;
  title: string;
  clientType: string;
  category: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: string[];
  stack: string[];
  fullCaseStudy?: string[];
}

export const ALL_PROJECTS: ProjectDetail[] = [
  {
    slug: "aura-health",
    title: "Aura Health Clinical Intelligence",
    clientType: "HEALTHTECH STARTUP // SERIES A",
    category: "GenAI & Healthcare",
    problem:
      "Unstructured electronic health records (EHR) caused 45-minute physician delays during triage, risking patient outcomes in emergency rooms.",
    approach:
      "Architected a HIPAA-compliant hybrid RAG pipeline using Claude 3.5, pgvector with dense+sparse re-ranking, and a low-latency Next.js 15 clinical dashboard.",
    outcome: "-68% TRIAGE QUERY LATENCY",
    metrics: ["Sub-800ms Retrieval", "Zero PHI Leakage SLA", "99.4% Extraction Accuracy"],
    stack: ["Next.js 15", "FastAPI", "pgvector", "Claude 3.5", "Docker"],
    fullCaseStudy: [
      "In emergency medicine, every minute spent searching through fragmented medical records increases patient risk. Aura Health approached Hopfield Labs to build an automated intelligence layer capable of indexing clinical notes, laboratory results, and prescription histories in real time.",
      "We engineered a deterministic RAG architecture utilizing dense semantic embeddings generated via BioClinicalBERT alongside BM25 sparse keyword indices. A cross-encoder re-ranking stage ensures that critical contraindications always rank highest.",
      "The result was deployed on dedicated HIPAA-compliant infrastructure, delivering sub-800ms query latency across 1.4 million patient records.",
    ],
  },
  {
    slug: "omnitrack-fleet",
    title: "OmniTrack Mobile Fleet Telemetry",
    clientType: "ENTERPRISE LOGISTICS // 1,200 VEHICLES",
    category: "Mobile & Real-Time IoT",
    problem:
      "Legacy mobile dispatch platform dropped 12% of offline mobile telemetry packets in cellular blind zones across interstate delivery routes.",
    approach:
      "Engineered an offline-first React Native architecture with background SQLite sync, native Swift/Kotlin geo-fencing daemon, and TimescaleDB ingestion pipeline.",
    outcome: "99.98% TELEMETRY ACCURACY",
    metrics: ["Zero Packet Drop", "40% Lower Battery Drain", "1,200 Active Devices"],
    stack: ["React Native", "Swift", "Kotlin", "TimescaleDB", "Node.js"],
    fullCaseStudy: [
      "Interstate logistics require reliable telemetry even across remote areas with intermittent 4G/5G connectivity. OmniTrack needed a mobile runtime that could buffer GPS, diagnostics, and cargo temperatures without draining device batteries.",
      "Hopfield Labs created a native background service in Swift and Kotlin integrated into an Expo React Native application. Telemetry points are serialized into an embedded SQLite queue with delta compression.",
      "Upon cellular reconnection, batches sync via a resumable WebSocket stream into a TimescaleDB time-series cluster.",
    ],
  },
  {
    slug: "neuroscan-ai",
    title: "NeuroScan EEG Automated Classifier",
    clientType: "ACADEMIC CAPSTONE // BIOMEDICAL",
    category: "Deep Learning & FYP",
    problem:
      "Manual artifact detection in multi-channel EEG signals required 14 hours per patient dataset during epilepsy diagnostics clinical trials.",
    approach:
      "Trained a custom 1D-CNN transformer architecture in PyTorch with spectral wave decomposition, paired with a Next.js visualization interface for researchers.",
    outcome: "94.6% F1 SCORE (GRADE A+)",
    metrics: ["14h to 12s Analysis", "100% Defense Score", "IEEE Paper Acceptance"],
    stack: ["PyTorch", "Python", "Next.js", "Tailwind CSS", "FastAPI"],
    fullCaseStudy: [
      "Epilepsy researchers face a major bottleneck in manual signal inspection. A graduating biomedical engineering capstone team partnered with Hopfield Labs to build an automated neural classifier.",
      "We guided the research formulation, implemented Morlet wavelet transforms for time-frequency spectrogram extraction, and built a custom 1D convolutional vision transformer.",
      "The student team received a Grade A+ defense evaluation, an IEEE conference publication acceptance, and open-sourced their benchmark weights.",
    ],
  },
  {
    slug: "synthvector-indexer",
    title: "SynthVector RAG Benchmarking Suite",
    clientType: "OPEN SOURCE RESEARCH TOOLING",
    category: "Developer Tooling",
    problem:
      "Engineering teams lacked automated test suites to measure retrieval hallucination rates across diverse vector embedding models.",
    approach:
      "Created an open-source synthetic dataset generator and precision benchmark CLI comparing OpenAI, Cohere, and local sentence-transformers.",
    outcome: "3.2x FASTER EVALUATION",
    metrics: ["450+ GitHub Stars", "Automated CI Testing", "Zero Hallucination Regressions"],
    stack: ["TypeScript", "Python", "CLI", "Vitest", "pgvector"],
    fullCaseStudy: [
      "Assessing retrieval quality across vector indices is notoriously difficult without ground-truth query-answer pairs. Hopfield Labs built SynthVector as an internal tool and released it to the research community.",
      "The tool generates synthetic queries spanning adversarial permutations, evaluates recall@k and MRR across embedding models, and outputs interactive visual HTML reports.",
    ],
  },
];
