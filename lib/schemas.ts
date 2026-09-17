import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please provide a valid email address"),
  company: z.string().max(100).optional(),
  service: z.enum(
    [
      "web-development",
      "mobile-development",
      "genai-integration",
      "aiml-solutions",
      "fyp-mentoring",
      "something-else",
    ],
    {
      errorMap: () => ({ message: "Please select a valid service area" }),
    }
  ),
  budget: z.enum(
    [
      "under-3k",
      "3k-6k",
      "6k-12k",
      "12k-plus",
      "undecided",
    ],
    {
      errorMap: () => ({ message: "Please select an estimated budget range" }),
    }
  ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1200, "Message cannot exceed 1200 characters"),
  // Honeypot field - must remain empty
  company_url: z.string().max(0, "Invalid submission detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string };
