import type { PageContent } from "./types";

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

const SAMPLE_OUTPUT = `# Covered-Call Scan — IV Rank ≥ 0.5

| Ticker | Strike | Expiry | DTE | Delta | Mid  | IV Rank | Ann Yield |
| ------ | ------ | ------ | --- | ----- | ---- | ------- | --------- |
| TSLA   | 380    | Jun 20 | 32  | 0.28  | 7.85 | 0.71    | 23.4%     |
| AMD    | 165    | Jun 20 | 32  | 0.26  | 3.40 | 0.62    | 23.5%     |
| NVDA   | 360    | Jun 20 | 32  | 0.31  | 6.20 | 0.68    | 19.7%     |
| COIN   | 240    | Jun 20 | 32  | 0.30  | 4.10 | 0.78    | 19.5%     |
| MSTR   | 295    | Jun 20 | 32  | 0.27  | 4.55 | 0.82    | 17.6%     |

## Top-3 rationale

**TSLA Jun-20 380C @ 7.85** — IV rank 0.71, FOMC vol decay tailwind. Strike
caps upside at +10% from spot; assignment unwinds shares at higher price.
Invalidates if China retail surprises drive a sharp rally inside DTE.

**AMD Jun-20 165C @ 3.40** — Highest annualized yield in the top-10. 0.26
delta gives breathing room. Earnings Jul 28 — outside DTE window.

**NVDA Jun-20 360C @ 6.20** — Lower delta (0.31) keeps assignment moderate.
Next earnings ~Aug 21, outside DTE window. Roll if NVDA breaks 360.`;

