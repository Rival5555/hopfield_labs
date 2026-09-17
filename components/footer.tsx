import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Identity & Availability (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-mono text-sm tracking-[0.16em] uppercase font-bold text-[var(--fg)] hover:text-white transition-colors"
            >
              <Logo variant="mark" size={20} className="text-[var(--signal)]" title="Hopfield Labs Logo" />
              <span>HOPFIELD LABS</span>
            </Link>

            <p className="body-text max-w-sm text-sm">
              Software & AI studio engineering modern web platforms, native
              mobile applications, and production-grade GenAI integrations for
              startups, SMEs, and academic capstone researchers.
            </p>

            <div className="pt-2">
              <Badge variant="signal" dot pulse>
                AVAILABLE FOR Q2/Q3 PROJECTS
              </Badge>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <div className="eyebrow">SERVICES</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/web-development"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mobile-development"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/genai-integration"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  GenAI Integration (RAG)
                </Link>
              </li>
              <li>
                <Link
                  href="/services/aiml-solutions"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  AI/ML in Web & Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/services/fyp-mentoring"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  Final Year Projects (FYP)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio & Navigation */}
          <div className="space-y-4">
            <div className="eyebrow">STUDIO</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/work"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  About Hopfield
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  Contact & Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/styleguide"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors font-mono text-xs flex items-center gap-1"
                >
                  <span>DESIGN SPEC</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect & Socials */}
          <div className="space-y-4">
            <div className="eyebrow">CONNECT</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/Rival5555/hopfield_labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter / X</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--fg-muted)]">
          <p>© 2026 Hopfield Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[var(--fg)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--fg)] transition-colors"
            >
              Terms of Service
            </Link>
            <span>ENERGY LANDSCAPE ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
