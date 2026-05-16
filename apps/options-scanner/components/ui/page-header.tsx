import type { ReactNode } from "react";
import { cn } from "./utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  badges,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  badges?: string[];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("px-6 pt-16 pb-12", className)}>
      <div className="mx-auto max-w-2xl">
        {eyebrow && (
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-lb-green)]">
            {eyebrow}
          </div>
        )}
        <h1 className="text-[44px] font-bold leading-[1.05] tracking-tight text-[var(--color-lb-text)]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-lb-muted)]">
            {description}
          </p>
        )}
        {badges && badges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-[var(--color-lb-border)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-lb-muted)]"
              >
                {b}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
