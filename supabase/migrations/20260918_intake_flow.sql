-- ==============================================================================
-- Hopfield Labs Intake Flow Migration: Leads Extensions, Drafts & Storage
-- ==============================================================================

-- 1. Extend the public.leads table with intake flow columns
ALTER TABLE public.leads 
  ADD COLUMN IF NOT EXISTS stage text,
  ADD COLUMN IF NOT EXISTS heard_from text,
  ADD COLUMN IF NOT EXISTS attachment_paths text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS link_url text,
  ADD COLUMN IF NOT EXISTS estimate_shown_low integer,
  ADD COLUMN IF NOT EXISTS estimate_shown_high integer,
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'start_flow';

-- Comment on leads table columns
COMMENT ON COLUMN public.leads.stage IS 'Client organization stage: solo-founder, funded-startup, agency-business, university-student';
COMMENT ON COLUMN public.leads.heard_from IS 'Attribution source: google, instagram, linkedin, referral, university, other';
COMMENT ON COLUMN public.leads.attachment_paths IS 'Array of Supabase Storage paths in intake-attachments bucket';
COMMENT ON COLUMN public.leads.link_url IS 'External link provided by lead (Figma, GitHub, or Proposal doc)';
COMMENT ON COLUMN public.leads.estimate_shown_low IS 'Ballpark estimate lower bound presented to the user';
COMMENT ON COLUMN public.leads.estimate_shown_high IS 'Ballpark estimate upper bound presented to the user';

-- 2. Create the intake_drafts table for save-and-resume functionality
CREATE TABLE IF NOT EXISTS public.intake_drafts (
  token text PRIMARY KEY,
  payload jsonb NOT NULL,
  email text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for expiring old drafts (> 14 days)
CREATE INDEX IF NOT EXISTS idx_intake_drafts_created_at ON public.intake_drafts (created_at);

-- Enable Row Level Security (RLS) on intake_drafts
ALTER TABLE public.intake_drafts ENABLE ROW LEVEL SECURITY;

-- Deny all public access to drafts (Only Server Actions with SUPABASE_SERVICE_ROLE_KEY access it)
DROP POLICY IF EXISTS "Deny public access on intake_drafts" ON public.intake_drafts;
CREATE POLICY "Deny public access on intake_drafts" ON public.intake_drafts
  FOR ALL
  TO anon, authenticated
  USING (false);

-- 3. Storage Bucket Configuration: intake-attachments
-- Run this in Supabase SQL editor if using Supabase Storage
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'intake-attachments',
  'intake-attachments',
  false,
  10485760, -- 10MB limit per file
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg'
  ];

-- Storage RLS: Deny public reads (attachments viewable only via service role signed URLs)
DROP POLICY IF EXISTS "Private bucket no public select" ON storage.objects;
CREATE POLICY "Private bucket no public select" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id <> 'intake-attachments');
