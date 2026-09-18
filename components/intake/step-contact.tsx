"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ServiceId,
  StageId,
  BudgetId,
  HEARD_FROM_OPTIONS,
  contactStepSchema,
  SERVICE_OPTIONS,
} from "@/lib/intake-types";
import { createAttachmentUploadUrl, submitIntakeLead } from "@/app/actions/intake";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  UploadCloud,
  FileText,
  X,
  Send,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Paperclip,
  Link as LinkIcon,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "completed" | "error";
  storagePath?: string;
  errorMessage?: string;
  fileObj?: File;
}

interface StepContactProps {
  service: ServiceId;
  stage: StageId;
  budget: BudgetId;
  scopeTier: string;
  scopeNotes: string;
  estimateShownLow: number;
  estimateShownHigh: number;
  draftToken: string;
  onSuccess: (type: "inquiry" | "calendly", bookedTime?: string) => void;
}

interface ContactFormFields {
  name: string;
  email: string;
  company?: string;
  message: string;
  heardFrom?: string;
  linkUrl?: string;
}

export function StepContact({
  service,
  stage,
  budget,
  scopeTier,
  scopeNotes,
  estimateShownLow,
  estimateShownHigh,
  draftToken,
  onSuccess,
}: StepContactProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFileItem[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);

  // Calendly / Cal.com direct booking state
  const [showCalBooking, setShowCalBooking] = React.useState(false);
  const [calLoaded, setCalLoaded] = React.useState(false);

  // Cal.com eligibility check
  const isCalEligible = budget !== "undecided" && stage !== "university-student";

  // Dynamic link field label & placeholder based on service & stage
  const linkConfig = React.useMemo(() => {
    if (stage === "university-student" || service === "fyp-mentoring") {
      return {
        label: "Proposal doc link or academic syllabus (optional)",
        placeholder: "https://docs.google.com/document/...",
      };
    }
    if (service === "web-development" || service === "mobile-development") {
      return {
        label: "Figma link or spec URL (optional)",
        placeholder: "https://figma.com/file/...",
      };
    }
    if (service === "genai-integration" || service === "aiml-solutions") {
      return {
        label: "GitHub repo or architecture doc (optional)",
        placeholder: "https://github.com/org/repo...",
      };
    }
    return {
      label: "Project link or brief URL (optional)",
      placeholder: "https://...",
    };
  }, [service, stage]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ContactFormFields>({
    resolver: zodResolver(
      contactStepSchema.omit({ attachmentPaths: true })
    ),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: scopeNotes ? `Scope notes: ${scopeNotes}` : "",
      heardFrom: "",
      linkUrl: "",
    },
  });

  // Handle direct-to-Supabase file upload using signed URLs
  const uploadSingleFile = async (file: File) => {
    const fileId = Math.random().toString(36).substring(2, 9);
    const newFileItem: UploadedFileItem = {
      id: fileId,
      name: file.name,
      size: file.size,
      progress: 10,
      status: "uploading",
      fileObj: file,
    };

    setUploadedFiles((prev) => [...prev, newFileItem]);

    try {
      // 1. Request signed upload URL from Server Action
      const res = await createAttachmentUploadUrl(file.name, file.type);
      if (!res.ok || (!res.uploadUrl && !res.isMock)) {
        setUploadedFiles((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? {
                  ...item,
                  status: "error",
                  errorMessage: res.error || "Could not generate upload URL",
                }
              : item
          )
        );
        return;
      }

      // 2. Upload directly to Supabase via PUT (or simulate for local dev fallback)
      if (res.isMock) {
        // Simulated smooth upload for development without live Supabase
        for (let pct = 30; pct <= 100; pct += 35) {
          await new Promise((resolve) => setTimeout(resolve, 150));
          setUploadedFiles((prev) =>
            prev.map((item) =>
              item.id === fileId ? { ...item, progress: Math.min(100, pct) } : item
            )
          );
        }
        setUploadedFiles((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? {
                  ...item,
                  status: "completed",
                  progress: 100,
                  storagePath: res.path,
                }
              : item
          )
        );
      } else if (res.uploadUrl) {
        // Real Supabase signed URL upload
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", res.uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 90);
            setUploadedFiles((prev) =>
              prev.map((item) =>
                item.id === fileId ? { ...item, progress: Math.max(10, pct) } : item
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setUploadedFiles((prev) =>
              prev.map((item) =>
                item.id === fileId
                  ? {
                      ...item,
                      status: "completed",
                      progress: 100,
                      storagePath: res.path,
                    }
                  : item
              )
            );
          } else {
            setUploadedFiles((prev) =>
              prev.map((item) =>
                item.id === fileId
                  ? {
                      ...item,
                      status: "error",
                      errorMessage: `Upload failed (status ${xhr.status})`,
                    }
                  : item
              )
            );
          }
        };

        xhr.onerror = () => {
          setUploadedFiles((prev) =>
            prev.map((item) =>
              item.id === fileId
                ? {
                    ...item,
                    status: "error",
                    errorMessage: "Network error during upload. Click retry.",
                  }
                : item
            )
          );
        };

        xhr.send(file);
      }
    } catch (err: unknown) {
      setUploadedFiles((prev) =>
        prev.map((item) =>
          item.id === fileId
            ? {
                ...item,
                status: "error",
                errorMessage: "Upload error occurred.",
              }
            : item
        )
      );
    }
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = 3 - uploadedFiles.length;
    if (remainingSlots <= 0) {
      alert("Maximum 3 files allowed.");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    for (const file of filesToUpload) {
      // 10MB check
      if (file.size > 10 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 10MB size limit.`);
        continue;
      }
      uploadSingleFile(file);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== fileId));
  };

  const retryUpload = (fileItem: UploadedFileItem) => {
    if (fileItem.fileObj) {
      removeFile(fileItem.id);
      uploadSingleFile(fileItem.fileObj);
    }
  };

  // Submit standard intake inquiry
  const onSubmit = async (data: ContactFormFields) => {
    setIsSubmitting(true);
    setServerError(null);

    const completedPaths = uploadedFiles
      .filter((f) => f.status === "completed" && f.storagePath)
      .map((f) => f.storagePath as string);

    try {
      const result = await submitIntakeLead({
        name: data.name,
        email: data.email,
        company: data.company || "",
        message: data.message,
        heardFrom: data.heardFrom || "",
        linkUrl: data.linkUrl || "",
        attachmentPaths: completedPaths,
        service,
        stage,
        scopeTier,
        scopeNotes,
        budget,
        estimateShownLow,
        estimateShownHigh,
        source: "start_flow",
        draftToken,
      });

      if (result.ok) {
        onSuccess("inquiry");
      } else {
        setServerError(result.error || "Submission failed. Please retry.");
      }
    } catch {
      setServerError("Network error. Please try again or reach contact@hopfieldlabs.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lazy-load Cal.com embed only when toggled
  React.useEffect(() => {
    if (showCalBooking && !calLoaded) {
      // Dynamically load Cal embed script
      (function (C: any, A: any, L: any) {
        let p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api: any = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initLoaded", namespace]);
              } else {
                p(cal, ar);
              }
              return;
            }
            p(cal, ar);
          };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      const cal = (window as any).Cal;
      if (cal) {
        cal("init", "discovery", { origin: "https://app.cal.com" });
        cal.ns.discovery("inline", {
          elementOrSelector: "#cal-embed-container",
          calLink: process.env.NEXT_PUBLIC_CAL_LINK || "hopfield-labs/discovery",
          layout: "month_view",
        });

        // Listen for booking successful event
        cal.ns.discovery("on", {
          action: "bookingSuccessful",
          callback: async (e: any) => {
            // Background lead capture
            const formValues = getValues();
            const completedPaths = uploadedFiles
              .filter((f) => f.status === "completed" && f.storagePath)
              .map((f) => f.storagePath as string);

            await submitIntakeLead({
              name: formValues.name || "Calendly Lead",
              email: formValues.email || e.detail?.data?.email || "scheduled-lead@client.com",
              company: formValues.company || "",
              message: formValues.message || "Booked via direct discovery session calendar.",
              heardFrom: formValues.heardFrom || "",
              linkUrl: formValues.linkUrl || "",
              attachmentPaths: completedPaths,
              service,
              stage,
              scopeTier,
              scopeNotes,
              budget,
              estimateShownLow,
              estimateShownHigh,
              source: "start-flow-calendly",
              draftToken,
            });

            onSuccess("calendly", e.detail?.data?.date || "Scheduled Discovery Call");
          },
        });
      }

      setCalLoaded(true);
    }
  }, [
    showCalBooking,
    calLoaded,
    getValues,
    uploadedFiles,
    service,
    stage,
    scopeTier,
    scopeNotes,
    budget,
    estimateShownLow,
    estimateShownHigh,
    draftToken,
    onSuccess,
  ]);

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="space-y-2 text-center md:text-left">
        <div className="eyebrow tracking-[0.16em]">
          STEP 5 OF 5 // CONTACT & ATTACHMENTS
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)]">
          Where should our engineering leads send your proposal?
        </h2>
        <p className="text-sm text-[var(--fg-muted)] max-w-xl">
          We treat every inquiry under strict NDA standards. Upload any wireframes or specs you have, and our technical partners will review within 12 hours.
        </p>
      </div>

      {serverError && (
        <div className="p-3.5 rounded border border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)] text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Main Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
              Your Name *
            </label>
            <Input
              placeholder="e.g. Alex Rivera"
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
          {/* Company / University */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
              Company / Institution (Optional)
            </label>
            <Input
              placeholder={
                stage === "university-student"
                  ? "e.g. MIT, Stanford, Oxford..."
                  : "e.g. Acme Health or Self"
              }
              {...register("company")}
              disabled={isSubmitting}
            />
          </div>

          {/* How did you hear about us */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
              How Did You Hear About Us? (Optional)
            </label>
            <select
              className="flex min-h-[44px] h-11 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base md:text-sm text-[var(--fg)] focus-visible:outline-none focus-visible:border-[var(--signal)] focus-visible:ring-1 focus-visible:ring-[var(--signal)]"
              {...register("heardFrom")}
              disabled={isSubmitting}
            >
              <option value="">Select source...</option>
              {HEARD_FROM_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Contextual Link Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] flex items-center gap-1.5">
            <LinkIcon className="h-3.5 w-3.5 text-[var(--signal)]" />
            <span>{linkConfig.label}</span>
          </label>
          <Input
            placeholder={linkConfig.placeholder}
            error={!!errors.linkUrl}
            {...register("linkUrl")}
            disabled={isSubmitting}
          />
          {errors.linkUrl && (
            <span className="text-[11px] text-[var(--danger)] block">
              {errors.linkUrl.message}
            </span>
          )}
        </div>

        {/* Direct-to-Supabase File Upload Component */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Project Attachments (Optional)</span>
            </label>
            <span className="text-[11px] text-[var(--fg-muted)]/70">
              {uploadedFiles.length}/3 files (max 10MB each)
            </span>
          </div>

          {/* Dropzone */}
          {uploadedFiles.length < 3 && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFilesSelected(e.dataTransfer.files);
              }}
              className={cn(
                "border-2 border-dashed rounded-[var(--radius)] p-6 text-center transition-colors cursor-pointer",
                isDragging
                  ? "border-[var(--signal)] bg-[var(--signal)]/5"
                  : "border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--surface)]"
              )}
              onClick={() => {
                const input = document.getElementById("attachment-file-input");
                input?.click();
              }}
            >
              <input
                id="attachment-file-input"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFilesSelected(e.target.files)}
              />
              <UploadCloud className="h-7 w-7 mx-auto text-[var(--fg-muted)] mb-2" />
              <p className="text-xs font-medium text-[var(--fg)]">
                Drag and drop files here, or <span className="text-[var(--signal)] underline">browse</span>
              </p>
              <p className="text-[11px] text-[var(--fg-muted)] mt-1">
                Accepted formats: PDF, DOC, DOCX, PNG, JPG (up to 10MB per file)
              </p>
            </div>
          )}

          {/* Uploaded files list */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded border border-[var(--border)] bg-[var(--surface-hover)] text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-3">
                    <FileText className="h-4 w-4 shrink-0 text-[var(--fg-muted)]" />
                    <div className="min-w-0">
                      <div className="font-medium text-[var(--fg)] truncate">
                        {file.name}
                      </div>
                      <div className="text-[10px] text-[var(--fg-muted)]">
                        {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                        {file.status === "completed" && (
                          <span className="text-[var(--signal)] font-medium">Uploaded</span>
                        )}
                        {file.status === "uploading" && (
                          <span className="text-[var(--accent)] font-medium">
                            Uploading {file.progress}%
                          </span>
                        )}
                        {file.status === "error" && (
                          <span className="text-[var(--danger)] font-medium">
                            {file.errorMessage || "Failed"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {file.status === "error" && file.fileObj && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => retryUpload(file)}
                        className="h-7 px-2 text-[11px] gap-1 font-mono"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Retry</span>
                      </Button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="p-1 rounded text-[var(--fg-muted)] hover:text-[var(--danger)] hover:bg-[var(--surface)] transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Message / Brief */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] flex justify-between">
            <span>Project Brief & Scope Details *</span>
            <span className="text-[11px] text-[var(--fg-muted)]/70">min 10 chars</span>
          </label>
          <Textarea
            rows={4}
            placeholder="Tell us what you are aiming to build, desired timeline, APIs to integrate, or core challenges..."
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

        {/* Dual Actions: Submit Brief or (Qualified) Calendly direct booking */}
        <div className="space-y-4 pt-2">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full gap-2 font-medium h-12 text-sm"
          >
            <span>Transmit Project Specification</span>
            <Send className="h-4 w-4" />
          </Button>

          {/* Conditional Cal.com booking branch */}
          {isCalEligible && (
            <div className="space-y-3 pt-2">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[var(--border)]"></div>
                <span className="flex-shrink mx-4 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                  Or Skip The Form
                </span>
                <div className="flex-grow border-t border-[var(--border)]"></div>
              </div>

              {!showCalBooking ? (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setShowCalBooking(true)}
                  className="w-full gap-2 border-[var(--border-strong)] text-[var(--fg)] hover:bg-[var(--surface-hover)] font-medium h-12 text-sm"
                >
                  <Calendar className="h-4 w-4 text-[var(--signal)]" />
                  <span>Or skip the form and book a call directly</span>
                </Button>
              ) : (
                <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--fg)]">
                      <Calendar className="h-4 w-4 text-[var(--signal)]" />
                      <span>Direct Discovery Booking</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCalBooking(false)}
                      className="text-xs h-7 text-[var(--fg-muted)]"
                    >
                      Hide Calendar
                    </Button>
                  </div>

                  <p className="text-xs text-[var(--fg-muted)]">
                    Schedule a direct 20-minute architecture scoping call with our senior technical leads. Your intake answers will automatically pre-populate the session.
                  </p>

                  <div
                    id="cal-embed-container"
                    className="w-full min-h-[450px] rounded border border-[var(--border)] overflow-hidden bg-white dark:bg-[var(--bg)]"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center text-[11px] font-mono text-[var(--fg-muted)] pt-1">
            <span>RESPONSE WITHIN 12 HOURS</span>
            <span>STRICT CONFIDENTIALITY</span>
          </div>
        </div>
      </form>
    </div>
  );
}
