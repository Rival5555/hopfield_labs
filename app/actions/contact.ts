"use server";

import { headers } from "next/headers";
import { contactSchema, ContactActionResult } from "@/lib/schemas";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// In-memory rate limit store: 3 submissions per IP per 1 hour
const submissionLimits = new Map<string, { count: number; expiresAt: number }>();

export async function submitContactLead(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  try {
    // 1. IP Rate Limiting
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "anonymous-client";

    const now = Date.now();
    const existing = submissionLimits.get(ip);

    if (existing && existing.expiresAt > now) {
      if (existing.count >= 3) {
        return {
          ok: false,
          error:
            "Rate limit exceeded (maximum 3 inquiries per hour). If urgent, reach us directly at contact@hopfieldlabs.com.",
        };
      }
      existing.count += 1;
    } else {
      submissionLimits.set(ip, { count: 1, expiresAt: now + 60 * 60 * 1000 });
    }

    // 2. Parse and validate form fields
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company") || undefined,
      service: formData.get("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      company_url: formData.get("company_url") || "",
    };

    const parsed = contactSchema.safeParse(rawData);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return { ok: false, error: firstError };
    }

    const { name, email, company, service, budget, message, company_url } =
      parsed.data;

    // 3. Honeypot check
    if (company_url && company_url.length > 0) {
      // Quiet rejection for bots
      return { ok: false, error: "Automated submission rejected." };
    }

    // 4. Supabase insertion (via service role)
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
      });

      const { error: dbError } = await supabase.from("leads").insert([
        {
          name,
          email,
          company: company || null,
          service,
          budget,
          message,
          source: "website_contact_form",
          ip_hash: ip,
        },
      ]);

      if (dbError) {
        console.error("Supabase lead insertion error:", dbError);
      }
    } else {
      console.warn("Supabase credentials not configured in environment; lead recorded locally.");
    }

    // 5. Resend Notification Email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Hopfield Leads <leads@hopfieldlabs.com>",
        to: process.env.NOTIFICATION_EMAIL || "contact@hopfieldlabs.com",
        subject: `New Lead: ${name} (${service})`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nService: ${service}\nBudget: ${budget}\n\nMessage:\n${message}`,
      });
    }

    return {
      ok: true,
      message:
        "Your project parameters have been transmitted to our engineering team. We will review feasibility and respond within 12 hours.",
    };
  } catch (err: unknown) {
    console.error("Server Action Exception:", err);
    return {
      ok: false,
      error:
        "Unable to submit inquiry due to an internal error. Please contact contact@hopfieldlabs.com directly.",
    };
  }
}
