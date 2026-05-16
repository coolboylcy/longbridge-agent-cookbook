import { cn } from "./utils";
import type { RecipeCard } from "../../content/types";

export function AppCard({
  title,
  description,
  href,
  statusLabel,
  className,
}: RecipeCard & { className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col gap-4 rounded-md border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-5 transition-colors hover:border-[var(--color-lb-border-strong,#2a3a52)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-[var(--color-lb-text)] transition-colors group-hover:text-[var(--color-lb-green)]">
          {title}
        </h3>
        <span className="rounded-full border border-[var(--color-lb-green)]/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-lb-green)]">
          {statusLabel}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-lb-muted)]">
        {description}
      </p>
      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-[var(--color-lb-muted)] transition-colors group-hover:text-[var(--color-lb-green)]">
        <span>Open</span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </a>
  );
}
