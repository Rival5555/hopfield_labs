import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ServicesSection } from "@/components/sections/services-section";
import { InteractiveDemoSection } from "@/components/sections/interactive-demo-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { FypSection } from "@/components/sections/fyp-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero with AttractorField & radial glow */}
      <HeroSection />

      {/* 2. Trust strip (4-up stats & stack partners) */}
      <TrustSection />

      {/* 3. Services 5-card Bento grid */}
      <ServicesSection />

      {/* 4. Live GenAI Terminal Demo */}
      <InteractiveDemoSection />

      {/* 5. Process linear stepper */}
      <ProcessSection />

      {/* 6. Selected work case studies */}
      <SelectedWorkSection />

      {/* 7. FYP academic capstone band */}
      <FypSection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQ Accordion */}
      <FaqSection />

      {/* 10. Split Contact & Initiation section */}
      <ContactSection />
    </div>
  );
}
