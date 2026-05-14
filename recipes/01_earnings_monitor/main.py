"""Recipe 01: Earnings Monitor — headless variant.

This is the **headless / CI / cron fallback** for Recipe 01. The primary
execution path is MCP-first: paste the prompt from README.md into Claude
Desktop / Cursor / Codex with the Longbridge MCP installed and the agent
will produce the same output without running this script. See README.md
("Quickstart — MCP-first") for the canonical flow.

Use this file when:
  - You need a deterministic, schedulable run (cron, GitHub Actions, Lambda)
  - You don't have a chat agent in the loop
  - You want to pipe the Markdown brief into another tool

Watches a Longbridge watchlist for upcoming earnings and emits a 24h pre-brief
plus a 1h post-recap via the Longbridge Python SDK. Paper-trading only.

Run:
    python main.py             # default: pre-brief mode
    python main.py --mode recap
"""
from __future__ import annotations

import os
import sys

# ── Safety guard ────────────────────────────────────────────────────────────
if os.getenv("TRADING_MODE", "paper") != "paper":
    raise SystemExit(
        "Refusing to run in non-paper mode. Set TRADING_MODE=paper in .env."
    )

# ── Imports (placeholders — real SDK calls filled in over Week 2-4) ─────────
# from longbridge.openapi import Config, QuoteContext, TradeContext
# from anthropic import Anthropic


def load_watchlist() -> list[str]:
    """Return the watchlist as a list of Longbridge-format tickers.

    Default source: WATCHLIST env var (comma-separated).
    Alternative: pull live from Longbridge via TradeContext.
    """
    raw = os.getenv("WATCHLIST", "")
    if not raw:
        raise SystemExit("WATCHLIST env var is empty. See .env.example.")
    return [s.strip() for s in raw.split(",") if s.strip()]


def find_upcoming_earnings(tickers: list[str], hours: int = 24) -> list[dict]:
    """Filter watchlist to tickers with earnings within the next `hours`.

    Returns a list of {ticker, earnings_datetime_utc, is_amc_or_bmo} dicts.
    """
    # TODO: instantiate QuoteContext from env credentials
    # TODO: for each ticker, call calendar_events() and filter event_type == "earnings"
    # TODO: filter window: now <= event_time <= now + hours
    raise NotImplementedError("TODO: implement earnings-calendar query")


def gather_context(ticker: str) -> dict:
    """Pull prior-quarter results, consensus, options-implied move, beat/miss history."""
    # TODO: last 4 quarters EPS/revenue via fundamentals endpoint
    # TODO: current consensus EPS/revenue
    # TODO: front-week ATM call+put mid → implied move = (call_mid + put_mid) / spot
    # TODO: past 8 quarters beat/miss vs consensus
    raise NotImplementedError("TODO: implement context gathering")


def generate_brief(ticker: str, ctx: dict) -> str:
    """Format context into a prompt and ask Claude for a Markdown brief."""
    # TODO: load prompt template from prompts/brief.md
    # TODO: call Anthropic API with ctx as input variables
    # TODO: return the Markdown string
    raise NotImplementedError("TODO: implement LLM brief generation")


def generate_recap(ticker: str, ctx: dict, reported: dict) -> str:
    """Compare reported numbers vs the cached consensus and write a 1-para recap."""
    # TODO: load prompt template from prompts/recap.md
    # TODO: compute beat/miss/in-line verdict on revenue, EPS, guidance
    # TODO: call Anthropic API and return Markdown
    raise NotImplementedError("TODO: implement LLM recap generation")


def main(mode: str = "brief") -> int:
    tickers = load_watchlist()
    print(f"Paper mode OK. Watching {len(tickers)} tickers: {', '.join(tickers)}")

    if mode == "brief":
        upcoming = find_upcoming_earnings(tickers, hours=24)
        if not upcoming:
            print("No upcoming earnings in the next 24h.")
            return 0
        for event in upcoming:
            ctx = gather_context(event["ticker"])
            print(generate_brief(event["ticker"], ctx))
        return 0

    if mode == "recap":
        # TODO: load cached consensus, fetch reported, generate recaps
        raise NotImplementedError("TODO: implement recap mode")

    raise SystemExit(f"Unknown mode: {mode}. Use 'brief' or 'recap'.")


if __name__ == "__main__":
    arg_mode = "brief"
    if "--mode" in sys.argv:
        arg_mode = sys.argv[sys.argv.index("--mode") + 1]
    sys.exit(main(arg_mode))
