> 🌐 **Language / 语言 / 語言:** [English](MCP_SETUP.md) · [简体中文](MCP_SETUP.zh-CN.md) · 繁體中文

# MCP 設定指南 — Longbridge MCP

將 **Longbridge MCP** 伺服器安裝到任意相容 MCP 的 Agent 的單頁參考文件。選擇你使用的客戶端，複製對應的設定片段即可。

> 認證採用 **OAuth 2.1** — 無需在設定檔中管理 API Token。首次呼叫工具時，瀏覽器會自動彈出 Longbridge 登入頁面。請在 [open.longbridge.com](https://open.longbridge.com) 註冊或登入。模擬交易帳戶使用相同的登入流程。

---

## 伺服器端點

| 欄位       | 值                                        |
| ---------- | ----------------------------------------- |
| 伺服器名稱 | `longbridge`                              |
| 傳輸協定   | Streamable HTTP                           |
| URL        | `https://openapi.longbridge.com/mcp`      |
| 認證方式   | OAuth 2.1（瀏覽器流程，自動探索）         |

> **注意：** 舊版 SSE 端點（`https://mcp.longbridgeapp.com/sse`）已棄用，請使用上方的 HTTP 端點。

---

## Claude Desktop

編輯你的 `claude_desktop_config.json`：

- macOS：`~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows：`%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

重新啟動 Claude Desktop。首次呼叫工具時，瀏覽器會自動開啟 OAuth 登入頁面。

---

## Cursor

開啟 **Settings → MCP**，點擊 **Add Remote MCP Server**，然後貼上：

```
https://openapi.longbridge.com/mcp
```

或直接編輯 `~/.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

重新載入視窗。首次使用時 OAuth 流程會自動啟動。

---

## Claude Code

在終端機執行一行指令完成安裝：

```bash
claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp
```

然後進行認證：

```bash
# 在 Claude Code 工作階段中執行
/mcp
# 選擇 "longbridge" → Authenticate
```

或驗證伺服器是否已註冊：

```bash
claude mcp list
# longbridge   https://openapi.longbridge.com/mcp   connected
```

---

## Codex

開啟 **Settings → MCP Servers → Add Server**，填寫：

- **Name**：`longbridge`
- **Type**：Streamable HTTP
- **URL**：`https://openapi.longbridge.com/mcp`

依提示點擊 **Authenticate**。

---

## Zed

在你的 `settings.json` 中新增：

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

## 通用 MCP 客戶端

適用於其他支援 Streamable HTTP MCP 的客戶端：

```json
{
  "name": "longbridge",
  "transport": {
    "type": "streamable-http",
    "url": "https://openapi.longbridge.com/mcp"
  }
}
```

OAuth 自動探索透過 RFC 9728 實作 — 相容的客戶端會自動處理認證流程。

---

## 驗證安裝

在你的 Agent 中詢問：

> 列出 `longbridge` MCP 伺服器提供的所有工具。

你應該能看到工具目錄，包含（非完整清單）：

- `quote.realtime` — 即時報價
- `watchlist.list` / `watchlist.add` — 自選股管理
- `account.balance` / `account.positions` — 帳戶餘額 / 持倉
- `calendar.events` — 財報、股息、股票分割事件
- `options.chain` / `options.chain_expiries` — 期權鏈
- `order.submit_paper` — 模擬交易下單

如果出現 `401 Unauthorized`，請執行 `/mcp` → `longbridge` → **Authenticate** 重新認證。如果出現 `403 Forbidden`，表示已授權的 OAuth 權限範圍不包含該工具 — 請重新認證並核准所需的權限範圍。

---

## 憑證安全

- **設定檔中不儲存 Token。** OAuth 憑證由 MCP 客戶端在本機保存，不會出現在你提交至程式碼儲存庫的設定檔中。
- **隨時撤銷授權**，入口：Longbridge 帳戶安全設定 [open.longbridge.com](https://open.longbridge.com)。
- **模擬 ≠ 實盤。** 模擬交易帳戶是沙盒帳戶 — 無法提交真實資金訂單。
- **Python SDK 備用方案**（適用於 headless `main.py` 腳本）仍需使用開發者入口網站提供的 `LONGBRIDGE_APP_KEY` / `LONGBRIDGE_APP_SECRET` / `LONGBRIDGE_ACCESS_TOKEN` — 該憑證路徑與 MCP OAuth 相互獨立。

---

## 授權與免責聲明

MIT — 參見 [LICENSE](LICENSE)。本文件為設定說明文件，不構成投資建議。
