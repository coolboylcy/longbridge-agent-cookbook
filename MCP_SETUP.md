> 🌐 **Language / 语言 / 語言:** English · [简体中文](MCP_SETUP.zh-CN.md) · [繁體中文](MCP_SETUP.zh-TW.md)

# Setup — Connect Longbridge to your AI assistant

This is the cookbook-flavored short version. The **canonical guide** is the official one at <https://open.longbridge.com/skill/install.md> — when in doubt, follow that.

Installation is a **two-step process**:

1. **Connect** your AI tool to the Longbridge platform — via CLI (recommended) or MCP
2. **Install the Skill** — a set of instruction files that tells your AI what Longbridge can do

Skip either step and your AI won't have broker hands.

---

## Step 1 — Connect to the Longbridge platform

Pick **one** of the two methods below.

| Path                | Best for                                                        | Local install? |
| ------------------- | --------------------------------------------------------------- | -------------- |
| **A. CLI** (recommended) | Claude Code, Codex (Work locally), opencode, OpenClaw, Warp, Gemini CLI | Yes            |
| **B. MCP**          | Claude Desktop, Cursor, Zed, Gemini CLI, Warp                   | No             |

### Method A — CLI (recommended)

Install the `longbridge` terminal binary so the AI can run shell commands on your behalf.

**macOS — Homebrew:**

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

**macOS / Linux — curl:**

```bash
curl -sSL https://open.longbridge.com/longbridge/longbridge-terminal/install | sh
```

**Windows — Scoop:**

```powershell
scoop install https://open.longbridge.com/longbridge/longbridge-terminal/longbridge.json
```

**Windows — PowerShell:**

```powershell
iwr https://open.longbridge.com/longbridge/longbridge-terminal/install.ps1 | iex
```

**Authenticate:**

```bash
longbridge auth login
```

A browser window opens for OAuth login. Paper-trading accounts use the same flow.

**Claude Code users — allowlist `longbridge` commands** so Claude doesn't ask permission every time. Add to `.claude/settings.json` in your project:

```json
{
  "permissions": {
    "allow": ["Bash(longbridge *)"]
  }
}
```

### Method B — MCP

Add Longbridge as a remote MCP server in your AI tool's config:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

> **Mainland China users** can use the accelerated endpoint: `https://openapi.longbridge.cn/mcp`

| Client         | Where to configure                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Desktop | Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| Cursor         | Settings → MCP Servers → Add Remote MCP Server                                                                                            |
| Zed            | `context_servers` key in `~/.config/zed/settings.json`                                                                                    |
| Gemini CLI     | `mcpServers` key in `~/.gemini/settings.json`                                                                                             |
| Warp           | Settings → AI → MCP Servers → Add                                                                                                         |

First time you ask a Longbridge question, your client opens a browser for OAuth — no API key in config files.

---

## Step 2 — Install the Skill

The Skill is a bundle of instruction files that tells your AI what Longbridge can do and how to call it. **Without the Skill, the AI may not know to use Longbridge even after Step 1.**

**Claude Code plugin (recommended for Claude Code users):**

Inside a Claude Code session:

```
/plugin marketplace add longbridge/skills
/plugin install longbridge@longbridge-skills
```

Auto-updates handled by Claude Code's plugin system.

**npx / bunx (any tool):**

```bash
# Node
npx skills add longbridge/skills -g
# Bun
bunx skills add longbridge/skills -g
```

Requires [Node.js](https://nodejs.org) or [Bun](https://bun.sh).

**ZIP download (manual):**

Download <https://open.longbridge.com/skill/longbridge-all.zip>, unzip, drop into your AI tool's Skill directory:

- Claude Code: `.claude/skills/`
- Cursor: paste into Rules editor
- Others: see the ZIP's README

**OpenClaw** — just send this in chat, it auto-installs:

```
Install the Longbridge Developers Skill from this zip file:
https://open.longbridge.com/skill/longbridge-all.zip
```

---

## Verify

In your AI assistant, run:

```
Use Longbridge to get the current quote for AAPL
```

If you see a live price, you're done. If the Skill isn't triggering automatically, prefix with `/longbridge`:

```
/longbridge get the current quote for AAPL
```

---

## Known restrictions

### Claude Desktop — switch to the **Code** tab

Chat and Cowork modes in Claude Desktop **block CLI install and MCP connections** via network whitelist. Switch to the **Code** tab (embedded Claude Code) — full terminal access in one session.

### Codex — select **Work locally**

Codex in Cloud mode has the same restriction. Start a new session and pick **Work locally** for full shell and network access.

### Claude.ai and ChatGPT.com (web)

Browser-only interfaces cannot run shell commands or connect to MCP servers. Use [Claude Desktop](https://claude.ai/download) → Code tab, or any of the local clients above.

---

## Troubleshooting

**AI says it can't find Longbridge tools.** Restart your client or start a new conversation — the Skill needs to be reloaded once.

**Prompted for auth every time you query.** Run `longbridge auth login` again and complete OAuth.

**Trading operations not working.** Confirm your account has OpenAPI trading permissions and is eligible to trade in the target market (HK / US).

**`401 Unauthorized` on MCP path.** Re-run the OAuth flow from your MCP client's Authenticate menu.

**Revoke access.** Longbridge account → Security Settings → manage authorized apps.

---

## Credential hygiene

- **No tokens in config files.** OAuth credentials are stored client-side by your AI tool, not in committed configs.
- **Paper ≠ live.** Paper-trading accounts are sandbox — they cannot place real-money orders. The recipes in this cookbook default to paper.
- **Python SDK fallback** (for headless `recipes/NN/main.py` scripts) still uses `LONGBRIDGE_APP_KEY` / `LONGBRIDGE_APP_SECRET` / `LONGBRIDGE_ACCESS_TOKEN` from the dev portal — a separate credential path from Skill / MCP OAuth.

---

## License & disclaimer

MIT — see [LICENSE](LICENSE). This is configuration documentation, not investment advice.
