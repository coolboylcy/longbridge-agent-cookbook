import type { HubContent, RecipeCard } from "./types";

const SETUP_URL =
  "https://open.longbridge.com/skill?invite-code=F6HEGJ";
const ISSUES_URL =
  "https://github.com/longbridge/developers/issues/new";

const RECIPES: RecipeCard[] = [
  // ─── Live ───────────────────────────────────────────────────────────
  {
    slug: "earnings-monitor",
    title: "Earnings Monitor",
    description:
      "AI watches your watchlist for upcoming earnings. 24-hour pre-brief + 1-hour post-recap, automatically.",
    href: "https://earnings-monitor-ochre.vercel.app",
    thumbnail: "earnings",
    meta: "01 · 5 min",
    status: "live",
    category: "events",
    tags: [
      { label: "Earnings", color: "blue" },
      { label: "Beginner", color: "green" },
      { label: "Daily", color: "neutral" },
    ],
  },
  {
    slug: "options-scanner",
    title: "Options Scanner",
    description:
      "Screens your watchlist for the best covered-call opportunities — ranked by annualized premium yield.",
    href: "https://options-scanner-three.vercel.app",
    thumbnail: "options",
    meta: "02 · 5 min",
    status: "live",
    category: "options",
    tags: [
      { label: "Options", color: "purple" },
      { label: "Intermediate", color: "orange" },
      { label: "Weekly", color: "pink" },
    ],
  },
  {
    slug: "portfolio-review",
    title: "Portfolio Review",
    description:
      "Reads your paper positions and writes a weekly trading journal — 3 observations, 3 questions for next week.",
    href: "https://portfolio-review-three.vercel.app",
    thumbnail: "portfolio",
    meta: "03 · 5 min",
    status: "live",
    category: "portfolio",
    tags: [
      { label: "Portfolio", color: "teal" },
      { label: "Beginner", color: "green" },
      { label: "Weekly", color: "pink" },
    ],
  },

  // ─── Events & corporate actions ─────────────────────────────────────
  {
    slug: "morning-brief",
    title: "Morning Brief",
    description:
      "30 minutes before US open: watchlist movers, overnight news, and what to watch today. Read it with coffee.",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "04 · daily",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "Daily", color: "blue" },
      { label: "Beginner", color: "green" },
    ],
  },
  {
    slug: "ipo-radar",
    title: "IPO Radar",
    description:
      "Upcoming US + HK IPOs with subscription windows, lock-up expiry, peer comps, and pricing-range read.",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "05 · weekly",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "IPO", color: "yellow" },
      { label: "HK · US", color: "neutral" },
    ],
  },
  {
    slug: "buyback-tracker",
    title: "Buyback Tracker",
    description:
      "Monitors corporate buyback announcements on your watchlist. Sizes the buyback as % of float, flags the catalyst.",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "06 · daily",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "Buybacks", color: "teal" },
      { label: "Event-driven", color: "purple" },
    ],
  },
  {
    slug: "insider-watch",
    title: "Insider Watch",
    description:
      "Tracks Form 4 / HK Form 3A insider buying & selling on watchlist names. Net flow + cluster signal alerts.",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "07 · daily",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "Insiders", color: "red" },
      { label: "Signal", color: "orange" },
    ],
  },
  {
    slug: "dividend-capture",
    title: "Dividend Capture",
    description:
      "Upcoming ex-dividend dates on your watchlist + capture-strategy feasibility (yield vs. expected price drop).",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "08 · weekly",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "Dividends", color: "teal" },
      { label: "Income", color: "green" },
    ],
  },
  {
    slug: "index-rebalance",
    title: "Index Rebalance Alert",
    description:
      "Predicts inclusions/exclusions for HSI, HSCEI, S&P 500, Russell — front-runs the forced-buy/sell flow.",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "09 · quarterly",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "Index", color: "purple" },
      { label: "HK · US", color: "neutral" },
    ],
  },
  {
    slug: "catalyst-radar",
    title: "Catalyst Radar",
    description:
      "Aggregates earnings, dividends, splits, FDA dates, and key macro events for your watchlist in one calendar view.",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "10 · daily",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "Catalysts", color: "yellow" },
      { label: "Calendar", color: "blue" },
    ],
  },

  // ─── Options strategies ─────────────────────────────────────────────
  {
    slug: "csp-scanner",
    title: "Cash-Secured Put Scanner",
    description:
      "Finds the best CSP opportunities — high IV, strikes you'd be happy owning, no earnings inside DTE.",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "11 · weekly",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "Options", color: "purple" },
      { label: "Income", color: "green" },
    ],
  },
  {
    slug: "wheel-planner",
    title: "Wheel Strategy Planner",
    description:
      "End-to-end wheel: CSP → assignment → covered call → exit. Tracks each step, suggests rolls when needed.",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "12 · weekly",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "Wheel", color: "purple" },
      { label: "Intermediate", color: "orange" },
    ],
  },
  {
    slug: "iv-crush-hunter",
    title: "IV Crush Hunter",
    description:
      "Finds post-earnings IV crush opportunities — short straddles/strangles after the print when IV is still elevated.",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "13 · earnings season",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "Options", color: "purple" },
      { label: "Advanced", color: "red" },
    ],
  },
  {
    slug: "earnings-straddle",
    title: "Earnings Straddle Builder",
    description:
      "Builds long-straddle / strangle positions ahead of earnings. Sizes by Kelly, ranks by IV rank vs. historic moves.",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "14 · earnings season",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "Options", color: "purple" },
      { label: "Volatility", color: "pink" },
    ],
  },
  {
    slug: "vol-surface",
    title: "Vol Surface Reader",
    description:
      "Plots IV by strike × expiry, calls out skew and term-structure anomalies. Spots cheap vol and rich vol fast.",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "15 · weekly",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "Vol surface", color: "purple" },
      { label: "Advanced", color: "red" },
    ],
  },

  // ─── Portfolio & risk ───────────────────────────────────────────────
  {
    slug: "tax-loss-harvest",
    title: "Tax-Loss Harvest Scout",
    description:
      "Year-end scan: realized gains, losses to harvest, wash-sale flags, replacement tickers with similar exposure.",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "16 · year-end",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "Tax", color: "yellow" },
      { label: "US", color: "neutral" },
    ],
  },
  {
    slug: "concentration-audit",
    title: "Concentration Risk Audit",
    description:
      "Audits position size, sector, factor, and geography concentration. Flags top-3, top-5 share of NAV.",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "17 · monthly",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "Risk", color: "red" },
      { label: "Portfolio", color: "teal" },
    ],
  },
  {
    slug: "rebalance-calc",
    title: "Rebalance Calculator",
    description:
      "Given target weights, computes the exact buys/sells to rebalance — minimizes turnover and tax drag.",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "18 · quarterly",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "Portfolio", color: "teal" },
      { label: "Tax-aware", color: "yellow" },
    ],
  },
  {
    slug: "sector-drift",
    title: "Sector Drift Detector",
    description:
      "Tracks how your sector mix drifted from intended weights as winners ran. Suggests trims that preserve thesis.",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "19 · monthly",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "Risk", color: "red" },
      { label: "Portfolio", color: "teal" },
    ],
  },
  {
    slug: "performance-attribution",
    title: "Performance Attribution",
    description:
      "Breaks down monthly P&L into selection vs. allocation vs. timing. Tells you why you beat or trailed the index.",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "20 · monthly",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "Attribution", color: "teal" },
      { label: "Analytics", color: "blue" },
    ],
  },

  // ─── Market scanner & flow ──────────────────────────────────────────
  {
    slug: "ah-premium",
    title: "AH Premium Tracker",
    description:
      "Watches A/H share premium for dual-listed names. Flags percentile extremes — convergence trade candidates.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "21 · daily",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "A/H Premium", color: "orange" },
      { label: "HK · CN", color: "neutral" },
    ],
  },
  {
    slug: "northbound-flow",
    title: "Northbound Flow",
    description:
      "Daily Stock-Connect northbound flow into top names. Highlights persistent buys/sells worth listening to.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "22 · daily",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "Flow", color: "blue" },
      { label: "CN", color: "neutral" },
    ],
  },
  {
    slug: "sector-rotation",
    title: "Sector Rotation Compass",
    description:
      "Cross-sector momentum ranking + correlation matrix. Tells you which sectors are leading, lagging, and why.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "23 · weekly",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "Sector", color: "purple" },
      { label: "Macro", color: "yellow" },
    ],
  },
  {
    slug: "anomaly-hunter",
    title: "Anomaly Hunter",
    description:
      "Volume + price anomaly scan across your watchlist: unusual volume, gap-ups, dark-pool prints, halts.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "24 · intraday",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "Anomaly", color: "red" },
      { label: "Intraday", color: "orange" },
    ],
  },
  {
    slug: "52w-breakout",
    title: "52-Week Breakout Scan",
    description:
      "Names breaking out to 52-week highs or lows with confirming volume. Filters for clean technical setups.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "25 · daily",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "Technicals", color: "blue" },
      { label: "Breakout", color: "orange" },
    ],
  },
  {
    slug: "pairs-trade",
    title: "Pairs Trade Finder",
    description:
      "Cointegration scan across sectors. Returns top divergent pairs with z-score, half-life, and entry signals.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "26 · weekly",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "Stat arb", color: "purple" },
      { label: "Advanced", color: "red" },
    ],
  },
  {
    slug: "mean-reversion",
    title: "Mean Reversion Watchlist",
    description:
      "Finds stretched names ready to revert: RSI extremes, Bollinger touch, distance from 50-day. With invalidation levels.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "27 · weekly",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "Mean reversion", color: "teal" },
      { label: "Technicals", color: "blue" },
    ],
  },

  // ─── Tools & beginner ───────────────────────────────────────────────
  {
    slug: "tearsheet",
    title: "Stock Tearsheet",
    description:
      "One-shot tearsheet for any ticker: business, financials, peers, technicals, ownership, recent news. Bookmarkable.",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "28 · on demand",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "Tearsheet", color: "blue" },
      { label: "Beginner", color: "green" },
    ],
  },
  {
    slug: "multifactor-screen",
    title: "Multifactor Screen",
    description:
      "Customizable factor screen: value + quality + momentum + size. Returns top names with factor scorecards.",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "29 · weekly",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "Factor", color: "purple" },
      { label: "Quant", color: "blue" },
    ],
  },
  {
    slug: "trade-journal",
    title: "Trade Journal Auto",
    description:
      "Auto-generates a trade journal from your paper-trade executions: thesis, entry, exit, lessons. Markdown-ready.",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "30 · weekly",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "Journal", color: "pink" },
      { label: "Beginner", color: "green" },
    ],
  },
];

