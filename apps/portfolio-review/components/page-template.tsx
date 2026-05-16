import type { Locale, PageContent } from "../content/types";
import { Navbar } from "./ui/navbar";
import { PageHeader } from "./ui/page-header";
import { PromptCard } from "./ui/prompt-card";
import { WalkthroughStep } from "./ui/walkthrough-step";
import { FlowDiagram } from "./flow-diagram";

const SECTION_GAP = "space-y-16";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-base font-semibold text-[var(--color-lb-text)]">
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
  flowAgentLabel: string;
  flowMcpLabel: string;
  flowOutputLabel: string;
}) {
  const c = content;
  return (
    <article>
      <Navbar locale={locale} brand={c.nav.brand} allRecipes={c.nav.allRecipes} />
      <PageHeader
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
        badges={c.hero.badges}
      />

      <div className="mx-auto max-w-2xl px-6 pb-20">
        {/* Flow diagram */}
        <div className="mb-14">
          <FlowDiagram
            agentLabel={flowAgentLabel}
            mcpLabel={flowMcpLabel}
            outputLabel={flowOutputLabel}
          />
        </div>

        <div className={SECTION_GAP}>
          {/* What it does */}
          <section>
            <SectionTitle>{c.whatItDoes.title}</SectionTitle>
            <ul className="space-y-3">
              {c.whatItDoes.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-lb-muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-lb-green)]" />
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
                <li key={item.label}>
                  <div className="text-[15px] font-medium text-[var(--color-lb-text)]">
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
            <ol className="space-y-5">
              {c.howToRun.steps.map((s, i) => (
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
              <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-[var(--color-lb-muted)] whitespace-pre-wrap">
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
            <ul className="space-y-5">
              {c.customize.items.map((item) => (
                <li key={item.label}>
                  <div className="text-[15px] font-medium text-[var(--color-lb-text)]">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-[var(--color-lb-muted)]">
                    {item.detail}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-[var(--color-lb-border)] pt-8">
          <div className="flex items-center justify-between text-sm">
            <a
              href={
                locale === "en"
                  ? "https://longbridge-cookbook-hub.vercel.app"
                  : `https://longbridge-cookbook-hub.vercel.app/${locale}`
              }
              className="text-[var(--color-lb-muted)] transition-colors hover:text-[var(--color-lb-text)]"
            >
              {c.footer.backToHub}
            </a>
            <a
              href="https://github.com/coolboylcy/longbridge-agent-cookbook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-lb-muted)] transition-colors hover:text-[var(--color-lb-text)]"
            >
              {c.footer.github}
            </a>
          </div>
        </footer>
      </div>
    </article>
  );
}
