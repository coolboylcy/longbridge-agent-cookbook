import { cn } from "./utils";

export function WalkthroughStep({ step, tool, description, noToolCall, isLast, className }: { step: number; tool: string; description: string; noToolCall?: boolean | undefined; isLast?: boolean | undefined; className?: string | undefined }) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="flex flex-col items-center">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-lb-border)] bg-[var(--color-lb-surface-2)] font-mono text-xs font-semibold text-[var(--color-lb-green)]">{step}</span>
        {!isLast && <div className="mt-1 min-h-[24px] w-px flex-1 bg-[var(--color-lb-border)]" />}
      </div>
      <div className={cn("min-w-0 pb-6", isLast && "pb-0")}>
        {noToolCall ? (
          <p className="text-sm font-semibold italic text-[var(--color-lb-muted)]">{tool}</p>
        ) : (
          <code className="font-mono text-sm font-semibold text-[var(--color-lb-green)]">{tool}</code>
        )}
        <p className="mt-1 text-sm text-[var(--color-lb-muted)]">{description}</p>
      </div>
    </div>
  );
}
