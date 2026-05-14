import { AppCard, PageHeader, Badge } from "@cookbook/ui";

const APPS = [
  {
    title: "Earnings Monitor",
    description:
      "Agent watches your watchlist for upcoming earnings. Delivers a 24h pre-brief and a 1h post-recap automatically.",
    href: "https://github.com/coolboylcy/longbridge-agent-cookbook/tree/main/recipes/01_earnings_monitor",
    status: "live" as const,
  },
  {
    title: "Options Scanner",
    description:
      "AI-powered scanner for high-IV-rank covered calls on your watchlist. Runs fully via Longbridge MCP.",
    href: "https://github.com/coolboylcy/longbridge-agent-cookbook/tree/main/recipes/02_options_scanner",
    status: "live" as const,
  },
  {
    title: "Portfolio Review",
    description:
      "Agent ingests your paper positions and writes a weekly review with 3 key observations and 3 follow-up questions.",
    href: "https://github.com/coolboylcy/longbridge-agent-cookbook/tree/main/recipes/03_portfolio_review",
    status: "live" as const,
  },
];

export default function HubPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Longbridge Agent Cookbook"
        description="Runnable AI agent recipes for Longbridge MCP. Drop into Claude Code, Cursor, or Codex and your agent gets broker hands."
      >
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="green">MCP First</Badge>
          <Badge variant="default">Paper Trading Only</Badge>
          <Badge variant="default">Open Source</Badge>
        </div>
      </PageHeader>

      <section className="px-6 py-10">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
          Recipes
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <AppCard key={app.title} {...app} />
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-lb-border)] px-6 py-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-lb-muted)]">
          5-Minute Quickstart
        </h2>
        <ol className="space-y-3 text-sm text-[var(--color-lb-muted)]">
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-lb-green)]">01</span>
            <span>Install the Longbridge MCP into Claude Code, Cursor, or Claude Desktop.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-lb-green)]">02</span>
            <span>Open any recipe above and copy its prompt.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-lb-green)]">03</span>
            <span>Paste into your agent. Watch it call Longbridge tools.</span>
          </li>
        </ol>
      </section>
    </div>
  );
}
