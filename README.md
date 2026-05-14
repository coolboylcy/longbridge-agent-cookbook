# longbridge-agent-cookbook

> Runnable AI agent recipes for **Longbridge Skill / MCP**. Drop into Claude Code, Cursor, or Codex and your agent gets broker hands.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Paper Trading Only](https://img.shields.io/badge/mode-paper--trading-blue.svg)](#compliance--safety)
[![MCP First](https://img.shields.io/badge/protocol-MCP%20first-7c3aed.svg)](MCP_SETUP.md)
[![Made with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-7c3aed.svg)](https://claude.com/claude-code)

---

## What this is — the Longbridge MCP cookbook

**Longbridge MCP** is the fastest way to give an AI agent real broker hands: quotes, watchlists, options chains, account state, paper-trade orders. This repo is a curated set of small, runnable **agent recipes** that plug into the Longbridge MCP server from any MCP-compatible client — Claude Desktop, Claude Code, Cursor, Codex, or your own.

Every recipe is:

- **MCP-first** — the primary execution path is "paste a prompt into Claude and watch it call Longbridge tools." No Python required to run a recipe.
- **Paper-trading by default** — `TRADING_MODE=paper`, fail-loud otherwise.
- **Self-contained** — one folder, one `README.md` (with the prompt), one optional `main.py` for headless / cron use.
- **Useful in 5 minutes** — install the MCP, paste a prompt, done.

If you've ever wanted a **Cursor agent broker** workflow or a **Claude broker** copilot without re-implementing OAuth, websocket subscriptions, or options chain parsing — start here.

## Who it's for

- **AI developers** building finance agents in Claude Code / Cursor / Codex
- **Quant hobbyists** who want a working **AI agent options scanner** they can riff on
- **MCP early adopters** evaluating MCP servers for real production data
- **KOLs and educators** looking for clean, reproducible broker-agent demos

This is **not** a trading framework, a backtester, or investment advice. It's a set of cookbook examples.

---

## 5-minute quickstart (MCP-first)

The whole point of MCP is that you don't have to clone anything to start. Here's the canonical flow:

### Step 1 — Install the Longbridge MCP into your agent

Pick your client and paste the matching snippet. Full reference: [`MCP_SETUP.md`](MCP_SETUP.md).

**Claude Desktop** — edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://mcp.longbridgeapp.com/sse",
      "headers": {
        "Authorization": "Bearer <your-longbridge-paper-token>"
      }
    }
  }
}
```

**Cursor** — Settings → MCP → add server:

```json
{
  "mcp": {
    "servers": {
      "longbridge": {
        "url": "https://mcp.longbridgeapp.com/sse",
        "headers": { "Authorization": "Bearer <your-longbridge-paper-token>" }
      }
    }
  }
}
```

**Claude Code** — one-liner:

```bash
claude mcp add longbridge https://mcp.longbridgeapp.com/sse \
  --header "Authorization: Bearer <your-longbridge-paper-token>"
```

Get your paper-trading token from [open.longbridgeapp.com](https://open.longbridgeapp.com) → Developer Center → MCP Tokens.

### Step 2 — Open your agent and paste a recipe prompt

Open Claude Desktop (or Cursor / Codex). Paste, for example:

> Using the Longbridge MCP, look at my watchlist. For every ticker with earnings in the next 24 hours, pull last quarter's results, the consensus estimate, and the front-week options-implied move. Write a tight Markdown brief per ticker.

### Step 3 — Watch your agent run

The agent will call Longbridge MCP tools in sequence (`watchlist.list`, `calendar.events`, `fundamentals.quarterly`, `options.chain`...) and produce a Markdown brief. That's the whole loop.

> No Python. No cloning. No SDK setup. That's MCP-first.

Want a deeper, opinionated prompt with screenshots and tool-call walkthroughs? See the [recipes](#recipes) below.

---

## Recipes

| #   | Recipe                                          | What it does                                                                        | Status      |
| --- | ----------------------------------------------- | ----------------------------------------------------------------------------------- | ----------- |
| 01  | [Earnings Monitor](recipes/01_earnings_monitor) | Agent watches your watchlist for upcoming earnings; 24h pre-brief + 1h post-recap.  | scaffolded  |
| 02  | [Options Scanner](recipes/02_options_scanner)   | **AI agent options scanner** for high-IV-rank covered calls on your watchlist.      | scaffolded  |
| 03  | [Portfolio Review](recipes/03_portfolio_review) | Agent ingests your paper positions; writes a weekly review with 3 observations + 3 Qs. | scaffolded  |

More coming. Have a recipe idea? [Open an issue](../../issues/new) or read [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Architecture — agent at the center

The agent (Claude / Cursor / Codex) drives. MCP is the bus. The Longbridge Skill is the broker surface. The Python SDK is a side-arrow for headless execution.

```
                        ┌───────────────────────────────┐
                        │   Claude Desktop  ·  Cursor   │
                        │   Claude Code     ·  Codex    │
                        │   (the agent — center node)   │
                        └───────────────┬───────────────┘
                                        │
                                        │  MCP protocol
                                        │  (JSON-RPC over SSE / stdio)
                                        ▼
                        ┌───────────────────────────────┐
                        │     Longbridge MCP server     │
                        │   (the connection layer —     │
                        │    quotes, options, account,  │
                        │    watchlist, paper-trade)    │
                        └───────────────┬───────────────┘
                                        │
                                        │  authenticated REST + WebSocket
                                        ▼
                        ┌───────────────────────────────┐
                        │      Longbridge Skill         │
                        │     (the broker surface —     │
                        │      paper or live OpenAPI)   │
                        └───────────────────────────────┘

                        ────  side path for headless/CI  ────

  Python SDK ─────► Longbridge OpenAPI
  (fallback for cron, GitHub Actions, scheduled jobs — see recipe main.py)
```

**Primary path (recommended):** agent → MCP → Skill. This is what every recipe README opens with.

**Fallback path (headless):** `recipe/NN/main.py` calls the Longbridge Python SDK directly. Use this when you need the recipe to run on a cron, in CI, or anywhere a chat agent isn't available. Same outputs, different driver.

---

## Compliance & safety

This repo defaults to **paper trading**. The MCP token you install in step 1 should be a paper-trading token. The fallback `main.py` files start with:

```python
import os
if os.getenv("TRADING_MODE", "paper") != "paper":
    raise SystemExit("Refusing to run in non-paper mode. Set TRADING_MODE=paper.")
```

Rules of the road:

- **No credentials in code.** Use `.env` (gitignored), your shell, or your MCP client's secret store.
- **No live orders without an explicit, separate change.** If you flip to live, you accept full responsibility.
- **Not investment advice.** None of these recipes are vetted by an investment professional. They are engineering examples.
- **Regional restrictions apply.** Longbridge is regulated in HK / SG / US. Check your jurisdiction's rules before connecting a live account.
- **Rate limits.** Be polite to the API. The SDK and MCP server both surface limits — respect them.

If you find a security issue (leaked token in a recipe, unsafe default), please email me directly rather than opening a public issue.

---

## FAQ

**Q: Do I need to clone this repo?**
No — for the MCP-first path, you don't. Install the MCP server into your agent, copy the prompt from any recipe README on GitHub, paste, run. Clone only if you want the headless `main.py` fallbacks.

**Q: Which MCP clients are supported?**
Anything that speaks MCP. Tested: Claude Desktop, Claude Code, Cursor, Codex. Generic JSON config in [`MCP_SETUP.md`](MCP_SETUP.md) covers the rest.

**Q: When should I use the Python SDK fallback instead?**
When you need headless execution: GitHub Actions, cron, Lambda, anything where a chat agent isn't in the loop. The `main.py` files in each recipe are exactly that path.

**Q: Why Python for the fallback?**
Longbridge ships 7 SDKs (Python, Go, Rust, Node, C#, Java, C++). Python is the lingua franca for AI / quant hobbyists. PRs porting the fallback scripts to other languages welcome.

**Q: Can I use this with my real account?**
Technically yes, but the repo is deliberately hostile to that path. If you do, you own every order that fires.

**Q: How do I get a Longbridge account?**
HK / SG residents: [longbridge.com](https://longbridge.com). For paper trading, the Developer Center auto-provisions a sandbox once you've registered, and issues both an MCP token and SDK app_key / app_secret.

---

## How to add a recipe

The short version:

1. Fork this repo.
2. Copy `recipes/_template/` to `recipes/NN_your_recipe_name/`.
3. Write the **prompt** first — the MCP-first quickstart in the README is the recipe.
4. Optional: add a `main.py` for headless execution. Keep it under ~200 lines with the safety guard at top.
5. Add a row to the recipes table above.
6. Open a PR.

Full guide: [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).

## Author

**Chris Liang** — Growth @ Longbridge Securities, Hong Kong.
This is a personal project. Views my own, not my employer's.
**Not investment advice.**

Find me: [X/Twitter](https://x.com/chrisaiquant) · [Substack](https://chrisliang.substack.com) · [GitHub](https://github.com/chrisaiquant)
