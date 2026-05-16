import { cn } from "./utils";
import type { Locale } from "../../content/types";

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

export function Navbar({
  locale,
  className,
  brand,
}: {
  locale: Locale;
  className?: string;
  brand: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[var(--color-lb-border)] bg-[var(--color-lb-bg)]/90 backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href={LOCALE_PATH[locale]} className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[var(--color-lb-green)] font-black text-[9px] text-[var(--color-lb-bg)]">
            LB
          </div>
          <span className="text-sm font-medium text-[var(--color-lb-text)]">
            {brand}
          </span>
        </a>
        <div className="flex items-center gap-0 rounded-md border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-0.5">
          {(["en", "zh-HK", "zh-CN"] as Locale[]).map((loc) => {
            const active = loc === locale;
            return (
              <a
                key={loc}
                href={LOCALE_PATH[loc]}
                className={cn(
                  "rounded-sm px-2 py-0.5 text-[11px] font-medium transition-colors",
                  active
                    ? "bg-[var(--color-lb-green)]/15 text-[var(--color-lb-green)]"
                    : "text-[var(--color-lb-muted)] hover:text-[var(--color-lb-text)]"
                )}
              >
                {LOCALE_LABEL[loc]}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
