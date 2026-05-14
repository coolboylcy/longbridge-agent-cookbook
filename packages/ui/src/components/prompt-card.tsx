"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../lib/utils";

export interface PromptCardProps {
  prompt: string;
  label?: string;
  className?: string;
}

export function PromptCard({ prompt, label = "prompt", className }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--color-lb-border)] px-4 py-2">
        <span className="font-mono text-xs text-[var(--color-lb-muted)]">{label}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--color-lb-muted)] transition-colors hover:text-[var(--color-lb-text)]"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-[var(--color-lb-green)]" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-[var(--color-lb-text)] whitespace-pre-wrap">
        {prompt}
      </pre>
    </div>
  );
}
