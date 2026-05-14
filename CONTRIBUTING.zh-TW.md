> 🌐 **Language / 语言 / 語言:** [English](CONTRIBUTING.md) · [简体中文](CONTRIBUTING.zh-CN.md) · 繁體中文

# 貢獻指南

感謝您考慮參與貢獻。這個儲存庫之所以有價值，在於每一個食譜都小巧、可執行、誠實——並且**以 MCP 為優先**。在提交 PR 之前，請先閱讀本文件。

## 準入標準

一個食譜被接受的條件：

- README 中的 MCP 優先提示詞能夠在 Claude Desktop / Cursor / Codex 中，對接模擬交易的 Longbridge MCP 安裝，端到端地執行成功。
- `README.md` 遵循範本格式（每個章節按順序排列——**提示詞優先，無頭回退其次**）。
- 可選的 `main.py`（無頭回退）不超過約 200 行，且在檔案頂部包含模擬交易安全守衛。
- 食譜只做一件事。多步驟流水線應放在各自的資料夾中。
- 不提交金鑰、真實持倉，或任何可能洩露使用者帳戶資訊的內容。

## 新增食譜——MCP 優先，逐步操作

### 1. Fork 並克隆

```bash
git clone https://github.com/<your-username>/longbridge-agent-cookbook.git
cd longbridge-agent-cookbook
git checkout -b recipe/your-recipe-name
```

### 2. 複製範本

```bash
cp -r recipes/_template recipes/04_your_recipe_name
```

食譜資料夾命名規則：`NN_snake_case_name`，其中 `NN` 是下一個可用的兩位數字前綴。

### 3. 先寫提示詞

食譜**就是**提示詞。開啟 `recipes/04_your_recipe_name/README.md`，首先填寫 **Quickstart — MCP-first** 章節。您的提示詞應當：

- 按意圖引用 Longbridge MCP 工具（如「拉取我的自選股」、「獲取選擇權鏈」），而非使用精確的工具名稱。由 Agent 選擇合適的工具——您的職責是讓目標明確無歧義。
- 對輸出格式有明確要求（如「包含 X、Y、Z 欄的 Markdown 表格」，而非「彙總資料」）。
- 限定工作範圍（如「僅考慮 DTE 30–45」、「僅限模擬交易帳戶」）。
- 當食譜可能涉及交易介面時，以安全聲明結尾：「Paper-trading account only. No order placement.」

### 4. 記錄工具呼叫流程說明

填寫 **Walkthrough — what the agent will do** 章節。這是食譜的教學核心。按順序列出 Agent 可能呼叫的 MCP 工具及各工具的用途。讀者由此了解幕後發生了什麼。

### 5. 填寫 README 其餘章節

- **What this does** — 一段話，不加廢話。
- **What you can change** — 恰好 3 條要點。每一條應是單次提示詞的修改，而非程式碼改動。
- **Automated / headless variant** — 指向 `main.py`。本章節保持簡短。
- **License & disclaimer** — 從任意現有食譜中複製。

### 6. 可選：為無頭使用編寫 `main.py`

如果食譜適合作為排程任務執行，請附上回退方案。從以下骨架開始：

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

編寫規範：

- 使用官方 `longbridge` Python SDK。不要自行封裝 HTTP 客戶端。
- 預設輸出人類可讀的內容。如需結構化輸出，新增 `--json` 參數。
- 不硬編碼標的代碼（合理的預設值除外）。從 `WATCHLIST` 環境變數或命令列參數讀取。
- 缺少憑證時應明確報錯，不要靜默回退。
- `main.py` 的輸出應與 MCP 驅動的 Agent 產出基本一致。保持一致性是關鍵所在。

### 7. 更新根目錄 README

在 `/README.md` 的 **Recipes** 表格中新增一列食譜。在其於一台全新機器上完成端到端執行（包括 MCP 優先路徑，以及如有提交則還需執行無頭回退）之前，將 `Status` 設為 `scaffolded`，之後改為 `working`。

### 8. 提交 PR

PR 標題格式：`recipe(NN): short description`

PR 內文必須包含：

- 2–3 句話的摘要。
- 執行食譜的 MCP 對話記錄貼上（過長可截斷）。至少展示工具呼叫序列和最終輸出。
- 如有提交 `main.py`：同時貼上其終端輸出。
- 確認已在模擬交易模式下執行。

## 會被拒絕的情況

- README 僅有 `python main.py` 的食譜。MCP 優先提示詞是強制要求。
- 僅包裝一次 MCP 工具呼叫的食譜。請展示有用的工作流程，而非薄薄的封裝層。
- 需要付費第三方 API 才能執行的食譜。可選整合是允許的。
- 任何帶有交易策略性質的內容。本儲存庫是工程範例，不是 alpha 因子。
- 以行銷口吻開頭的 README。展示內容，不要推銷。

## 程式碼風格

目前尚未強制執行 black/ruff 設定。請保持合理規範。如果確實需要風格指南：PEP 8 + 雙引號。

## 授權條款

提交貢獻即表示您同意您的貢獻以 [MIT 授權條款](LICENSE) 授權。
