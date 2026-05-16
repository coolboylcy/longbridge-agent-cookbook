import type { HubContent } from "./types";

const en: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook",
    description:
      "Runnable AI agent recipes for Longbridge. Paste into Claude, Cursor, or Codex — your agent gets broker hands. No coding required.",
  },
  nav: { brand: "Agent Cookbook", allRecipes: "All recipes" },
  hero: {
    eyebrow: "Open Source · MCP First · Paper Trading",
    title: "Let AI do the boring parts of trading.",
    description:
      "Runnable AI agent recipes for Longbridge. Paste a prompt into Claude, get a clean earnings brief, options scan, or weekly portfolio review back. No coding required.",
  },
  mcpBanner: {
    title: "First time? Set up Longbridge in 2 steps",
    detail: "Connect (CLI or MCP) → install the Skill. Works with Claude Code, Claude Desktop, Cursor, Codex.",
    cta: "Setup guide ↗",
  },
  recipesSection: { title: "Recipes" },
  recipes: [
    {
      title: "Earnings Monitor",
      description:
        "AI watches your watchlist for upcoming earnings. 24-hour pre-brief + 1-hour post-recap, automatically.",
      href: "https://earnings-monitor-ochre.vercel.app",
      status: "live",
      statusLabel: "Live",
    },
    {
      title: "Options Scanner",
      description:
        "AI screens your watchlist for the best covered-call opportunities — ranked by annualized premium yield.",
      href: "https://options-scanner-three.vercel.app",
      status: "live",
      statusLabel: "Live",
    },
    {
      title: "Portfolio Review",
      description:
        "AI reads your paper positions and writes a weekly trading journal — 3 observations, 3 questions for next week.",
      href: "https://portfolio-review-three.vercel.app",
      status: "live",
      statusLabel: "Live",
    },
  ],
  quickstart: {
    title: "How it works (5 minutes)",
    steps: [
      {
        title: "Connect Longbridge to your AI app",
        body: "Pick one: CLI (recommended — brew install longbridge-terminal, then longbridge auth login) or MCP (add the URL https://openapi.longbridge.com/mcp to your client config). OAuth handles login.",
      },
      {
        title: "Install the Skill",
        body: "Inside Claude Code: /plugin marketplace add longbridge/skills then /plugin install longbridge@longbridge-skills. Or run npx skills add longbridge/skills -g for any tool.",
      },
      {
        title: "Open any recipe and run the prompt",
        body: "Click Open in Claude (or copy-paste). Your AI fetches your watchlist, runs the analysis, writes the report. Sit back.",
      },
    ],
  },
  whyThisExists: {
    title: "Why this exists",
    body: [
      "Most retail traders aren't coders. Most useful agent workflows are buried in GitHub READMEs that assume Python and CLI fluency.",
      "This cookbook flips that. Every recipe is a single page with one prompt, one Copy button, and one explanation of what'll happen. No clone. No Python. No SDK. Just MCP.",
      "Built and maintained by a real Longbridge user — these are the actual workflows I run on my own paper account every week.",
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Do I need to know how to code?",
        a: "No. The whole point of MCP is that you don't. You edit one config file once (copy-paste), then everything is chat.",
      },
      {
        q: "Is this safe? Can it place real orders?",
        a: "Default is paper-trading. The recipes don't place orders — they just read data and write reports. We've intentionally added friction to the live-trading path.",
      },
      {
        q: "Does it cost anything?",
        a: "Longbridge MCP is free. You pay for your AI app (Claude Pro, Cursor, etc.) — same as you'd pay for any agent.",
      },
      {
        q: "Why MCP instead of just asking Claude directly?",
        a: "Without MCP, Claude can't see your real watchlist, your real positions, or live market data — it'd just make things up. MCP gives the agent broker hands.",
      },
      {
        q: "Can I run these without Claude?",
        a: "Yes. Any chat app that supports MCP works — Cursor, Codex, Claude Code, even Claude Desktop. Drop-in identical.",
      },
      {
        q: "Why two setup steps (Connect + Install Skill)?",
        a: "Step 1 (CLI or MCP) gives your AI permission to call Longbridge. Step 2 (the Skill) tells it WHAT Longbridge can do. Skip step 2 and your AI may not even realize Longbridge is available. The official guide at open.longbridge.com/skill explains this.",
      },
      {
        q: "Claude Desktop says it can't connect.",
        a: "Switch to the Code tab in Claude Desktop. Chat and Cowork modes block CLI install and MCP connections — they're sandboxed. The Code tab is Claude Code embedded with full terminal access.",
      },
      {
        q: "I have an idea for a new recipe — can I contribute?",
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
