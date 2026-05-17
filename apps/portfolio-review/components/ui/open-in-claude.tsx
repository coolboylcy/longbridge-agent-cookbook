"use client";
import { useState } from "react";
import { cn } from "./utils";

/**
 * Shared helper for the hero / sidebar primary CTA.
 * Copies prompt to clipboard and tries to launch Claude Desktop via
 * the OS-level URL handler. Silent fail if app isn't installed.
 */
function launchClaudeDesktop(prompt: string) {
  if (typeof window === "undefined") return;
  const candidates = [
    `claude://new?prompt=${encodeURIComponent(prompt)}`,
    "claude://",
  ];
  for (const url of candidates) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 1500);
  }
}

export function OpenInClaudeButton({
  prompt,
  label,
  copiedLabel,
  className,
  variant = "primary",
}: {
  prompt: string;
  label: string;
  copiedLabel: string;
  className?: string;
  variant?: "primary" | "block";
}) {
  const [done, setDone] = useState(false);
  const handle = async () => {
    await navigator.clipboard.writeText(prompt);
    launchClaudeDesktop(prompt);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };
  const baseClass =
    variant === "block"
      ? "flex items-center justify-center gap-2 rounded-md bg-[var(--color-lb-green)] px-3 py-2.5 text-sm font-bold text-[var(--color-lb-bg)] transition-colors hover:bg-[var(--color-lb-green-dim)]"
      : "inline-flex items-center gap-2 rounded-md bg-[var(--color-lb-green)] px-4 py-2.5 text-sm font-bold text-[var(--color-lb-bg)] transition-colors hover:bg-[var(--color-lb-green-dim)]";
  return (
    <button onClick={handle} className={cn(baseClass, className)}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M4 4h4v2H6v12h12v-2h2v4H4V4zm6 0h10v10h-2V7.4l-7.3 7.3-1.4-1.4L16.6 6H10V4z" />
      </svg>
      <span>{done ? copiedLabel : label}</span>
    </button>
  );
}
