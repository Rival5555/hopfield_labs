import { SectionReveal } from "@/components/section-reveal";

const TESTIMONIALS = [
  {
    quote:
      "Hopfield Labs delivered our clinical RAG pipeline three weeks ahead of schedule. Their understanding of vector embeddings, chunking strategies, and low-latency API design is rare in this market.",
    author: "Dr. Marcus Vance",
    role: "VP of Engineering",
    org: "Aura Health",
    initials: "MV",
  },
  {
    quote:
      "Unlike typical agencies that hide behind junior developers, the Hopfield team acted like true technical co-founders. Our mobile logistics telemetry has run uninterrupted without a single dropped packet.",
    author: "Elena Rostova",
    role: "Co-Founder & COO",
    org: "OmniTrack Logistics",
    initials: "ER",
  },
  {
    quote:
      "I was terrified of my FYP defense until my mock sessions with Hopfield Labs. They helped me grasp every single convolution layer and backpropagation step in my thesis. I walked away with an A+ and Highest Honors.",
    author: "Tariq Mansoor",
    role: "Computer Science Graduate",
    org: "FAST National University",
    initials: "TM",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionReveal>
        <div className="space-y-3">
          <div className="eyebrow">FIELD REPUTATION & REVIEWS</div>
          <h2 className="section-heading text-[var(--fg)]">
            What Engineering Partners Say
          </h2>
          <p className="body-text max-w-xl">
            Unfiltered feedback from founders, VP of Engineering leads, and
            university researchers who build with us.
          </p>
        </div>
      </SectionReveal>

      {/* Plain text cards, no carousel, no avatars larger than 32px */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item, idx) => (
          <SectionReveal key={item.author} delay={idx * 0.1}>
            <div className="p-6 md:p-7 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] h-full flex flex-col justify-between space-y-6">
              <p className="text-sm text-[var(--fg)] leading-relaxed italic">
                “{item.quote}”
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]/60">
                {/* 32px avatar circle */}
                <div className="w-8 h-8 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] flex items-center justify-center font-mono text-xs font-semibold text-[var(--signal)] shrink-0">
                  {item.initials}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-[var(--fg)]">
                    {item.author}
                  </div>
                  <div className="text-[11px] font-mono text-[var(--fg-muted)]">
                    {item.role}, {item.org}
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
