import type { PageContent } from "./types";

const SCAN_PROMPT = `使用 Longbridge MCP，扫描我自选股的备兑看涨期权机会：

1. 取出我的自选股。剔除没有期权的股票。
2. 对于剩下的股票，计算 252 天的 IV Rank：
     iv_rank = (iv_today - iv_min_252d) / (iv_max_252d - iv_min_252d)
   使用最接近 30 DTE 到期日的 ATM 看涨期权 IV。
   只保留 iv_rank >= 0.5 的股票。
3. 对每只股票抓取看涨期权链。只保留符合以下条件的期权：
     - 30 <= DTE <= 45
     - 0.20 <= delta <= 0.35
     - 买价 > 0.05
     - 未平仓合约 >= 100
     - 行权价在现价之上（OTM）
4. 按年化权利金收益率排序：
     annualized_yield = (中价 / 行权价) * (365 / DTE)
   取前 10 名，输出 Markdown 表格，列包括：
   Ticker | 行权价 | 到期日 | DTE | Delta | 中价 | IV Rank | 年化收益
5. 对前 3 名各写一段话：
   为什么选这个行权价、什么情况下该离场、被指派的后果。
   如果 DTE 窗口内有财报，记得提醒。

仅限模拟交易账户。不会下单。`;

const SAMPLE_OUTPUT = `# 备兑看涨期权扫描 — IV Rank ≥ 0.5

| Ticker | 行权价 | 到期日 | DTE | Delta | 中价 | IV Rank | 年化收益 |
| ------ | ------ | ------ | --- | ----- | ---- | ------- | -------- |
| TSLA   | 380    | Jun 20 | 32  | 0.28  | 7.85 | 0.71    | 23.4%    |
| AMD    | 165    | Jun 20 | 32  | 0.26  | 3.40 | 0.62    | 23.5%    |
| NVDA   | 360    | Jun 20 | 32  | 0.31  | 6.20 | 0.68    | 19.7%    |
| COIN   | 240    | Jun 20 | 32  | 0.30  | 4.10 | 0.78    | 19.5%    |
| MSTR   | 295    | Jun 20 | 32  | 0.27  | 4.55 | 0.82    | 17.6%    |

## 前三名理由

**TSLA Jun-20 380C @ 7.85** — IV rank 0.71，FOMC 后波动率衰减顺风。行权价
锁住 +10% 上行；若被指派，等于用较高价卖出持股。若中国零售消息引爆强势
反弹进入 DTE 窗口，需重新评估。

**AMD Jun-20 165C @ 3.40** — 前 10 名最高年化收益。0.26 delta 有缓冲。
财报 7/28，在 DTE 窗口外。

**NVDA Jun-20 360C @ 6.20** — Delta 0.31，指派风险适中。下次财报约 8/21，
在 DTE 窗口外。若 NVDA 放量突破 360 应考虑 roll。`;

