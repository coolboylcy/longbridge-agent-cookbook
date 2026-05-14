> 🌐 **Language / 语言 / 語言:** [English](README.md) · 简体中文 · [繁體中文](README.zh-TW.md)

# 食谱 03：每周投资组合复盘

> 一个 agent，读取你的模拟交易持仓并生成每周复盘——3 条观察 + 3 个下周待思考的问题。

## 功能说明

每周，agent 从 Longbridge 获取你的模拟交易持仓、近期成交和现金余额。它计算基础持仓指标（板块分布、前 3 大持仓集中度、周环比 PnL、已平仓交易胜率），然后生成结构化的日记式 Markdown 复盘：关于过去一周的 **3 条观察** + 下周的 **3 个待解问题**。

触发方式（主）：在周五收盘或周日晚间将提示词粘贴至 agent。触发方式（headless）：从 cron 运行 `python main.py`。输出：Markdown 打印至对话（或在 headless 路径下写入 `reviews/YYYY-Www.md`）。

## 快速上手——MCP 优先

**前提条件：** 已安装 Longbridge MCP 的 Claude Desktop（或 Cursor / Claude Code / Codex）。请参阅 [`MCP_SETUP.md`](../../MCP_SETUP.md)。

打开你的 agent 并粘贴：

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

## 详解——agent 的执行过程

MCP 工具调用序列如下：

1. **`account.balance`** — 获取总 NAV 和现金。
2. **`account.positions`** — 获取所有持仓（含成本基础和当前价值）。
3. **`account.executions(start=last_monday, end=now)`** — 获取窗口内所有成交记录。
4. **`security.meta`（针对持仓标的）** — 获取行业信息，汇总为 GICS 板块以计算板块分布指标。
5. **`account.nav_history(days=14)`** — 为 agent 提供足够数据以计算周环比 NAV 变动。
6. **计算步骤（无工具调用）** — agent 执行胜率、集中度、持仓周期及未实现盈亏排名的算术运算。
7. **综合处理** — 按照你指定的章节结构生成 Markdown 复盘。

预期输出：一个包含 `# Week of YYYY-Www` 的单一 Markdown 块，一行统计摘要，然后是 3 条观察和 3 个问题。

`[screenshot: chat transcript showing the metric table the agent computed, followed by the final review Markdown]`

## 可自定义项

- **复盘窗口** — 将"last 7 days"改为"last 30 days"可改为月度节奏；若 agent 有记忆功能，可使用"since I last asked"。
- **观察/问题数量** — 默认为 3+3。可改为 5+5，或拆分为"有效的 / 无效的 / 下次要尝试的"。
- **板块分类体系** — 无需使用 GICS，可让 agent 将持仓汇总至你自定义的分类（如"AI 算力 / 中国消费 / 港股地产 / 现金"）。纯粹的提示词修改即可实现。

## 自动化 / headless 变体

适用于周日晚间 cron 或 GitHub Action：

```bash
# From the repo root
cp .env.example .env
pip install longbridge anthropic
cd recipes/03_portfolio_review
python main.py
```

Python 备用方案将输出写入 `recipes/03_portfolio_review/reviews/YYYY-Www.md`（ISO 周），同时打印至标准输出。若当前周文件已存在，则追加差异章节而非覆盖。

## 许可与免责声明

MIT——详见仓库根目录的 [LICENSE](../../LICENSE)。

本食谱仅为工程示例，**不构成投资建议。** 复盘由大语言模型基于小样本数据生成，可能得出错误结论；请将其作为日记式提示，而非决策依据。默认仅在模拟交易模式下运行；切换至实盘交易风险自负。作者及 Longbridge Securities 对本代码的任何使用概不承担责任。
