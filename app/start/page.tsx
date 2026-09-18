import { Suspense } from "react";
import type { Metadata } from "next";
import { IntakeFlow } from "@/components/intake/intake-flow";
import { AttractorField } from "@/components/motif/attractor-field";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Project // Engineering Intake // Hopfield Labs",
  description:
    "Interactive 5-step technical intake pipeline. Get an instant ballpark estimate for your web, mobile, GenAI, or capstone engineering build.",
};

export default function StartPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Faint radial glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(79, 125, 255, 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Signature AttractorField motif */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <AttractorField nodeCount={32} connectionDistance={130} opacity={0.25} />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Suspense
          fallback={
            <div className="min-h-[500px] flex flex-col items-center justify-center space-y-4 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--signal)]" />
              <div className="text-sm font-mono text-[var(--fg-muted)]">
                Initializing intake pipeline...
              </div>
            </div>
          }
        >
          <IntakeFlow />
        </Suspense>
      </div>
    </div>
  );
}
