import type { PageContent } from "./types";

const REVIEW_PROMPT = `使用 Longbridge MCP，帮我写周度投资组合复盘：

1. 取出我模拟交易账户的状态：NAV、现金、所有持仓。
2. 取出过去 7 天（或本 ISO 周）的所有成交。
3. 计算这些指标：
     - 已平仓交易的次数、胜率
     - 平均持仓时长
     - 本周最大已实现盈利、最大已实现亏损
     - 当前持仓的板块分布（GICS 行业，通过 security metadata）
     - 前三大持仓占 NAV 的比例
     - 周度 NAV 变动
     - 未平仓持仓中最大未实现盈利、最大未实现亏损
4. 写一份 Markdown 复盘，结构必须如下：
     # Week of <ISO 周，如 2026-W19>
     ## Stats
     <一行：NAV、WoW%、交易数、胜率>
     ## 3 observations
     <三点，编号，第一人称，简短，不要含糊用语>
     ## 3 questions for next week
     <三点，编号，下周要调查什么，不是要做什么>

风格：日志式。短。立场明确。不要"考虑"、"可能值得"这种语气。
这是写给我自己看的，不是给客户的。

仅限模拟交易账户。不会下单。`;

const SAMPLE_OUTPUT = `# Week of 2026-W19

## Stats
NAV $103,420 | WoW +2.1% | 8 笔交易 | 胜率 62%

## 3 观察
1. 科技股集中度达 NAV 的 58% — 自 3 月以来最高。
2. 3 笔亏损中有 2 笔是同一天卖的；复盘入场时机。
3. 期权权利金完全抵消了本周股票亏损。

## 下周 3 个问题
1. 科技股集中度是有意为之，还是顺势漂移？
2. 为什么周二的卖单都不如预期 — 滑点还是信号错？
3. AAPL 的备兑看涨期权要不要在进入价内前先 roll？`;

const zhCN: PageContent = {
  meta: {
    title: "投资组合回顾 — Longbridge Agent Cookbook",
    description: "AI 帮你写的周度交易日志：三个观察、三个下周问题。",
  },
  hero: {
    eyebrow: "食谱 03 · 投资组合",
    title: "投资组合回顾",
    description:
      "AI Agent 读你的模拟持仓，写一份精炼的周度复盘 — 三个观察、三个问题、用你的语气。",
    badges: ["新手友好", "模拟交易", "5 分钟上手"],
    thumbnail: "portfolio",
    tags: [
      { label: "投资组合", color: "teal" },
      { label: "新手", color: "green" },
      { label: "周度", color: "pink" },
      { label: "MCP", color: "purple" },
    ],
  },
  sidebar: {
    title: "详情",
    rows: [
      { label: "食谱", value: "03 · 投资组合回顾" },
      { label: "难度", value: "新手" },
      { label: "上手时间", value: "约 5 分钟" },
      { label: "市场", value: "美股 · 港股 · 加密" },
      { label: "频率", value: "每周" },
      { label: "交易模式", value: "仅限模拟" },
      { label: "作者", value: "Chris Liang" },
      { label: "授权", value: "MIT" },
    ],
    primaryCta: "在 Claude 打开",
    primaryCtaHref: "",
  },
  whatItDoes: {
    title: "这个食谱做什么",
    bullets: [
      "读你的模拟账户：余额、持仓、过去 7 天的所有成交。",
      "算出真正重要的指标 — 胜率、板块分布、集中度、周度 NAV 变动。",
      "写一份日志式复盘：3 个观察 + 下周 3 个问题，用你的语气。",
    ],
  },
  whatYouNeed: {
    title: "你需要准备",
    items: [
      {
        label: "Longbridge 模拟交易账户",
        detail: "免费注册。模拟账户就好 — Prompt 预期是模拟。",
      },
      {
        label: "过去一周有一些交易记录",
        detail: "不然复盘会很单薄。几笔模拟交易就足够生成有用的输出。",
      },
      {
        label: "一个 AI 对话应用（Claude / Cursor 等）",
        detail: "推荐 Claude Desktop。任何支持 MCP 的应用都可以。",
      },
    ],
  },
  howToRun: {
    title: "怎么跑（3 步）",
    intro: "周五晚或周日晚跑，周度视角最干净。Longbridge 已装好就跳到第 3 步。",
    setupLinkLabel: "完整安装指南",
    setupLinkHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-CN.md",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 应用",
        body: "二选一：CLI（brew install --cask longbridge/tap/longbridge-terminal，再 longbridge auth login）或 MCP（把 https://openapi.longbridge.com/mcp 加到客户端配置）。一次性 OAuth。",
      },
      {
        title: "安装 Skill",
        body: "在 Claude Code 里：/plugin marketplace add longbridge/skills 然后 /plugin install longbridge@longbridge-skills。其他工具：npx skills add longbridge/skills -g。",
      },
      {
        title: "复制下方 Prompt，粘贴运行",
        body: "点 Copy（或「在 Claude 打开」）。Claude 抓账户状态、算指标、写复盘。你只需要看。",
      },
    ],
  },
  prompt: {
    title: "复盘 Prompt",
    label: "portfolio review",
    body: REVIEW_PROMPT,
    openInClaude: "在 Claude 打开",
    copy: "复制",
    copied: "已复制！",
  },
  sampleOutput: {
    title: "跑完你会得到什么",
    label: "示例复盘",
    body: SAMPLE_OUTPUT,
  },
  flow: {
    title: "底层发生了什么",
    steps: [
      {
        tool: "account.balance",
        description: "模拟账户的总 NAV 和现金余额。",
      },
      {
        tool: "account.positions",
        description: "每个未平仓持仓的成本价、当前市值、未实现盈亏。",
      },
      {
        tool: "account.executions",
        description: "过去 7 天的所有成交 — 用来算交易次数、胜率、持仓时长。",
      },
      {
        tool: "security.meta",
        description:
          "每只股票的行业分类，汇总成 GICS 板块用于板块分布指标。",
      },
      {
        tool: "account.nav_history",
        description: "14 天的 NAV 历史 — 用来算周度变动。",
      },
      {
        tool: "计算",
        description:
          "胜率、集中度、平均持仓时长、未实现盈亏排名。",
        noToolCall: true,
      },
      {
        tool: "整合输出",
        description:
          "写 Markdown 复盘：# Week of YYYY-Www → Stats → 3 观察 → 下周 3 问题。",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "怎么改成你想要的",
    items: [
      {
        label: "改复盘周期",
        detail:
          '把"过去 7 天"改成"过去 30 天"做月度；或"自上次以来"如果你的 Agent 有记忆。',
      },
      {
        label: "改观察数量",
        detail:
          "默认 3 + 3。改成 5 + 5，或拆成「有效的 / 没效的 / 下次试的」。",
      },
      {
        label: "改板块分类",
        detail:
          "不用 GICS，改成你的自定义桶（'AI 算力 / 中国消费 / 港股房地产 / 现金'）。纯改 Prompt。",
      },
    ],
  },
  footer: { backToHub: "← 所有食谱", github: "GitHub ↗" },
  nav: {
    brand: "Cookbook",
    allRecipes: "所有食谱",
    links: [
      { label: "所有食谱", href: "https://longbridge-cookbook-hub.vercel.app/zh-CN" },
      { label: "安装", href: "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-CN.md" },
      { label: "GitHub", href: "https://github.com/coolboylcy/longbridge-agent-cookbook" },
    ],
    searchPlaceholder: "搜索食谱⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
};

export default zhCN;
