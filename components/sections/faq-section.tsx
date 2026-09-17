import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionReveal } from "@/components/section-reveal";

const FAQS = [
  {
    question: "What is your typical project cost and billing structure?",
    answer:
      "We primarily bill on fixed-scope sprint contracts for MVPs and deliverables (typically starting from $3,500 to $12,000 depending on complexity). For ongoing feature velocity, we offer monthly dedicated engineering retainers. There are zero hidden fees or milestone surprises.",
  },
  {
    question: "How fast can you deliver an MVP or production system?",
    answer:
      "Most MVPs are completed in 4 to 6 weeks from technical kickoff to production release. We ship staging updates to you every Friday so you can test features incrementally throughout development.",
  },
  {
    question: "Who owns the intellectual property and source code?",
    answer:
      "You own 100% of all intellectual property, source code, database schemas, and architectural assets from the moment each milestone invoice is settled. We transfer the private Git repositories directly to your organization.",
  },
  {
    question: "Do you provide ongoing support after deployment?",
    answer:
      "Yes. Every build comes with a complimentary 30-day post-launch warranty covering bug fixes and infrastructure stabilization. After that, we offer lightweight maintenance retainers or on-demand sprint allocations.",
  },
  {
    question: "Will you sign a non-disclosure agreement (NDA) before we discuss details?",
    answer:
      "Absolutely. We routinely sign bilateral or client-provided NDAs prior to receiving proprietary data, architectural diagrams, or pitch decks. Confidentiality is standard practice across all our client relationships.",
  },
  {
    question: "What is the exact scope covered under FYP capstone mentorship?",
    answer:
      "Our FYP mentorship covers the entire academic capstone lifecycle: literature review & proposal refinement, full-stack software or PyTorch model implementation, IEEE/LaTeX report documentation, and 1-on-1 mock viva defense cross-examinations.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionReveal>
        <div className="text-center space-y-3">
          <div className="eyebrow">COMMON QUESTIONS // DIRECT ANSWERS</div>
          <h2 className="section-heading text-[var(--fg)]">
            Frequently Asked Questions
          </h2>
          <p className="body-text max-w-lg mx-auto">
            Everything you need to know about our engineering standards,
            timelines, and code ownership.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-sm md:text-base font-medium text-[var(--fg)]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--fg-muted)] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionReveal>
    </section>
  );
}
