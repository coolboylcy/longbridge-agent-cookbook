> 🌐 **Language / 语言 / 語言:** [English](README.md) · 简体中文 · [繁體中文](README.zh-TW.md)

# 食谱 01：财报监控

> 一个 agent，监控你的 Longbridge 自选股中即将发布财报的标的，并生成 24 小时前的预报简报及发布后 1 小时的复盘摘要。

## 功能说明

该 agent 读取你的 Longbridge 自选股，识别未来 24 小时内有财报发布的标的，并为每只股票生成简洁的简报：上季业绩回顾、市场一致预期、期权隐含波动幅度，以及 3 个关注要点。财报发布约 1 小时后，第二轮运行将生成复盘摘要，对比实际数据与市场一致预期及隐含波动幅度的差异。

触发方式（主）：将下方提示词粘贴至 Claude Desktop / Cursor / Codex。触发方式（headless，cron / GitHub Actions）：`python main.py`。输出：Markdown 简报，每只标的一份。

## 快速上手——MCP 优先

**前提条件：** 已安装 Longbridge MCP 的 Claude Desktop（或 Cursor / Claude Code / Codex）。如果还没安装，请参阅 [`MCP_SETUP.md`](../../MCP_SETUP.md)——大约需要 60 秒。

打开你的 agent 并粘贴：

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

**财报发布后复盘**（发布约 1 小时后运行），使用以下跟进提示词：

```
Using the Longbridge MCP, for [TICKER] which just reported:

1. Pull the reported revenue, EPS, and any guidance update.
2. Compare against the consensus you cited earlier and the implied move.
3. Write one paragraph: "what changed."
4. End with a verdict line: beat / in-line / miss on revenue, EPS, guidance.
```

## 详解——agent 的执行过程

教学部分。粘贴简报提示词后，预期的 MCP 工具调用序列如下：

1. **`watchlist.list`** — 获取你追踪的股票列表，agent 由此确定分析范围。
2. **`calendar.events`（逐只或批量）** — 筛选出未来 24 小时内类型为 `earnings` 的事件，超出窗口的全部排除。
3. **`fundamentals.quarterly`（针对即将发财报的标的）** — 获取最近 4 季实际 EPS/营收数据。
4. **`fundamentals.consensus`** — 获取本季卖方市场一致预期。
5. **`options.chain_expiries` + `options.chain`（近周 ATM）** — agent 选取最近的周期权到期日，识别 ATM 行权价，读取认购+认沽中间价，计算隐含波动幅度。
6. **`fundamentals.beat_miss_history`** — 获取过去 8 季的超预期/低于预期历史。
7. **综合处理（无工具调用）** — agent 将简报整合为 Markdown 并输出至对话。

预期输出：每只未来 24 小时内有财报的标的一个 Markdown 块；若自选股中近期无财报，则输出 `No upcoming earnings in the next 24h.`

`[screenshot: Claude chat transcript showing tool calls expand inline, followed by the rendered Markdown brief]`

## 可自定义项

- **时间窗口** — 将提示词中的"next 24 hours"改为"next 7 days"可获得周度前瞻，改为"next 4 hours"则适合当日内扫描。
- **简报章节** — 去掉隐含波动幅度那一行，添加"宏观背景"段落，或将语气从中性改为有观点。编辑提示词即可，无需修改代码。
- **输出格式** — 如果需要接入其他工具，可要求输出 JSON 而非 Markdown；如果要发布社交媒体，可要求"每只股票一条推文"。

## 自动化 / headless 变体

适用于 cron 任务、GitHub Action 或任何无 agent 的场景：

```bash
# From the repo root
cp .env.example .env
# edit .env → LONGBRIDGE_APP_KEY / APP_SECRET / ACCESS_TOKEN, TRADING_MODE=paper
pip install longbridge anthropic
cd recipes/01_earnings_monitor
python main.py             # pre-brief mode
python main.py --mode recap
```

Python 备用方案直接使用 Longbridge SDK，生成等效的 Markdown 输出。
参见 `main.py`——其工具调用序列与 MCP agent 保持一致。

## 许可与免责声明

MIT——详见仓库根目录的 [LICENSE](../../LICENSE)。

本食谱仅为工程示例，**不构成投资建议。** 财报简报由大语言模型生成，可能含有幻觉数字——请务必与原始公告交叉核实。默认仅在模拟交易模式下运行；切换至实盘交易风险自负。作者及 Longbridge Securities 对本代码的任何使用概不承担责任。
