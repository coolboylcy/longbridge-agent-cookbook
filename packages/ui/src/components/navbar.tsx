import { cn } from "../lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 items-center border-b border-[var(--color-lb-border)] bg-[var(--color-lb-bg)]/90 px-6 backdrop-blur-sm",
        className
      )}
    >
      <a href="/" className="flex items-center gap-2">
        <span className="h-6 w-6 rounded bg-[var(--color-lb-green)]" />
        <span className="font-semibold text-[var(--color-lb-text)]">
          Longbridge Agent Cookbook
        </span>
      </a>
    </header>
  );
}
