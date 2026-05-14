> 🌐 **Language / 语言 / 語言:** [English](README.md) · [简体中文](README.zh-CN.md) · 繁體中文

# longbridge-agent-cookbook

> 可直接執行的 AI Agent 食譜，專為 **Longbridge Skill / MCP** 設計。貼到 Claude Code、Cursor 或 Codex，你的 Agent 立刻取得券商操盤能力。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![僅限模擬交易](https://img.shields.io/badge/模式-模擬交易-blue.svg)](#合規與安全)
[![MCP 優先](https://img.shields.io/badge/協議-MCP%20優先-7c3aed.svg)](MCP_SETUP.md)
[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-7c3aed.svg)](https://claude.com/claude-code)

---

## 這是什麼 — Longbridge MCP 食譜庫

**Longbridge MCP** 是讓 AI Agent 取得真實券商能力的最快方式：即時報價、自選股清單、選擇權鏈、帳戶狀態、模擬下單。本倉庫是一批精選的小型、可執行的 **Agent 食譜**，可接入任何支援 MCP 的客戶端 — Claude Desktop、Claude Code、Cursor、Codex，或你自己的工具。

每個食譜都具備：

- **MCP 優先** — 主要執行路徑是「把 Prompt 貼到 Claude，看 Agent 呼叫 Longbridge 工具」。無需 Python 即可執行。
- **預設模擬交易** — `TRADING_MODE=paper`，非模擬模式會主動報錯。
- **自包含** — 一個資料夾、一個 `README.md`（含 Prompt）、一個可選的 `main.py` 用於排程任務。
- **5 分鐘上手** — 安裝 MCP，貼上 Prompt，完成。

如果你曾想要一個 **Cursor Agent 券商**工作流，或一個 **Claude 經紀商**副駕駛，而不想重新實作 OAuth、WebSocket 訂閱或選擇權鏈解析 — 從這裡開始。

## 適合誰

- **AI 開發者** — 在 Claude Code / Cursor / Codex 中建構金融 Agent
- **量化愛好者** — 想要一個可直接使用的 **AI Agent 選擇權掃描器**並在此基礎上二次開發
- **MCP 早期使用者** — 評估用於生產資料的 MCP Server
- **KOL 與教育者** — 尋找簡潔、可重現的券商 Agent 示範案例

本專案**不是**交易框架、回測系統，也**不構成**投資建議。它是一套工程示例。

---

## 5 分鐘快速上手（MCP 優先）

MCP 的核心價值在於你無需克隆任何東西就能開始。標準流程如下：

### 第一步 — 將 Longbridge MCP 安裝到你的 Agent

選擇你的客戶端，貼上對應的設定片段。完整參考：[`MCP_SETUP.md`](MCP_SETUP.md)。

**Claude Desktop** — 編輯 `claude_desktop_config.json`：

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

**Cursor** — 設定 → MCP → 新增 Server：

```json
{
  "mcp": {
    "servers": {
      "longbridge": {
        "url": "https://mcp.longbridgeapp.com/sse",
        "headers": { "Authorization": "Bearer <your-longbridge-paper-token>" }
      }
    }
  }
}
```

**Claude Code** — 一行指令：

```bash
claude mcp add longbridge https://mcp.longbridgeapp.com/sse \
  --header "Authorization: Bearer <your-longbridge-paper-token>"
```

前往 [open.longbridgeapp.com](https://open.longbridgeapp.com) → 開發者中心 → MCP Tokens，取得模擬交易 Token。

### 第二步 — 開啟 Agent，貼上食譜 Prompt

開啟 Claude Desktop（或 Cursor / Codex），貼上示例 Prompt：

> 使用 Longbridge MCP，查看我的自選股。對於未來 24 小時內有財報的每檔股票，取得上季度業績、市場共識預期和近周選擇權隱含波動幅度。每檔股票輸出一份簡潔的 Markdown 摘要。

### 第三步 — 觀看 Agent 執行

Agent 將依序呼叫 Longbridge MCP 工具（`watchlist.list`、`calendar.events`、`fundamentals.quarterly`、`options.chain`……）並生成 Markdown 摘要。整個循環就是這麼簡單。

> 無需 Python，無需克隆，無需 SDK 設定。這就是 MCP 優先。

想要附帶截圖和工具呼叫示範的深度 Prompt？請查看下方[食譜](#食譜)。

---

## 食譜

| #   | 食譜                                              | 功能說明                                                                          | 狀態        |
| --- | ------------------------------------------------- | --------------------------------------------------------------------------------- | ----------- |
| 01  | [財報監控](recipes/01_earnings_monitor)           | Agent 監控自選股即將到來的財報；提前 24 小時預報 + 財報後 1 小時複盤。            | 已建置      |
| 02  | [選擇權掃描器](recipes/02_options_scanner)        | **AI Agent 選擇權掃描器**，篩選自選股中 IV Rank 較高的備兌買權機會。              | 已建置      |
| 03  | [投資組合回顧](recipes/03_portfolio_review)       | Agent 讀取模擬持倉，生成含 3 個核心觀察點和 3 個跟進問題的週度複盤報告。          | 已建置      |

更多食譜持續更新中。有想法？[提 Issue](../../issues/new) 或閱讀 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 架構 — Agent 居於核心

Agent（Claude / Cursor / Codex）主導驅動。MCP 是通訊匯流排。Longbridge Skill 是券商介面層。Python SDK 是 headless 執行的備用路徑。

```
                        ┌───────────────────────────────┐
                        │   Claude Desktop  ·  Cursor   │
                        │   Claude Code     ·  Codex    │
                        │      （Agent — 核心節點）      │
                        └───────────────┬───────────────┘
                                        │
                                        │  MCP 協議
                                        │  (JSON-RPC over SSE / stdio)
                                        ▼
                        ┌───────────────────────────────┐
                        │     Longbridge MCP Server     │
                        │     （連接層 —                 │
                        │      報價、選擇權、帳戶、       │
                        │      自選股、模擬下單）         │
                        └───────────────┬───────────────┘
                                        │
                                        │  認證 REST + WebSocket
                                        ▼
                        ┌───────────────────────────────┐
                        │      Longbridge Skill         │
                        │     （券商介面層 —             │
                        │      模擬或實盤 OpenAPI）       │
                        └───────────────────────────────┘

                        ────  headless/CI 備用路徑  ────

  Python SDK ─────► Longbridge OpenAPI
  （用於排程任務、GitHub Actions、Lambda 等無 Agent 場景 — 參見各食譜 main.py）
```

**主路徑（推薦）：** Agent → MCP → Skill。每個食譜 README 均以此為起點。

**備用路徑（headless）：** `recipe/NN/main.py` 直接呼叫 Longbridge Python SDK。適用於需要排程執行、CI 或無 Chat Agent 的場景。輸出相同，驅動方式不同。

---

## 合規與安全

本倉庫預設使用**模擬交易**。第一步安裝的 MCP Token 應為模擬交易 Token。備用 `main.py` 文件開頭均包含：

```python
import os
if os.getenv("TRADING_MODE", "paper") != "paper":
    raise SystemExit("拒絕在非模擬模式下執行。請設定 TRADING_MODE=paper。")
```

使用規則：

- **程式碼中不得含有憑證。** 請使用 `.env`（已加入 .gitignore）、Shell 環境變數或 MCP 客戶端的金鑰存儲。
- **未經明確修改，不得發送實盤訂單。** 一旦切換為實盤模式，所有訂單風險由你自行承擔。
- **不構成投資建議。** 本倉庫中的食譜均未經投資專業人士審核，僅為工程示例。
- **地區限制適用。** Longbridge 在港股、新加坡、美國受監管。連接真實帳戶前請確認你所在司法管轄區的規定。
- **請遵守速率限制。** SDK 和 MCP Server 均會暴露限速資訊，請合理使用 API。

如發現安全問題（食譜中洩露 Token、不安全預設設定），請直接發電郵給我，而非公開提 Issue。

---

## FAQ

**Q：我需要克隆這個倉庫嗎？**
MCP 優先路徑下不需要。將 MCP Server 安裝到 Agent，在 GitHub 上複製任意食譜 README 中的 Prompt，貼上執行即可。僅在需要 headless `main.py` 備用腳本時才需要克隆。

**Q：支援哪些 MCP 客戶端？**
所有支援 MCP 協議的客戶端均可。已測試：Claude Desktop、Claude Code、Cursor、Codex。[`MCP_SETUP.md`](MCP_SETUP.md) 中的通用 JSON 設定涵蓋其他客戶端。

**Q：什麼情況下應使用 Python SDK 備用路徑？**
需要 headless 執行時：GitHub Actions、排程任務、Lambda，以及任何無 Chat Agent 參與的場景。各食譜中的 `main.py` 文件就是這條路徑。

**Q：為什麼備用腳本使用 Python？**
Longbridge 提供 7 種 SDK（Python、Go、Rust、Node、C#、Java、C++）。Python 是 AI / 量化愛好者的通用語言。歡迎提 PR 將備用腳本移植到其他語言。

**Q：可以連接真實帳戶嗎？**
技術上可以，但本倉庫對這條路徑刻意設置了障礙。如果你這樣做，所有發出的訂單後果由你自負。

**Q：如何註冊 Longbridge 帳戶？**
港股 / 新加坡居民：[longbridge.com](https://longbridge.com)。模擬交易方面，註冊後開發者中心會自動開通沙盒環境，並同時簽發 MCP Token 和 SDK 所需的 app_key / app_secret。

---

## 如何貢獻食譜

簡要步驟：

1. Fork 本倉庫。
2. 將 `recipes/_template/` 複製為 `recipes/NN_你的食譜名/`。
3. 優先撰寫 **Prompt** — README 中的 MCP 優先快速上手部分即是食譜本身。
4. 可選：新增 `main.py` 用於 headless 執行。保持在約 200 行以內，並在開頭加入安全守衛程式碼。
5. 在上方食譜表格中新增一行。
6. 提交 PR。

完整指南：[CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 授權

MIT — 詳見 [LICENSE](LICENSE)。

## 作者

**Chris Liang** — Longbridge Securities 香港，增長負責人。
本專案為個人專案，觀點僅代表個人，與雇主無關。
**不構成投資建議。**

聯絡我：[X/Twitter](https://x.com/chrisaiquant) · [Substack](https://chrisliang.substack.com) · [GitHub](https://github.com/chrisaiquant)
