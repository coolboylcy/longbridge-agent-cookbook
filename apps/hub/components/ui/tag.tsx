import type { TagColor } from "../../content/types";
import { cn } from "./utils";

const STYLE: Record<TagColor, string> = {
  green: "bg-[var(--color-tag-teal-bg)] text-[var(--color-tag-teal)]",
  blue: "bg-[var(--color-tag-blue-bg)] text-[var(--color-tag-blue)]",
  purple: "bg-[var(--color-tag-purple-bg)] text-[var(--color-tag-purple)]",
  orange: "bg-[var(--color-tag-orange-bg)] text-[var(--color-tag-orange)]",
  pink: "bg-[var(--color-tag-pink-bg)] text-[var(--color-tag-pink)]",
  yellow: "bg-[var(--color-tag-yellow-bg)] text-[var(--color-tag-yellow)]",
  teal: "bg-[var(--color-tag-teal-bg)] text-[var(--color-tag-teal)]",
  red: "bg-[var(--color-tag-red-bg)] text-[var(--color-tag-red)]",
  neutral:
    "bg-[var(--color-lb-surface-2)] text-[var(--color-lb-muted)] border border-[var(--color-lb-border)]",
};

export function Tag({
  color = "neutral",
  children,
  className,
}: {
  color?: TagColor;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        STYLE[color],
        className
      )}
    >
      {children}
    </span>
  );
}
