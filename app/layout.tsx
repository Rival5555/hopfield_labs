import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  openGraph: {
    title: "Hopfield Labs — Software & AI Studio",
    description:
      "Engineering high-performance web, mobile, and production-grade AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg)] text-[var(--fg)] min-h-screen selection:bg-[var(--accent)] selection:text-white`}
      >
        <div className="fixed inset-0 pointer-events-none noise-overlay z-50 opacity-40" />
        {children}
      </body>
    </html>
  );
}
