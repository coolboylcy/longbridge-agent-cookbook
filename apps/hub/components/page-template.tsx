"use client";
import { useState, useMemo } from "react";
import type { HubContent, Locale, RecipeCategory } from "../content/types";
import { SiteNav } from "./ui/site-nav";
import { RecipeCard } from "./ui/recipe-card";
import { RichText } from "./ui/rich-text";
import { cn } from "./ui/utils";

function SectionTitle({
  children,
  count,
}: {
  children: React.ReactNode;
  count?: string;
}) {
  return (
    <div className="mb-5 flex items-baseline justify-between">
      <h2 className="text-xl font-bold tracking-tight text-[var(--color-lb-text)]">
        {children}
      </h2>
      {count && (
        <span className="text-xs text-[var(--color-lb-muted)]">{count}</span>
      )}
    </div>
  );
}

export function HubTemplate({
  locale,
  content,
}: {
  locale: Locale;
  content: HubContent;
}) {
  const c = content;
  const [activeFilter, setActiveFilter] = useState<RecipeCategory | "all">(
    "all"
  );

  const filteredRecipes = useMemo(() => {
    if (activeFilter === "all") return c.recipes;
    return c.recipes.filter((r) => r.category === activeFilter);
  }, [activeFilter, c.recipes]);

  return (
    <div>
      <SiteNav
        locale={locale}
        brand={c.nav.brand}
        links={c.nav.links}
        searchPlaceholder={c.nav.searchPlaceholder}
        signIn={c.nav.signIn}
        signInHref={c.nav.signInHref}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-lb-border)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 0%, rgba(0,200,150,0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 100%, rgba(77,171,247,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-lb-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-lb-green)]" />
              {c.hero.eyebrow}
            </div>
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-tight text-[var(--color-lb-text)] md:text-[56px]">
              {c.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-lb-text-dim)] md:text-lg">
              {c.hero.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={c.hero.primaryCtaHref}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-lb-green)] px-4 py-2.5 text-sm font-bold text-[var(--color-lb-bg)] transition-colors hover:bg-[var(--color-lb-green-dim)]"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href={c.hero.secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-lb-border-strong)] bg-[var(--color-lb-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--color-lb-text)] transition-colors hover:border-[var(--color-lb-green)]/40"
              >
                {c.hero.secondaryCta} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Setup banner */}
        <a
          href={c.setupBanner.primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center gap-4 rounded-lg border border-[var(--color-lb-border)] border-l-[3px] border-l-[var(--color-lb-green)] bg-[var(--color-lb-surface)] px-5 py-4 transition-colors hover:border-[var(--color-lb-border-strong)] hover:border-l-[var(--color-lb-green)]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-lb-green-soft)] text-[var(--color-lb-green)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-[var(--color-lb-text)]">
              {c.setupBanner.title}
            </div>
            <div className="mt-0.5 truncate text-xs text-[var(--color-lb-muted)]">
              {c.setupBanner.body}
            </div>
          </div>
          <span className="hidden shrink-0 text-xs font-semibold text-[var(--color-lb-green)] sm:inline">
            {c.setupBanner.primary}
          </span>
        </a>

        {/* Recipes grid */}
        <section id="recipes" className="mt-12 scroll-mt-20">
          <SectionTitle count={c.recipesSection.countLabel}>
            {c.recipesSection.title}
          </SectionTitle>

          {/* Filter chips (functional) */}
          <div className="mb-6 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {c.filterBar.filters.map((f) => {
              const active = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActiveFilter(f.value)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "bg-[var(--color-lb-green-soft)] text-[var(--color-lb-green)]"
                      : "border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] text-[var(--color-lb-muted)] hover:border-[var(--color-lb-border-strong)] hover:text-[var(--color-lb-text)]"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((r) => (
              <RecipeCard
                key={r.slug}
                recipe={r}
                comingSoonLabel={c.filterBar.statusLabels.comingSoon}
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-20 scroll-mt-20">
          <SectionTitle>{c.faq.title}</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {c.faq.items.map((item) => (
              <div
                key={item.q}
                className="rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-5"
              >
                <div className="text-sm font-bold text-[var(--color-lb-text)]">
                  {item.q}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--color-lb-muted)]">
                  <RichText text={item.a} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Author */}
        <section className="mt-20 mb-16 border-t border-[var(--color-lb-border)] pt-10">
          <SectionTitle>{c.author.title}</SectionTitle>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[15px] text-[var(--color-lb-text)]">
                {c.author.line}
              </p>
              <p className="mt-1 text-sm text-[var(--color-lb-muted)]">
                {c.author.disclaimer}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {c.author.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-lb-muted)] transition-colors hover:text-[var(--color-lb-text)]"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
