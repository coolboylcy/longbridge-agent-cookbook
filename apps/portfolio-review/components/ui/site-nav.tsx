import { cn } from "./utils";
import type { Locale } from "../../content/types";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  "zh-HK": "繁",
  "zh-CN": "简",
};

const LOCALE_PATH: Record<Locale, string> = {
  en: "/",
  "zh-HK": "/zh-HK",
  "zh-CN": "/zh-CN",
};

export function SiteNav({
  locale,
  brand,
  links,
  searchPlaceholder,
  signIn,
  signInHref,
  className,
}: {
  locale: Locale;
  brand: string;
  links: { label: string; href: string }[];
  searchPlaceholder: string;
  signIn: string;
  signInHref: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[var(--color-lb-border)] bg-[var(--color-lb-bg)]/95 backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 lg:gap-6 lg:px-6">
        {/* Brand */}
        <a href={LOCALE_PATH[locale]} className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-lb-green)] font-black text-[10px] text-[var(--color-lb-bg)]">
            LB
          </div>
          <span className="hidden text-[15px] font-bold tracking-tight text-[var(--color-lb-text)] sm:inline">
            {brand}
          </span>
        </a>

        {/* Primary nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[var(--color-lb-text-dim)] transition-colors hover:bg-[var(--color-lb-surface)] hover:text-[var(--color-lb-text)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Search (visual placeholder — non-functional, sets the tone) */}
        <div className="ml-auto hidden flex-1 max-w-md md:flex">
          <div className="group flex w-full items-center gap-2 rounded-md border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] px-3 py-1.5 transition-colors focus-within:border-[var(--color-lb-green)]/40">
            <SearchIcon className="h-4 w-4 text-[var(--color-lb-muted)]" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-sm text-[var(--color-lb-text)] placeholder:text-[var(--color-lb-muted)] focus:outline-none"
              aria-label={searchPlaceholder}
            />
          </div>
        </div>

        {/* Right cluster: locale + sign-in */}
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <div className="flex items-center rounded-md border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-0.5">
            {(["en", "zh-HK", "zh-CN"] as Locale[]).map((loc) => {
              const active = loc === locale;
              return (
                <a
                  key={loc}
                  href={LOCALE_PATH[loc]}
                  className={cn(
                    "rounded px-2 py-0.5 text-[11px] font-semibold transition-colors",
                    active
                      ? "bg-[var(--color-lb-green-soft)] text-[var(--color-lb-green)]"
                      : "text-[var(--color-lb-muted)] hover:text-[var(--color-lb-text)]"
                  )}
                >
                  {LOCALE_LABEL[loc]}
                </a>
              );
            })}
          </div>
          <a
            href={signInHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-[var(--color-lb-green)] px-3 py-1.5 text-xs font-bold text-[var(--color-lb-bg)] transition-colors hover:bg-[var(--color-lb-green-dim)] sm:inline-flex"
          >
            {signIn} ↗
          </a>
        </div>
      </div>
    </header>
  );
}
