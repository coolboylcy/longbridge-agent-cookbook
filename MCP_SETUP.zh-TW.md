> 🌐 **Language / 语言 / 語言:** [English](MCP_SETUP.md) · [简体中文](MCP_SETUP.zh-CN.md) · 繁體中文

# 安裝指南 — 把 Longbridge 接到你的 AI 助手

這是簡化的食譜版。**官方權威指南**在 <https://open.longbridge.com/skill?invite-code=F6HEGJ> — 如有不一致以官方為準。

安裝是**兩步流程**：

1. **連接** AI 工具到 Longbridge 平台 — CLI（推薦）或 MCP 二選一
2. **安裝 Skill** — 一組指令檔案，告訴 AI Longbridge 能做什麼

少做哪一步，AI 都沒法操盤。

---

## 第一步 — 連接到 Longbridge 平台

下面兩種方法選**一種**。

| 路徑                  | 適合誰                                                                | 需要本地安裝？ |
| --------------------- | --------------------------------------------------------------------- | -------------- |
| **A. CLI**（推薦） | Claude Code、Codex（Work locally）、opencode、OpenClaw、Warp、Gemini CLI | 是             |
| **B. MCP**            | Claude Desktop、Cursor、Zed、Gemini CLI、Warp                         | 否             |

### 方法 A — CLI（推薦）

安裝 `longbridge` 終端程式，AI 透過 shell 指令呼叫它。

**macOS — Homebrew：**

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

**macOS / Linux — curl：**

```bash
curl -sSL https://open.longbridge.com/longbridge/longbridge-terminal/install | sh
```

**Windows — Scoop：**

```powershell
scoop install https://open.longbridge.com/longbridge/longbridge-terminal/longbridge.json
```

**Windows — PowerShell：**

```powershell
iwr https://open.longbridge.com/longbridge/longbridge-terminal/install.ps1 | iex
```

**授權登入：**

```bash
longbridge auth login
```

瀏覽器會自動打開 OAuth 登入頁。模擬交易帳戶走同一流程。

**用邀請碼完成歸因**（讓 Chris 拿到推薦積分，感謝支持）：

```bash
longbridge init F6HEGJ
```

**Claude Code 使用者 — 一次性允許 `longbridge` 指令**，避免每次問權限。在專案根目錄的 `.claude/settings.json` 加：

```json
{
  "permissions": {
    "allow": ["Bash(longbridge *)"]
  }
}
```

### 方法 B — MCP

在 AI 工具的設定裡加上 Longbridge 遠端 MCP 伺服器：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

> **中國大陸使用者**可使用加速端點：`https://openapi.longbridge.cn/mcp`

| 客戶端         | 在哪裡設定                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Desktop | 編輯 `~/Library/Application Support/Claude/claude_desktop_config.json`（macOS）或 `%APPDATA%\Claude\claude_desktop_config.json`（Windows） |
| Cursor         | Settings → MCP Servers → Add Remote MCP Server                                                                                            |
| Zed            | `~/.config/zed/settings.json` 中的 `context_servers` 鍵                                                                                   |
| Gemini CLI     | `~/.gemini/settings.json` 中的 `mcpServers` 鍵                                                                                            |
| Warp           | Settings → AI → MCP Servers → Add                                                                                                         |

第一次提到 Longbridge 時，客戶端會自動打開瀏覽器 OAuth 授權 — 不需要在設定檔裡放 API key。

---

## 第二步 — 安裝 Skill

Skill 是一組指令檔案，告訴 AI 助手 Longbridge 能做什麼、怎麼呼叫。**沒裝 Skill 的話，AI 可能完成第一步後仍然不知道用 Longbridge。**

**Claude Code 外掛（Claude Code 使用者推薦）：**

在 Claude Code 對話裡執行：

```
/plugin marketplace add longbridge/skills
/plugin install longbridge@longbridge-skills
```

透過 Claude Code 外掛系統自動更新。

**npx / bunx（任何工具）：**

```bash
# Node
npx skills add longbridge/skills -g
# Bun
bunx skills add longbridge/skills -g
```

需要 [Node.js](https://nodejs.org) 或 [Bun](https://bun.sh)。

**ZIP 下載（手動）：**

下載 <https://open.longbridge.com/skill/longbridge-all.zip>，解壓，放到 AI 工具的 Skill 目錄：

- Claude Code：`.claude/skills/`
- Cursor：貼到 Rules 編輯器
- 其他：見 ZIP 內的 README

**OpenClaw** — 直接在聊天裡發，自動安裝：

```
Install the Longbridge Developers Skill from this zip file:
https://open.longbridge.com/skill/longbridge-all.zip
```

---

## 驗證

在 AI 助手裡輸入：

```
Use Longbridge to get the current quote for AAPL
```

如果回傳了即時報價，就裝好了。如果 Skill 沒自動觸發，前面加 `/longbridge`：

```
/longbridge get the current quote for AAPL
```

---

## 已知限制

### Claude Desktop — 切到 **Code** 標籤

Claude Desktop 的 Chat 和 Cowork 模式因網路白名單**會阻擋 CLI 安裝和 MCP 連線**。切到 **Code** 標籤（內嵌的 Claude Code）— 完整終端權限，一個對話搞定全部。

### Codex — 選 **Work locally**

Codex Cloud 模式有同樣的限制。新建對話時選 **Work locally**，AI 才能完整存取你的 shell 和網路。

### Claude.ai 和 ChatGPT.com（網頁版）

純瀏覽器介面無法執行 shell 指令、也無法連線 MCP 伺服器。請用 [Claude Desktop](https://claude.ai/download) 切到 Code 標籤，或用上面任何本地客戶端。

---

## 故障排除

**AI 說找不到 Longbridge 工具。** 重啟客戶端或開新對話 — Skill 載入需要刷新一次。

**每次都問授權。** 在終端跑 `longbridge auth login` 完成 OAuth。

**交易操作沒反應。** 確認你的帳戶開通了 OpenAPI 交易權限，且在目標市場（港 / 美）有交易資格。

**MCP 路徑報 `401 Unauthorized`。** 在 MCP 客戶端的 Authenticate 選單重做一次 OAuth。

**撤銷授權。** Longbridge 帳戶 → 安全設定 → 管理已授權應用。

---

## 憑證安全

- **設定檔裡不要放 token。** OAuth 憑證由 AI 工具客戶端管理，不會進入你提交的設定檔。
- **模擬 ≠ 實盤。** 模擬交易帳戶是沙盒帳戶，不能下實單。本食譜裡的所有 recipe 預設走模擬。
- **Python SDK 備用路徑**（`recipes/NN/main.py` 的 headless 腳本）仍使用開發者平台的 `LONGBRIDGE_APP_KEY` / `LONGBRIDGE_APP_SECRET` / `LONGBRIDGE_ACCESS_TOKEN` — 與 Skill / MCP OAuth 是兩條獨立的憑證路徑。

---

## 授權 & 免責

MIT — 詳見 [LICENSE](LICENSE)。這是設定文件，不構成投資建議。
