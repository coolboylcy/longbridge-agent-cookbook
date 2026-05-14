# Contributing

Thanks for thinking about contributing. This repo stays useful only if every recipe is small, runnable, and honest — and **MCP-first**. Read this before opening a PR.

## The bar

A recipe is accepted if:

- The MCP-first prompt in the README runs end-to-end in Claude Desktop / Cursor / Codex against a paper-trading Longbridge MCP install.
- The `README.md` follows the template (every section, in order — **prompt first, headless fallback second**).
- Optional `main.py` (the headless fallback) is under ~200 lines and has the paper-trading safety guard at the top.
- The recipe does one thing. Multi-step pipelines belong in their own folder.
- It does not commit secrets, real positions, or anything that could leak a user's account.

## Adding a recipe — MCP-first, step by step

### 1. Fork & clone

```bash
git clone https://github.com/<your-username>/longbridge-agent-cookbook.git
cd longbridge-agent-cookbook
git checkout -b recipe/your-recipe-name
```

### 2. Copy the template

```bash
cp -r recipes/_template recipes/04_your_recipe_name
```

Recipe folder naming: `NN_snake_case_name` where `NN` is the next available two-digit prefix.

### 3. Write the prompt first

The recipe **is** the prompt. Open `recipes/04_your_recipe_name/README.md` and fill in the **Quickstart — MCP-first** section before anything else. Your prompt should:

- Reference Longbridge MCP tools by intent ("pull my watchlist", "fetch the option chain"), not by exact tool name. The agent picks the right tool — your job is to make the goal unambiguous.
- Be specific about output format ("Markdown table with columns X, Y, Z", not "summarize the data").
- Bound the work ("only consider DTE 30–45", "paper-trading account only").
- End with a safety line: "Paper-trading account only. No order placement." when the recipe could conceivably touch trade endpoints.

### 4. Document the tool-call walkthrough

Fill in the **Walkthrough — what the agent will do** section. This is the educational core of the recipe. List, in order, the MCP tools the agent will likely call and what each one is for. Readers learn what's happening under the hood.

### 5. Fill the rest of the README sections

- **What this does** — one paragraph, no fluff.
- **What you can change** — exactly 3 bullets. Each one should be a single-prompt edit, not a code change.
- **Automated / headless variant** — point at `main.py`. Keep this section short.
- **License & disclaimer** — copy from any existing recipe.

### 6. Optional: write `main.py` for headless use

If the recipe makes sense as a scheduled job, ship a fallback. Start from this skeleton:

```python
"""Recipe NN: <short description> — headless variant.

Primary execution path is MCP-first via README.md. This file is the cron /
CI / Lambda fallback that uses the Longbridge Python SDK directly.
"""
import os

if os.getenv("TRADING_MODE", "paper") != "paper":
    raise SystemExit("Refusing to run in non-paper mode. Set TRADING_MODE=paper.")

# TODO: imports
# TODO: your logic — mirror the MCP tool-call sequence
```

Guidelines:

- Use the official `longbridge` Python SDK. Don't roll your own HTTP client.
- Print human-readable output by default. Add `--json` if you need structured.
- No hardcoded symbols beyond a sensible default. Read from `WATCHLIST` env var or CLI arg.
- Fail loud on missing credentials. Don't silently fall back.
- The output of `main.py` should be substantially similar to what the MCP-driven agent produces. Consistency is the point.

### 7. Update the root README

Add your recipe as a new row in the **Recipes** table in `/README.md`. Set `Status` to `scaffolded` until it's been run end-to-end on a clean machine (both the MCP-first path and the headless fallback if you shipped one), then `working`.

### 8. Open a PR

PR title format: `recipe(NN): short description`

PR body must include:

- A 2–3 sentence summary.
- A paste of the MCP chat transcript running the recipe (truncate if long). At minimum, show the tool-call sequence and the final output.
- If you shipped `main.py`: a paste of its terminal output too.
- Confirmation you ran in paper mode.

## What I will reject

- Recipes where the README is just `python main.py`. The MCP-first prompt is mandatory.
- Recipes that wrap one MCP tool call. Show a useful workflow, not a thin shim.
- Recipes that need a paid third-party API to function. Optional integrations are fine.
- Anything trading-strategy-shaped. This repo is engineering examples, not alpha.
- README files that lead with marketing. Show, don't sell.

## Code style

No black/ruff config enforced yet. Be reasonable. If you really want a style guide: PEP 8 + double quotes.

## License

By contributing you agree your contribution is licensed under the [MIT License](LICENSE).
