> 🌐 **Language / 语言 / 語言:** [English](README.md) · [简体中文](README.zh-CN.md) · 繁體中文

# 食譜 01：財報監控

> 一個 agent，監控你的 Longbridge 自選股中即將發布財報的標的，並生成 24 小時前的預報簡報及發布後 1 小時的複盤摘要。

## 功能說明

該 agent 讀取你的 Longbridge 自選股，識別未來 24 小時內有財報發布的標的，並為每支股票生成簡潔的簡報：上季業績回顧、市場共識預期、期權隱含波動幅度，以及 3 個關注要點。財報發布約 1 小時後，第二輪執行將生成複盤摘要，對比實際數據與市場共識預期及隱含波動幅度的差異。

觸發方式（主）：將下方提示詞貼上至 Claude Desktop / Cursor / Codex。觸發方式（headless，cron / GitHub Actions）：`python main.py`。輸出：Markdown 簡報，每支標的一份。

## 快速上手——MCP 優先

**前提條件：** 已安裝 Longbridge MCP 的 Claude Desktop（或 Cursor / Claude Code / Codex）。如果還沒安裝，請參閱 [`MCP_SETUP.md`](../../MCP_SETUP.md)——大約需要 60 秒。

打開你的 agent 並貼上：

```
Using the Longbridge MCP, do an earnings sweep:

1. Pull my watchlist.
2. For every ticker with an earnings release in the next 24 hours, fetch:
   - Last 4 quarters' EPS and revenue (actual vs. consensus)
   - Current consensus EPS and revenue estimate
   - The front-week options chain — compute the implied move as
     (ATM call mid + ATM put mid) / spot
   - The past 8 quarters' beat/miss pattern
3. For each upcoming earner, write a tight Markdown brief with sections:
   - Prior quarter recap (1 line)
   - Consensus this quarter (1 line)
   - Implied move (1 line)
   - Beat/miss history (1 line)
   - Three things to watch (3 bullets)

If no tickers have earnings in the next 24h, say so and stop.
```

**財報發布後複盤**（發布約 1 小時後執行），使用以下跟進提示詞：

```
Using the Longbridge MCP, for [TICKER] which just reported:

1. Pull the reported revenue, EPS, and any guidance update.
2. Compare against the consensus you cited earlier and the implied move.
3. Write one paragraph: "what changed."
4. End with a verdict line: beat / in-line / miss on revenue, EPS, guidance.
```

## 詳解——agent 的執行過程

教學部分。貼上簡報提示詞後，預期的 MCP 工具呼叫序列如下：

1. **`watchlist.list`** — 獲取你追蹤的股票清單，agent 由此確定分析範圍。
2. **`calendar.events`（逐支或批次）** — 篩選出未來 24 小時內類型為 `earnings` 的事件，超出視窗的全部排除。
3. **`fundamentals.quarterly`（針對即將發財報的標的）** — 獲取最近 4 季實際 EPS/營收數據。
4. **`fundamentals.consensus`** — 獲取本季賣方市場共識預期。
5. **`options.chain_expiries` + `options.chain`（近週 ATM）** — agent 選取最近的週期權到期日，識別 ATM 履約價，讀取認購+認沽中間價，計算隱含波動幅度。
6. **`fundamentals.beat_miss_history`** — 獲取過去 8 季的超預期／低於預期歷史。
7. **綜合處理（無工具呼叫）** — agent 將簡報整合為 Markdown 並輸出至對話。

預期輸出：每支未來 24 小時內有財報的標的一個 Markdown 區塊；若自選股中近期無財報，則輸出 `No upcoming earnings in the next 24h.`

`[screenshot: Claude chat transcript showing tool calls expand inline, followed by the rendered Markdown brief]`

## 可自訂項

- **時間視窗** — 將提示詞中的「next 24 hours」改為「next 7 days」可獲得週度前瞻，改為「next 4 hours」則適合當日內掃描。
- **簡報章節** — 去掉隱含波動幅度那一行，新增「總體背景」段落，或將語氣從中立改為有觀點。編輯提示詞即可，無需修改程式碼。
- **輸出格式** — 如果需要接入其他工具，可要求輸出 JSON 而非 Markdown；如果要發布社群媒體，可要求「每支股票一則推文」。

## 自動化 / headless 變體

適用於 cron 任務、GitHub Action 或任何無 agent 的場景：

```bash
# From the repo root
cp .env.example .env
# edit .env → LONGBRIDGE_APP_KEY / APP_SECRET / ACCESS_TOKEN, TRADING_MODE=paper
pip install longbridge anthropic
cd recipes/01_earnings_monitor
python main.py             # pre-brief mode
python main.py --mode recap
```

Python 備用方案直接使用 Longbridge SDK，生成等效的 Markdown 輸出。
參見 `main.py`——其工具呼叫序列與 MCP agent 保持一致。

## 授權與免責聲明

MIT——詳見倉庫根目錄的 [LICENSE](../../LICENSE)。

本食譜僅為工程示例，**不構成投資建議。** 財報簡報由大型語言模型生成，可能含有幻覺數字——請務必與原始公告交叉核實。預設僅在模擬交易模式下執行；切換至實盤交易風險自負。作者及 Longbridge Securities 對本程式碼的任何使用概不承擔責任。