const en: PageContent = {
  meta: {
    title: "Options Scanner — Longbridge Agent Cookbook",
    description:
      "Find the best covered-call candidates on your watchlist — ranked by premium. AI does the math.",
  },
  hero: {
    eyebrow: "Recipe 02 · Options",
    title: "Options Scanner",
    description:
      "An AI agent screens your Longbridge watchlist for the highest-yielding covered-call opportunities — filters by IV rank, delta, and earnings risk.",
    badges: ["Some options knowledge", "Paper trading", "5-min setup"],
    thumbnail: "options",
    tags: [
      { label: "Options", color: "purple" },
      { label: "Intermediate", color: "orange" },
      { label: "Paper", color: "neutral" },
      { label: "MCP", color: "purple" },
    ],
  },
  sidebar: {
    title: "Details",
    rows: [
      { label: "Recipe", value: "02 · Options Scanner" },
      { label: "Difficulty", value: "Intermediate" },
      { label: "Setup time", value: "~5 minutes" },
      { label: "Market", value: "US (HK limited)" },
      { label: "Cadence", value: "Weekly" },
      { label: "Trading mode", value: "Paper only" },
      { label: "Author", value: "Chris Liang" },
      { label: "License", value: "MIT" },
    ],
    primaryCta: "Open in Claude",
    primaryCtaHref: "",
  },
  whatItDoes: {
    title: "What it does",
    bullets: [
      "Looks at every stock on your watchlist that supports options.",
      "Keeps only the high-IV-rank names — where option premiums are richer than usual.",
      "Returns a ranked top-10 covered-call list plus a written rationale for the top 3.",
    ],
  },
  whatYouNeed: {
    title: "What you need",
    items: [
      {
        label: "A Longbridge account with options enabled",
        detail:
          "Free to [sign up](https://open.longbridge.com/skill?invite-code=F6HEGJ) (paper-trading account works — no real money required).",
      },
      {
        label: "Basic options literacy",
        detail:
          "Knowing what 'covered call', 'delta', and 'days to expiry (DTE)' mean is enough. We'll explain IV rank below.",
      },
      {
        label: "An AI chat app (Claude, Cursor, or similar)",
        detail:
          "Claude Desktop is the easiest. Any app that supports MCP works.",
      },
    ],
  },
  howToRun: {
    title: "How to run it (3 steps)",
    intro: "If you've already set up Longbridge, skip to step 3.",
    setupLinkLabel: "Full setup guide",
    setupLinkHref:
      "https://open.longbridge.com/skill?invite-code=F6HEGJ",
    steps: [
      {
        title: "Connect Longbridge to your AI app",
        body: "Two paths: CLI (brew install --cask longbridge/tap/longbridge-terminal, then `longbridge auth login`, then `longbridge init F6HEGJ` to attribute the install) or MCP (add https://openapi.longbridge.com/mcp to your client's config). OAuth handles login automatically.",
      },
      {
        title: "Install the Skill",
        body: "For Claude Code: run `/plugin marketplace add longbridge/skills` then `/plugin install longbridge@longbridge-skills`. For Codex / OpenClaw / Cursor / any other tool: run `npx skills add longbridge/skills -g` (or paste the ZIP install URL). This tells your AI what Longbridge can do.",
      },
      {
        title: "Copy the prompt below, paste, run",
        body: "Click Copy (or Open in Claude). The agent fetches your watchlist, screens it, runs the math, returns a ranked table.",
      },
    ],
  },
  prompt: {
    title: "The scan prompt",
    label: "covered-call scan",
    body: SCAN_PROMPT,
    openInClaude: "Open in Claude",
    copy: "Copy",
    copied: "Copied!",
  },
  sampleOutput: {
    title: "What you'll get back",
    label: "example scan output",
    body: SAMPLE_OUTPUT,
  },
  flow: {
    title: "What happens under the hood",
    steps: [
      {
        tool: "watchlist.list",
        description: "Pulls your tracked tickers — the universe to scan.",
      },
      {
        tool: "security.meta",
        description:
          "Drops tickers without options support. HK options coverage is limited; this filter catches it.",
      },
      {
        tool: "options.iv_history",
        description:
          "252 days of at-the-money call IV per ticker. Agent computes IV rank inline and filters to ≥ 0.5.",
      },
      {
        tool: "options.chain_expiries + options.chain",
        description:
          "Fetches the 30–45 DTE call slice. Each row has strike, bid/ask/mid, delta, open interest, and IV.",
      },
      {
        tool: "Filter + rank",
        description:
          "Agent applies delta / bid / open-interest filters and sorts by annualized yield.",
        noToolCall: true,
      },
      {
        tool: "calendar.events",
        description:
          "Checks for earnings inside the DTE window for top-3 candidates — so the rationale can flag event risk.",
      },
      {
        tool: "Synthesis",
        description:
          "Builds the Markdown table (top-10) followed by three rationale paragraphs.",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "Make it yours",
    items: [
      {
        label: "Change the filter band",
        detail:
          'Swap "30 ≤ DTE ≤ 45" or "0.20 ≤ delta ≤ 0.35". Tighter delta = lower assignment risk, smaller premium.',
      },
      {
        label: "Change the IV rank threshold",
        detail:
          "Default 0.5. Lower to 0.3 in a quiet vol regime; raise to 0.7 for a stricter signal.",
      },
      {
        label: "Add an ownership constraint",
        detail:
          'Append: "only include tickers where my paper account currently holds 100+ shares." The agent calls account.positions — true covered calls vs. naked.',
      },
    ],
  },
  footer: {
    backToHub: "← All recipes",
    github: "GitHub ↗",
  },
  nav: {
    brand: "Cookbook",
    allRecipes: "All recipes",
    links: [
      { label: "All recipes", href: "https://longbridge-cookbook-hub.vercel.app" },
      { label: "Setup", href: "https://open.longbridge.com/skill?invite-code=F6HEGJ" },
      { label: "GitHub", href: "https://github.com/longbridge/developers" },
    ],
    searchPlaceholder: "Search recipes…",
    signIn: "Longbridge",
    signInHref: "https://open.longbridge.com/skill?invite-code=F6HEGJ",
  },
};

export default en;
