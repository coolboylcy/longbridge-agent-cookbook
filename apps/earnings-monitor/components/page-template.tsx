import type { Locale, PageContent } from "../content/types";
import { SiteNav } from "./ui/site-nav";
import { PromptCard } from "./ui/prompt-card";
import { WalkthroughStep } from "./ui/walkthrough-step";
import { Tag } from "./ui/tag";
import { RecipeThumbnail } from "./ui/thumbnails";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-lg font-bold tracking-tight text-[var(--color-lb-text)]">
      {children}
    </h2>
  );
}

export function PageTemplate({
  locale,
  content,
  flowAgentLabel,
  flowMcpLabel,
  flowOutputLabel,
}: {
  locale: Locale;
  content: PageContent;
  flowAgentLabel?: string;
  flowMcpLabel?: string;
  flowOutputLabel?: string;
}) {
  // Suppress unused-prop lint warnings — these come from the old signature
  // and may still be passed by app/page.tsx files.
  void flowAgentLabel;
  void flowMcpLabel;
  void flowOutputLabel;

  const c = content;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(c.prompt.body)}`;

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

      {/* Hero — civitai model-page style: thumbnail + title cluster side-by-side */}
      <section className="border-b border-[var(--color-lb-border)] bg-[var(--color-lb-surface)]/30">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-xl border border-[var(--color-lb-border)] bg-[var(--color-lb-bg)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="aspect-[16/9] w-full">
                <RecipeThumbnail
                  kind={c.hero.thumbnail}
                  className="h-full w-full"
                />
              </div>
            </div>
            {/* Title cluster */}
            <div className="flex flex-col justify-center">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-lb-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-lb-green)]" />
                {c.hero.eyebrow}
              </div>
              <h1 className="text-[36px] font-extrabold leading-[1.05] tracking-tight text-[var(--color-lb-text)] md:text-[44px]">
                {c.hero.title}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-lb-text-dim)] md:text-base">
                {c.hero.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.hero.tags.map((t) => (
                  <Tag key={t.label} color={t.color}>
                    {t.label}
                  </Tag>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={claudeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--color-lb-green)] px-4 py-2.5 text-sm font-bold text-[var(--color-lb-bg)] transition-colors hover:bg-[var(--color-lb-green-dim)]"
                >
                  {c.sidebar.primaryCta} ↗
                </a>
                <a
                  href={c.howToRun.setupLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--color-lb-border-strong)] bg-[var(--color-lb-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--color-lb-text)] transition-colors hover:border-[var(--color-lb-green)]/40"
                >
                  {c.howToRun.setupLinkLabel} ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout: main content + sticky sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* MAIN */}
          <main className="min-w-0 space-y-14">
            {/* Overview block */}
            <section>
              <SectionTitle>{c.whatItDoes.title}</SectionTitle>
              <ul className="space-y-3">
                {c.whatItDoes.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-lb-text-dim)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-lb-green)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What you need */}
            <section>
              <SectionTitle>{c.whatYouNeed.title}</SectionTitle>
              <ul className="space-y-4">
                {c.whatYouNeed.items.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-4"
                  >
                    <div className="text-[15px] font-semibold text-[var(--color-lb-text)]">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-[var(--color-lb-muted)]">
                      {item.detail}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* How to run */}
            <section>
              <SectionTitle>{c.howToRun.title}</SectionTitle>
              <p className="mb-6 text-sm text-[var(--color-lb-muted)]">
                {c.howToRun.intro}{" "}
                <a
                  href={c.howToRun.setupLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-lb-green)] underline-offset-4 hover:underline"
                >
                  {c.howToRun.setupLinkLabel}
                </a>
                .
              </p>
              <ol className="space-y-4">
                {c.howToRun.steps.map((s, i) => (
                  <li
                    key={i}
                    className="flex gap-5 rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-5"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-lb-green)] font-mono text-xs font-extrabold text-[var(--color-lb-bg)]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold text-[var(--color-lb-text)]">
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

            {/* Prompt */}
            <section>
              <SectionTitle>{c.prompt.title}</SectionTitle>
              <PromptCard
                prompt={c.prompt.body}
                label={c.prompt.label}
                openInClaudeLabel={c.prompt.openInClaude}
                copyLabel={c.prompt.copy}
                copiedLabel={c.prompt.copied}
              />
            </section>

            {/* Secondary prompt */}
            {c.prompt.secondary && (
              <section>
                <SectionTitle>{c.prompt.secondary.title}</SectionTitle>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-lb-muted)]">
                  {c.prompt.secondary.intro}
                </p>
                <PromptCard
                  prompt={c.prompt.secondary.body}
                  label={c.prompt.secondary.label}
                  openInClaudeLabel={c.prompt.openInClaude}
                  copyLabel={c.prompt.copy}
                  copiedLabel={c.prompt.copied}
                />
              </section>
            )}

            {/* Sample output */}
            <section>
              <SectionTitle>{c.sampleOutput.title}</SectionTitle>
              <div className="overflow-hidden rounded-md border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)]">
                <div className="border-b border-[var(--color-lb-border)] px-4 py-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-lb-muted)]">
                    {c.sampleOutput.label}
                  </span>
                </div>
                <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-[var(--color-lb-text-dim)] whitespace-pre-wrap">
                  {c.sampleOutput.body}
                </pre>
              </div>
            </section>

            {/* Flow */}
            <section>
              <SectionTitle>{c.flow.title}</SectionTitle>
              <div>
                {c.flow.steps.map((item, i) => (
                  <WalkthroughStep
                    key={i}
                    step={i + 1}
                    tool={item.tool}
                    description={item.description}
                    noToolCall={item.noToolCall}
                    isLast={i === c.flow.steps.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* Customize */}
            <section>
              <SectionTitle>{c.customize.title}</SectionTitle>
              <ul className="space-y-4">
                {c.customize.items.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-4"
                  >
                    <div className="text-[15px] font-semibold text-[var(--color-lb-text)]">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-[var(--color-lb-muted)]">
                      {item.detail}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </main>

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-5">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--color-lb-muted)]">
                {c.sidebar.title}
              </h3>
              <dl className="space-y-3">
                {c.sidebar.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-3 border-b border-[var(--color-lb-border)] pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-xs text-[var(--color-lb-muted)]">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm font-medium text-[var(--color-lb-text)]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href={claudeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-md bg-[var(--color-lb-green)] px-3 py-2.5 text-sm font-bold text-[var(--color-lb-bg)] transition-colors hover:bg-[var(--color-lb-green-dim)]"
              >
                {c.sidebar.primaryCta} ↗
              </a>
            </div>

            {/* Footer links in sidebar bottom */}
            <div className="mt-4 rounded-xl border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-5 text-sm">
              <a
                href={
                  locale === "en"
                    ? "https://longbridge-cookbook-hub.vercel.app"
                    : `https://longbridge-cookbook-hub.vercel.app/${locale}`
                }
                className="flex items-center justify-between text-[var(--color-lb-text-dim)] transition-colors hover:text-[var(--color-lb-text)]"
              >
                <span>{c.footer.backToHub}</span>
              </a>
              <a
                href="https://github.com/coolboylcy/longbridge-agent-cookbook"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-between text-[var(--color-lb-text-dim)] transition-colors hover:text-[var(--color-lb-text)]"
              >
                <span>{c.footer.github}</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
