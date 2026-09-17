import { Mail, MessageSquare, MapPin, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { AttractorField } from "@/components/motif/attractor-field";
import { SectionReveal } from "@/components/section-reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Signature AttractorField motif as divider before contact */}
      <div className="w-full h-24 mb-12 overflow-hidden pointer-events-none opacity-25">
        <AttractorField nodeCount={32} connectionDistance={120} opacity={0.25} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading + Direct Communication + Response SLA */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="eyebrow text-[var(--accent)]">
                  COMMENCE ENGAGEMENT // INITIATION
                </div>
                <h2 className="section-heading text-[var(--fg)]">
                  Let’s Engineer Your System
                </h2>
                <p className="body-text">
                  Whether you require an MVP in 4 weeks, an enterprise RAG
                  integration, or academic capstone mentorship, share your parameters
                  below.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4 pt-2">
                <a
                  href="mailto:contact@hopfieldlabs.com"
                  className="interactive-surface p-4 flex items-center gap-4 group block"
                >
                  <div className="w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[var(--fg-muted)]">
                      DIRECT INBOX
                    </div>
                    <div className="text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      contact@hopfieldlabs.com
                    </div>
                  </div>
                </a>

                <div className="interactive-surface p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--signal)]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[var(--fg-muted)]">
                      FAST TRACK CHANNELS
                    </div>
                    <div className="text-sm font-medium text-[var(--fg)]">
                      WhatsApp & Discord Available
                    </div>
                  </div>
                </div>

                <div className="interactive-surface p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--fg-muted)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[var(--fg-muted)]">
                      LOCATION & TIMEZONE
                    </div>
                    <div className="text-sm font-medium text-[var(--fg)]">
                      Global Remote // UTC+5 Primary
                    </div>
                  </div>
                </div>
              </div>

              {/* Response-time promise & NDA notice */}
              <div className="space-y-2 p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-2)]/60 text-xs font-mono text-[var(--fg-muted)]">
                <div className="flex items-center gap-2 text-[var(--signal)] font-medium">
                  <Clock className="h-4 w-4" />
                  <span>12-HOUR SLA RESPONSE GUARANTEE</span>
                </div>
                <p className="leading-relaxed">
                  Every submission is reviewed by a principal engineer. We provide a preliminary feasibility evaluation and availability timeline within 12 hours.
                </p>
                <div className="flex items-center gap-1.5 pt-1 text-[var(--fg-muted)]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Mutual NDA available upon request.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
