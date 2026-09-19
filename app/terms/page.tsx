import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  FileText,
  GraduationCap,
  CreditCard,
  Layers,
  Cpu,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service // Hopfield Labs",
  description:
    "Hopfield Labs terms of service, engagement protocols, intellectual property ownership, and client agreements.",
};

export default function TermsOfServicePage() {
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
      <header className="space-y-6 border-b border-[var(--border)] pb-8">
        <div className="eyebrow text-[var(--signal)] flex items-center gap-2">
          <Scale className="h-4 w-4" />
          <span>LEGAL SPECIFICATION // TERMS OF ENGAGEMENT &amp; SERVICE</span>
        </div>

        <div className="space-y-2">
          <h1 className="section-heading text-[var(--fg)] text-3xl sm:text-4xl font-semibold tracking-tight">
            Terms of Service
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--fg-muted)]">
            <span className="text-[var(--signal)] font-medium">EFFECTIVE: SEPTEMBER 20, 2026</span>
            <span>•</span>
            <span>REVISION: V1.3</span>
            <span>•</span>
            <span>SCOPE: HOPFIELDLABS.COM</span>
          </div>
        </div>

        {/* High-impact, engaging introductory narrative */}
        <div className="space-y-3 pt-2">
          <p className="text-base sm:text-lg text-[var(--fg)] leading-relaxed font-normal">
            Welcome to <strong className="font-semibold text-[var(--signal)]">Hopfield Labs</strong>. We partner with ambitious founders, engineering teams, and academic researchers to architect, build, and deploy production-grade web platforms, native mobile applications, GenAI systems, and applied AI/ML architectures.
          </p>
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
            These Terms establish clear, mutual expectations for using <strong className="text-[var(--fg)] font-medium">hopfieldlabs.com</strong>, evaluating our technical case studies, and interacting with our live demonstrations. When you commission our studio for dedicated software deliverables or capstone mentoring, your engagement is additionally governed by a formal Master Services Agreement (MSA) or Statement of Work (SOW).
          </p>
        </div>

        {/* Core Principles at a Glance */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono text-[var(--fg)] font-semibold flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[var(--signal)]" />
            <span>CORE PRINCIPLES AT A GLANCE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>Exploratory &amp; Non-Binding</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Browsing our work, testing the estimator, or submitting an intake brief never locks you into a contract. Formal work begins only after mutual signature of a scoped proposal.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>100% Deliverable Ownership</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                You own what you pay for. All bespoke codebases, schemas, and assets built specifically for your project transfer unreservedly to you upon final invoice settlement.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>Academic Honor &amp; Integrity</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Capstone (FYP) students receive high-caliber engineering advisory while retaining sole responsibility for complying with their institution&apos;s originality and honor policies.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>Confidential Discovery</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Your briefs, repository links, and product architectures are treated with strict confidentiality. Bilateral NDAs are happily executed prior to in-depth technical discovery.
              </p>
            </div>
          </div>
        </div>

        {/* Commercial Precedence Notice */}
        <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-2)] text-xs text-[var(--fg-muted)] leading-relaxed flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-[var(--signal)] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[var(--fg)]">Commercial Agreement Precedence:</span> When you engage our engineering team for paid development sprints, your project is governed by a dedicated Master Services Agreement (MSA) and Statement of Work (SOW). Where any term in an executed client contract differs from these website terms, your signed contract takes precedence.
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-12 text-sm text-[var(--fg-muted)] leading-relaxed">
        {/* Section 1 */}
        <section id="section-1" className="space-y-4">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">01 //</span>
            Use of the Site &amp; Acceptable Behavior
          </h2>
          <p>
            You are welcome to browse our studio case studies, evaluate technical benchmarks, use our project intake tool, and interact with the live GenAI terminal. We ask all visitors and prospective partners to engage with our systems responsibly.
          </p>
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
            <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[var(--danger)]" />
              <span>STRICTLY PROHIBITED CONDUCT:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--danger)] text-xs">
              <li>Submitting fraudulent, automated spam, or deceptive project proposals.</li>
              <li>
                Attempting to overload, extract system prompts, bypass rate limits, or reverse-engineer the GenAI concierge demo.
              </li>
              <li>
                Uploading malicious binaries, infected archives, or unauthorized source code through the project intake form.
              </li>
              <li>
                Scraping, crawling, or extracting proprietary portfolio data or benchmarking metrics without written consent.
              </li>
              <li>Utilizing our infrastructure in contravention of domestic or international telecommunications law.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">02 //</span>
            The Project Intake &amp; Estimator Protocol
          </h2>
          <p>
            Our multi-step intake flow and interactive budget estimator provide instant architectural feedback and indicative timelines. These automated figures are designed to help you calibrate expectations—they are non-binding estimates, not formal quotes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-[var(--signal)]" />
                <span>BINDING CONTRACT FORMATION</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                A project engagement officially commences only once both parties execute a formal proposal or mutual SOW
                defining milestones, pricing tiers, deliverables, and acceptance criteria.
              </p>
            </div>

            <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[var(--accent)]" />
                <span>INDICATIVE ESTIMATES ONLY</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Any ballpark timeline or cost range displayed in the interactive intake estimator is purely illustrative.
                Final binding quotes are delivered only after comprehensive architecture review by our engineering leads.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">03 //</span>
            Final-Year Project (FYP) &amp; Academic Services
          </h2>
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--fg)]">
              <GraduationCap className="h-4 w-4 text-[var(--signal)]" />
              <span>ACADEMIC INTEGRITY &amp; CLIENT COMPLIANCE OBLIGATION</span>
            </div>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Hopfield Labs provides technical advisory, prototype implementation, and research engineering support
              designed to assist students in understanding complex systems and developing capstone deliverables.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--signal)] text-xs">
              <li>
                <strong className="text-[var(--fg)]">Institutional Governance:</strong> You bear sole and exclusive
                responsibility for ensuring that your engagement with external advisors adheres to your university&apos;s
                academic integrity code, examination rules, and originality requirements.
              </li>
              <li>
                <strong className="text-[var(--fg)]">Mandatory Disclosures:</strong> We do not guarantee that third-party
                assistance is permitted under your specific university guidelines. You must independently disclose our
                mentoring or development role if mandated by your program or faculty supervisor.
              </li>
              <li>
                <strong className="text-[var(--fg)]">Defense &amp; Viva Representation:</strong> Deliverables are supplied
                to accelerate your educational comprehension. The representation, verbal defense, and examination of the
                deliverable remains entirely your own responsibility.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">04 //</span>
            Payment Structures &amp; Commercial Terms
          </h2>
          <p>
            Every client project operates under a transparent, milestone-driven structure designated in your approved project proposal:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1.5">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>MILESTONE SPRINTS</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Standard fixed-scope projects are structured into discrete sprint milestones, typically commencing with a
                deposit (30% to 50%) prior to sprint kick-off.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1.5">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>NET TERMS &amp; SCHEDULE</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Invoices are due within 7 to 14 business days of issuance. Active engineering sprints and deployment pipelines
                may be paused if an invoice becomes delinquent.
              </p>
            </div>

            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-1.5">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 text-[var(--signal)]" />
                <span>CURRENCY &amp; TAXES</span>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Fees are quoted in USD for international accounts or PKR for domestic engagements, exclusive of withholding
                or sales taxes unless explicitly stated otherwise.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="section-5" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">05 //</span>
            Intellectual Property Rights &amp; Ownership
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="font-mono text-xs font-semibold text-[var(--fg)] flex items-center gap-2">
                <Layers className="h-4 w-4 text-[var(--signal)]" />
                <span>ALLOCATION OF INTELLECTUAL PROPERTY</span>
              </div>
              <ul className="list-disc pl-5 space-y-2 marker:text-[var(--signal)] text-xs">
                <li>
                  <strong className="text-[var(--fg)]">Pre-Existing Background IP:</strong> Hopfield Labs retains all right,
                  title, and interest in proprietary tooling, design systems, internal boilerplate libraries, machine learning
                  utility functions, and foundational architecture developed prior to or independently of the client engagement.
                </li>
                <li>
                  <strong className="text-[var(--fg)]">Client Deliverables:</strong> Subject to receipt of full and final payment,
                  all right, title, and interest in custom bespoke codebases, schemas, workflows, and frontend assets authored
                  specifically for your project transfer unreservedly to you.
                </li>
                <li>
                  <strong className="text-[var(--fg)]">Open-Source Frameworks:</strong> Deliverables frequently incorporate
                  standard open-source components (e.g., Next.js, PyTorch, TailwindCSS, Hugging Face models) licensed under MIT,
                  Apache 2.0, or similar licenses. Those licenses remain in effect.
                </li>
                <li>
                  <strong className="text-[var(--fg)]">Studio Portfolio Rights:</strong> Unless you request confidentiality
                  via written agreement or NDA prior to kickoff, Hopfield Labs reserves the right to showcase project visuals,
                  architecture diagrams, and non-sensitive case summaries in our professional portfolio.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="section-6" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">06 //</span>
            Confidentiality &amp; Proprietary Information
          </h2>
          <p>
            We treat technical specifications, system designs, product briefs, and business records shared during discovery
            as confidential material. We will not disclose proprietary disclosures to external third parties, except to
            authenticated sub-processors bound by identical confidentiality restrictions necessary to deliver the work.
          </p>
          <div className="p-3 rounded-md border border-[var(--border)] bg-[var(--surface-2)] text-xs text-[var(--fg-muted)]">
            <span className="font-semibold text-[var(--fg)]">Mutual Non-Disclosure Agreements:</span> If your organization
            requires an executed bilateral NDA before releasing sensitive code or trade secrets, please notify us at{" "}
            <a href="mailto:contact@hopfieldlabs.com" className="text-[var(--signal)] hover:underline font-mono">
              contact@hopfieldlabs.com
            </a>{" "}
            prior to file submission.
          </div>
        </section>

        {/* Section 7 */}
        <section id="section-7" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">07 //</span>
            GenAI Demonstration Terminal Disclaimers
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--fg)]">
              <Cpu className="h-4 w-4 text-[var(--signal)]" />
              <span>SHOWCASE SYSTEM LIMITATIONS</span>
            </div>
            <p>
              The streaming assistant widget accessible on our homepage is an experimental demonstration of GenAI integration.
              It is not a legal or commercial advisory tool, nor does it provide binding quotes or engineering commitments.
            </p>
            <p className="text-xs">
              Responses generated by the demonstration terminal may occasionally include hallucinations or inaccuracies.
              Hopfield Labs reserves the right to modify system parameters, enforce query rate limits (15 requests per 10 minutes),
              or disable the terminal at our discretion.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="section-8" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">08 //</span>
            Warranty Disclaimers
          </h2>
          <p>
            The Site, informational resources, and GenAI demonstration systems are delivered on an &quot;AS IS&quot; and
            &quot;AS AVAILABLE&quot; basis, without warranties of any variety, whether express, statutory, or implied,
            including implied warranties of merchantability, fitness for a specific purpose, or non-infringement.
          </p>
          <p className="text-xs">
            Warranties, service level agreements (SLAs), and post-deployment maintenance terms for paid client projects are
            governed strictly by the executed Statement of Work, not these website Terms.
          </p>
        </section>

        {/* Section 9 */}
        <section id="section-9" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">09 //</span>
            Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, neither Hopfield Labs nor its directors, engineers, or
            contractors shall be liable for any indirect, punitive, incidental, special, or consequential damages, including
            loss of profits, commercial interruption, loss of code or data, arising out of your browsing of the Site or
            use of the GenAI terminal.
          </p>
          <div className="p-3 rounded-md border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--fg)]">
            AGGREGATE LIABILITY CEILING FOR SITE UTILIZATION: PKR 10,000 OR USD $50.00.
          </div>
        </section>

        {/* Section 10 */}
        <section id="section-10" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">10 //</span>
            Engagement Termination &amp; Cancellation
          </h2>
          <p>
            Termination rights for active projects are defined within the applicable SOW. In the absence of contrary terms,
            either party may terminate an active project engagement with fourteen (14) calendar days written notice.
          </p>
          <p className="text-xs">
            Upon early termination, the client is obligated to compensate Hopfield Labs for all completed engineering sprints,
            billable hours accrued, and non-refundable third-party licensing costs incurred up to the date of termination.
          </p>
        </section>

        {/* Section 11 */}
        <section id="section-11" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">11 //</span>
            Governing Law &amp; Dispute Resolution
          </h2>
          <p>
            These Terms and any non-contractual obligations arising from them are governed by and construed in accordance
            with the laws of the Islamic Republic of Pakistan, without regard to conflicts of law doctrines.
          </p>
          <p className="text-xs">
            Any dispute, controversy, or claim arising out of or relating to these Terms or the Site shall be submitted
            to the exclusive jurisdiction of the competent courts in Islamabad / Rawalpindi, Pakistan, unless an alternate
            international arbitration forum is expressly stipulated in an executed client master agreement.
          </p>
        </section>

        {/* Section 12 */}
        <section id="section-12" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">12 //</span>
            Modifications to Terms
          </h2>
          <p>
            We may revise these Terms periodically to accommodate technological advancements, regulatory changes, or
            modifications in our studio service offerings. The updated revision timestamp will be reflected at the head
            of this document. Continued utilization of the Site or submission of intake requests following updates denotes
            unconditional acceptance of the revised Terms.
          </p>
        </section>

        {/* Section 13 */}
        <section id="section-13" className="space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-medium text-[var(--fg)] flex items-center gap-2.5">
            <span className="font-mono text-sm text-[var(--signal)]">13 //</span>
            Contact &amp; Studio Inquiries
          </h2>
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] space-y-4">
            <div className="space-y-1">
              <div className="font-mono text-sm font-bold text-[var(--fg)]">HOPFIELD LABS ENGINEERING STUDIO</div>
              <p className="text-xs text-[var(--fg-muted)]">
                Direct questions regarding these Terms or enterprise Master Service Agreements to:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs text-[var(--fg)]">
              <div>
                <span className="text-[var(--fg-muted)] block">Legal &amp; Contracts:</span>
                <a href="mailto:legal@hopfieldlabs.com" className="text-[var(--signal)] hover:underline">
                  legal@hopfieldlabs.com
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
                <span>Submit a secure message via our contact terminal &rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
