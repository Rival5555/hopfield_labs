import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, Database, Server, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy // Hopfield Labs",
  description:
    "Hopfield Labs privacy policy, data collection standards, storage practices, and user rights.",
};

const THIRD_PARTY_PROVIDERS = [
  {
    name: "Supabase",
    role: "PostgreSQL Database & Storage",
    policyUrl: "https://supabase.com/privacy",
    notes: "Stores intake leads and uploaded files protected by Row-Level Security (RLS).",
  },
  {
    name: "Vercel",
    role: "Hosting & Serverless Compute",
    policyUrl: "https://vercel.com/legal/privacy-policy",
    notes: "Hosts web platform and provides cookieless privacy-preserving edge telemetry.",
  },
  {
    name: "Resend",
    role: "Transactional Email Infrastructure",
    policyUrl: "https://resend.com/legal/privacy-policy",
    notes: "Dispatches lead notification alerts and draft resume tokens.",
  },
  {
    name: "Cal.com",
    role: "Discovery Call Scheduling",
    policyUrl: "https://cal.com/privacy",
    notes: "Handles direct calendar discovery session booking when initiated by client.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb / Back */}
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
      <header className="space-y-4 border-b border-[var(--border)] pb-8">
        <div className="eyebrow text-[var(--signal)] flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>LEGAL SPECIFICATION // DATA PRIVACY & GOVERNANCE</span>
        </div>
        <h1 className="section-heading text-[var(--fg)] text-3xl sm:text-4xl font-semibold">
          Privacy Policy
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--fg-muted)]">
          <span>EFFECTIVE DATE: SEPTEMBER 20, 2026</span>
          <span>•</span>
          <span>REVISION: V1.2</span>
          <span>•</span>
          <span>SCOPE: HOPFIELDLABS.COM</span>
        </div>
        {/* High-impact, engaging introductory narrative */}
        <div className="space-y-3 pt-2">
          <p className="text-base sm:text-lg text-[var(--fg)] leading-relaxed font-normal">
            At <strong className="font-semibold text-[var(--signal)]">Hopfield Labs</strong>, privacy and data integrity are fundamental to how we engineer systems. We design our client intake pipelines, storage buckets, and web applications with strict confidentiality and minimal telemetry.
          </p>
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
            This Privacy Policy details how we handle information submitted through{" "}
            <strong className="text-[var(--fg)] font-medium">hopfieldlabs.com</strong>, our multi-step intake estimator, and our live GenAI demonstration terminal. It explains where your technical data is persisted, how long it is retained, and how you can exercise your statutory privacy rights.
          </p>
        </div>

        {/* Core Privacy Commitments */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>Zero Data Monetization</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                We do not sell, rent, or commercialize client inquiries, briefs, or contact records under any circumstance.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>Isolated Private Storage</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Form data and briefs are secured by Supabase Row-Level Security (RLS) and authenticated private buckets.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>Automated Draft Pruning</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Uncompleted intake drafts and temporary resume tokens are automatically purged after 14 calendar days.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>Cookieless Analytics</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                We use privacy-friendly edge telemetry with zero third-party marketing trackers and zero cross-site cookies.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-2)] text-xs text-[var(--fg-muted)] leading-relaxed">
          <span className="font-semibold text-[var(--fg)]">Contractual Scope:</span> This policy strictly applies to our public website, the interactive GenAI concierge demo, and our multi-step project intake pipeline. Commercial engagements and engineering deliverables are independently governed by dedicated Master Services Agreements (MSA) and IP assignment contracts.
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-12 text-sm text-[var(--fg-muted)] leading-relaxed">
        {/* Section 1 */}
        <section id="section-1" className="space-y-4">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">01 //</span>
            Information We Collect
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--fg)] mb-2">
                A. Information You Provide Directly
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--signal)]">
                <li>
                  <strong className="text-[var(--fg)]">Contact and Intake Form Data:</strong> Full name, email address, company name, service area of interest, project stage (solo founder, funded startup, enterprise, or university student), budget tier, target delivery timeline, and scoping specifications.
                </li>
                <li>
                  <strong className="text-[var(--fg)]">Academic / FYP Details:</strong> Academic institution, degree program, submission deadlines, and specific assistance requirements (prototype build, LaTeX documentation, or 1-on-1 viva defense mentoring).
                </li>
                <li>
                  <strong className="text-[var(--fg)]">Files and Technical References:</strong> Architectural specifications, project briefs, proposal drafts (PDF, DOCX), Figma design links, and GitHub repository URLs attached during intake.
                </li>
                <li>
                  <strong className="text-[var(--fg)]">Direct Communications:</strong> Any inquiries transmitted via email, verified messaging channels, or scheduled discovery video conferences.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--fg)] mb-2">
                B. Information Collected Automatically
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--signal)]">
                <li>
                  <strong className="text-[var(--fg)]">Telemetry and Network Diagnostics:</strong> Client IP address (temporarily hashed for in-memory rate limiting and spam defense), device category, operating system version, browser user-agent, and anonymized page transition timestamps.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--fg)] mb-2">
                C. Information from the GenAI Concierge Demo
              </h3>
              <p>
                Our homepage features an interactive streaming terminal demonstrating GenAI integration capabilities. Prompts and assistant responses are logged in memory to monitor retrieval quality and enforce anti-abuse rate limits (15 queries per 10 minutes per IP).
              </p>
              <p className="p-3 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] mt-2">
                <span className="text-[var(--danger)] font-medium font-mono uppercase">Notice:</span> Do not input proprietary source code, patient healthcare identifiers, API keys, or confidential financial credentials into the demonstration terminal. It is an illustrative technical showcase.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--fg)] mb-2">
                D. Incomplete &amp; Saved Intake Drafts
              </h3>
              <p>
                When you initiate the &quot;Start a Project&quot; pipeline and supply an email address for a resume link, we generate a cryptographically random token to preserve your in-progress selections. Unsubmitted drafts are automatically pruned after 14 days.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">02 //</span>
            How We Use Your Information
          </h2>
          <p>
            We process personal and technical information strictly to deliver our core studio operations:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--signal)]">
            <li>Evaluate project technical feasibility, engineer architecture proposals, and generate binding cost estimates.</li>
            <li>Execute development sprints, code reviews, and academic capstone mentoring engagements.</li>
            <li>Issue authenticated resume links for saved multi-step intake drafts.</li>
            <li>Benchmark, optimize, and calibrate our serverless infrastructure and GenAI models.</li>
            <li>Enforce automated IP rate limits, honeypot defenses, and bot protection protocols.</li>
            <li>Satisfy statutory legal, tax, and accounting reporting requirements.</li>
          </ul>
          <div className="p-3 rounded-md border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--signal)]">
            HOPFIELD LABS DOES NOT SELL, RENT, OR MONETIZE CLIENT PERSONAL DATA UNDER ANY CIRCUMSTANCE.
          </div>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">03 //</span>
            Infrastructure &amp; Storage Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--fg)]">
                <Database className="h-4 w-4 text-[var(--signal)]" />
                <span>DATABASE LAYER (SUPABASE)</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Contact submissions and intake records are persisted in a managed PostgreSQL cluster hosted by Supabase. Access is restricted to authenticated server-side service roles; anonymous client queries are rejected by Row-Level Security (RLS).
              </p>
            </div>

            <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--fg)]">
                <Lock className="h-4 w-4 text-[var(--signal)]" />
                <span>ISOLATED STORAGE BUCKETS</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Files attached during intake are uploaded directly to private storage buckets using single-use signed URLs. Buckets are not public; assets can only be retrieved by authorized Hopfield Labs staff.
              </p>
            </div>

            <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--fg)]">
                <Server className="h-4 w-4 text-[var(--signal)]" />
                <span>EDGE HOSTING (VERCEL)</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Next.js App Router applications, static assets, and Server Actions run across Vercel&apos;s global edge network, protected by TLS 1.3 encryption and DDoS mitigation.
              </p>
            </div>

            <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--fg)]">
                <Mail className="h-4 w-4 text-[var(--signal)]" />
                <span>EMAIL DISPATCH (RESEND)</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Transactional alerts and intake confirmations are delivered through Resend over encrypted SMTP/API protocols.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">04 //</span>
            Data Retention Windows
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[var(--border)] rounded-md">
              <thead className="bg-[var(--surface-2)] text-[var(--fg)] font-mono border-b border-[var(--border)]">
                <tr>
                  <th className="p-3">Data Category</th>
                  <th className="p-3">Retention Schedule</th>
                  <th className="p-3">Purpose &amp; Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <tr>
                  <td className="p-3 font-medium text-[var(--fg)]">Qualified Inquiries &amp; Leads</td>
                  <td className="p-3 font-mono text-[var(--signal)]">Duration of Project + 5 Years</td>
                  <td className="p-3">Retained for project lifecycle continuity, accounting, and tax compliance.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[var(--fg)]">Abandoned Intake Drafts</td>
                  <td className="p-3 font-mono text-[var(--danger)]">14 Calendar Days</td>
                  <td className="p-3">Automatically deleted from PostgreSQL database if not completed.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[var(--fg)]">GenAI Concierge Logs</td>
                  <td className="p-3 font-mono text-[var(--accent)]">30 Calendar Days</td>
                  <td className="p-3">Maintained in transient logs for quality review and abuse prevention, then purged.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs">
            You may request expedited erasure of your records at any time by contacting our data protection officer (see Section 07).
          </p>
        </section>

        {/* Section 5 */}
        <section id="section-5" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">05 //</span>
            Cookies &amp; Tracking Technologies
          </h2>
          <p>
            Hopfield Labs prioritizes minimalist, privacy-first web architecture:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--signal)]">
            <li>
              <strong className="text-[var(--fg)]">Local Storage:</strong> We use browser <code className="font-mono text-xs bg-[var(--surface-2)] px-1.5 py-0.5 rounded">localStorage</code> solely to preserve client-side stepper progress during the intake flow so your selections are not lost on accidental refresh.
            </li>
            <li>
              <strong className="text-[var(--fg)]">Cookieless Analytics:</strong> We utilize Vercel Web Analytics to measure aggregated traffic, geographical region, and core web vitals. This system does not place tracking cookies, collect personal identifiers, or perform cross-site tracking.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="section-6" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">06 //</span>
            Disclosure &amp; Sub-Processors
          </h2>
          <p>We disclose client information solely under the following limited conditions:</p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--signal)]">
            <li><strong className="text-[var(--fg)]">Operational Infrastructure Partners:</strong> Cloud hosting, database, and email delivery providers listed in Section 09, strictly bound by data processing agreements.</li>
            <li><strong className="text-[var(--fg)]">Statutory &amp; Legal Compulsion:</strong> When required by binding legal process, judicial warrant, or regulatory order.</li>
            <li><strong className="text-[var(--fg)]">Studio Restructuring:</strong> In the event of a merger, acquisition, or asset transfer, subject to identical confidentiality commitments.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="section-7" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">07 //</span>
            Your Rights &amp; Data Subject Requests
          </h2>
          <p>
            Under GDPR, CCPA, and international data protection standards, you maintain enforceable rights regarding your records:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { label: "Right of Access", desc: "Request an explicit copy of all personal and project data associated with your profile." },
              { label: "Right of Rectification", desc: "Correct outdated, inaccurate, or incomplete contact and scoping information." },
              { label: "Right of Erasure", desc: "Demand total deletion of your database records, uploaded briefs, and draft tokens." },
              { label: "Right to Restrict Processing", desc: "Limit how we utilize your contact profile during active negotiations." },
              { label: "Right to Data Portability", desc: "Receive your technical specifications and inquiry data in a structured JSON format." },
              { label: "Right to Withdraw Consent", desc: "Opt out of non-essential communications at any moment with zero penalty." },
            ].map((r) => (
              <div key={r.label} className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
                <div className="font-mono text-xs font-semibold text-[var(--fg)]">{r.label}</div>
                <div className="text-xs text-[var(--fg-muted)] leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
          <p className="pt-2 text-xs">
            To submit an inquiry, email our privacy desk at{" "}
            <a href="mailto:privacy@hopfieldlabs.com" className="text-[var(--signal)] hover:underline font-mono">
              privacy@hopfieldlabs.com
            </a>
            . We process and confirm verification within 30 business days.
          </p>
        </section>

        {/* Section 8 */}
        <section id="section-8" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">08 //</span>
            GenAI Demonstration Terminal Disclosures
          </h2>
          <p>
            The GenAI Concierge embedded on our homepage is an illustrative demonstration of low-latency token streaming and domain-specific knowledge augmentation. It does not constitute a confidential client portal or binding consultation channel.
          </p>
          <p>
            Sessions are rate-limited via client IP hashing. Queries may be reviewed by engineering staff to calibrate our RAG retrieval algorithms, prevent prompt injection, and audit system performance.
          </p>
        </section>

        {/* Section 9 */}
        <section id="section-9" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">09 //</span>
            Third-Party Sub-Processors &amp; External Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {THIRD_PARTY_PROVIDERS.map((provider) => (
              <div
                key={provider.name}
                className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-[var(--fg)]">{provider.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--signal)]">
                      VERIFIED
                    </span>
                  </div>
                  <div className="text-xs text-[var(--fg-muted)] mt-1 font-mono">{provider.role}</div>
                  <p className="text-xs text-[var(--fg-muted)] mt-2 leading-relaxed">{provider.notes}</p>
                </div>
                <a
                  href={provider.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline pt-2 border-t border-[var(--border)]/60"
                >
                  <span>Review {provider.name} Privacy Policy</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 10 */}
        <section id="section-10" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">10 //</span>
            Children&apos;s Privacy
          </h2>
          <p>
            Hopfield Labs platforms and engineering services are structured exclusively for enterprise founders, commercial SMEs, and university students engaging in technical research. We do not knowingly harvest or solicit data from individuals under 13 years of age (or the relevant age threshold in your jurisdiction).
          </p>
        </section>

        {/* Section 11 */}
        <section id="section-11" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">11 //</span>
            Amendments to This Policy
          </h2>
          <p>
            We periodically revise this specification to mirror adjustments in technical architecture, legal standards, or operational workflows. The effective revision timestamp at the top of this document will always denote the latest release.
          </p>
        </section>

        {/* Section 12 */}
        <section id="section-12" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">12 //</span>
            Data Protection Officer &amp; Contact
          </h2>
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] space-y-4">
            <div className="space-y-1">
              <div className="font-mono text-sm font-bold text-[var(--fg)]">HOPFIELD LABS ENGINEERING STUDIO</div>
              <p className="text-xs text-[var(--fg-muted)]">
                Direct all privacy inquiries, data subject access requests, or security disclosures to:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs text-[var(--fg)]">
              <div>
                <span className="text-[var(--fg-muted)] block">Privacy Officer:</span>
                <a href="mailto:privacy@hopfieldlabs.com" className="text-[var(--signal)] hover:underline">
                  privacy@hopfieldlabs.com
                </a>
              </div>
              <div>
                <span className="text-[var(--fg-muted)] block">General Inquiries:</span>
                <a href="mailto:contact@hopfieldlabs.com" className="text-[var(--signal)] hover:underline">
                  contact@hopfieldlabs.com
                </a>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-mono text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Submit a secure inquiry via our verified contact form &rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
