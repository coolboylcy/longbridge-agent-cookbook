# Recipe NN: [TODO recipe name]

> [TODO one-line tagline — what does this agent do, in one sentence?]

## What this does

[TODO 1 paragraph. Be concrete. "Agent watches your watchlist for X and emits Y."
Mention the trigger (chat prompt? cron? webhook?) and the output (chat reply?
Markdown? file? Slack?).]

## Quickstart — MCP-first

**You need:** an MCP-capable agent (Claude Desktop, Cursor, Claude Code, Codex) with the
Longbridge MCP installed. If you haven't done that yet, see the root
[`MCP_SETUP.md`](../../MCP_SETUP.md) — it's about 60 seconds.

Once installed, open your agent and paste this prompt:

```
[TODO your recipe prompt — be specific. Reference Longbridge MCP tools by intent,
not name. E.g.: "Using the Longbridge MCP, pull my watchlist, find tickers with
earnings in the next 24h, and write a Markdown brief for each one."]
```

That's it. The agent will call the MCP tools in sequence and produce the output.

## Walkthrough — what the agent will do

When you paste the prompt above, expect this tool-call sequence:

1. **[TODO step 1 — e.g. "watchlist.list"]** — [TODO what the agent fetches and why]
2. **[TODO step 2 — e.g. "calendar.events"]** — [TODO]
3. **[TODO step 3 — e.g. "fundamentals.quarterly"]** — [TODO]
4. **[TODO step 4 — synthesis]** — [TODO what the agent does with the data]

Expected output: [TODO 1–2 lines describing what success looks like.]

`[screenshot: chat transcript showing the tool calls and final output]`

## What you can change

- **[TODO knob 1]** — [TODO how to tweak it in the prompt]
- **[TODO knob 2]** — [TODO]
- **[TODO knob 3]** — [TODO]

## Automated / headless variant

For cron, GitHub Actions, or any context where there's no chat agent in the loop, this
recipe also ships a Python fallback that uses the Longbridge Python SDK directly.

```bash
# From the repo root
cp .env.example .env
# edit .env → LONGBRIDGE_APP_KEY / APP_SECRET / ACCESS_TOKEN, TRADING_MODE=paper
pip install longbridge
cd recipes/NN_recipe_name
python main.py
```

The output of `main.py` is intentionally similar to what the MCP-driven agent produces.
Use it when you want a deterministic, schedulable, agent-free run.

## License & disclaimer

MIT — see [LICENSE](../../LICENSE) at repo root.

This recipe is an engineering example. **Not investment advice.** Runs in
paper-trading mode only by default; flipping to live trading is at your own
risk. The author and Longbridge Securities accept no liability for any use
of this code.
