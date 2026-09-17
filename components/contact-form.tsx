"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Send, ArrowRight } from "lucide-react";
import { contactSchema, type ContactFormData, type ContactActionResult } from "@/lib/schemas";
import { submitContactLead } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [serverState, setServerState] = React.useState<ContactActionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "web-development",
      budget: "3k-6k",
      message: "",
      company_url: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerState(null);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.company) formData.append("company", data.company);
    formData.append("service", data.service);
    formData.append("budget", data.budget);
    formData.append("message", data.message);
    formData.append("company_url", data.company_url || "");

    try {
      const result = await submitContactLead(null, formData);
      setServerState(result);
      if (result.ok) {
        reset();
      }
    } catch {
      setServerState({
        ok: false,
        error: "Network transmission error. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state replaces form
  if (serverState?.ok) {
    return (
      <div className="p-8 md:p-10 border border-[var(--signal)]/30 rounded-[var(--radius)] bg-[var(--surface)] space-y-6 text-center">
        <div className="w-12 h-12 rounded-full border border-[var(--signal)]/40 bg-[var(--signal)]/10 text-[var(--signal)] flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-[var(--fg)]">
            Inquiry Transmitted Successfully
          </h3>
          <p className="text-sm text-[var(--fg-muted)] max-w-md mx-auto leading-relaxed">
            {serverState.message}
          </p>
        </div>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setServerState(null)}
            className="font-mono text-xs"
          >
            Submit another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-6 md:p-8 border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] space-y-5"
    >
      {/* Server error alert if any */}
      {serverState && !serverState.ok && (
        <div className="p-3.5 rounded border border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)] text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{serverState.error}</span>
        </div>
      )}

      {/* Honeypot field (hidden from humans, trapped for bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_url">Website URL (leave empty)</label>
        <input
          id="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_url")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
            Your Name *
          </label>
          <Input
            placeholder="e.g. Alex Morgan"
            error={!!errors.name}
            {...register("name")}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-[11px] text-[var(--danger)] block">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="alex@company.com"
            error={!!errors.email}
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-[11px] text-[var(--danger)] block">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company / Organization (Optional) */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
            Company / University (Optional)
          </label>
          <Input
            placeholder="e.g. Acme Corp or Stanford"
            {...register("company")}
            disabled={isSubmitting}
          />
        </div>

        {/* Service selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
            Project Practice Area *
          </label>
          <select
            className="flex min-h-[44px] h-11 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base md:text-sm text-[var(--fg)] focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-1 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
            {...register("service")}
            disabled={isSubmitting}
          >
            <option value="web-development">Web Development (Full-Stack)</option>
            <option value="mobile-development">Mobile App (iOS / Android)</option>
            <option value="genai-integration">GenAI Integration & RAG</option>
            <option value="aiml-solutions">AI/ML in Web & Apps</option>
            <option value="fyp-mentoring">FYP / Academic Capstone</option>
            <option value="something-else">Something else / Advisory</option>
          </select>
        </div>
      </div>

      {/* Budget Range */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
          Estimated Budget Range *
        </label>
        <select
          className="flex min-h-[44px] h-11 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base md:text-sm text-[var(--fg)] focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-1 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
          {...register("budget")}
          disabled={isSubmitting}
        >
          <option value="under-3k">Under $3,000 (Scoping / FYP Prototype)</option>
          <option value="3k-6k">$3,000 – $6,000 (Standard MVP Sprint)</option>
          <option value="6k-12k">$6,000 – $12,000 (Production Scale Platform)</option>
          <option value="12k-plus">$12,000+ (Enterprise / Multi-Platform Build)</option>
          <option value="undecided">Undecided / Requesting Technical Scoping</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] flex justify-between">
          <span>Project Brief & Scope *</span>
          <span className="text-[11px] lowercase text-[var(--fg-muted)]/70">min 10 chars</span>
        </label>
        <Textarea
          placeholder="Describe what you want to build: goals, desired tech stack, target timeline, or data requirements..."
          rows={4}
          error={!!errors.message}
          {...register("message")}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span className="text-[11px] text-[var(--danger)] block">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        isLoading={isSubmitting}
        className="w-full gap-2 mt-2 font-medium"
      >
        <span>Transmit Project Brief</span>
        <Send className="h-4 w-4" />
      </Button>

      <div className="flex justify-between items-center text-[11px] font-mono text-[var(--fg-muted)] pt-1">
        <span>RATE LIMITED // 3 PER HOUR</span>
        <span>STRICT CONFIDENTIALITY</span>
      </div>
    </form>
  );
}
