import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const TITLE = "Longbridge Agent Cookbook";
const DESCRIPTION =
  "Runnable AI agent recipes for Longbridge. Paste into Claude, Cursor, or Codex — your agent gets broker hands. No coding required.";
const SITE_URL = "https://longbridge-cookbook-hub.vercel.app";

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
