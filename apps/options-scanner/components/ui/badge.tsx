import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva("inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-[var(--color-lb-surface-2)] text-[var(--color-lb-muted)]",
      green: "bg-[var(--color-lb-green)]/10 text-[var(--color-lb-green)] border border-[var(--color-lb-green)]/20",
      red: "bg-[var(--color-lb-red)]/10 text-[var(--color-lb-red)] border border-[var(--color-lb-red)]/20",
      yellow: "bg-[var(--color-lb-yellow)]/10 text-[var(--color-lb-yellow)] border border-[var(--color-lb-yellow)]/20",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
