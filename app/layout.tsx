import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hopfield Labs — Software & AI Studio",
  description:
    "Engineering high-performance web, mobile, and production-grade AI systems for startups, SMEs, and academic capstones.",
  metadataBase: new URL("https://hopfieldlabs.com"),
  keywords: [
    "Hopfield Labs",
    "Software Studio",
    "AI Agency",
    "Web Development",
    "Mobile Development",
    "GenAI Integration",
    "RAG",
    "Final Year Projects",
    "Machine Learning",
  ],
  openGraph: {
    title: "Hopfield Labs — Software & AI Studio",
    description:
      "Engineering high-performance web, mobile, and production-grade AI systems.",
    type: "website",
    url: "https://hopfieldlabs.com",
    siteName: "Hopfield Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hopfield Labs — Software & AI Studio",
    description:
      "Engineering high-performance web, mobile, and production-grade AI systems.",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hopfield Labs",
  url: "https://hopfieldlabs.com",
  logo: "https://hopfieldlabs.com/logo.png",
  description:
    "Software & AI studio engineering modern web platforms, native mobile applications, and production-grade GenAI integrations.",
  sameAs: [
    "https://github.com/Rival5555/hopfield_labs",
    "https://linkedin.com",
    "https://x.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "contact@hopfieldlabs.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg)] text-[var(--fg)] min-h-dvh selection:bg-[var(--accent)] selection:text-white flex flex-col`}
      >
        <ScrollRestoration />
        <div className="fixed inset-0 pointer-events-none noise-overlay z-50 opacity-40" />
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
