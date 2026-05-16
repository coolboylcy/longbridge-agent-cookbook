import { cn } from "./utils";

export function WalkthroughStep({
  step,
  tool,
  description,
  noToolCall,
  isLast,
  className,
}: {
  step: number;
  tool: string;
  description: string;
  noToolCall?: boolean | undefined;
  isLast?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={cn("flex gap-5", className)}>
      <div className="flex flex-col items-center">
        <span className="font-mono text-[11px] text-[var(--color-lb-muted)]">
          {String(step).padStart(2, "0")}
        </span>
        {!isLast && (
          <div className="mt-2 min-h-[28px] w-px flex-1 bg-[var(--color-lb-border)]" />
        )}
      </div>
      <div className={cn("min-w-0 pb-7", isLast && "pb-0")}>
        {noToolCall ? (
          <p className="text-sm italic text-[var(--color-lb-muted)]">{tool}</p>
        ) : (
          <code className="font-mono text-sm text-[var(--color-lb-green)]">
            {tool}
          </code>
        )}
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-lb-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}
