import type { PageContent } from "./types";

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

const SAMPLE_OUTPUT = `# Week of 2026-W19

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

const en: PageContent = {
  meta: {
    title: "Portfolio Review — Longbridge Agent Cookbook",
    description:
      "Your AI-written weekly trading journal. Three observations, three questions, every Friday.",
  },
  hero: {
    eyebrow: "Recipe 03 · Portfolio",
    title: "Portfolio Review",
    description:
      "An AI agent reads your paper-trading positions and writes a sharp weekly review — three observations, three questions, all in your voice.",
    badges: ["Beginner friendly", "Paper trading", "5-min setup"],
    thumbnail: "portfolio",
    tags: [
      { label: "Portfolio", color: "teal" },
      { label: "Beginner", color: "green" },
      { label: "Weekly", color: "pink" },
      { label: "MCP", color: "purple" },
    ],
  },
  sidebar: {
    title: "Details",
    rows: [
      { label: "Recipe", value: "03 · Portfolio Review" },
      { label: "Difficulty", value: "Beginner" },
      { label: "Setup time", value: "~5 minutes" },
      { label: "Market", value: "US · HK · Crypto" },
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
      "Reads your paper-trading account: balance, positions, executions over the past 7 days.",
      "Computes the stats that matter — win rate, sector mix, concentration, week-over-week NAV.",
      "Writes a journal-style review in your voice: 3 observations + 3 questions for next week.",
    ],
  },
  whatYouNeed: {
    title: "What you need",
    items: [
      {
        label: "A Longbridge paper-trading account",
        detail:
          "Free to sign up. Paper account preferred — that's what the prompt expects.",
      },
      {
        label: "Some trading history in the past week",
        detail:
          "Otherwise the review is pretty thin. A handful of paper trades is enough to get useful output.",
      },
      {
        label: "An AI chat app (Claude / Cursor / similar)",
        detail: "Claude Desktop is the easiest. Any MCP-capable app works.",
      },
    ],
  },
  howToRun: {
    title: "How to run it (3 steps)",
    intro: "Run it Friday evening or Sunday night for the cleanest weekly view. If Longbridge is set up, skip to step 3.",
    setupLinkLabel: "Full setup guide",
    setupLinkHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md",
    steps: [
      {
        title: "Connect Longbridge to your AI app",
        body: "Two paths: CLI (brew install --cask longbridge/tap/longbridge-terminal, then longbridge auth login) or MCP (add https://openapi.longbridge.com/mcp to your client's config). One-time OAuth.",
      },
      {
        title: "Install the Skill",
        body: "Inside Claude Code: /plugin marketplace add longbridge/skills then /plugin install longbridge@longbridge-skills. For any other tool: npx skills add longbridge/skills -g.",
      },
      {
        title: "Copy the prompt below, paste, run",
        body: "Click Copy (or Open in Claude). Claude pulls your account state, computes the stats, writes the review. You read it.",
      },
    ],
  },
  prompt: {
    title: "The review prompt",
    label: "portfolio review",
    body: REVIEW_PROMPT,
    openInClaude: "Open in Claude",
    copy: "Copy",
    copied: "Copied!",
  },
  sampleOutput: {
    title: "What you'll get back",
    label: "example review",
    body: SAMPLE_OUTPUT,
  },
  flow: {
    title: "What happens under the hood",
    steps: [
      {
        tool: "account.balance",
        description: "Total NAV and cash balance from the paper-trading account.",
      },
      {
        tool: "account.positions",
        description:
          "Every open position with cost basis, current value, unrealized P&L.",
      },
      {
        tool: "account.executions",
        description:
          "Every fill in the last 7 days — used for trade count, win rate, holding periods.",
      },
      {
        tool: "security.meta",
        description:
          "Industry classification per ticker, rolled up to GICS sector for the sector-mix metric.",
      },
      {
        tool: "account.nav_history",
        description:
          "14-day NAV history — enough to compute the week-over-week change.",
      },
      {
        tool: "Compute",
        description:
          "Win rate, concentration, average holding period, unrealized winner/loser ranks.",
        noToolCall: true,
      },
      {
        tool: "Synthesis",
        description:
          "Writes the Markdown review: # Week of YYYY-Www → Stats → 3 observations → 3 questions.",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "Make it yours",
    items: [
      {
        label: "Change the review window",
        detail:
          'Swap "last 7 days" for "last 30 days" (monthly) or "since I last asked" if your agent has memory.',
      },
      {
        label: "Change the observation count",
        detail:
          'Default is 3+3. Change to 5+5, or split into "what worked / what didn\'t / what I\'ll try."',
      },
      {
        label: "Change the sector taxonomy",
        detail:
          'Instead of GICS, roll positions into your own buckets ("AI compute / Chinese consumer / HK property / cash"). Pure prompt edit.',
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
