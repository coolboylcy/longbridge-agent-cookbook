"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "./utils";

/**
 * Try to launch Claude Code Desktop via OS-level URL handler.
 * The Anthropic Desktop app registers protocol handlers for OAuth flows;
 * even when the prompt-prefill schema is unsupported, firing the scheme
 * brings the app to the foreground. Silent fail if app is not installed.
 *
 * We use a hidden iframe so the current page never navigates away — the
 * browser shows no error if the protocol is unregistered.
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

export function PromptCard({
  prompt,
  label,
  openInClaudeLabel,
  copyLabel,
  copiedLabel,
  className,
}: {
  prompt: string;
  label: string;
  openInClaudeLabel: string;
  copyLabel: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInClaude = async () => {
    await navigator.clipboard.writeText(prompt);
    launchClaudeDesktop(prompt);
    setOpened(true);
    setTimeout(() => setOpened(false), 2500);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--color-lb-border)] px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-lb-muted)]">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleOpenInClaude}
            className="flex items-center gap-1.5 rounded-sm bg-[var(--color-lb-green-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--color-lb-green)] transition-colors hover:bg-[var(--color-lb-green)]/20"
            aria-label={openInClaudeLabel}
          >
            {opened ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M4 4h4v2H6v12h12v-2h2v4H4V4zm6 0h10v10h-2V7.4l-7.3 7.3-1.4-1.4L16.6 6H10V4z" />
              </svg>
            )}
            <span>{openInClaudeLabel}</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-[var(--color-lb-muted)] transition-colors hover:text-[var(--color-lb-text)]"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[var(--color-lb-green)]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? copiedLabel : copyLabel}</span>
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-[var(--color-lb-text)] whitespace-pre-wrap">
        {prompt}
      </pre>
    </div>
  );
}
