> 🌐 **Language / 语言 / 語言:** [English](README.md) · [简体中文](README.zh-CN.md) · 繁體中文

# 食譜 NN：[TODO 食譜名稱]

> [TODO 一句話簡介——這個 agent 做什麼？用一句話說清楚。]

## 功能說明

[TODO 一段話。要具體。「Agent 監控你的自選股中的 X 並輸出 Y。」
說明觸發方式（對話提示詞？cron？webhook？）和輸出形式（對話回覆？
Markdown？檔案？Slack？）。]

## 快速上手——MCP 優先

**前提條件：** 一個支援 MCP 的 agent（Claude Desktop、Cursor、Claude Code、Codex），並已安裝
Longbridge MCP。如果還沒安裝，請參閱根目錄的
[`MCP_SETUP.md`](../../MCP_SETUP.md)——大約需要 60 秒。

安裝完成後，打開你的 agent 並貼上以下提示詞：

```
[TODO 你的食譜提示詞——要具體。按意圖引用 Longbridge MCP 工具，
而非工具名稱。例如："Using the Longbridge MCP, pull my watchlist, find tickers with
earnings in the next 24h, and write a Markdown brief for each one."]
```

就這樣。agent 會依序呼叫 MCP 工具並生成輸出。

## 詳解——agent 的執行過程

貼上提示詞後，預期的工具呼叫序列如下：

1. **[TODO 步驟 1——例如 "watchlist.list"]** — [TODO agent 獲取什麼資料，為什麼]
2. **[TODO 步驟 2——例如 "calendar.events"]** — [TODO]
3. **[TODO 步驟 3——例如 "fundamentals.quarterly"]** — [TODO]
4. **[TODO 步驟 4——綜合處理]** — [TODO agent 如何處理這些資料]

預期輸出：[TODO 用 1–2 句話描述成功的樣子。]

`[screenshot: chat transcript showing the tool calls and final output]`

## 可自訂項

- **[TODO 參數 1]** — [TODO 如何在提示詞中調整]
- **[TODO 參數 2]** — [TODO]
- **[TODO 參數 3]** — [TODO]

## 自動化 / headless 變體

對於 cron、GitHub Actions 或任何不需要 agent 即時參與的場景，本食譜還提供了一個
直接使用 Longbridge Python SDK 的 Python 備用方案。

```bash
# From the repo root
cp .env.example .env
# edit .env → LONGBRIDGE_APP_KEY / APP_SECRET / ACCESS_TOKEN, TRADING_MODE=paper
pip install longbridge
cd recipes/NN_recipe_name
python main.py
```

`main.py` 的輸出結果與 MCP 驅動的 agent 輸出基本一致。
適合需要確定性、可排程、無 agent 執行的場景。

## 授權與免責聲明

MIT——詳見倉庫根目錄的 [LICENSE](../../LICENSE)。

本食譜僅為工程示例，**不構成投資建議。** 預設僅在模擬交易模式下執行；
切換至實盤交易風險自負。作者及 Longbridge Securities 對本程式碼的任何使用概不承擔責任。
