import type { HubContent } from "./types";

const en: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook — Runnable AI recipes for traders",
    description:
      "Runnable AI agent recipes for Longbridge. Paste into Claude, Cursor, or Codex — your agent gets broker hands. No coding required.",
  },
  nav: {
    brand: "Cookbook",
    links: [
      { label: "Recipes", href: "#recipes" },
      { label: "Setup", href: "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md" },
      { label: "FAQ", href: "#faq" },
      { label: "GitHub", href: "https://github.com/coolboylcy/longbridge-agent-cookbook" },
    ],
    searchPlaceholder: "Search recipes…",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
  hero: {
    eyebrow: "Open source · MCP-first · Paper trading",
    title: "Runnable AI recipes for your broker account.",
    description:
      "Paste a prompt into Claude. Get a clean earnings brief, options scan, or portfolio review back. No coding. No SDK. Just your watchlist and an AI that can finally see it.",
    primaryCta: "Browse recipes",
    primaryCtaHref: "#recipes",
    secondaryCta: "Setup guide",
    secondaryCtaHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md",
  },
  filterBar: {
    sortLabel: "Sort:",
    filters: [
      { label: "All", value: "all" },
      { label: "Earnings", value: "earnings" },
      { label: "Options", value: "options" },
      { label: "Portfolio", value: "portfolio" },
      { label: "Beginner", value: "beginner" },
    ],
  },
  recipesSection: {
    title: "Recipes",
    countLabel: (n) => `${n} recipes`,
  },
  recipes: [
    {
      slug: "earnings-monitor",
      title: "Earnings Monitor",
      description:
        "AI watches your watchlist for upcoming earnings. 24-hour pre-brief + 1-hour post-recap, automatically.",
      href: "https://earnings-monitor-ochre.vercel.app",
      thumbnail: "earnings",
      meta: "Recipe 01 · 5 min",
      tags: [
        { label: "Earnings", color: "blue" },
        { label: "Beginner", color: "green" },
        { label: "Paper", color: "neutral" },
      ],
    },
    {
      slug: "options-scanner",
      title: "Options Scanner",
      description:
        "AI screens your watchlist for the best covered-call opportunities — ranked by annualized premium yield.",
      href: "https://options-scanner-three.vercel.app",
      thumbnail: "options",
      meta: "Recipe 02 · 5 min",
      tags: [
        { label: "Options", color: "purple" },
        { label: "Intermediate", color: "orange" },
        { label: "Paper", color: "neutral" },
      ],
    },
    {
      slug: "portfolio-review",
      title: "Portfolio Review",
      description:
        "AI reads your paper positions and writes a weekly trading journal — 3 observations, 3 questions for next week.",
      href: "https://portfolio-review-three.vercel.app",
      thumbnail: "portfolio",
      meta: "Recipe 03 · 5 min",
      tags: [
        { label: "Portfolio", color: "teal" },
        { label: "Beginner", color: "green" },
        { label: "Weekly", color: "pink" },
      ],
    },
  ],
  setupBanner: {
    title: "First time? 2-step setup",
    body: "Step 1 — connect Longbridge (CLI or MCP). Step 2 — install the Skill. Whole thing takes under 5 minutes.",
    primary: "Setup guide ↗",
    primaryHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.md",
    secondary: "Official docs ↗",
    secondaryHref: "https://open.longbridge.com/skill/install.md",
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Do I need to know how to code?",
        a: "No. You edit one config file once (copy-paste), then everything is chat. The recipes are prompts — you copy them into your AI app.",
      },
      {
        q: "Is this safe? Can it place real orders?",
        a: "Default is paper-trading. The recipes don't place orders — they read data and write reports. We've intentionally added friction to the live-trading path.",
      },
      {
        q: "Does it cost anything?",
        a: "Longbridge is free to sign up. You pay for your AI app (Claude Pro, Cursor, etc.) — same as you'd pay for any agent.",
      },
      {
        q: "Why MCP / Skill instead of just asking Claude directly?",
        a: "Without the Longbridge Skill, Claude can't see your real watchlist, positions, or live quotes — it'd just make things up. The Skill gives the agent broker hands.",
      },
      {
        q: "Why two setup steps (Connect + Install Skill)?",
        a: "Step 1 (CLI or MCP) gives your AI permission to call Longbridge. Step 2 (the Skill) tells it WHAT Longbridge can do. Skip step 2 and your AI may not even realize Longbridge is available.",
      },
      {
        q: "Claude Desktop says it can't connect.",
        a: "Switch to the Code tab in Claude Desktop. Chat and Cowork modes block CLI install and MCP connections — they're sandboxed. The Code tab is Claude Code embedded with full terminal access.",
      },
      {
        q: "Can I contribute a recipe?",
        a: "Yes. Open an issue on GitHub or read CONTRIBUTING.md. The bar is low: a useful prompt + a clear walkthrough.",
      },
    ],
  },
  author: {
    title: "About",
    line: "Built by Chris Liang — Head of Growth, Longbridge Securities HK.",
    disclaimer:
      "Personal project. Views are mine, not my employer's. Not investment advice.",
    links: [
      { label: "X / Twitter", href: "https://x.com/chrisaiquant" },
      { label: "Substack", href: "https://chrisliang.substack.com" },
      { label: "GitHub", href: "https://github.com/chrisaiquant" },
    ],
  },
};

export default en;
