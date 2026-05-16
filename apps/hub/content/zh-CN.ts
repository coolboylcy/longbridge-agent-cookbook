import type { HubContent } from "./types";

const zhCN: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook",
    description:
      "可直接运行的 AI Agent 食谱，专为 Longbridge 设计。粘贴到 Claude、Cursor、Codex 即可使用 — 不用写代码。",
  },
  nav: { brand: "Agent Cookbook", allRecipes: "所有食谱" },
  hero: {
    eyebrow: "开源 · MCP 优先 · 模拟交易",
    title: "让 AI 帮你处理交易里无聊的部分。",
    description:
      "可直接运行的 AI Agent 食谱。把 Prompt 粘贴到 Claude，就能拿到一份干净的财报简报、期权扫描或周度持仓复盘。不用写代码。",
  },
  mcpBanner: {
    title: "第一次来？两步搞定 Longbridge 设置",
    detail: "先连接（CLI 或 MCP）→ 再安装 Skill。支持 Claude Code、Claude Desktop、Cursor、Codex。",
    cta: "安装指南 ↗",
  },
  recipesSection: { title: "食谱" },
  recipes: [
    {
      title: "财报监控",
      description:
        "AI 监看你的自选股，提前 24 小时生成财报简报，公布后 1 小时生成复盘，全自动。",
      href: "https://earnings-monitor-ochre.vercel.app/zh-CN",
      status: "live",
      statusLabel: "上线",
    },
    {
      title: "期权扫描器",
      description:
        "AI 扫描你的自选股，找出最值钱的备兑期权机会 — 按年化权利金收益排序。",
      href: "https://options-scanner-three.vercel.app/zh-CN",
      status: "live",
      statusLabel: "上线",
    },
    {
      title: "投资组合回顾",
      description:
        "AI 读你的模拟持仓，写一份周度交易日志 — 3 个观察、下周 3 个问题。",
      href: "https://portfolio-review-three.vercel.app/zh-CN",
      status: "live",
      statusLabel: "上线",
    },
  ],
  quickstart: {
    title: "怎么用（5 分钟）",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 应用",
        body: "二选一：CLI（推荐 — brew install longbridge-terminal，然后 longbridge auth login）或 MCP（把 URL https://openapi.longbridge.com/mcp 加到客户端配置）。OAuth 自动处理登录。",
      },
      {
        title: "安装 Skill",
        body: "在 Claude Code 里执行：/plugin marketplace add longbridge/skills 然后 /plugin install longbridge@longbridge-skills。或用 npx skills add longbridge/skills -g 适用任何工具。",
      },
      {
        title: "打开任一食谱，跑 Prompt",
        body: "点「在 Claude 打开」（或复制粘贴）。AI 抓你的自选股、跑分析、写报告。你只需要等。",
      },
    ],
  },
  whyThisExists: {
    title: "这个项目存在的原因",
    body: [
      "大多数散户投资者不会写代码。大多数有用的 Agent 工作流被埋在 GitHub README 里，假设你会 Python 和命令行。",
      "这本食谱把这件事翻转过来。每个食谱都是一页：一个 Prompt、一个 Copy 按钮、一个说明告诉你会发生什么。不用 clone、不用 Python、不用 SDK，只需要 MCP。",
      "由一个真实的 Longbridge 用户亲自打造和维护 — 这些都是我每周在自己模拟账户上实际在跑的工作流。",
    ],
  },
  faq: {
    title: "常见问题",
    items: [
      {
        q: "我需要会写代码吗？",
        a: "不用。MCP 的核心价值就是让你不需要。一次性编辑一个配置文件（纯复制粘贴），之后全部都是聊天。",
      },
      {
        q: "安全吗？会不会帮我下实单？",
        a: "默认是模拟交易。食谱本身不会下单 — 只是读数据、写报告。我们刻意对实盘交易设了门槛。",
      },
      {
        q: "要钱吗？",
        a: "Longbridge MCP 免费。你只付 AI 应用本身的钱（Claude Pro、Cursor 等）— 跟你用任何 Agent 一样。",
      },
      {
        q: "为什么要 MCP？我直接问 Claude 不行吗？",
        a: "没有 MCP，Claude 看不到你真实的自选股、真实的持仓、实时行情 — 它只能瞎编。MCP 给 Agent 真正的券商手脚。",
      },
      {
        q: "可以不用 Claude 吗？",
        a: "可以。任何支持 MCP 的聊天应用都行 — Cursor、Codex、Claude Code、Claude Desktop。一模一样可以跑。",
      },
      {
        q: "为什么安装要分两步（连接 + 装 Skill）？",
        a: "第一步（CLI 或 MCP）让 AI 有权限调用 Longbridge。第二步（Skill）告诉 AI Longbridge 能做什么。少了第二步，AI 可能根本不知道 Longbridge 可用。官方指南 open.longbridge.com/skill 对此有详细说明。",
      },
      {
        q: "Claude Desktop 连不上。",
        a: "切到 Claude Desktop 的 Code 标签。Chat 和 Cowork 模式因网络白名单会阻塞 CLI 安装和 MCP 连接 — 它们是沙盒环境。Code 标签是内嵌的 Claude Code，有完整终端权限。",
      },
      {
        q: "我有新食谱的想法，可以贡献吗？",
        a: "欢迎。在 GitHub 提 Issue 或读 CONTRIBUTING.md。门槛很低：有用的 Prompt + 清楚的说明。",
      },
    ],
  },
  author: {
    title: "关于",
    line: "由 Chris Liang 制作 — Longbridge Securities 香港，增长负责人。",
    disclaimer: "个人项目。观点仅代表个人，与雇主无关。不构成投资建议。",
    links: [
      { label: "X / Twitter", href: "https://x.com/chrisaiquant" },
      { label: "Substack", href: "https://chrisliang.substack.com" },
      { label: "GitHub", href: "https://github.com/chrisaiquant" },
    ],
  },
};

export default zhCN;
