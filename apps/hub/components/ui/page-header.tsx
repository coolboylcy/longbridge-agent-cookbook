import type { ReactNode } from "react";
import { cn } from "./utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn("border-b border-[var(--color-lb-border)] px-6 py-14", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="border-l-2 border-[var(--color-lb-green)] pl-5">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-lb-text)]">{title}</h1>
          {description && (
            <p className="mt-2.5 text-base leading-relaxed text-[var(--color-lb-muted)]">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
