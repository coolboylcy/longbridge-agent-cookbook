import { cn } from "../lib/utils";
import { Badge } from "./badge";

export interface AppCardProps {
  title: string;
  description: string;
  href: string;
  status?: "live" | "coming-soon" | "beta";
  className?: string;
}

const statusConfig = {
  live: { label: "Live", variant: "green" as const },
  beta: { label: "Beta", variant: "yellow" as const },
  "coming-soon": { label: "Coming Soon", variant: "default" as const },
};

export function AppCard({ title, description, href, status = "live", className }: AppCardProps) {
  const { label, variant } = statusConfig[status];

  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-5 transition-colors hover:border-[var(--color-lb-green)]/50 hover:bg-[var(--color-lb-surface-2)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-[var(--color-lb-text)] group-hover:text-[var(--color-lb-green)] transition-colors">
          {title}
        </h3>
        <Badge variant={variant}>{label}</Badge>
      </div>
      <p className="text-sm text-[var(--color-lb-muted)] leading-relaxed">{description}</p>
    </a>
  );
}