const en: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook — AI recipes for traders",
    description:
      "Runnable AI agent recipes for Longbridge. Paste a prompt into Claude Code and your agent finally gets to see your watchlist. No coding required.",
  },
  nav: {
    brand: "Cookbook",
    links: [
      { label: "Recipes", href: "#recipes" },
      { label: "Setup", href: SETUP_URL },
      { label: "FAQ", href: "#faq" },
      { label: "GitHub", href: "https://github.com/longbridge/developers" },
    ],
    searchPlaceholder: "Search recipes…",
    signIn: "Longbridge",
    signInHref: "https://longbridgeapp.com/invite/F6HEGJ",
  },
  hero: {
    eyebrow: "Open source · MCP-first · Paper trading",
    title: "Put a broker inside your AI agent.",
    description:
      "Runnable AI agent recipes for Longbridge. Drop into Claude Code and your agent gets broker hands — watchlist, quotes, options chains, positions, paper-trade order entry. No coding.",
    primaryCta: "Browse recipes",
    primaryCtaHref: "#recipes",
    secondaryCta: "Setup guide",
    secondaryCtaHref: SETUP_URL,
  },
  filterBar: {
    sortLabel: "Filter:",
    filters: [
      { label: "All", value: "all" },
      { label: "Events", value: "events" },
      { label: "Options", value: "options" },
      { label: "Portfolio", value: "portfolio" },
      { label: "Scanner", value: "scanner" },
      { label: "Tools", value: "tools" },
    ],
    statusLabels: { live: "Live", comingSoon: "Coming soon" },
  },
  recipesSection: {
    title: "Recipes",
    countLabel: `${RECIPES.length} recipes · ${RECIPES.filter((r) => r.status === "live").length} live · ${RECIPES.filter((r) => r.status === "coming-soon").length} coming`,
  },
  recipes: RECIPES,
  setupBanner: {
    title: "First time? 2-step setup",
    body: "Step 1 — connect Longbridge (CLI or MCP). Step 2 — install the Skill. Whole thing takes under 5 minutes.",
    primary: "Setup guide ↗",
    primaryHref: SETUP_URL,
    secondary: "Official docs ↗",
    secondaryHref: "https://open.longbridge.com/skill?invite-code=F6HEGJ",
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
        a: "Longbridge is [free to sign up](https://longbridgeapp.com/invite/F6HEGJ). You pay for your AI app (Claude Pro, Cursor, etc.) — same as you'd pay for any agent.",
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
      { label: "Substack", href: "https://chrisaiquant.substack.com" },
      { label: "WhatsApp", href: "https://wa.me/85266944195" },
      { label: "GitHub", href: "https://github.com/coolboylcy" },
    ],
  },
};

export default en;
