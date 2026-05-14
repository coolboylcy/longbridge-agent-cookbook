> 🌐 **Language / 语言 / 語言:** [English](CONTRIBUTING.md) · 简体中文 · [繁體中文](CONTRIBUTING.zh-TW.md)

# 贡献指南

感谢您考虑参与贡献。这个仓库之所以有价值，在于每一个食谱都小巧、可运行、诚实——并且**以 MCP 为优先**。在提交 PR 之前，请先阅读本文档。

## 准入标准

一个食谱被接受的条件：

- README 中的 MCP 优先提示词能够在 Claude Desktop / Cursor / Codex 中，对接模拟交易的 Longbridge MCP 安装，端到端地运行成功。
- `README.md` 遵循模板格式（每个章节按顺序排列——**提示词优先，无头回退其次**）。
- 可选的 `main.py`（无头回退）不超过约 200 行，且在文件顶部包含模拟交易安全守卫。
- 食谱只做一件事。多步骤流水线应放在各自的文件夹中。
- 不提交密钥、真实持仓，或任何可能泄露用户账户信息的内容。

## 添加食谱——MCP 优先，逐步操作

### 1. Fork 并克隆

```bash
git clone https://github.com/<your-username>/longbridge-agent-cookbook.git
cd longbridge-agent-cookbook
git checkout -b recipe/your-recipe-name
```

### 2. 复制模板

```bash
cp -r recipes/_template recipes/04_your_recipe_name
```

食谱文件夹命名规则：`NN_snake_case_name`，其中 `NN` 是下一个可用的两位数字前缀。

### 3. 先写提示词

食谱**就是**提示词。打开 `recipes/04_your_recipe_name/README.md`，首先填写 **Quickstart — MCP-first** 章节。你的提示词应当：

- 按意图引用 Longbridge MCP 工具（如"拉取我的自选股"、"获取期权链"），而非使用精确的工具名称。由 Agent 选择合适的工具——你的职责是让目标明确无歧义。
- 对输出格式有明确要求（如"包含 X、Y、Z 列的 Markdown 表格"，而非"汇总数据"）。
- 限定工作范围（如"仅考虑 DTE 30–45"、"仅限模拟交易账户"）。
- 当食谱可能涉及交易接口时，以安全声明结尾："Paper-trading account only. No order placement."

### 4. 记录工具调用流程说明

填写 **Walkthrough — what the agent will do** 章节。这是食谱的教学核心。按顺序列出 Agent 可能调用的 MCP 工具及各工具的用途。读者由此了解幕后发生了什么。

### 5. 填写 README 其余章节

- **What this does** — 一段话，不加废话。
- **What you can change** — 恰好 3 条要点。每一条应是单次提示词的修改，而非代码改动。
- **Automated / headless variant** — 指向 `main.py`。本章节保持简短。
- **License & disclaimer** — 从任意现有食谱中复制。

### 6. 可选：为无头使用编写 `main.py`

如果食谱适合作为定时任务运行，请附上回退方案。从以下骨架开始：

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

编写规范：

- 使用官方 `longbridge` Python SDK。不要自己封装 HTTP 客户端。
- 默认输出人类可读的内容。如需结构化输出，添加 `--json` 参数。
- 不硬编码标的代码（合理的默认值除外）。从 `WATCHLIST` 环境变量或命令行参数读取。
- 缺少凭证时应明确报错，不要静默回退。
- `main.py` 的输出应与 MCP 驱动的 Agent 产出基本一致。保持一致性是关键所在。

### 7. 更新根目录 README

在 `/README.md` 的 **Recipes** 表格中添加一行新食谱。在其于一台全新机器上完成端到端运行（包括 MCP 优先路径，以及如有提交则还需运行无头回退）之前，将 `Status` 设为 `scaffolded`，之后改为 `working`。

### 8. 提交 PR

PR 标题格式：`recipe(NN): short description`

PR 正文必须包含：

- 2–3 句话的摘要。
- 运行食谱的 MCP 对话记录粘贴（过长可截断）。至少展示工具调用序列和最终输出。
- 如有提交 `main.py`：同时粘贴其终端输出。
- 确认已在模拟交易模式下运行。

## 会被拒绝的情况

- README 仅有 `python main.py` 的食谱。MCP 优先提示词是强制要求。
- 仅包装一次 MCP 工具调用的食谱。请展示有用的工作流，而非薄薄的封装层。
- 需要付费第三方 API 才能运行的食谱。可选集成是允许的。
- 任何带有交易策略性质的内容。本仓库是工程示例，不是 alpha 因子。
- 以营销口吻开头的 README。展示内容，不要推销。

## 代码风格

目前尚未强制执行 black/ruff 配置。请保持合理规范。如果确实需要风格指南：PEP 8 + 双引号。

## 许可证

提交贡献即表示您同意您的贡献以 [MIT 许可证](LICENSE) 授权。
