# Recipe 02: Options Scanner — High-IV-Rank Covered Calls

> An **AI agent options scanner** that ranks the cleanest covered-call candidates across your Longbridge watchlist.

## What this does

For each ticker in your watchlist that supports options, the agent pulls the current option chain, computes the 252-day **IV rank**, filters to OTM calls 30–45 DTE with delta 0.20–0.35, and ranks the results by annualized premium yield. Output is a ranked Markdown table plus a one-paragraph rationale for the top-3 candidates.

Primary trigger: paste the prompt below into your agent. Headless trigger: `python main.py`.

## Quickstart — MCP-first

**You need:** Claude Desktop (or Cursor / Claude Code / Codex) with the Longbridge MCP installed. See [`MCP_SETUP.md`](../../MCP_SETUP.md) if you haven't done that yet.

Open your agent and paste:

```
Using the Longbridge MCP, run a covered-call scan on my watchlist:

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

Paper-trading account only. No order placement.
```

## Walkthrough — what the agent will do

When you paste the prompt, the agent walks this MCP tool-call path:

1. **`watchlist.list`** — universe of tickers.
2. **`security.meta` (per ticker)** — drops the ones without `options_enabled = true`. HK options coverage is limited; this is where it shows.
3. **`options.iv_history` (per surviving ticker)** — 252 days of ATM-call IV. Agent computes IV rank inline.
4. **`options.chain_expiries` + `options.chain`** — fetches the 30–45 DTE call slice. Each row comes back with strike, bid/ask/mid, delta, OI, IV.
5. **Filter + rank (no tool call)** — agent applies the band filters and sorts by annualized yield.
6. **`calendar.events` (top 3 only)** — checks for earnings inside the DTE window so the rationale can flag event risk.
7. **Synthesis** — Markdown table plus three rationale paragraphs.

Expected output: a 10-row Markdown table sorted by annualized yield, followed by three short rationale paragraphs for the top picks.

`[screenshot: chat transcript showing the chain fetch, then the rendered table with IV rank and yield columns]`

## What you can change

- **Filter band** — change "30 <= DTE <= 45" or "0.20 <= delta <= 0.35" in the prompt. Tighter delta = lower assignment risk, smaller premium.
- **IV rank threshold** — default 0.5 in the prompt. Lower to 0.3 in a low-vol regime; raise to 0.7 for stricter signal.
- **Ownership constraint** — add a step: "only include tickers where my paper-trading account currently holds 100+ shares." The agent will call `account.positions` and filter accordingly — true covered calls vs. naked.

## Automated / headless variant

For cron, CI, or scheduled jobs:

```bash
# From the repo root
cp .env.example .env
pip install longbridge anthropic
cd recipes/02_options_scanner
python main.py
python main.py --no-llm    # skip rationale step, table-only
```

The Python fallback uses the Longbridge SDK directly. Same tool-call sequence as the MCP agent, just driven by code instead of chat.

## License & disclaimer

MIT — see [LICENSE](../../LICENSE) at repo root.

This recipe is an engineering example. **Not investment advice.** Options strategies carry significant risk including assignment, early exercise, and capital loss. IV rank is a coarse signal and does not predict realized volatility. Runs in paper-trading mode only by default; flipping to live trading is at your own risk. The author and Longbridge Securities accept no liability for any use of this code.
