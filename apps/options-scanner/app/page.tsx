import { PageHeader, Badge, PromptCard, WalkthroughStep } from "@cookbook/ui";

const SCAN_PROMPT = `Using the Longbridge MCP, run a covered-call scan on my watchlist:

1. Pull my watchlist. Drop tickers that don't support options.
2. For each surviving ticker, compute the 252-day IV rank:
     iv_rank = (iv_today - iv_min_252d) / (iv_max_252d - iv_min_252d)
   using the ATM call IV at the nearest-to-30-DTE expiry.
   Keep only tickers with iv_rank >= 0.5.
3. For each surviving ticker, fetch the call chain. Keep calls where:
     - 30 <= DTE <= 45
     - 0.20 <= delta <= 0.35
     - bid > 0.05
     - open interest >= 100
     - strike is OTM vs. current spot
4. Rank all candidates by annualized premium yield:
     annualized_yield = (mid / strike) * (365 / DTE)
   Return the top 10 in a Markdown table with columns:
   Ticker | Strike | Expiry | DTE | Delta | Mid | IV Rank | Ann Yield
5. For the top 3, add a one-paragraph rationale each:
   why this strike, what would invalidate the trade, what assignment looks like.
   Mention the next earnings date if it falls inside the DTE window.

Paper-trading account only. No order placement.`;

const WALKTHROUGH = [
  {
    tool: "watchlist.list",
    description: "Pulls your tracked tickers — the universe to scan.",
  },
  {
    tool: "security.meta",
    description:
      "Drops tickers without options_enabled = true. HK options coverage is limited; this is where it shows.",
  },
  {
    tool: "options.iv_history",
    description:
      "252 days of ATM-call IV per surviving ticker. Agent computes IV rank inline and filters to iv_rank ≥ 0.5.",
  },
  {
    tool: "options.chain_expiries + options.chain",
    description:
      "Fetches the 30–45 DTE call slice. Each row comes back with strike, bid/ask/mid, delta, OI, and IV.",
  },
  {
    tool: "Filter + rank (no tool call)",
    description:
      "Agent applies the delta / bid / OI band filters and sorts all surviving calls by annualized yield.",
    noToolCall: true,
  },
  {
    tool: "calendar.events",
    description:
      "Checks for earnings inside the DTE window for the top-3 candidates so the rationale can flag event risk.",
  },
  {
    tool: "Synthesis (no tool call)",
    description:
      "Builds the 10-row Markdown table sorted by annualized yield, followed by three rationale paragraphs.",
    noToolCall: true,
  },
];

const CUSTOMIZE = [
  {
    label: "Filter band",
    detail:
      'Change "30 <= DTE <= 45" or "0.20 <= delta <= 0.35" in the prompt. Tighter delta = lower assignment risk, smaller premium.',
  },
  {
    label: "IV rank threshold",
    detail:
      "Default 0.5 in the prompt. Lower to 0.3 in a low-vol regime; raise to 0.7 for a stricter signal.",
  },
  {
    label: "Ownership constraint",
    detail:
      'Add a step: "only include tickers where my paper-trading account currently holds 100+ shares." The agent will call account.positions and filter — true covered calls vs. naked.',
  },
];

export default function OptionsScannerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Options Scanner"
        description="AI agent options scanner for high-IV-rank covered calls on your watchlist. Ranks the cleanest candidates by annualized premium yield."
      >
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="default">Recipe 02</Badge>
          <Badge variant="green">MCP First</Badge>
          <Badge variant="default">Paper Trading</Badge>
        </div>
      </PageHeader>

      <div className="space-y-12 px-6 py-10">
        {/* IV Rank explainer */}
        <section className="rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] p-5">
          <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-lb-green)]">
            What is IV Rank?
          </h3>
          <p className="text-sm text-[var(--color-lb-muted)]">
            <strong className="text-[var(--color-lb-text)]">IV Rank</strong> measures where today&apos;s
            implied volatility sits relative to its 252-day range:{" "}
            <code className="rounded bg-[var(--color-lb-surface-2)] px-1 font-mono text-xs text-[var(--color-lb-text)]">
              (iv_today - iv_min) / (iv_max - iv_min)
            </code>
            . A rank ≥ 0.5 means IV is in the upper half of its historical range — premium sellers
            prefer high IV rank because options are relatively expensive.
          </p>
        </section>

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
              <span>Copy the prompt below</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--color-lb-green)]">03</span>
              <span>Paste into Claude Desktop, Cursor, or Codex</span>
            </li>
          </ol>
        </section>

        {/* Scan prompt */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            Covered-Call Scan Prompt
          </h2>
          <PromptCard prompt={SCAN_PROMPT} label="covered-call scan" />
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
