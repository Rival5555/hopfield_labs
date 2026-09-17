import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl space-y-6">
        <div className="eyebrow">HOPFIELD LABS // INITIALIZING</div>
        <h1 className="hero-heading">Step 1 Ready</h1>
        <p className="body-text">
          The Design Tokens, Tailwind CSS v4 setup, Geist typography, UI
          primitives, and interactive AttractorField motif have been calibrated.
        </p>
        <div className="pt-4">
          <Link href="/styleguide">
            <Button size="lg" className="gap-2">
              <span>View Interactive Styleguide</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
