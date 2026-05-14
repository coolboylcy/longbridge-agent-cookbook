> 🌐 **Language / 语言 / 語言:** [English](README.md) · [简体中文](README.zh-CN.md) · 繁體中文

# 食譜 03：每週投資組合複盤

> 一個 agent，讀取你的模擬交易持倉並生成每週複盤——3 條觀察 + 3 個下週待思考的問題。

## 功能說明

每週，agent 從 Longbridge 獲取你的模擬交易持倉、近期成交和現金餘額。它計算基礎持倉指標（板塊分布、前 3 大持倉集中度、週環比 PnL、已平倉交易勝率），然後生成結構化的日記式 Markdown 複盤：關於過去一週的 **3 條觀察** + 下週的 **3 個待解問題**。

觸發方式（主）：在週五收盤或週日晚間將提示詞貼上至 agent。觸發方式（headless）：從 cron 執行 `python main.py`。輸出：Markdown 列印至對話（或在 headless 路徑下寫入 `reviews/YYYY-Www.md`）。

## 快速上手——MCP 優先

**前提條件：** 已安裝 Longbridge MCP 的 Claude Desktop（或 Cursor / Claude Code / Codex）。請參閱 [`MCP_SETUP.md`](../../MCP_SETUP.md)。

打開你的 agent 並貼上：

```
Using the Longbridge MCP, write my weekly portfolio review:

1. Pull my paper-trading account state: NAV, cash, and all stock positions.
2. Pull every execution from the last 7 days (or this ISO week, whichever you can).
3. Compute these metrics:
     - Trade count and win rate of closed trades
     - Average holding period
     - Largest realized winner and loser this week
     - Sector mix of current positions (GICS sector via security metadata)
     - Top-3 position concentration as % of NAV
     - Week-over-week NAV change
     - Largest unrealized winner and loser among open positions
4. Write a Markdown review with this exact structure:
     # Week of <ISO week, e.g. 2026-W19>
     ## Stats
     <one-line summary: NAV, WoW%, # trades, win rate>
     ## 3 observations
     <three numbered bullets — terse, first-person, no hedging>
     ## 3 questions for next week
     <three numbered bullets — what to investigate, not what to do>

Voice: journal-style. Short. Opinionated. No "consider" or "you might want to."
This is for me, not for a client.

Paper-trading account only. No order placement.
```

## 詳解——agent 的執行過程

MCP 工具呼叫序列如下：

1. **`account.balance`** — 獲取總 NAV 和現金。
2. **`account.positions`** — 獲取所有持倉（含成本基礎和當前價值）。
3. **`account.executions(start=last_monday, end=now)`** — 獲取視窗內所有成交記錄。
4. **`security.meta`（針對持倉標的）** — 獲取產業資訊，彙總為 GICS 板塊以計算板塊分布指標。
5. **`account.nav_history(days=14)`** — 為 agent 提供足夠資料以計算週環比 NAV 變動。
6. **計算步驟（無工具呼叫）** — agent 執行勝率、集中度、持倉週期及未實現盈虧排名的算術運算。
7. **綜合處理** — 按照你指定的章節結構生成 Markdown 複盤。

預期輸出：一個包含 `# Week of YYYY-Www` 的單一 Markdown 區塊，一行統計摘要，然後是 3 條觀察和 3 個問題。

`[screenshot: chat transcript showing the metric table the agent computed, followed by the final review Markdown]`

## 可自訂項

- **複盤視窗** — 將「last 7 days」改為「last 30 days」可改為月度節奏；若 agent 有記憶功能，可使用「since I last asked」。
- **觀察/問題數量** — 預設為 3+3。可改為 5+5，或拆分為「有效的 / 無效的 / 下次要嘗試的」。
- **板塊分類體系** — 無需使用 GICS，可讓 agent 將持倉彙總至你自訂的分類（如「AI 算力 / 中國消費 / 港股地產 / 現金」）。純粹的提示詞修改即可實現。

## 自動化 / headless 變體

適用於週日晚間 cron 或 GitHub Action：

```bash
# From the repo root
cp .env.example .env
pip install longbridge anthropic
cd recipes/03_portfolio_review
python main.py
```

Python 備用方案將輸出寫入 `recipes/03_portfolio_review/reviews/YYYY-Www.md`（ISO 週），同時列印至標準輸出。若當前週檔案已存在，則追加差異章節而非覆蓋。

## 授權與免責聲明

MIT——詳見倉庫根目錄的 [LICENSE](../../LICENSE)。

本食譜僅為工程示例，**不構成投資建議。** 複盤由大型語言模型基於小樣本資料生成，可能得出錯誤結論；請將其作為日記式提示，而非決策依據。預設僅在模擬交易模式下執行；切換至實盤交易風險自負。作者及 Longbridge Securities 對本程式碼的任何使用概不承擔責任。
