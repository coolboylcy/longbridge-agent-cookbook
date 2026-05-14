> 🌐 **Language / 语言 / 語言:** [English](MCP_SETUP.md) · 简体中文 · [繁體中文](MCP_SETUP.zh-TW.md)

# MCP 配置指南 — Longbridge MCP

将 **Longbridge MCP** 服务器安装到任意兼容 MCP 的 Agent 的单页参考文档。选择你使用的客户端，复制对应配置片段即可。

> 认证采用 **OAuth 2.1** — 无需在配置文件中管理 API Token。首次调用工具时，浏览器会自动弹出 Longbridge 登录页面。请在 [open.longbridge.com](https://open.longbridge.com) 注册或登录。模拟交易账户使用相同的登录流程。

---

## 服务器端点

| 字段       | 值                                        |
| ---------- | ----------------------------------------- |
| 服务器名称 | `longbridge`                              |
| 传输协议   | Streamable HTTP                           |
| URL        | `https://openapi.longbridge.com/mcp`      |
| 认证方式   | OAuth 2.1（浏览器流程，自动发现）         |

> **注意：** 旧版 SSE 端点（`https://mcp.longbridgeapp.com/sse`）已废弃，请使用上方的 HTTP 端点。

---

## Claude Desktop

编辑你的 `claude_desktop_config.json`：

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

重启 Claude Desktop。首次调用工具时，浏览器会自动打开 OAuth 登录页面。

---

## Cursor

打开 **Settings → MCP**，点击 **Add Remote MCP Server**，然后粘贴：

```
https://openapi.longbridge.com/mcp
```

或直接编辑 `~/.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

重新加载窗口。首次使用时 OAuth 流程会自动启动。

---

## Claude Code

在终端执行一行命令完成安装：

```bash
claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp
```

然后进行认证：

```bash
# 在 Claude Code 会话中执行
/mcp
# 选择 "longbridge" → Authenticate
```

或验证服务器是否已注册：

```bash
claude mcp list
# longbridge   https://openapi.longbridge.com/mcp   connected
```

---

## Codex

打开 **Settings → MCP Servers → Add Server**，填写：

- **Name**：`longbridge`
- **Type**：Streamable HTTP
- **URL**：`https://openapi.longbridge.com/mcp`

按提示点击 **Authenticate**。

---

## Zed

在你的 `settings.json` 中添加：

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

## 通用 MCP 客户端

适用于其他支持 Streamable HTTP MCP 的客户端：

```json
{
  "name": "longbridge",
  "transport": {
    "type": "streamable-http",
    "url": "https://openapi.longbridge.com/mcp"
  }
}
```

OAuth 自动发现通过 RFC 9728 实现 — 兼容的客户端会自动处理认证流程。

---

## 验证安装

在你的 Agent 中询问：

> 列出 `longbridge` MCP 服务器提供的所有工具。

你应该能看到工具列表，包含（非完整列表）：

- `quote.realtime` — 实时行情
- `watchlist.list` / `watchlist.add` — 自选股管理
- `account.balance` / `account.positions` — 账户余额 / 持仓
- `calendar.events` — 财报、分红、拆股事件
- `options.chain` / `options.chain_expiries` — 期权链
- `order.submit_paper` — 模拟交易下单

如果出现 `401 Unauthorized`，请执行 `/mcp` → `longbridge` → **Authenticate** 重新认证。如果出现 `403 Forbidden`，说明已授权的 OAuth 权限范围不包含该工具 — 请重新认证并批准所需权限范围。

---

## 凭证安全

- **配置文件中不存储 Token。** OAuth 凭证由 MCP 客户端在本地保存，不会出现在你提交到代码仓库的配置文件中。
- **随时撤销授权**，入口：Longbridge 账户安全设置 [open.longbridge.com](https://open.longbridge.com)。
- **模拟 ≠ 实盘。** 模拟交易账户是沙盒账户 — 无法提交真实资金订单。
- **Python SDK 回退方案**（适用于 headless `main.py` 脚本）仍需使用开发者门户提供的 `LONGBRIDGE_APP_KEY` / `LONGBRIDGE_APP_SECRET` / `LONGBRIDGE_ACCESS_TOKEN` — 该凭证路径与 MCP OAuth 相互独立。

---

## 许可证与免责声明

MIT — 参见 [LICENSE](LICENSE)。本文档为配置说明文档，不构成投资建议。
