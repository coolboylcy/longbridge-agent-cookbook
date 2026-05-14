import { PageHeader } from "../components/ui/page-header";
import { Badge } from "../components/ui/badge";
import { PromptCard } from "../components/ui/prompt-card";
import { WalkthroughStep } from "../components/ui/walkthrough-step";

const PRE_BRIEF_PROMPT = `Using the Longbridge MCP, do an earnings sweep:

1. Pull my watchlist.
2. For every ticker with an earnings release in the next 24 hours, fetch:
   - Last 4 quarters' EPS and revenue (actual vs. consensus)
   - Current consensus EPS and revenue estimate
   - The front-week options chain — compute the implied move as
     (ATM call mid + ATM put mid) / spot
   - The past 8 quarters' beat/miss pattern
3. For each upcoming earner, write a tight Markdown brief with sections:
   - Prior quarter recap (1 line)
   - Consensus this quarter (1 line)
   - Implied move (1 line)
   - Beat/miss history (1 line)
   - Three things to watch (3 bullets)

If no tickers have earnings in the next 24h, say so and stop.`;

const POST_RECAP_PROMPT = `Using the Longbridge MCP, for [TICKER] which just reported:

1. Pull the reported revenue, EPS, and any guidance update.
2. Compare against the consensus you cited earlier and the implied move.
3. Write one paragraph: "what changed."
4. End with a verdict line: beat / in-line / miss on revenue, EPS, guidance.`;

const WALKTHROUGH = [
  {
    tool: "watchlist.list",
    description: "Pulls your tracked tickers. The agent now knows the universe to scan.",
  },
  {
    tool: "calendar.events",
    description:
      "Filters to events of type `earnings` within the next 24h. Anything outside the window drops out.",
  },
  {
    tool: "fundamentals.quarterly",
    description:
      "Last 4 quarters of reported EPS and revenue per upcoming earner (actual vs. consensus).",
  },
  {
    tool: "fundamentals.consensus",
    description: "Current sell-side consensus EPS and revenue estimate for the upcoming quarter.",
  },
  {
    tool: "options.chain_expiries + options.chain",
    description:
      "Agent picks the nearest weekly expiry, identifies the ATM strike, reads call+put mids, and computes implied move = (call mid + put mid) / spot.",
  },
  {
    tool: "fundamentals.beat_miss_history",
    description: "Last 8 quarters' beat/miss surprise pattern per ticker.",
  },
  {
    tool: "Synthesis (no tool call)",
    description:
      "Agent assembles one Markdown brief per earner — or replies 'No upcoming earnings in the next 24h.' if the watchlist is quiet.",
    noToolCall: true,
  },
];

const CUSTOMIZE = [
  {
    label: "Window size",
    detail:
      'Change "next 24 hours" to "next 7 days" for a weekly look-ahead, or "next 4 hours" for a same-session sweep.',
  },
  {
    label: "Brief sections",
    detail:
      "Drop the implied-move bullet, add a 'macro context' paragraph, or switch the voice from neutral to opinionated. Edit the prompt; no code change required.",
  },
  {
    label: "Output format",
    detail:
      "Ask for JSON instead of Markdown if you're piping into another tool, or 'a single tweet per ticker' if you're drafting social.",
  },
];

export default function EarningsMonitorPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Earnings Monitor"
        description="Agent watches your Longbridge watchlist for upcoming earnings. Delivers a 24h pre-brief and a 1h post-recap."
      >
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="default">Recipe 01</Badge>
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
                Install the Longbridge MCP into your agent —{" "}
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
              <span>Paste into Claude Desktop, Cursor, or Codex and watch it run</span>
            </li>
          </ol>
        </section>

        {/* Pre-brief prompt */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            24h Pre-Brief Prompt
          </h2>
          <PromptCard prompt={PRE_BRIEF_PROMPT} label="pre-brief" />
        </section>

        {/* Post-recap prompt */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
            Post-Earnings Recap Prompt
          </h2>
          <p className="mb-3 text-sm text-[var(--color-lb-muted)]">
            Run ~1 hour after the earnings release. Replace{" "}
            <code className="rounded bg-[var(--color-lb-surface-2)] px-1 font-mono text-xs text-[var(--color-lb-text)]">
              [TICKER]
            </code>{" "}
            with the reporting symbol.
          </p>
          <PromptCard prompt={POST_RECAP_PROMPT} label="post-recap" />
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
