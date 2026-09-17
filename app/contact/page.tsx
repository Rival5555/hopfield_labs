import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="eyebrow text-[var(--accent)]">
          DIRECT ENGAGEMENT // INITIATION PORTAL
        </div>
        <h1 className="hero-heading text-[var(--fg)] mt-2">
          Start a Project with Hopfield Labs
        </h1>
        <p className="body-text text-base md:text-lg max-w-2xl mt-4">
          Tell us about your project parameters, desired timeline, or academic capstone scope. We evaluate feasibility and respond within 12 hours.
        </p>
      </div>

      <ContactSection />
      <FaqSection />
    </div>
  );
}
