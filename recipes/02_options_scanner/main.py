"""Recipe 02: Options Scanner — headless variant.

This is the **headless / CI / cron fallback** for Recipe 02. The primary
execution path is MCP-first: paste the prompt from README.md into Claude
Desktop / Cursor / Codex with the Longbridge MCP installed and the agent
will produce the ranked covered-call table without running this script.
See README.md ("Quickstart — MCP-first") for the canonical flow.

Use this file when you need a deterministic, schedulable run with no chat
agent in the loop.

Scans option chains across a watchlist and ranks covered-call candidates by
annualized premium yield, filtered to elevated-IV-rank underlyings, via the
Longbridge Python SDK. Paper-trading only.

Run:
    python main.py
    python main.py --no-llm     # skip LLM rationale step
"""
from __future__ import annotations

import os
import sys

# ── Safety guard ────────────────────────────────────────────────────────────
if os.getenv("TRADING_MODE", "paper") != "paper":
    raise SystemExit(
        "Refusing to run in non-paper mode. Set TRADING_MODE=paper in .env."
    )

# ── Imports (placeholders) ──────────────────────────────────────────────────
# from longbridge.openapi import Config, QuoteContext, TradeContext
# from anthropic import Anthropic

# ── Config knobs (see config.py for production) ─────────────────────────────
DTE_MIN = 30
DTE_MAX = 45
DELTA_MIN = 0.20
DELTA_MAX = 0.35
IV_RANK_MIN = 0.50
MIN_OPEN_INTEREST = 100
TOP_N = 10


def load_watchlist() -> list[str]:
    raw = os.getenv("WATCHLIST", "")
    if not raw:
        raise SystemExit("WATCHLIST env var is empty. See .env.example.")
    return [s.strip() for s in raw.split(",") if s.strip()]


def filter_options_enabled(tickers: list[str]) -> list[str]:
    """Drop tickers that don't have options coverage on Longbridge."""
    # TODO: query security metadata; keep where options_enabled == True
    raise NotImplementedError("TODO: implement options-enabled filter")


def compute_iv_rank(ticker: str) -> float:
    """Compute 252-day IV rank for a single ticker.

    iv_rank = (iv_today - iv_min_252d) / (iv_max_252d - iv_min_252d)
    """
    # TODO: pull 252d ATM-call IV history (nearest 30-DTE strike each day)
    # TODO: compute min/max/current and return the ratio
    raise NotImplementedError("TODO: implement IV-rank calculation")


def fetch_call_chain(ticker: str) -> list[dict]:
    """Pull the full call chain. Filter to OTM calls within DTE band."""
    # TODO: QuoteContext.option_chain_expiry_date_list + option_chain_info_by_date
    # TODO: filter: DTE_MIN <= DTE <= DTE_MAX, strike > spot, bid > 0.05, oi >= MIN_OI
    # TODO: enrich each row with delta and mid_price
    raise NotImplementedError("TODO: implement chain fetch")


def rank_candidates(candidates: list[dict]) -> list[dict]:
    """Sort by annualized premium yield, descending. Return top N."""
    # annualized_yield = (mid_price / strike) * (365 / DTE)
    # TODO: filter by DELTA_MIN <= delta <= DELTA_MAX
    # TODO: compute yield, sort, return top TOP_N
    raise NotImplementedError("TODO: implement ranking")


def generate_rationale(candidate: dict) -> str:
    """LLM-generated one-paragraph rationale for a top candidate."""
    # TODO: load prompts/rationale.md, fill template, call Anthropic
    raise NotImplementedError("TODO: implement LLM rationale")


def render_table(candidates: list[dict]) -> str:
    """Render the ranked candidates as a Markdown table."""
    # TODO: columns: Ticker | Strike | Expiry | DTE | Delta | Mid | IV Rank | Ann Yield
    raise NotImplementedError("TODO: implement table renderer")


def main(use_llm: bool = True) -> int:
    tickers = load_watchlist()
    tickers = filter_options_enabled(tickers)
    print(f"Paper mode OK. {len(tickers)} tickers options-enabled.")

    elevated = [t for t in tickers if compute_iv_rank(t) >= IV_RANK_MIN]
    print(f"{len(elevated)} tickers passed IV-rank floor of {IV_RANK_MIN}.")

    all_candidates: list[dict] = []
    for t in elevated:
        all_candidates.extend(fetch_call_chain(t))

    ranked = rank_candidates(all_candidates)
    print(render_table(ranked))

    if use_llm:
        for top in ranked[:3]:
            print(generate_rationale(top))

    return 0


if __name__ == "__main__":
    sys.exit(main(use_llm="--no-llm" not in sys.argv))
