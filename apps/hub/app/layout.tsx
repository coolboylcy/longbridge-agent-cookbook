import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@cookbook/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Longbridge Agent Cookbook",
  description:
    "Runnable AI agent recipes for Longbridge MCP. Drop into Claude Code, Cursor, or Codex and your agent gets broker hands.",
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
