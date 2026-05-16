import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const TITLE = "Earnings Monitor — Longbridge Agent Cookbook";
const DESCRIPTION =
  "Get a 24-hour pre-brief on every stock in your watchlist that reports tomorrow. AI does it. No coding.";
const SITE_URL = "https://earnings-monitor-ochre.vercel.app";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Longbridge Agent Cookbook",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[var(--color-lb-bg)]">
        <main>{children}</main>
      </body>
    </html>
  );
}
