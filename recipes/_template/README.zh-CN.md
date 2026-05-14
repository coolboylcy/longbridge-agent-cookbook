> 🌐 **Language / 语言 / 語言:** [English](README.md) · 简体中文 · [繁體中文](README.zh-TW.md)

# 食谱 NN：[TODO 食谱名称]

> [TODO 一句话简介——这个 agent 做什么？用一句话说清楚。]

## 功能说明

[TODO 一段话。要具体。"Agent 监控你的自选股中的 X 并输出 Y。"
说明触发方式（对话提示词？cron？webhook？）和输出形式（对话回复？
Markdown？文件？Slack？）。]

## 快速上手——MCP 优先

**前提条件：** 一个支持 MCP 的 agent（Claude Desktop、Cursor、Claude Code、Codex），并已安装
Longbridge MCP。如果还没安装，请参阅根目录的
[`MCP_SETUP.md`](../../MCP_SETUP.md)——大约需要 60 秒。

安装完成后，打开你的 agent 并粘贴以下提示词：

```
[TODO 你的食谱提示词——要具体。按意图引用 Longbridge MCP 工具，
而非工具名称。例如："Using the Longbridge MCP, pull my watchlist, find tickers with
earnings in the next 24h, and write a Markdown brief for each one."]
```

就这样。agent 会依次调用 MCP 工具并生成输出。

## 详解——agent 的执行过程

粘贴提示词后，预期的工具调用序列如下：

1. **[TODO 步骤 1——例如 "watchlist.list"]** — [TODO agent 获取什么数据，为什么]
2. **[TODO 步骤 2——例如 "calendar.events"]** — [TODO]
3. **[TODO 步骤 3——例如 "fundamentals.quarterly"]** — [TODO]
4. **[TODO 步骤 4——综合处理]** — [TODO agent 如何处理这些数据]

预期输出：[TODO 用 1–2 句话描述成功的样子。]

`[screenshot: chat transcript showing the tool calls and final output]`

## 可自定义项

- **[TODO 参数 1]** — [TODO 如何在提示词中调整]
- **[TODO 参数 2]** — [TODO]
- **[TODO 参数 3]** — [TODO]

## 自动化 / headless 变体

对于 cron、GitHub Actions 或任何不需要 agent 实时参与的场景，本食谱还提供了一个
直接使用 Longbridge Python SDK 的 Python 备用方案。

```bash
# From the repo root
cp .env.example .env
# edit .env → LONGBRIDGE_APP_KEY / APP_SECRET / ACCESS_TOKEN, TRADING_MODE=paper
pip install longbridge
cd recipes/NN_recipe_name
python main.py
```

`main.py` 的输出结果与 MCP 驱动的 agent 输出基本一致。
适合需要确定性、可调度、无 agent 运行的场景。

## 许可与免责声明

MIT——详见仓库根目录的 [LICENSE](../../LICENSE)。

本食谱仅为工程示例，**不构成投资建议。** 默认仅在模拟交易模式下运行；
切换至实盘交易风险自负。作者及 Longbridge Securities 对本代码的任何使用概不承担责任。
