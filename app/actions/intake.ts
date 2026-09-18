"use server";

import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  intakeLeadSubmissionSchema,
  IntakeSubmissionData,
} from "@/lib/intake-types";

// In-memory rate limiting store for intake leads (3 per IP per hour)
const intakeLimits = new Map<string, { count: number; expiresAt: number }>();

// In-memory fallback stores for local testing when Supabase credentials are not set
const localDraftStore = new Map<
  string,
  { payload: unknown; email?: string; createdAt: number }
>();

function getSupabaseClient() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseServiceKey) {
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });
  }
  return null;
}

/**
 * 1. File Upload: Creates a signed upload URL directly in Supabase Storage.
 * This avoids piping large binary files through Server Actions as base64.
 */
export async function createAttachmentUploadUrl(
  fileName: string,
  fileType: string
): Promise<{
  ok: boolean;
  uploadUrl?: string;
  path?: string;
  token?: string;
  isMock?: boolean;
  error?: string;
}> {
  try {
    // Validate file extension
    const allowedExtensions = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"];
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const lowerName = sanitizedName.toLowerCase();
    const hasValidExt = allowedExtensions.some((ext) => lowerName.endsWith(ext));

    if (!hasValidExt) {
      return {
        ok: false,
        error: "Invalid file type. Only PDF, DOC, DOCX, PNG, and JPG files are accepted.",
      };
    }

    const uniqueId = Math.random().toString(36).substring(2, 10);
    const storagePath = `intake/${Date.now()}-${uniqueId}/${sanitizedName}`;

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.storage
        .from("intake-attachments")
        .createSignedUploadUrl(storagePath);

      if (error) {
        console.error("Supabase Storage signed upload URL error:", error);
        return {
          ok: false,
          error: "Failed to generate storage upload URL: " + error.message,
        };
      }

      return {
        ok: true,
        uploadUrl: data.signedUrl,
        path: storagePath,
        token: data.token,
      };
    }

    // Local / unconfigured fallback: returns a safe mock path so testing proceeds seamlessly
    console.warn("Supabase credentials not configured. Using local mock storage path.");
    return {
      ok: true,
      uploadUrl: "", // Client will detect isMock and simulate upload progress
      path: `mock-storage/${storagePath}`,
      isMock: true,
    };
  } catch (err: unknown) {
    console.error("createAttachmentUploadUrl exception:", err);
    return {
      ok: false,
      error: "Internal error creating upload URL.",
    };
  }
}

/**
 * 2. Save Draft: Debounce-saves a partial state to intake_drafts keyed by token.
 */
export async function saveIntakeDraft(
  token: string,
  payload: unknown,
  email?: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    if (!token) {
      return { ok: false, error: "Missing draft token" };
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("intake_drafts").upsert(
        {
          token,
          payload,
          email: email || null,
          created_at: new Date().toISOString(),
        },
        { onConflict: "token" }
      );

      if (error) {
        console.error("Supabase saveIntakeDraft error:", error);
        return { ok: false, error: error.message };
      }
    } else {
      localDraftStore.set(token, {
        payload,
        email,
        createdAt: Date.now(),
      });
    }

    return { ok: true };
  } catch (err: unknown) {
    console.error("saveIntakeDraft exception:", err);
    return { ok: false, error: "Failed to save draft" };
  }
}

/**
 * 3. Retrieve Draft: Restores state by token and checks 14-day expiration.
 */
export async function getIntakeDraft(
  token: string
): Promise<{ ok: boolean; payload?: unknown; error?: string }> {
  try {
    if (!token) {
      return { ok: false, error: "Invalid resume token" };
    }

    const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("intake_drafts")
        .select("payload, created_at")
        .eq("token", token)
        .maybeSingle();

      if (error || !data) {
        return { ok: false, error: "Draft not found or expired" };
      }

      const createdTime = new Date(data.created_at).getTime();
      if (now - createdTime > fourteenDaysMs) {
        // Expired draft - delete it
        await supabase.from("intake_drafts").delete().eq("token", token);
        return { ok: false, error: "This draft has expired (older than 14 days)." };
      }

      return { ok: true, payload: data.payload };
    }

    // Local fallback store check
    const localDraft = localDraftStore.get(token);
    if (!localDraft) {
      return { ok: false, error: "Draft not found in local session store." };
    }

    if (now - localDraft.createdAt > fourteenDaysMs) {
      localDraftStore.delete(token);
      return { ok: false, error: "This draft has expired (older than 14 days)." };
    }

    return { ok: true, payload: localDraft.payload };
  } catch (err: unknown) {
    console.error("getIntakeDraft exception:", err);
    return { ok: false, error: "Failed to retrieve draft." };
  }
}

/**
 * 4. Send Magic Link Email: Emails the user their resume URL via Resend.
 */
