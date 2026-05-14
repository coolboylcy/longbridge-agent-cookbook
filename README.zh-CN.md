> 🌐 **Language / 语言 / 語言:** [English](README.md) · 简体中文 · [繁體中文](README.zh-TW.md)

# longbridge-agent-cookbook

> 可直接运行的 AI Agent 食谱，专为 **Longbridge Skill / MCP** 设计。粘贴到 Claude Code、Cursor 或 Codex，你的 Agent 立刻获得券商操盘能力。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![仅限模拟交易](https://img.shields.io/badge/模式-模拟交易-blue.svg)](#合规与安全)
[![MCP 优先](https://img.shields.io/badge/协议-MCP%20优先-7c3aed.svg)](MCP_SETUP.md)
[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-7c3aed.svg)](https://claude.com/claude-code)

---

## 这是什么 — Longbridge MCP 食谱库

**Longbridge MCP** 是让 AI Agent 获得真实券商能力的最快方式：行情报价、自选股列表、期权链、账户状态、模拟下单。本仓库是一批精选的小型、可运行的 **Agent 食谱**，可接入任何支持 MCP 的客户端 — Claude Desktop、Claude Code、Cursor、Codex，或你自己的工具。

每个食谱都具备：

- **MCP 优先** — 主要执行路径是"把 Prompt 粘贴到 Claude，看 Agent 调用 Longbridge 工具"。无需 Python 即可运行。
- **默认模拟交易** — `TRADING_MODE=paper`，非模拟模式会主动报错。
- **自包含** — 一个文件夹、一个 `README.md`（包含 Prompt）、一个可选的 `main.py` 用于定时任务。
- **5 分钟上手** — 安装 MCP，粘贴 Prompt，搞定。

如果你曾想要一个 **Cursor Agent 券商**工作流，或一个 **Claude 经纪商**副驾驶，而不想重新实现 OAuth、WebSocket 订阅或期权链解析 — 从这里开始。

## 适合谁

- **AI 开发者** — 在 Claude Code / Cursor / Codex 中构建金融 Agent
- **量化爱好者** — 想要一个可直接使用的 **AI Agent 期权扫描器**并在此基础上二次开发
- **MCP 早期用户** — 评估用于生产数据的 MCP Server
- **KOL 和教育者** — 寻找简洁、可复现的券商 Agent 演示案例

本项目**不是**交易框架、回测系统，也**不构成**投资建议。它是一套工程示例。

---

## 5 分钟快速上手（MCP 优先）

MCP 的核心价值在于你无需克隆任何东西就能开始。标准流程如下：

### 第一步 — 将 Longbridge MCP 安装到你的 Agent

选择你的客户端，粘贴对应的配置片段。完整参考：[`MCP_SETUP.md`](MCP_SETUP.md)。

**Claude Desktop** — 编辑 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

重启 Claude Desktop，首次调用工具时浏览器会自动打开 OAuth 登录页面。

**Cursor** — 设置 → MCP → 添加 Remote MCP Server，粘贴 URL：

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

**Claude Code** — 一行命令：

```bash
claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp
```

然后在 Claude Code 中运行 `/mcp`，选择 `longbridge`，点击 **Authenticate** 完成 OAuth 授权。

在 [open.longbridge.com](https://open.longbridge.com) 注册或登录。模拟交易账户同样使用 OAuth 流程，无需单独申请 Token。

### 第二步 — 打开 Agent，粘贴食谱 Prompt

打开 Claude Desktop（或 Cursor / Codex），粘贴示例 Prompt：

> 使用 Longbridge MCP，查看我的自选股。对于未来 24 小时内有财报的每只股票，获取上季度业绩、市场一致预期和近周期权隐含波动幅度。每只股票输出一份简洁的 Markdown 摘要。

### 第三步 — 观看 Agent 运行

Agent 将依次调用 Longbridge MCP 工具（`watchlist.list`、`calendar.events`、`fundamentals.quarterly`、`options.chain`……）并生成 Markdown 摘要。整个循环就是这么简单。

> 无需 Python，无需克隆，无需 SDK 配置。这就是 MCP 优先。

想要附带截图和工具调用演示的深度 Prompt？请查看下方[食谱](#食谱)。

---

## 食谱

| #   | 食谱                                              | 功能说明                                                                          | 状态        |
| --- | ------------------------------------------------- | --------------------------------------------------------------------------------- | ----------- |
| 01  | [财报监控](recipes/01_earnings_monitor)           | Agent 监控自选股即将到来的财报；提前 24 小时预报 + 财报后 1 小时复盘。            | 已搭建      |
| 02  | [期权扫描器](recipes/02_options_scanner)          | **AI Agent 期权扫描器**，筛选自选股中 IV Rank 较高的备兑看涨期权机会。            | 已搭建      |
| 03  | [投资组合回顾](recipes/03_portfolio_review)       | Agent 读取模拟持仓，生成含 3 个核心观察点和 3 个跟进问题的周度复盘报告。          | 已搭建      |

更多食谱持续更新中。有想法？[提 Issue](https://github.com/coolboylcy/longbridge-agent-cookbook/issues/new) 或阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 架构 — Agent 居于中心

Agent（Claude / Cursor / Codex）主导驱动。MCP 是通信总线。Longbridge Skill 是券商接口层。Python SDK 是 headless 执行的备用路径。

```
                        ┌───────────────────────────────┐
                        │   Claude Desktop  ·  Cursor   │
                        │   Claude Code     ·  Codex    │
                        │      （Agent — 中心节点）      │
                        └───────────────┬───────────────┘
                                        │
                                        │  MCP 协议
                                        │  (JSON-RPC over SSE / stdio)
                                        ▼
                        ┌───────────────────────────────┐
                        │     Longbridge MCP Server     │
                        │     （连接层 —                 │
                        │      行情、期权、账户、         │
                        │      自选股、模拟下单）         │
                        └───────────────┬───────────────┘
                                        │
                                        │  认证 REST + WebSocket
                                        ▼
                        ┌───────────────────────────────┐
                        │      Longbridge Skill         │
                        │     （券商接口层 —             │
                        │      模拟或实盘 OpenAPI）       │
                        └───────────────────────────────┘

                        ────  headless/CI 备用路径  ────

  Python SDK ─────► Longbridge OpenAPI
  （用于定时任务、GitHub Actions、Lambda 等无 Agent 场景 — 参见各食谱 main.py）
```

**主路径（推荐）：** Agent → MCP → Skill。每个食谱 README 均以此为起点。

**备用路径（headless）：** `recipes/NN/main.py` 直接调用 Longbridge Python SDK。适用于需要定时运行、CI 或无 Chat Agent 的场景。输出相同，驱动方式不同。

---

## 合规与安全

本仓库默认使用**模拟交易**。第一步安装的 MCP Token 应为模拟交易 Token。备用 `main.py` 文件开头均包含：

```python
import os
if os.getenv("TRADING_MODE", "paper") != "paper":
    raise SystemExit("拒绝在非模拟模式下运行。请设置 TRADING_MODE=paper。")
```

使用规则：

- **代码中不得含有凭据。** 请使用 `.env`（已加入 .gitignore）、Shell 环境变量或 MCP 客户端的密钥存储。
- **未经明确修改，不得发送实盘订单。** 一旦切换为实盘模式，所有订单风险由你自行承担。
- **不构成投资建议。** 本仓库中的食谱均未经投资专业人士审核，仅为工程示例。
- **地区限制适用。** Longbridge 在港股、新加坡、美国受监管。连接真实账户前请确认你所在司法管辖区的规定。
- **请遵守速率限制。** SDK 和 MCP Server 均会暴露限速信息，请合理使用 API。

如发现安全问题（食谱中泄露 Token、不安全默认配置），请直接发邮件给我，而非公开提 Issue。

---

## FAQ

**Q：我需要克隆这个仓库吗？**
MCP 优先路径下不需要。将 MCP Server 安装到 Agent，在 GitHub 上复制任意食谱 README 中的 Prompt，粘贴运行即可。仅在需要 headless `main.py` 备用脚本时才需要克隆。

**Q：支持哪些 MCP 客户端？**
所有支持 MCP 协议的客户端均可。已测试：Claude Desktop、Claude Code、Cursor、Codex。[`MCP_SETUP.md`](MCP_SETUP.md) 中的通用 JSON 配置覆盖其他客户端。

**Q：什么情况下应使用 Python SDK 备用路径？**
需要 headless 执行时：GitHub Actions、定时任务、Lambda，以及任何无 Chat Agent 参与的场景。各食谱中的 `main.py` 文件就是这条路径。

**Q：为什么备用脚本使用 Python？**
Longbridge 提供 7 种 SDK（Python、Go、Rust、Node、C#、Java、C++）。Python 是 AI / 量化爱好者的通用语言。欢迎提 PR 将备用脚本移植到其他语言。

**Q：可以连接真实账户吗？**
技术上可以，但本仓库对这条路径刻意设置了障碍。如果你这样做，所有发出的订单后果由你自负。

**Q：如何注册 Longbridge 账户？**
港股 / 新加坡居民：[longbridge.com](https://longbridge.com)。注册后前往 [open.longbridge.com](https://open.longbridge.com) 开发者平台，沙盒环境自动开通。MCP 使用 OAuth 2.1 认证，无需手动获取 Token。Python SDK 备用路径仍需使用开发者平台的 `app_key` / `app_secret` / `access_token`。

---

## 如何贡献食谱

简要步骤：

1. Fork 本仓库。
2. 将 `recipes/_template/` 复制为 `recipes/NN_你的食谱名/`。
3. 优先撰写 **Prompt** — README 中的 MCP 优先快速上手部分即是食谱本身。
4. 可选：添加 `main.py` 用于 headless 执行。保持在约 200 行以内，并在开头加入安全守卫代码。
5. 在上方食谱表格中添加一行。
6. 提交 PR。

完整指南：[CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 许可证

MIT — 详见 [LICENSE](LICENSE)。

## 作者

**Chris Liang** — Longbridge Securities 香港，增长负责人。
本项目为个人项目，观点仅代表个人，与雇主无关。
**不构成投资建议。**

联系我：[X/Twitter](https://x.com/chrisaiquant) · [Substack](https://chrisliang.substack.com) · [GitHub](https://github.com/chrisaiquant)
