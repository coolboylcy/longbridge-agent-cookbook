import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@cookbook/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Earnings Monitor — Longbridge Agent Cookbook",
  description:
    "An AI agent that watches your Longbridge watchlist for upcoming earnings and delivers a 24h pre-brief plus a 1h post-recap.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[var(--color-lb-bg)]">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
