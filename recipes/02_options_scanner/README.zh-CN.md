> 🌐 **Language / 语言 / 語言:** [English](README.md) · 简体中文 · [繁體中文](README.zh-TW.md)

# 食谱 02：期权扫描器——高 IV Rank 备兑买权

> 一个 **AI agent 期权扫描器**，在你的 Longbridge 自选股中筛选出最优质的备兑买权候选标的并排名。

## 功能说明

对自选股中每只支持期权交易的标的，agent 获取当前期权链，计算 252 日 **IV rank**，筛选出 DTE 30–45 天、delta 0.20–0.35 的虚值认购期权，并按年化收益率排名。输出为排名 Markdown 表格，以及前 3 名候选标的各一段理由说明。

触发方式（主）：将下方提示词粘贴至 agent。触发方式（headless）：`python main.py`。

## 快速上手——MCP 优先

**前提条件：** 已安装 Longbridge MCP 的 Claude Desktop（或 Cursor / Claude Code / Codex）。如果还没安装，请参阅 [`MCP_SETUP.md`](../../MCP_SETUP.md)。

打开你的 agent 并粘贴：

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

## 详解——agent 的执行过程

粘贴提示词后，agent 将按以下 MCP 工具调用路径执行：

1. **`watchlist.list`** — 获取股票列表（分析范围）。
2. **`security.meta`（逐只）** — 剔除 `options_enabled = true` 以外的标的。港股期权覆盖有限，这一步会有所体现。
3. **`options.iv_history`（针对存活标的）** — 获取 252 天的 ATM 认购 IV 历史，agent 内联计算 IV rank。
4. **`options.chain_expiries` + `options.chain`** — 获取 DTE 30–45 天的认购期权切片，每行返回行权价、买/卖/中间价、delta、OI、IV。
5. **筛选 + 排名（无工具调用）** — agent 应用区间筛选并按年化收益率排序。
6. **`calendar.events`（仅前 3 名）** — 检查 DTE 窗口内是否有财报，以便在理由说明中提示事件风险。
7. **综合处理** — 输出 Markdown 表格及三段理由说明。

预期输出：按年化收益率排序的 10 行 Markdown 表格，以及前 3 名候选标的的简短理由说明段落。

`[screenshot: chat transcript showing the chain fetch, then the rendered table with IV rank and yield columns]`

## 可自定义项

- **筛选区间** — 修改提示词中的"30 <= DTE <= 45"或"0.20 <= delta <= 0.35"。delta 越紧，被行权风险越低，但权利金也越少。
- **IV rank 阈值** — 提示词默认值为 0.5。低波动环境下可调低至 0.3；要求更严格的信号时可调高至 0.7。
- **持仓约束** — 添加一步："only include tickers where my paper-trading account currently holds 100+ shares."，agent 将调用 `account.positions` 并相应筛选——区分真正的备兑买权与裸卖。

## 自动化 / headless 变体

适用于 cron、CI 或定时任务：

```bash
# From the repo root
cp .env.example .env
pip install longbridge anthropic
cd recipes/02_options_scanner
python main.py
python main.py --no-llm    # skip rationale step, table-only
```

Python 备用方案直接使用 Longbridge SDK，工具调用序列与 MCP agent 相同，只是由代码而非对话驱动。

## 许可与免责声明

MIT——详见仓库根目录的 [LICENSE](../../LICENSE)。

本食谱仅为工程示例，**不构成投资建议。** 期权策略存在重大风险，包括被行权、提前行权及资本亏损。IV rank 是粗略信号，不能预测实际波动率。默认仅在模拟交易模式下运行；切换至实盘交易风险自负。作者及 Longbridge Securities 对本代码的任何使用概不承担责任。