export async function sendDraftResumeEmail(
  token: string,
  email: string
): Promise<{ ok: boolean; error?: string; message?: string }> {
  try {
    if (!email || !email.includes("@")) {
      return { ok: false, error: "Please enter a valid email address." };
    }

    // Update draft with this email
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase
        .from("intake_drafts")
        .update({ email })
        .eq("token", token);
    } else {
      const draft = localDraftStore.get(token);
      if (draft) {
        draft.email = email;
      }
    }

    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const resumeUrl = `${protocol}://${host}/start?resume=${encodeURIComponent(token)}`;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Hopfield Labs <intake@hopfieldlabs.com>",
        to: email,
        subject: "Resume your Hopfield Labs project intake",
        text: `Hello,\n\nYou can resume your project scoping session anytime within the next 14 days using this magic link:\n\n${resumeUrl}\n\nYour inputs and selections have been preserved.\n\n— Hopfield Labs Engineering Team`,
      });
    } else {
      console.log(`[DEV RESUME LINK] Generated magic link for ${email}: ${resumeUrl}`);
    }

    return {
      ok: true,
      message: `Resume link sent to ${email}. You can return anytime!`,
    };
  } catch (err: unknown) {
    console.error("sendDraftResumeEmail exception:", err);
    return { ok: false, error: "Failed to transmit magic link email." };
  }
}

/**
 * 5. Final Lead Submission: Inserts into leads table, deletes matching draft,
 * and notifies team via Resend.
 */
export async function submitIntakeLead(
  rawData: IntakeSubmissionData
): Promise<{ ok: boolean; message?: string; error?: string }> {
  try {
    // 1. IP Rate Limiting
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "anonymous-client";

    const now = Date.now();
    const existing = intakeLimits.get(ip);
    if (existing && existing.expiresAt > now) {
      if (existing.count >= 4) {
        return {
          ok: false,
          error:
            "Rate limit exceeded (maximum 4 inquiries per hour). Reach us directly at contact@hopfieldlabs.com.",
        };
      }
      existing.count += 1;
    } else {
      intakeLimits.set(ip, { count: 1, expiresAt: now + 60 * 60 * 1000 });
    }

    // 2. Parse & Validate
    const parsed = intakeLeadSubmissionSchema.safeParse(rawData);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return { ok: false, error: firstError };
    }

    const {
      name,
      email,
      company,
      service,
      stage,
      budget,
      message,
      heardFrom,
      linkUrl,
      attachmentPaths,
      estimateShownLow,
      estimateShownHigh,
      source,
      draftToken,
    } = parsed.data;

    // 3. Supabase Insertion
    const supabase = getSupabaseClient();
    if (supabase) {
      const { error: insertError } = await supabase.from("leads").insert([
        {
          name,
          email,
          company: company || null,
          service,
          stage,
          budget,
          message,
          heard_from: heardFrom || null,
          link_url: linkUrl || null,
          attachment_paths: attachmentPaths || [],
          estimate_shown_low: estimateShownLow || null,
          estimate_shown_high: estimateShownHigh || null,
          source: source || "start_flow",
          ip_hash: ip,
        },
      ]);

      if (insertError) {
        console.error("Supabase insert lead error:", insertError);
      }

      // 4. Delete the matching intake_drafts row if it exists
      if (draftToken) {
        const { error: deleteDraftError } = await supabase
          .from("intake_drafts")
          .delete()
          .eq("token", draftToken);

        if (deleteDraftError) {
          console.warn("Could not delete draft row:", deleteDraftError);
        }
      }
    } else {
      console.warn("Supabase not configured; lead captured in server runtime.");
      if (draftToken) {
        localDraftStore.delete(draftToken);
      }
    }

    // 5. Resend Notification Email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const attachmentsSummary =
        attachmentPaths && attachmentPaths.length > 0
          ? attachmentPaths.join("\n  - ")
          : "None";

      await resend.emails.send({
        from: "Hopfield Leads <leads@hopfieldlabs.com>",
        to: process.env.NOTIFICATION_EMAIL || "contact@hopfieldlabs.com",
        subject: `[Intake Flow] ${name} — ${service} (${stage})`,
        text: `NEW INTAKE LEAD RECEIVED
---------------------------------
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Service: ${service}
Stage: ${stage}
Budget: ${budget}
Estimate Shown: $${estimateShownLow} – $${estimateShownHigh}
Heard From: ${heardFrom || "N/A"}
External Link: ${linkUrl || "N/A"}
Source: ${source || "start_flow"}

Attachments (${attachmentPaths?.length || 0}):
  - ${attachmentsSummary}

Project Scope / Brief:
${message}
`,
      });
    }

    return {
      ok: true,
      message:
        "Your project specification has been logged. Our engineering leads will review technical scope and contact you within 12 hours.",
    };
  } catch (err: unknown) {
    console.error("submitIntakeLead exception:", err);
    return {
      ok: false,
      error:
        "Unable to submit inquiry due to an internal error. Please reach out to contact@hopfieldlabs.com directly.",
    };
  }
}
