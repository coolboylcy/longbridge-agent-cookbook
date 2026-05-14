import { PageHeader } from "../components/ui/page-header";
import { Badge } from "../components/ui/badge";
import { PromptCard } from "../components/ui/prompt-card";
import { WalkthroughStep } from "../components/ui/walkthrough-step";

const REVIEW_PROMPT = `Using the Longbridge MCP, write my weekly portfolio review:

1. Pull my paper-trading account state: NAV, cash, and all stock positions.
2. Pull every execution from the last 7 days (or this ISO week, whichever you can).
3. Compute these metrics:
     - Trade count and win rate of closed trades
     - Average holding period
     - Largest realized winner and loser this week
     - Sector mix of current positions (GICS sector via security metadata)
     - Top-3 position concentration as % of NAV
     - Week-over-week NAV change
     - Largest unrealized winner and loser among open positions
4. Write a Markdown review with this exact structure:
     # Week of <ISO week, e.g. 2026-W19>
     ## Stats
     <one-line summary: NAV, WoW%, # trades, win rate>
     ## 3 observations
     <three numbered bullets — terse, first-person, no hedging>
     ## 3 questions for next week
     <three numbered bullets — what to investigate, not what to do>

Voice: journal-style. Short. Opinionated. No "consider" or "you might want to."
This is for me, not for a client.

Paper-trading account only. No order placement.`;

const WALKTHROUGH = [
  {
    tool: "account.balance",
    description: "Total NAV and cash balance from the paper-trading account.",
  },
  {
    tool: "account.positions",
    description: "Every open stock position with cost basis, current value, and unrealized P&L.",
  },
  {
    tool: "account.executions",
    description:
      "Every fill in the last 7 days — used to compute trade count, win rate, and holding periods.",
  },
  {
    tool: "security.meta",
    description:
      "Pulls industry classification per held ticker, rolled up to GICS sector for the sector-mix metric.",
  },
  {
    tool: "account.nav_history",
    description:
      "14-day NAV history — gives the agent enough data to compute the week-over-week NAV change.",
  },
  {
    tool: "Compute step (no tool call)",
    description:
      "Agent does the arithmetic: win rate, top-3 concentration, average holding period, unrealized winner/loser ranks.",
    noToolCall: true,
  },
  {
    tool: "Synthesis (no tool call)",
    description:
      "Writes the Markdown review: # Week of YYYY-Www → Stats → 3 observations → 3 questions for next week.",
    noToolCall: true,
  },
];

const CUSTOMIZE = [
  {
    label: "Review window",
    detail:
      'Change "last 7 days" to "last 30 days" for a monthly cadence, or "since I last asked" if your agent has memory.',
  },
  {
    label: "Observation/question count",
    detail:
      'Default is 3+3. Change to 5+5, or split into "what worked / what didn\'t / what I\'ll try".',
  },
  {
    label: "Sector taxonomy",
    detail:
      'Instead of GICS, ask the agent to roll positions into your own buckets ("AI compute / Chinese consumer / HK property / cash"). Pure prompt edit.',
  },
];

const OUTPUT_PREVIEW = `# Week of 2026-W19

## Stats
NAV $103,420 | WoW +2.1% | 8 trades | 62% win rate

## 3 observations
1. Tech concentration reached 58% of NAV — highest since March.
2. Two of three losers were sold on the same day; review entry timing.
3. Options premium collected offset the losing stock trades entirely.

## 3 questions for next week
1. Is the tech concentration intentional or drift from winners running?
2. Why did the Tuesday sells all underperform — slippage or bad signal?
3. Should I roll the covered call on AAPL before it goes in-the-money?`;

export default function PortfolioReviewPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Portfolio Review"
        description="Agent ingests your paper-trading positions and writes a weekly review — 3 key observations and 3 follow-up questions."
      >
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="default">Recipe 03</Badge>
          <Badge variant="green">MCP First</Badge>
          <Badge variant="default">Paper Trading</Badge>
        </div>
      </PageHeader>

      <div className="space-y-12 px-6 py-10">
        {/* How to use */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            How to Use
          </h2>
          <ol className="space-y-3 text-sm text-[var(--color-lb-muted)]">
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--color-lb-green)]">01</span>
              <span>
                Install the Longbridge MCP —{" "}
                <a
                  href="https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md"
                  className="text-[var(--color-lb-green)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MCP setup guide
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--color-lb-green)]">02</span>
              <span>
                Run on <strong className="text-[var(--color-lb-text)]">Friday EOD</strong> or{" "}
                <strong className="text-[var(--color-lb-text)]">Sunday evening</strong> for the
                best weekly view
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--color-lb-green)]">03</span>
              <span>Copy the prompt, paste into Claude Desktop or Cursor</span>
            </li>
          </ol>
        </section>

        {/* Review prompt */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            Weekly Review Prompt
          </h2>
          <PromptCard prompt={REVIEW_PROMPT} label="portfolio review" />
        </section>

        {/* Output preview */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            Sample Output
          </h2>
          <div className="overflow-hidden rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)]">
            <div className="border-b border-[var(--color-lb-border)] px-4 py-2">
              <span className="font-mono text-xs text-[var(--color-lb-muted)]">
                example output
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-[var(--color-lb-muted)] whitespace-pre-wrap">
              {OUTPUT_PREVIEW}
            </pre>
          </div>
        </section>

        {/* Walkthrough */}
        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            How the Agent Works
          </h2>
          <div>
            {WALKTHROUGH.map((item, i) => (
              <WalkthroughStep
                key={i}
                step={i + 1}
                tool={item.tool}
                description={item.description}
                noToolCall={item.noToolCall}
                isLast={i === WALKTHROUGH.length - 1}
              />
            ))}
          </div>
        </section>

        {/* What you can change */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            What You Can Change
          </h2>
          <ul className="space-y-3">
            {CUSTOMIZE.map((item) => (
              <li key={item.label} className="text-sm text-[var(--color-lb-muted)]">
                <span className="font-semibold text-[var(--color-lb-text)]">{item.label}</span>
                {" — "}
                {item.detail}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--color-lb-border)] pt-8 text-sm text-[var(--color-lb-muted)]">
          <a
            href="https://github.com/coolboylcy/longbridge-agent-cookbook"
            className="hover:text-[var(--color-lb-text)] transition-colors"
          >
            ← Longbridge Agent Cookbook
          </a>
        </footer>
      </div>
    </div>
  );
}
