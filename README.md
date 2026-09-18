# Hopfield Labs

Software and AI studio engineering modern web platforms, native mobile applications, and production GenAI integrations.

[![License: Private](https://img.shields.io/badge/license-Private-red.svg)](#license)

---

## Overview

Hopfield Labs is the client-facing web application and lead-generation portal for an engineering studio specializing in full-stack web, mobile, applied AI/ML, and academic capstone builds. It presents the studio's technical capabilities, selected client case studies, and engineering lifecycle to prospective startup founders, SMEs, and researchers. The platform features an interactive streamed GenAI concierge demo and a validated contact intake pipeline that routes inquiries to a database and notification queue.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| Framework | Next.js (App Router) | 15.2.1 | Server-side rendering, static generation, Server Actions, and Route Handlers |
| Core Library | React / React DOM | 19.0.0 | Component rendering, concurrent UI transitions, and hooks |
| Language | TypeScript | 5.8.2 | Strict static typing across entire application codebase |
| Styling | Tailwind CSS | 4.0.12 | Utility-first CSS using CSS variable design tokens |
| PostCSS | PostCSS | 8.5.3 | CSS transformation and Tailwind integration |
| Animation | Framer Motion | 12.4.7 | Micro-interactions, layout transitions, and interactive UI states |
| UI Primitives | Radix UI | 1.2.3 / 1.1.6 | Accessible headless components (Accordion, Dialog, Sheet, Slot) |
| Iconography | Lucide React | 0.479.0 | Technical vector iconography |
| Form State | React Hook Form | 7.54.2 | Uncontrolled form state management and error tracking |
| Validation | Zod | 3.24.2 | Runtime schema validation for forms and server actions |
| Form Resolvers | @hookform/resolvers | 4.1.3 | Bridge between React Hook Form and Zod validation |
| Database Client | @supabase/supabase-js | 2.116.0 | PostgreSQL database interface for lead recording via service role |
| Email Service | Resend | 6.28.1 | Transactional email notifications for inbound inquiries |
| Asset Pipeline | Sharp | 0.35.4 | Vector rasterization for favicons, touch icons, and social graphics |
| Class Utilities | clsx / tailwind-merge | 2.1.1 / 3.0.2 | Conditional class combining and Tailwind rule conflict resolution |

---

## Project Structure

```text
hopfield-labs/
├── app/                      # Next.js App Router routes, layouts, server actions, and API endpoints
│   ├── about/                # Studio philosophy, background, and team page
│   ├── actions/              # Next.js Server Actions (e.g. contact lead submission)
│   ├── api/                  # Route Handlers (e.g. /api/demo-chat token stream)
│   ├── contact/              # Dedicated contact and inquiry form page
│   ├── services/             # Services catalog and detailed technical capabilities
│   ├── styleguide/           # Interactive design system token and primitive showcase
│   ├── work/                 # Selected case studies and project portfolio
│   ├── globals.css           # Design tokens, CSS variables, and base Tailwind styles
│   ├── layout.tsx            # Root layout, JSON-LD Organization schema, navigation shell
│   ├── page.tsx              # Studio landing page (top-to-bottom bento sections)
│   ├── robots.ts             # Search engine crawling directives
│   └── sitemap.ts            # Dynamic XML sitemap index generation
├── brand/                    # Production vector logo system and identity specifications
│   ├── explorations/         # Historical exploratory SVGs (Attractor, Basin, Recurrent H)
│   ├── apple-touch-icon.png  # 180x180 px iOS home screen icon with safe margins
│   ├── favicon.ico           # Multi-size (16/32/48) Windows icon container
│   ├── favicon.svg           # 32x32 px browser favicon with calibrated margins
│   ├── logo-lockup-horizontal.svg # Baseline-aligned mark and wordmark SVG
│   ├── logo-lockup-stacked.svg    # Centered mark above wordmark SVG
│   ├── logo-mark.svg         # Primary 48x48 mark inheriting currentColor
│   ├── logo-mark-mono.svg    # Single-path simplified mark for small/mono scales
│   ├── logo-wordmark.svg     # Live text wordmark (Geist Mono uppercase)
│   ├── logo-wordmark-outlined.svg # Outlined vector wordmark (zero font dependency)
│   ├── og-image.png          # 1200x630 px OpenGraph social media preview card
│   └── README.md             # Brand usage rules, clear space, and misuse constraints
├── components/               # React components and modular UI building blocks
│   ├── sections/             # Modular landing page sections (Hero, Bento, Contact, etc.)
│   ├── ui/                   # Reusable UI primitives (Button, Card, Badge, Input, Sheet)
│   ├── contact-form.tsx      # Client-side form with React Hook Form + Zod
│   ├── footer.tsx            # 5-column technical studio footer with logo integration
│   ├── Logo.tsx              # Typed SVG Logo component (mark, horizontal, stacked, wordmark)
│   ├── navbar.tsx            # Sticky desktop and mobile responsive navigation shell
│   └── theme-toggle.tsx      # Dark / light theme toggle switch
├── lib/                      # Core business logic, schemas, and shared utilities
│   ├── schemas.ts            # Zod validation schemas and TypeScript types for inquiries
│   └── utils.ts              # cn() class merging utility (clsx + tailwind-merge)
├── preview/                  # Standalone vector logo verification suite and rubric
│   └── index.html            # Testbench testing all directions across scales, blurs, inversions
├── public/                   # Static web assets served directly by Next.js
│   ├── brand/                # Publicly accessible mirrors of brand deliverables
│   ├── apple-touch-icon.png  # Root public copy for Apple mobile devices
│   ├── favicon.ico           # Root public favicon for browser tabs
│   ├── favicon.svg           # Vector favicon
│   └── og-image.png          # OpenGraph image metadata asset
├── scripts/                  # Node.js automation scripts
│   ├── generate-brand-assets.js # Script generating favicon.ico, Apple icon, and OG image
│   └── test-render.js        # Scratch script for validating vector rasterization
├── .gitignore                # Git ignore rules for Next.js, Node, and environment files
├── next.config.ts            # Next.js compiler and runtime configuration
├── package.json              # Project dependencies, metadata, and runnable scripts
├── postcss.config.mjs        # PostCSS configuration for Tailwind CSS v4
└── tsconfig.json             # TypeScript compiler options (strict mode, path aliases)
```

---

## Getting Started

### Prerequisites
* **Node.js**: `v18.18.0` or higher (verified on Node `v22.15.0`)
* **Package Manager**: `npm` (uses `package-lock.json`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rival5555/hopfield_labs.git
   cd hopfield_labs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env.local` and populate the values:
   ```bash
   cp .env.example .env.local
   ```

   | Variable | Required | Description |
   | :--- | :--- | :--- |
   | `SUPABASE_URL` | Yes | URL of your Supabase project instance |
   | `NEXT_PUBLIC_SUPABASE_URL` | Yes | Alternative public fallback URL for Supabase instance |
   | `SUPABASE_SERVICE_ROLE_KEY` | Yes | Secret service role key used to bypass RLS for server-side lead inserts |
   | `RESEND_API_KEY` | No | API key from Resend for sending email alerts upon inquiry submission |
   | `NOTIFICATION_EMAIL` | No | Destination email address for inbound alerts (defaults to `contact@hopfieldlabs.com`) |

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase Setup

The contact intake pipeline in `app/actions/contact.ts` inserts incoming leads into a PostgreSQL table named `leads`. 

### Security & Row Level Security (RLS)
Anonymous public writes (`anon` role) are rejected by RLS. Form submissions run strictly through the Next.js Server Action using `SUPABASE_SERVICE_ROLE_KEY`, which automatically bypasses RLS on the server while preventing unauthorized client-side database access.

### Database Schema
Run the following SQL in your Supabase SQL Editor:

```sql
-- Create or extend the leads table
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text not null,
  stage text,
  budget text not null,
  message text not null,
  heard_from text,
  link_url text,
  attachment_paths text[] default '{}'::text[],
  estimate_shown_low integer,
  estimate_shown_high integer,
  source text default 'website_contact_form',
  ip_hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- Deny all public access (Server Action uses service_role key to bypass)
create policy "Deny public access" on public.leads
  for all
  to anon, authenticated
  using (false);

-- Create the intake_drafts table for save-and-resume functionality
create table if not exists public.intake_drafts (
  token text primary key,
  payload jsonb not null,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on drafts
alter table public.intake_drafts enable row level security;

create policy "Deny public access on intake_drafts" on public.intake_drafts
  for all
  to anon, authenticated
  using (false);
```

### Storage Bucket Configuration (`intake-attachments`)
Uploads are sent directly to Supabase Storage via signed upload URLs generated in `app/actions/intake.ts`.
- **Bucket**: `intake-attachments` (Private)
- **Max file size**: 10MB per file (max 3 files)
- **Allowed MIME types**: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `image/png`, `image/jpeg`
- **Read policy**: Restricted to service role signed URLs. Public read is disabled.

---

## Available Scripts

The following scripts are configured in `package.json`:

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev` | Starts the Next.js development server with hot module replacement at `localhost:3000`. |
| `build` | `next build` | Compiles the production build, checks types, and generates static route pages. |
| `start` | `next start` | Runs the production server using the compiled output from `.next`. |
| `lint` | `next lint` | Analyzes code for stylistic errors and Next.js best practices via ESLint. |

---

## Content Model

Service offerings and case studies are structured as type-safe data objects:

### Services (`app/services/page.tsx` & `components/sections/services-section.tsx`)
Each service defines:
* `slug`: Unique identifier matching URL route (e.g. `web-development`, `genai-integration`)
* `title`: Full capability title
* `eyebrow`: Technical stack descriptor
* `icon`: Lucide icon component
* `description`: Concise summary of the offering
* `capabilities`: Array of bulleted deliverables
* `timeline`: Estimated delivery window (e.g. `4-6 weeks`)
* `startingFrom`: Minimum project scope price

### Case Studies (`app/work/page.tsx` & `components/sections/selected-work-section.tsx`)
Each case study defines:
* `title`: Project name and domain classification
* `client`: Client or project name
* `eyebrow`: Domain and specialty tag
* `metric`: Highlighted quantitative outcome (e.g. `-68% TRIAGE LATENCY`)
* `description`: Architecture breakdown and project summary
* `tags`: Technology tags
* `architecture`: Core stack components list

---

## Deployment

The application is deployed on Vercel:

1. Import the repository into the Vercel Dashboard.
2. Select the **Next.js** framework preset (build command `npm run build`, output `.next`).
3. Add the production environment variables in **Project Settings -> Environment Variables**:
   * `SUPABASE_URL`
   * `SUPABASE_SERVICE_ROLE_KEY`
   * `RESEND_API_KEY` (optional)
   * `NOTIFICATION_EMAIL` (optional)
4. Trigger deployment from the `main` branch.

---

## Contributing

This repository is an internal project for Hopfield Labs studio development. External pull requests are not currently accepted.

---

## License

Private / Proprietary. All rights reserved by Hopfield Labs.