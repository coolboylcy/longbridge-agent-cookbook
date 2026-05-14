import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@cookbook/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Options Scanner — Longbridge Agent Cookbook",
  description:
    "AI agent options scanner for high-IV-rank covered calls on your Longbridge watchlist.",
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
