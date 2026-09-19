"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  IntakeState,
  initialIntakeState,
  ServiceId,
  StageId,
  BudgetId,
} from "@/lib/intake-types";
import {
  saveIntakeDraft,
  getIntakeDraft,
  sendDraftResumeEmail,
} from "@/app/actions/intake";
import { StepService } from "./step-service";
import { StepScopeStage } from "./step-scope-stage";
import { StepBudget } from "./step-budget";
import { StepEstimate } from "./step-estimate";
import { StepContact } from "./step-contact";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Calendar,
  Mail,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "hopfield_intake_v1";

const STEP_TITLES = [
  "Service",
  "Scope & Stage",
  "Budget",
  "Estimate",
  "Contact",
];

export function IntakeFlow() {
  const searchParams = useSearchParams();
  const [state, setState] = React.useState<IntakeState>(initialIntakeState);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [resumeLoading, setResumeLoading] = React.useState(false);

  // Success view state
  const [submissionSuccess, setSubmissionSuccess] = React.useState<{
    type: "inquiry" | "calendly";
    bookedTime?: string;
  } | null>(null);

  // Draft resume email state (inline prompt on/after step 2)
  const [draftEmailInput, setDraftEmailInput] = React.useState("");
  const [isSendingDraftEmail, setIsSendingDraftEmail] = React.useState(false);
  const [draftEmailSentMessage, setDraftEmailSentMessage] = React.useState<string | null>(null);

  // Helper to generate random UUID/token
  const generateToken = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "tok_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };

  // State rehydration logic: shared between sessionStorage and ?resume=<token>
  const applyHydratedState = React.useCallback((partial: Partial<IntakeState>) => {
    setState((prev) => ({
      ...prev,
      ...partial,
      step: partial.step || prev.step || 1,
      draftToken: partial.draftToken || prev.draftToken || generateToken(),
    }));
  }, []);

  // 1. Rehydration on mount
  React.useEffect(() => {
    const resumeToken = searchParams.get("resume");

    const hydrate = async () => {
      // Check cross-session / cross-device resume token first
      if (resumeToken) {
        setResumeLoading(true);
        try {
          const res = await getIntakeDraft(resumeToken);
          if (res.ok && res.payload) {
            applyHydratedState({
              ...(res.payload as Partial<IntakeState>),
              draftToken: resumeToken,
            });
            setIsHydrated(true);
            setResumeLoading(false);
            return;
          }
        } catch (e) {
          console.error("Failed to restore draft token:", e);
        }
        setResumeLoading(false);
      }

      // Otherwise restore same-session sessionStorage if available
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          applyHydratedState(parsed);
          setIsHydrated(true);
          return;
        }
      } catch {
        // Ignore JSON/storage errors
      }

      // Default new session
      applyHydratedState({ draftToken: generateToken() });
      setIsHydrated(true);
    };

    hydrate();
  }, [searchParams, applyHydratedState]);

  // 2. Synchronize to sessionStorage on every state update
  React.useEffect(() => {
    if (!isHydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }, [state, isHydrated]);

  // 3. Debounce-save partial draft to intake_drafts on/after step 2
  React.useEffect(() => {
    if (!isHydrated || state.step < 2 || !state.draftToken) return;

    const timer = setTimeout(() => {
      saveIntakeDraft(state.draftToken, {
        service: state.service,
        scopeTier: state.scopeTier,
        stage: state.stage,
        scopeNotes: state.scopeNotes,
        budget: state.budget,
        estimateShownLow: state.estimateShownLow,
        estimateShownHigh: state.estimateShownHigh,
        step: state.step,
      }, state.draftEmail);
    }, 700);

    return () => clearTimeout(timer);
  }, [
    isHydrated,
    state.step,
    state.draftToken,
    state.service,
    state.scopeTier,
    state.stage,
    state.scopeNotes,
    state.budget,
    state.estimateShownLow,
    state.estimateShownHigh,
    state.draftEmail,
  ]);

  // Handlers for step updates
  const setService = (service: ServiceId) => {
    setState((prev) => ({ ...prev, service }));
  };

  const setScopeTier = (scopeTier: string) => {
    setState((prev) => ({ ...prev, scopeTier }));
  };

  const setStage = (stage: StageId) => {
    setState((prev) => ({ ...prev, stage }));
  };

  const setScopeNotes = (scopeNotes: string) => {
    setState((prev) => ({ ...prev, scopeNotes }));
  };

  const setBudget = (budget: BudgetId) => {
    setState((prev) => ({ ...prev, budget }));
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, step: Math.min(5, prev.step + 1) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEstimateContinue = (low: number, high: number, note: string) => {
    setState((prev) => ({
      ...prev,
      estimateShownLow: low,
      estimateShownHigh: high,
      estimateNote: note,
      step: 5,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftEmailInput || !draftEmailInput.includes("@")) return;

    setIsSendingDraftEmail(true);
    setDraftEmailSentMessage(null);

    const res = await sendDraftResumeEmail(state.draftToken, draftEmailInput);
    setIsSendingDraftEmail(false);

    if (res.ok) {
      setState((prev) => ({ ...prev, draftEmail: draftEmailInput }));
      setDraftEmailSentMessage(res.message || "Magic resume link sent to your email!");
    } else {
      setDraftEmailSentMessage(res.error || "Could not send link. Please retry.");
    }
  };

  const handleSubmissionSuccess = (
    type: "inquiry" | "calendly",
    bookedTime?: string
  ) => {
    // Clear storage on final submit
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setSubmissionSuccess({ type, bookedTime });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (resumeLoading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center space-y-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--signal)]" />
        <div className="text-sm font-mono text-[var(--fg-muted)]">
          Rehydrating your project draft...
        </div>
      </div>
    );
  }

  // Final Success State
  if (submissionSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 sm:p-12 border border-[var(--signal)]/40 rounded-[var(--radius)] bg-[var(--surface)] space-y-8 text-center animate-in fade-in zoom-in-95 duration-400">
        <div className="w-16 h-16 rounded-full border border-[var(--signal)]/40 bg-[var(--signal)]/10 text-[var(--signal)] flex items-center justify-center mx-auto">
          {submissionSuccess.type === "calendly" ? (
            <Calendar className="h-8 w-8" />
          ) : (
            <CheckCircle2 className="h-8 w-8" />
          )}
        </div>

        <div className="space-y-3">
          <div className="eyebrow tracking-[0.16em] text-[var(--signal)]">
            {submissionSuccess.type === "calendly"
              ? "DISCOVERY CALL RESERVED"
              : "SPECIFICATION LOGGED // 12H SLA"}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--fg)]">
            {submissionSuccess.type === "calendly"
              ? "Your Scoping Session Is Confirmed"
              : "Project Brief Transmitted Successfully"}
          </h2>

          <p className="text-sm text-[var(--fg-muted)] leading-relaxed max-w-lg mx-auto">
            {submissionSuccess.type === "calendly" ? (
              <>
                We have registered your session for{" "}
                <strong className="text-[var(--fg)]">
                  {submissionSuccess.bookedTime || "the selected slot"}
                </strong>
                . Our technical leads will review your answered scope and arrive with architectural solutions ready to discuss.
              </>
            ) : (
              <>
                Our engineering team has received your technical requirements. We evaluate feasibility and return a detailed milestone breakdown and quote within <strong>12 hours</strong>.
              </>
            )}
          </p>
        </div>

        {/* Recap badge strip */}
        <div className="p-4 rounded border border-[var(--border)] bg-[var(--surface-hover)] text-left text-xs font-mono space-y-1.5 max-w-md mx-auto">
          <div className="flex justify-between text-[var(--fg-muted)]">
            <span>Discipline:</span>
            <span className="text-[var(--fg)] uppercase font-semibold">
              {state.service}
            </span>
          </div>
          <div className="flex justify-between text-[var(--fg-muted)]">
            <span>Stage:</span>
            <span className="text-[var(--fg)] uppercase font-semibold">
              {state.stage}
            </span>
          </div>
          <div className="flex justify-between text-[var(--fg-muted)]">
            <span>Ballpark Estimate:</span>
            <span className="text-[var(--signal)] font-semibold">
              ${state.estimateShownLow.toLocaleString()} – ${state.estimateShownHigh.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            onClick={() => {
              setSubmissionSuccess(null);
              setState(initialIntakeState);
            }}
            className="font-mono text-xs"
          >
            Start Another Project Intake
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Stepper Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
            <span className="uppercase tracking-wider font-semibold text-[var(--fg)]">
              Step {state.step} of 5: {STEP_TITLES[state.step - 1]}
            </span>
          </div>
          <span>{Math.round((state.step / 5) * 100)}% Completed</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--signal)] transition-all duration-300 ease-out"
            style={{ width: `${(state.step / 5) * 100}%` }}
          />
        </div>

        {/* Step indicator pills */}
        <div className="hidden sm:grid grid-cols-5 gap-2 pt-1">
          {STEP_TITLES.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = state.step > stepNum;
            const isCurrent = state.step === stepNum;

            return (
              <button
                key={title}
                type="button"
                disabled={stepNum > state.step}
                onClick={() => {
                  if (stepNum < state.step) {
                    setState((prev) => ({ ...prev, step: stepNum }));
                  }
                }}
                className={cn(
                  "text-left py-1.5 px-2 rounded text-[11px] font-mono transition-colors",
                  isCurrent && "border border-[var(--signal)]/50 bg-[var(--signal)]/10 text-[var(--fg)] font-medium",
                  isCompleted && "text-[var(--fg-muted)] hover:text-[var(--fg)] cursor-pointer",
                  !isCurrent && !isCompleted && "text-[var(--fg-muted)]/50 cursor-not-allowed"
                )}
              >
                <div className="truncate">
                  0{stepNum}. {title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Shell */}
      <div className="p-6 sm:p-8 md:p-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] shadow-xs min-h-[440px] flex flex-col justify-between">
        <div className="space-y-6">
          {state.step === 1 && (
            <StepService value={state.service} onChange={setService} />
          )}

          {state.step === 2 && (
            <StepScopeStage
              service={state.service}
              scopeTier={state.scopeTier}
              stage={state.stage}
              scopeNotes={state.scopeNotes}
              onScopeTierChange={setScopeTier}
              onStageChange={setStage}
              onScopeNotesChange={setScopeNotes}
            />
          )}

          {state.step === 3 && (
            <StepBudget value={state.budget} onChange={setBudget} />
          )}

          {state.step === 4 && (
            <StepEstimate
              service={state.service}
              stage={state.stage}
              budget={state.budget}
              onContinue={handleEstimateContinue}
            />
          )}

          {state.step === 5 && (
            <StepContact
              service={state.service}
              stage={state.stage}
              budget={state.budget}
              scopeTier={state.scopeTier}
              scopeNotes={state.scopeNotes}
              estimateShownLow={state.estimateShownLow}
              estimateShownHigh={state.estimateShownHigh}
              draftToken={state.draftToken}
              onSuccess={handleSubmissionSuccess}
            />
          )}
        </div>

        {/* Bottom Stepper Controls (for Steps 1–3) */}
        {state.step <= 3 && (
          <div className="pt-8 mt-8 border-t border-[var(--border)] flex items-center justify-between">
            {state.step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="gap-2 font-medium text-xs font-mono"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous Step</span>
              </Button>
            ) : (
              <div />
            )}

            <Button
              type="button"
              onClick={nextStep}
              className="gap-2 font-medium text-xs font-mono px-6"
            >
              <span>Continue to Step 0{state.step + 1}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        {/* Back button for Step 4 & 5 */}
        {state.step > 3 && (
          <div className="pt-6 border-t border-[var(--border)] flex justify-start">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={prevStep}
              className="gap-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] font-mono"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Step 0{state.step - 1}</span>
            </Button>
          </div>
        )}
      </div>

      {/* Save-and-Resume Inline Banner (Appears on or after Step 2) */}
      {state.step >= 2 && (
        <div className="p-4 sm:p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg-muted)] space-y-3 transition-all animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[var(--fg)] font-medium">
              <Bookmark className="h-4 w-4 text-[var(--signal)] shrink-0" />
              <span>Want to finish this later?</span>
              <span className="text-[11px] text-[var(--fg-muted)] font-normal hidden sm:inline">
                We’ll send a magic link to resume anytime within 14 days.
              </span>
            </div>

            <form
              onSubmit={handleSendMagicLink}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <input
                type="email"
                placeholder="Enter your email..."
                value={draftEmailInput}
                onChange={(e) => setDraftEmailInput(e.target.value)}
                required
                className="flex h-9 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1 text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)]/60 focus-visible:outline-none focus-visible:border-[var(--signal)] w-full sm:w-56"
              />
              <Button
                type="submit"
                size="sm"
                variant="outline"
                disabled={isSendingDraftEmail || !draftEmailInput}
                className="h-9 shrink-0 gap-1.5 text-xs font-mono"
              >
                {isSendingDraftEmail ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Mail className="h-3 w-3" />
                )}
                <span>Email link</span>
              </Button>
            </form>
          </div>

          {draftEmailSentMessage && (
            <div className="text-[11px] text-[var(--signal)] font-mono animate-in fade-in">
              ✓ {draftEmailSentMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
