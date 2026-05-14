"""Recipe 03: Weekly Portfolio Review — headless variant.

This is the **headless / CI / cron fallback** for Recipe 03. The primary
execution path is MCP-first: paste the prompt from README.md into Claude
Desktop / Cursor / Codex with the Longbridge MCP installed and the agent
will produce the weekly review without running this script. See README.md
("Quickstart — MCP-first") for the canonical flow.

Use this file when you want the review to land on disk every Sunday without
opening a chat agent (cron, GitHub Actions, Lambda).

Ingests paper-trading positions via the Longbridge Python SDK and writes a
weekly journal-style review: 3 observations + 3 questions. Paper-trading only.

Run:
    python main.py
"""
from __future__ import annotations

import os
import sys
from datetime import date

# ── Safety guard ────────────────────────────────────────────────────────────
if os.getenv("TRADING_MODE", "paper") != "paper":
    raise SystemExit(
        "Refusing to run in non-paper mode. Set TRADING_MODE=paper in .env."
    )

# ── Imports (placeholders) ──────────────────────────────────────────────────
# from longbridge.openapi import Config, TradeContext, QuoteContext
# from anthropic import Anthropic

# ── Config ──────────────────────────────────────────────────────────────────
WINDOW_DAYS = 7
REVIEWS_DIR = os.path.join(os.path.dirname(__file__), "reviews")


def fetch_account_state() -> dict:
    """Return current NAV, cash, and stock positions."""
    # TODO: TradeContext.account_balance() and TradeContext.stock_positions()
    # TODO: return {"nav": ..., "cash": ..., "positions": [{...}, ...]}
    raise NotImplementedError("TODO: implement account-state fetch")


def fetch_recent_trades(days: int = WINDOW_DAYS) -> list[dict]:
    """Return all executions within the last `days` days."""
    # TODO: TradeContext.history_executions(start=now-days, end=now)
    # TODO: shape into [{symbol, side, qty, price, ts, realized_pnl_if_closing}, ...]
    raise NotImplementedError("TODO: implement trade-history fetch")


def compute_metrics(state: dict, trades: list[dict]) -> dict:
    """Compute the metric pack the LLM will reason over."""
    # TODO: trade count, win rate of closed trades, avg holding period
    # TODO: largest winner / loser this week (realized)
    # TODO: sector mix via security metadata → GICS
    # TODO: top-3 concentration (% NAV)
    # TODO: WoW NAV change
    # TODO: largest unrealized winner / loser among open positions
    raise NotImplementedError("TODO: implement metric computation")


def classify_sector(ticker: str) -> str:
    """Map a Longbridge ticker to a GICS sector string."""
    # TODO: security metadata API → industry → roll up to sector
    raise NotImplementedError("TODO: implement sector classifier")


def generate_review(metrics: dict) -> str:
    """LLM-generated 3-observations + 3-questions review."""
    # TODO: load prompt template from prompts/review.md
    # TODO: call Anthropic with metrics as context
    # TODO: return Markdown body (NOT including the H1 title — main() adds that)
    raise NotImplementedError("TODO: implement LLM review generation")


def iso_week_filename(d: date | None = None) -> str:
    """Return the review filename for a given date, e.g. 'reviews/2026-W19.md'."""
    d = d or date.today()
    iso_year, iso_week, _ = d.isocalendar()
    return os.path.join(REVIEWS_DIR, f"{iso_year}-W{iso_week:02d}.md")


def write_or_append(path: str, body: str) -> None:
    """Write the review. If file exists, append a delta section instead."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path):
        # TODO: append a "## Delta — <timestamp>" section
        raise NotImplementedError("TODO: implement append-delta path")
    with open(path, "w") as f:
        f.write(body)


def main() -> int:
    state = fetch_account_state()
    print(
        f"Paper mode OK. NAV: ${state['nav']:,.0f} — "
        f"{len(state['positions'])} positions, ${state['cash']:,.0f} cash."
    )

    trades = fetch_recent_trades(days=WINDOW_DAYS)
    metrics = compute_metrics(state, trades)
    body = generate_review(metrics)

    path = iso_week_filename()
    write_or_append(path, body)
    print(f"Review written to {path}\n")
    print(body)
    return 0


if __name__ == "__main__":
    sys.exit(main())
