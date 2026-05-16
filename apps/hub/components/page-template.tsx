import type { HubContent, Locale } from "../content/types";
import { Navbar } from "./ui/navbar";
import { AppCard } from "./ui/app-card";

const MCP_SETUP_URL =
  "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-base font-semibold text-[var(--color-lb-text)]">
      {children}
    </h2>
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
  return (
    <article>
      <Navbar locale={locale} brand={c.nav.brand} />

      {/* Hero */}
      <div className="px-6 pt-20 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-lb-green)]">
            {c.hero.eyebrow}
          </div>
          <h1 className="text-[52px] font-bold leading-[1.04] tracking-tight text-[var(--color-lb-text)]">
            {c.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-lb-muted)]">
            {c.hero.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24">
        {/* MCP banner */}
        <a
          href={MCP_SETUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-14 flex items-center justify-between gap-4 rounded-md border border-l-2 border-l-[var(--color-lb-green)] border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] px-5 py-4 transition-colors hover:border-[var(--color-lb-green)]/40"
        >
          <div>
            <div className="text-sm font-semibold text-[var(--color-lb-text)]">
              {c.mcpBanner.title}
            </div>
            <div className="mt-0.5 text-xs text-[var(--color-lb-muted)]">
              {c.mcpBanner.detail}
            </div>
          </div>
          <span className="shrink-0 text-xs font-medium text-[var(--color-lb-green)]">
            {c.mcpBanner.cta}
          </span>
        </a>

        {/* Recipes */}
        <section className="mb-20">
          <SectionTitle>{c.recipesSection.title}</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.recipes.map((r) => (
              <AppCard key={r.title} {...r} />
            ))}
          </div>
        </section>

        {/* Quickstart */}
        <section className="mb-20">
          <SectionTitle>{c.quickstart.title}</SectionTitle>
          <ol className="space-y-5">
            {c.quickstart.steps.map((s, i) => (
              <li key={i} className="flex gap-5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-lb-green)] font-mono text-xs font-bold text-[var(--color-lb-bg)]">
                  {i + 1}
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-[var(--color-lb-text)]">
                    {s.title}
                  </div>
                  <div className="mt-1.5 text-sm leading-relaxed text-[var(--color-lb-muted)]">
                    {s.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Why */}
        <section className="mb-20">
          <SectionTitle>{c.whyThisExists.title}</SectionTitle>
          <div className="space-y-4">
            {c.whyThisExists.body.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-[var(--color-lb-muted)]">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <SectionTitle>{c.faq.title}</SectionTitle>
          <ul className="space-y-6">
            {c.faq.items.map((item) => (
              <li key={item.q}>
                <div className="text-[15px] font-semibold text-[var(--color-lb-text)]">
                  {item.q}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-[var(--color-lb-muted)]">
                  {item.a}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Author */}
        <section className="border-t border-[var(--color-lb-border)] pt-10">
          <SectionTitle>{c.author.title}</SectionTitle>
          <p className="text-[15px] text-[var(--color-lb-text)]">
            {c.author.line}
          </p>
          <p className="mt-2 text-sm text-[var(--color-lb-muted)]">
            {c.author.disclaimer}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
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
        </section>
      </div>
    </article>
  );
}
