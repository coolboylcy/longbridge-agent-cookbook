# MCP Setup — Longbridge MCP

One-page reference for installing the **Longbridge MCP** server into any MCP-compatible agent. Pick your client below and paste the matching snippet.

> Use a **paper-trading token** for everything in this cookbook. Get one from [open.longbridgeapp.com](https://open.longbridgeapp.com) → Developer Center → **MCP Tokens** → Issue paper token. Never embed a real-money token in a config file.

---

## Server endpoint

| Field        | Value                                  |
| ------------ | -------------------------------------- |
| Server name  | `longbridge`                           |
| Transport    | SSE (Server-Sent Events)               |
| URL          | `https://mcp.longbridgeapp.com/sse`    |
| Auth         | `Authorization: Bearer <token>` header |

---

## Claude Desktop

Edit your `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

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

Restart Claude Desktop. The Longbridge tools will appear in the tool picker.

---

## Cursor

Open **Settings → MCP** and add a server, or edit `~/.cursor/mcp.json`:

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

Reload the window. Verify by typing `@longbridge` in chat — the server's tools should autocomplete.

---

## Claude Code

One-line install from your terminal:

```bash
claude mcp add longbridge https://mcp.longbridgeapp.com/sse \
  --header "Authorization: Bearer <your-longbridge-paper-token>"
```

Or edit the generated config at `~/.config/claude/mcp.json` directly using the same JSON shape as Claude Desktop.

Verify:

```bash
claude mcp list
# longbridge   https://mcp.longbridgeapp.com/sse   connected
```

---

## Codex

In your Codex MCP config (typically `~/.codex/config.toml` or the equivalent JSON):

```json
{
  "mcp_servers": {
    "longbridge": {
      "transport": "sse",
      "url": "https://mcp.longbridgeapp.com/sse",
      "headers": {
        "Authorization": "Bearer <your-longbridge-paper-token>"
      }
    }
  }
}
```

Restart Codex.

---

## Generic MCP client

For any other client that speaks MCP, use this canonical shape:

```json
{
  "name": "longbridge",
  "transport": {
    "type": "sse",
    "url": "https://mcp.longbridgeapp.com/sse"
  },
  "auth": {
    "type": "bearer",
    "token": "<your-longbridge-paper-token>"
  }
}
```

If your client supports stdio MCP only, run the Longbridge MCP locally via the official `longbridge-mcp` package (see [longbridge-mcp docs](https://open.longbridgeapp.com/docs/mcp)).

---

## Verifying the install

In your agent, ask:

> List the tools available from the `longbridge` MCP server.

You should see a tool catalog including (non-exhaustive):

- `quote.realtime` — real-time quotes
- `watchlist.list` / `watchlist.add`
- `account.balance` / `account.positions`
- `calendar.events` — earnings, dividends, splits
- `options.chain` / `options.chain_expiries`
- `order.submit_paper` — paper-trade order entry

If the call fails with `401 Unauthorized`, your token is missing or malformed. If `403 Forbidden`, the token exists but lacks scope — re-issue it from the Developer Center with the scopes you need.

---

## Token hygiene

- **One token per environment.** Don't share a paper token across machines you don't trust.
- **Rotate every 90 days.** The Developer Center will warn you before expiry.
- **Never commit tokens.** The `.env` file in this repo is gitignored; MCP client config files usually are not — keep secrets out of them or use the client's secret store where available.
- **Paper ≠ live.** Paper tokens cannot place real-money orders even if you try. That's the safety net — keep it.

---

## License & disclaimer

MIT — see [LICENSE](LICENSE). This is configuration documentation, not investment advice.
