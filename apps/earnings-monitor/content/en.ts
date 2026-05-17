import type { PageContent } from "./types";

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

const SAMPLE_OUTPUT = `# Earnings Brief — Next 24h

## NVDA — reports tomorrow 4:20pm ET
**Prior quarter:** Beat EPS $5.16 vs $4.64 cons | Rev $35.1B vs $33.2B
**Consensus this quarter:** EPS $5.59 | Rev $37.7B
**Implied move:** ±7.2%  ((call 13.40 + put 11.80) / spot 349)
**Beat/miss history (8q):** 8/8 EPS beats, 7/8 revenue beats
**Three things to watch:**
1. Data-center segment vs $33–34B guide
2. China H20 commentary after export-control reset
3. FY27 capex guide vs hyperscaler signals

## TSLA — reports tomorrow 4:30pm ET
**Prior quarter:** Missed EPS $0.34 vs $0.42 cons | Rev $21.3B in-line
**Consensus this quarter:** EPS $0.51 | Rev $23.8B
**Implied move:** ±9.4%
**Three things to watch:**
1. Auto gross margin ex-credits trajectory
2. Robotaxi unit economics commentary
3. Energy storage growth — last quarter inflection`;

const en: PageContent = {
  meta: {
    title: "Earnings Monitor — Longbridge Agent Cookbook",
    description:
      "Get a 24-hour pre-brief on every stock in your watchlist that reports tomorrow. AI does it. No coding.",
  },
  hero: {
    eyebrow: "Recipe 01 · Earnings",
    title: "Earnings Monitor",
    description:
      "An AI agent watches your Longbridge watchlist for upcoming earnings, then writes you a clean 24-hour pre-brief and a 1-hour post-recap.",
    badges: ["Beginner friendly", "Paper trading", "5-min setup"],
    thumbnail: "earnings",
    tags: [
      { label: "Earnings", color: "blue" },
      { label: "Beginner", color: "green" },
      { label: "Paper", color: "neutral" },
      { label: "MCP", color: "purple" },
    ],
  },
  sidebar: {
    title: "Details",
    rows: [
      { label: "Recipe", value: "01 · Earnings Monitor" },
      { label: "Difficulty", value: "Beginner" },
      { label: "Setup time", value: "~5 minutes" },
      { label: "Market", value: "US · HK" },
      { label: "Cadence", value: "Daily" },
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
      "Scans your watchlist and finds every stock reporting earnings in the next 24 hours.",
      "Pulls the last 4 quarters, the current consensus estimate, and the options-implied move.",
      "Writes one clean brief per stock — what to expect, what to watch, in plain English.",
    ],
  },
  whatYouNeed: {
    title: "What you need",
    items: [
      {
        label: "A Longbridge account",
        detail:
          "Free to sign up at longbridge.com. A paper-trading account works — no real money required.",
      },
      {
        label: "An AI chat app (Claude, Cursor, or similar)",
        detail:
          "Claude Desktop is the easiest. Any app that supports MCP works. We have a one-click setup for each below.",
      },
      {
        label: "2 minutes of copy-paste",
        detail: "No coding. No terminal. You only edit one config file once.",
      },
    ],
  },
  howToRun: {
    title: "How to run it (3 steps)",
    intro: "If you've already set up Longbridge, skip to step 3.",
    setupLinkLabel: "Full setup guide",
    setupLinkHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md",
    steps: [
      {
        title: "Connect Longbridge to your AI app",
        body: "Two paths: CLI (brew install --cask longbridge/tap/longbridge-terminal, then longbridge auth login) or MCP (add https://openapi.longbridge.com/mcp to your client's config). OAuth handles login automatically.",
      },
      {
        title: "Install the Skill",
        body: "Inside Claude Code: /plugin marketplace add longbridge/skills then /plugin install longbridge@longbridge-skills. For any other tool: npx skills add longbridge/skills -g. This tells your AI what Longbridge can do.",
      },
      {
        title: "Copy the prompt below, paste, run",
        body: "Click Copy (or Open in Claude). The agent fetches your watchlist, pulls the earnings data, and writes the brief. Sit back.",
      },
    ],
  },
  prompt: {
    title: "Pre-earnings prompt (24 hours before)",
    label: "pre-brief",
    body: PRE_BRIEF_PROMPT,
    openInClaude: "Open in Claude",
    copy: "Copy",
    copied: "Copied!",
    secondary: {
      title: "Post-earnings prompt (1 hour after)",
      intro:
        "Run this ~1 hour after the company reports. Replace [TICKER] with the symbol that just released.",
      label: "post-recap",
      body: POST_RECAP_PROMPT,
    },
  },
  sampleOutput: {
    title: "What you'll get back",
    label: "example pre-brief",
    body: SAMPLE_OUTPUT,
  },
  flow: {
    title: "What happens under the hood",
    steps: [
      {
        tool: "watchlist.list",
        description:
          "Pulls your tracked tickers. The agent now knows the universe to scan.",
      },
      {
        tool: "calendar.events",
        description:
          "Filters to earnings events in the next 24 hours. Anything outside the window drops out.",
      },
      {
        tool: "fundamentals.quarterly",
        description:
          "Last 4 quarters of reported EPS and revenue — actual vs. consensus.",
      },
      {
        tool: "fundamentals.consensus",
        description:
          "Current sell-side consensus EPS and revenue estimate for the upcoming quarter.",
      },
      {
        tool: "options.chain_expiries + options.chain",
        description:
          "Picks the nearest weekly expiry, reads the at-the-money call and put mid prices, computes implied move = (call mid + put mid) / spot.",
      },
      {
        tool: "fundamentals.beat_miss_history",
        description: "Last 8 quarters' beat/miss pattern per ticker.",
      },
      {
        tool: "Synthesis",
        description:
          "Agent assembles the Markdown brief — or replies 'No upcoming earnings in the next 24h.' if the watchlist is quiet.",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "Make it yours",
    items: [
      {
        label: "Change the window",
        detail:
          'Swap "next 24 hours" for "next 7 days" (weekly look-ahead) or "next 4 hours" (same-session sweep). Just edit the prompt.',
      },
      {
        label: "Change the brief format",
        detail:
          "Drop the implied-move bullet, add a 'macro context' paragraph, switch the voice from neutral to opinionated — pure prompt edit.",
      },
      {
        label: "Change the output format",
        detail:
          "Ask for JSON instead of Markdown if you're piping into another tool, or 'one tweet per ticker' if you're drafting social.",
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
      { label: "Setup", href: "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md" },
      { label: "GitHub", href: "https://github.com/coolboylcy/longbridge-agent-cookbook" },
    ],
    searchPlaceholder: "Search recipes…",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
};

export default en;
