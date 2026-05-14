> 🌐 **Language / 语言 / 語言:** English · [简体中文](MCP_SETUP.zh-CN.md) · [繁體中文](MCP_SETUP.zh-TW.md)

# MCP Setup — Longbridge MCP

One-page reference for installing the **Longbridge MCP** server into any MCP-compatible agent. Pick your client below and paste the matching snippet.

> Authentication uses **OAuth 2.1** — no API token to manage in config files. On first tool call, a browser window opens for Longbridge login. Sign up or log in at [open.longbridge.com](https://open.longbridge.com). Paper-trading accounts use the same flow.

---

## Server endpoint

| Field        | Value                                    |
| ------------ | ---------------------------------------- |
| Server name  | `longbridge`                             |
| Transport    | Streamable HTTP                          |
| URL          | `https://openapi.longbridge.com/mcp`     |
| Auth         | OAuth 2.1 (browser flow, auto-discovery) |

> **Note:** The legacy SSE endpoint (`https://mcp.longbridgeapp.com/sse`) is deprecated. Use the HTTP endpoint above.

---

## Claude Desktop

Edit your `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

Restart Claude Desktop. On the first tool invocation, a browser window opens for OAuth login.

---

## Cursor

Open **Settings → MCP** and click **Add Remote MCP Server**, then paste:

```
https://openapi.longbridge.com/mcp
```

Or edit `~/.cursor/mcp.json` directly:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

Reload the window. On first use the OAuth flow opens automatically.

---

## Claude Code

One-line install from your terminal:

```bash
claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp
```

Then authenticate:

```bash
# Inside a Claude Code session
/mcp
# Select "longbridge" → Authenticate
```

Or verify the server is registered:

```bash
claude mcp list
# longbridge   https://openapi.longbridge.com/mcp   connected
```

---

## Codex

Open **Settings → MCP Servers → Add Server**. Set:

- **Name**: `longbridge`
- **Type**: Streamable HTTP
- **URL**: `https://openapi.longbridge.com/mcp`

Click **Authenticate** when prompted.

---

## Zed

Add to your `settings.json`:

```json
{
  "context_servers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

---

## Generic MCP client

For any other client that speaks Streamable HTTP MCP:

```json
{
  "name": "longbridge",
  "transport": {
    "type": "streamable-http",
    "url": "https://openapi.longbridge.com/mcp"
  }
}
```

OAuth auto-discovery is implemented via RFC 9728 — compliant clients handle authentication automatically.

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

If you see `401 Unauthorized`, run `/mcp` → `longbridge` → **Authenticate** again. If `403 Forbidden`, the OAuth scope granted doesn't cover the tool — re-authenticate and approve the required scopes.

---

## Credential hygiene

- **No tokens in config files.** OAuth credentials are stored client-side by the MCP client, not in config files you commit.
- **Revoke access anytime** from your Longbridge account security settings at [open.longbridge.com](https://open.longbridge.com).
- **Paper ≠ live.** Paper-trading accounts are sandbox accounts — they cannot place real-money orders.
- **Python SDK fallback** (for headless `main.py` scripts) still uses `LONGBRIDGE_APP_KEY` / `LONGBRIDGE_APP_SECRET` / `LONGBRIDGE_ACCESS_TOKEN` from the developer portal — that credential path is separate from MCP OAuth.

---

## License & disclaimer

MIT — see [LICENSE](LICENSE). This is configuration documentation, not investment advice.
