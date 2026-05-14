import type { ReactNode } from "react";
import { cn } from "./utils";

export function PageHeader({ title, description, className, children }: { title: string; description?: string; className?: string; children?: ReactNode }) {
  return (
    <div className={cn("border-b border-[var(--color-lb-border)] px-6 py-12", className)}>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-[var(--color-lb-text)]">{title}</h1>
        {description && <p className="mt-2 text-[var(--color-lb-muted)]">{description}</p>}
        {children}
      </div>
    </div>
  );
}
