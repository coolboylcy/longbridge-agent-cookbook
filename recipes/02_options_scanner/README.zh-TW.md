> 🌐 **Language / 语言 / 語言:** [English](README.md) · [简体中文](README.zh-CN.md) · 繁體中文

# 食譜 02：期權掃描器——高 IV Rank 備兌買權

> 一個 **AI agent 期權掃描器**，在你的 Longbridge 自選股中篩選出最優質的備兌買權候選標的並排名。

## 功能說明

對自選股中每支支援期權交易的標的，agent 獲取當前期權鏈，計算 252 日 **IV rank**，篩選出 DTE 30–45 天、delta 0.20–0.35 的虛值認購期權，並按年化收益率排名。輸出為排名 Markdown 表格，以及前 3 名候選標的各一段理由說明。

觸發方式（主）：將下方提示詞貼上至 agent。觸發方式（headless）：`python main.py`。

## 快速上手——MCP 優先

**前提條件：** 已安裝 Longbridge MCP 的 Claude Desktop（或 Cursor / Claude Code / Codex）。如果還沒安裝，請參閱 [`MCP_SETUP.md`](../../MCP_SETUP.md)。

打開你的 agent 並貼上：

```
Using the Longbridge MCP, run a covered-call scan on my watchlist:

1. Pull my watchlist. Drop tickers that don't support options.
2. For each surviving ticker, compute the 252-day IV rank:
     iv_rank = (iv_today - iv_min_252d) / (iv_max_252d - iv_min_252d)
   using the ATM call IV at the nearest-to-30-DTE expiry.
   Keep only tickers with iv_rank >= 0.5.
3. For each surviving ticker, fetch the call chain. Keep calls where:
     - 30 <= DTE <= 45
     - 0.20 <= delta <= 0.35
     - bid > 0.05
     - open interest >= 100
     - strike is OTM vs. current spot
4. Rank all candidates by annualized premium yield:
     annualized_yield = (mid / strike) * (365 / DTE)
   Return the top 10 in a Markdown table with columns:
   Ticker | Strike | Expiry | DTE | Delta | Mid | IV Rank | Ann Yield
5. For the top 3, add a one-paragraph rationale each:
   why this strike, what would invalidate the trade, what assignment looks like.
   Mention the next earnings date if it falls inside the DTE window.

Paper-trading account only. No order placement.
```

## 詳解——agent 的執行過程

貼上提示詞後，agent 將按以下 MCP 工具呼叫路徑執行：

1. **`watchlist.list`** — 獲取股票清單（分析範圍）。
2. **`security.meta`（逐支）** — 剔除 `options_enabled = true` 以外的標的。港股期權覆蓋有限，這一步會有所體現。
3. **`options.iv_history`（針對存活標的）** — 獲取 252 天的 ATM 認購 IV 歷史，agent 內聯計算 IV rank。
4. **`options.chain_expiries` + `options.chain`** — 獲取 DTE 30–45 天的認購期權切片，每行返回履約價、買/賣/中間價、delta、OI、IV。
5. **篩選 + 排名（無工具呼叫）** — agent 應用區間篩選並按年化收益率排序。
6. **`calendar.events`（僅前 3 名）** — 檢查 DTE 視窗內是否有財報，以便在理由說明中提示事件風險。
7. **綜合處理** — 輸出 Markdown 表格及三段理由說明。

預期輸出：按年化收益率排序的 10 行 Markdown 表格，以及前 3 名候選標的的簡短理由說明段落。

`[screenshot: chat transcript showing the chain fetch, then the rendered table with IV rank and yield columns]`

## 可自訂項

- **篩選區間** — 修改提示詞中的「30 <= DTE <= 45」或「0.20 <= delta <= 0.35」。delta 越緊，被履約風險越低，但權利金也越少。
- **IV rank 門檻** — 提示詞預設值為 0.5。低波動環境下可調低至 0.3；要求更嚴格的信號時可調高至 0.7。
- **持倉約束** — 新增一步：「only include tickers where my paper-trading account currently holds 100+ shares.」，agent 將呼叫 `account.positions` 並相應篩選——區分真正的備兌買權與裸賣。

## 自動化 / headless 變體

適用於 cron、CI 或排程任務：

```bash
# From the repo root
cp .env.example .env
pip install longbridge anthropic
cd recipes/02_options_scanner
python main.py
python main.py --no-llm    # skip rationale step, table-only
```

Python 備用方案直接使用 Longbridge SDK，工具呼叫序列與 MCP agent 相同，只是由程式碼而非對話驅動。

## 授權與免責聲明

MIT——詳見倉庫根目錄的 [LICENSE](../../LICENSE)。

本食譜僅為工程示例，**不構成投資建議。** 期權策略存在重大風險，包括被履約、提前行使及資本虧損。IV rank 是粗略信號，不能預測實際波動率。預設僅在模擬交易模式下執行；切換至實盤交易風險自負。作者及 Longbridge Securities 對本程式碼的任何使用概不承擔責任。
