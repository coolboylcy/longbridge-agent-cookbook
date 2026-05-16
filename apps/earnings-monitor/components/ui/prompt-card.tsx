"use client";
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { cn } from "./utils";

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
  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
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
          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-[var(--color-lb-muted)] transition-colors hover:text-[var(--color-lb-text)]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>{openInClaudeLabel}</span>
          </a>
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
