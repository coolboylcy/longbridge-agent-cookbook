import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@cookbook/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Review — Longbridge Agent Cookbook",
  description:
    "Agent ingests your paper-trading positions and writes a weekly review with 3 key observations and 3 follow-up questions.",
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
