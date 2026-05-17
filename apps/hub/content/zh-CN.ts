import type { HubContent } from "./types";

const zhCN: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook — 给交易者的 AI 食谱库",
    description:
      "可直接运行的 AI Agent 食谱，专为 Longbridge 设计。粘贴到 Claude、Cursor、Codex 即可使用 — 不用写代码。",
  },
  nav: {
    brand: "Cookbook",
    links: [
      { label: "食谱", href: "#recipes" },
      { label: "安装", href: "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-CN.md" },
      { label: "常见问题", href: "#faq" },
      { label: "GitHub", href: "https://github.com/coolboylcy/longbridge-agent-cookbook" },
    ],
    searchPlaceholder: "搜索食谱⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
  hero: {
    eyebrow: "开源 · MCP 优先 · 模拟交易",
    title: "为你的券商账户准备的 AI 食谱。",
    description:
      "把 Prompt 粘贴到 Claude，就能拿到一份干净的财报简报、期权扫描或周度持仓复盘。不写代码。不用 SDK。你的 AI 终于看得到你的自选股。",
    primaryCta: "浏览食谱",
    primaryCtaHref: "#recipes",
    secondaryCta: "安装指南",
    secondaryCtaHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-CN.md",
  },
  filterBar: {
    sortLabel: "筛选：",
    filters: [
      { label: "全部", value: "all" },
      { label: "财报", value: "earnings" },
      { label: "期权", value: "options" },
      { label: "投资组合", value: "portfolio" },
      { label: "新手", value: "beginner" },
    ],
  },
  recipesSection: {
    title: "食谱",
    countLabel: (n) => `共 ${n} 个食谱`,
  },
  recipes: [
    {
      slug: "earnings-monitor",
      title: "财报监控",
      description:
        "AI 监看你的自选股，提前 24 小时生成财报简报，公布后 1 小时生成复盘，全自动。",
      href: "https://earnings-monitor-ochre.vercel.app/zh-CN",
      thumbnail: "earnings",
      meta: "食谱 01 · 5 分钟",
      tags: [
        { label: "财报", color: "blue" },
        { label: "新手", color: "green" },
        { label: "模拟", color: "neutral" },
      ],
    },
    {
      slug: "options-scanner",
      title: "期权扫描器",
      description:
        "AI 扫描你的自选股，找出最值钱的备兑期权机会 — 按年化权利金收益排序。",
      href: "https://options-scanner-three.vercel.app/zh-CN",
      thumbnail: "options",
      meta: "食谱 02 · 5 分钟",
      tags: [
        { label: "期权", color: "purple" },
        { label: "进阶", color: "orange" },
        { label: "模拟", color: "neutral" },
      ],
    },
    {
      slug: "portfolio-review",
      title: "投资组合回顾",
      description:
        "AI 读你的模拟持仓，写一份周度交易日志 — 3 个观察、下周 3 个问题。",
      href: "https://portfolio-review-three.vercel.app/zh-CN",
      thumbnail: "portfolio",
      meta: "食谱 03 · 5 分钟",
      tags: [
        { label: "投资组合", color: "teal" },
        { label: "新手", color: "green" },
        { label: "周度", color: "pink" },
      ],
    },
  ],
  setupBanner: {
    title: "第一次来？两步搞定",
    body: "第一步 — 连接 Longbridge（CLI 或 MCP）。第二步 — 安装 Skill。整套不到 5 分钟。",
    primary: "安装指南 ↗",
    primaryHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-CN.md",
    secondary: "官方文档 ↗",
    secondaryHref: "https://open.longbridge.com/skill/install.md",
  },
  faq: {
    title: "常见问题",
    items: [
      {
        q: "我需要会写代码吗？",
        a: "不用。一次性编辑一个配置文件（纯复制粘贴），之后全部都是聊天。食谱就是 Prompt — 你只需要复制到 AI 应用。",
      },
      {
        q: "安全吗？会不会帮我下实单？",
        a: "默认是模拟交易。食谱本身不会下单 — 只是读数据、写报告。我们刻意对实盘交易设了门槛。",
      },
      {
        q: "要钱吗？",
        a: "Longbridge 免费注册。你只付 AI 应用本身的钱（Claude Pro、Cursor 等）— 跟你用任何 Agent 一样。",
      },
      {
        q: "为什么要 MCP / Skill？我直接问 Claude 不行吗？",
        a: "没有 Longbridge Skill，Claude 看不到你真实的自选股、持仓、实时报价 — 它只能瞎编。Skill 给 Agent 真正的券商手脚。",
      },
      {
        q: "为什么安装要分两步？",
        a: "第一步（CLI 或 MCP）让 AI 有权限调用 Longbridge。第二步（Skill）告诉 AI Longbridge 能做什么。少了第二步，AI 可能根本不知道 Longbridge 可用。",
      },
      {
        q: "Claude Desktop 连不上。",
        a: "切到 Claude Desktop 的 Code 标签。Chat 和 Cowork 模式因网络白名单会阻塞 CLI 安装和 MCP 连接。Code 标签是内嵌的 Claude Code，有完整终端权限。",
      },
      {
        q: "我可以贡献食谱吗？",
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