const zhCN: PageContent = {
  meta: {
    title: "期权扫描器 — Longbridge Agent Cookbook",
    description: "AI 帮你扫自选股最值钱的备兑期权 — 不用自己算数学。",
  },
  hero: {
    eyebrow: "Recipe 02 · 期权",
    title: "期权扫描器",
    description:
      "AI Agent 扫你的 Longbridge 自选股，找出年化权利金最高的备兑看涨期权机会 — 按 IV Rank、delta、财报风险筛选。",
    badges: ["需要基本期权知识", "模拟交易", "5 分钟上手"],
    thumbnail: "options",
    tags: [
      { label: "期权", color: "purple" },
      { label: "进阶", color: "orange" },
      { label: "模拟", color: "neutral" },
      { label: "MCP", color: "purple" },
    ],
  },
  sidebar: {
    title: "详情",
    rows: [
      { label: "Recipe", value: "02 · 期权扫描器" },
      { label: "难度", value: "进阶" },
      { label: "上手时间", value: "约 5 分钟" },
      { label: "市场", value: "美股（港股有限）" },
      { label: "频率", value: "每周" },
      { label: "交易模式", value: "仅限模拟" },
      { label: "作者", value: "Chris Liang" },
      { label: "授权", value: "MIT" },
    ],
    primaryCta: "在 Claude 打开",
    primaryCtaHref: "",
  },
  whatItDoes: {
    title: "这个 Recipe 做什么",
    bullets: [
      "看你自选股中支持期权的股票。",
      "只留高 IV Rank 的 — 也就是期权权利金比平时更贵的时候。",
      "回一份前 10 名备兑期权清单，再帮前 3 名写好理由。",
    ],
  },
  whatYouNeed: {
    title: "你需要准备",
    items: [
      {
        label: "Longbridge 账户（开通期权）",
        detail: "免费注册（longbridge.com）。模拟账户即可。",
      },
      {
        label: "基本期权知识",
        detail:
          "知道「备兑看涨」、「delta」、「DTE（到期天数）」是什么就够了。IV Rank 我下面解释。",
      },
      {
        label: "一个 AI 对话应用（Claude / Cursor 等）",
        detail: "推荐 Claude Desktop。任何支持 MCP 的都可以。",
      },
    ],
  },
  howToRun: {
    title: "怎么跑（3 步）",
    intro: "如果你已经装好 Longbridge，直接跳到第 3 步。",
    setupLinkLabel: "完整安装指南",
    setupLinkHref:
      "https://open.longbridge.com/skill/install.md",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 应用",
        body: "二选一：CLI（brew install --cask longbridge/tap/longbridge-terminal，再 longbridge auth login）或 MCP（把 https://openapi.longbridge.com/mcp 加到客户端配置）。OAuth 自动处理登录。",
      },
      {
        title: "安装 Skill",
        body: "Claude Code 用户执行 `/plugin marketplace add longbridge/skills` 然后 `/plugin install longbridge@longbridge-skills`。Codex、OpenClaw、Cursor 等其他工具执行 `npx skills add longbridge/skills -g`（或粘贴 ZIP 安装链接）。Skill 告诉 AI Longbridge 能做什么。",
      },
      {
        title: "复制下方 Prompt，粘贴运行",
        body: "点 Copy（或「在 Claude 打开」）。Agent 抓自选股、算 IV Rank、回排好的表格。",
      },
    ],
  },
  prompt: {
    title: "扫描 Prompt",
    label: "covered-call scan",
    body: SCAN_PROMPT,
    openInClaude: "在 Claude 打开",
    copy: "复制",
    copied: "已复制！",
  },
  sampleOutput: {
    title: "跑完你会得到什么",
    label: "示例输出",
    body: SAMPLE_OUTPUT,
  },
  flow: {
    title: "底层发生了什么",
    steps: [
      {
        tool: "watchlist.list",
        description: "拉取你追踪的股票清单 — 待扫描的范围。",
      },
      {
        tool: "security.meta",
        description: "剔除不支持期权的股票。港股期权覆盖有限，这层会看到。",
      },
      {
        tool: "options.iv_history",
        description:
          "每只股票 252 天的 ATM 看涨期权 IV。Agent 即时计算 IV rank，过滤到 ≥ 0.5。",
      },
      {
        tool: "options.chain_expiries + options.chain",
        description:
          "抓 30–45 DTE 的看涨期权切片。每条有行权价、买卖中价、delta、未平仓、IV。",
      },
      {
        tool: "筛选 + 排序",
        description:
          "Agent 套用 delta / 买价 / 未平仓的筛选，按年化收益排序。",
        noToolCall: true,
      },
      {
        tool: "calendar.events",
        description:
          "检查前三名候选在 DTE 窗口内是否有财报 — 给理由段落标记事件风险。",
      },
      {
        tool: "整合输出",
        description: "做好 Markdown 表格（10 行）+ 三段理由。",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "怎么改成你想要的",
    items: [
      {
        label: "改筛选条件",
        detail:
          '改"30 ≤ DTE ≤ 45"或"0.20 ≤ delta ≤ 0.35"。delta 越紧 = 被指派风险越低，权利金也越小。',
      },
      {
        label: "改 IV Rank 阈值",
        detail: "默认 0.5。低波动环境降到 0.3；要更严格的信号就升到 0.7。",
      },
      {
        label: "加上持仓限制",
        detail:
          "加一句：「只筛选我模拟账户持有 100 股以上的股票」。Agent 会调 account.positions 过滤 — 真正的备兑 vs 裸卖。",
      },
    ],
  },
  footer: { backToHub: "← All recipes", github: "GitHub ↗" },
  nav: {
    brand: "Cookbook",
    allRecipes: "All recipes",
    links: [
      { label: "All recipes", href: "https://longbridge-cookbook-hub.vercel.app/zh-CN" },
      { label: "安装", href: "https://open.longbridge.com/skill/install.md" },
      { label: "GitHub", href: "https://github.com/longbridge/developers" },
    ],
    searchPlaceholder: "Search recipes⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
};

export default zhCN;
