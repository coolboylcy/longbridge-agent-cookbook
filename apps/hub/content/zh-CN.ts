import type { HubContent, RecipeCard } from "./types";

const SETUP_URL =
  "https://open.longbridge.com/skill?invite-code=F6HEGJ";
const ISSUES_URL =
  "https://github.com/longbridge/developers/issues/new";

const RECIPES: RecipeCard[] = [
  {
    slug: "earnings-monitor",
    title: "财报监控",
    description:
      "AI 监看你的自选股，提前 24 小时生成财报简报，公布后 1 小时生成复盘，全自动。",
    href: "https://earnings-monitor-ochre.vercel.app/zh-CN",
    thumbnail: "earnings",
    meta: "01 · 5 分钟",
    status: "live",
    category: "events",
    tags: [
      { label: "财报", color: "blue" },
      { label: "新手", color: "green" },
      { label: "每天", color: "neutral" },
    ],
  },
  {
    slug: "options-scanner",
    title: "期权扫描器",
    description:
      "扫描你的自选股，找出最值钱的备兑期权机会 — 按年化权利金收益排序。",
    href: "https://options-scanner-three.vercel.app/zh-CN",
    thumbnail: "options",
    meta: "02 · 5 分钟",
    status: "live",
    category: "options",
    tags: [
      { label: "期权", color: "purple" },
      { label: "进阶", color: "orange" },
      { label: "每周", color: "pink" },
    ],
  },
  {
    slug: "portfolio-review",
    title: "投资组合回顾",
    description:
      "读你的模拟持仓，写一份周度交易日志 — 3 个观察、下周 3 个问题。",
    href: "https://portfolio-review-three.vercel.app/zh-CN",
    thumbnail: "portfolio",
    meta: "03 · 5 分钟",
    status: "live",
    category: "portfolio",
    tags: [
      { label: "投资组合", color: "teal" },
      { label: "新手", color: "green" },
      { label: "每周", color: "pink" },
    ],
  },

  {
    slug: "morning-brief",
    title: "盘前简报",
    description:
      "美股开盘前 30 分钟：自选股异动、隔夜新闻、今天该关注什么。配咖啡服用。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "04 · 每天",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "每天", color: "blue" },
      { label: "新手", color: "green" },
    ],
  },
  {
    slug: "ipo-radar",
    title: "IPO 雷达",
    description:
      "即将上市的美港 IPO，含申购窗口、解禁期、可比公司、定价区间判读。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "05 · 每周",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "IPO", color: "yellow" },
      { label: "港 · 美", color: "neutral" },
    ],
  },
  {
    slug: "buyback-tracker",
    title: "回购追踪器",
    description:
      "监控自选股的回购公告，计算回购占流通股本比例，标记重要催化剂。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "06 · 每天",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "回购", color: "teal" },
      { label: "事件驱动", color: "purple" },
    ],
  },
  {
    slug: "insider-watch",
    title: "内部人交易监控",
    description:
      "追踪美股 Form 4 / 港股 Form 3A 内部人增减持，计算净流向、发出群聚信号。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "07 · 每天",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "内部人", color: "red" },
      { label: "信号", color: "orange" },
    ],
  },
  {
    slug: "dividend-capture",
    title: "股息捕捉",
    description:
      "自选股即将除息的日期清单 + 捕捉策略可行性（收益率 vs 预期跌幅）。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "08 · 每周",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "股息", color: "teal" },
      { label: "收息", color: "green" },
    ],
  },
  {
    slug: "index-rebalance",
    title: "指数调整预警",
    description:
      "预测恒指、国企指数、标普 500、罗素的成分股调整，抢在强制买卖盘之前布局。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "09 · 每季",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "指数", color: "purple" },
      { label: "港 · 美", color: "neutral" },
    ],
  },
  {
    slug: "catalyst-radar",
    title: "催化剂雷达",
    description:
      "汇总自选股的财报、股息、拆股、FDA 日期、重大宏观事件，一个日历视图看完。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "10 · 每天",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "催化剂", color: "yellow" },
      { label: "日历", color: "blue" },
    ],
  },

  {
    slug: "csp-scanner",
    title: "现金担保卖权扫描",
    description:
      "找最好的 CSP 机会：高 IV、你愿意接货的行权价、DTE 内无财报事件。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "11 · 每周",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "期权", color: "purple" },
      { label: "收息", color: "green" },
    ],
  },
  {
    slug: "wheel-planner",
    title: "轮转策略规划器",
    description:
      "完整轮转：CSP → 被指派 → 备兑期权 → 平仓。逐步追踪，需要时建议 roll。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "12 · 每周",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "轮转", color: "purple" },
      { label: "进阶", color: "orange" },
    ],
  },
  {
    slug: "iv-crush-hunter",
    title: "IV Crush 猎人",
    description:
      "找财报后的 IV crush 机会 — 公布后做空 straddle/strangle，趁 IV 还没收敛。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "13 · 财报季",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "期权", color: "purple" },
      { label: "高阶", color: "red" },
    ],
  },
  {
    slug: "earnings-straddle",
    title: "财报跨式构建器",
    description:
      "财报前构建多头 straddle / strangle 仓位。Kelly 公式定仓、按 IV rank 对比历史走幅排序。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "14 · 财报季",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "期权", color: "purple" },
      { label: "波动率", color: "pink" },
    ],
  },
  {
    slug: "vol-surface",
    title: "波动率曲面解读",
    description:
      "绘制行权价 × 到期日的 IV 曲面，标记偏斜和期限结构异常，快速找出便宜/昂贵的波动率。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "15 · 每周",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "波动率", color: "purple" },
      { label: "高阶", color: "red" },
    ],
  },

  {
    slug: "tax-loss-harvest",
    title: "税损收割扫描",
    description:
      "年末扫描：已实现盈利、可收割的亏损、wash sale 标记、相似敞口的替代标的。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "16 · 年末",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "税务", color: "yellow" },
      { label: "美股", color: "neutral" },
    ],
  },
  {
    slug: "concentration-audit",
    title: "集中度风险审计",
    description:
      "审查持仓大小、行业、因子、地域的集中度。标记前 3、前 5 占 NAV 的比例。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "17 · 每月",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "风险", color: "red" },
      { label: "投资组合", color: "teal" },
    ],
  },
  {
    slug: "rebalance-calc",
    title: "再平衡计算器",
    description:
      "给定目标权重，计算精确的买卖张数做再平衡 — 最小化周转率和税务影响。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "18 · 每季",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "投资组合", color: "teal" },
      { label: "税务感知", color: "yellow" },
    ],
  },
  {
    slug: "sector-drift",
    title: "板块漂移侦测",
    description:
      "追踪板块配置因赢家奔跑而漂移多少。建议在保留 thesis 的前提下做的微调。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "19 · 每月",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "风险", color: "red" },
      { label: "投资组合", color: "teal" },
    ],
  },
  {
    slug: "performance-attribution",
    title: "业绩归因",
    description:
      "拆解月度 P&L：选股 vs 配置 vs 时机。告诉你为什么赢过或输给指数。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "20 · 每月",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "归因", color: "teal" },
      { label: "分析", color: "blue" },
    ],
  },

  {
    slug: "ah-premium",
    title: "AH 溢价追踪",
    description:
      "监控 A/H 双重上市股票的溢价百分位。标记极端值 — 收敛交易候选。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "21 · 每天",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "AH 溢价", color: "orange" },
      { label: "港 · 中", color: "neutral" },
    ],
  },
  {
    slug: "northbound-flow",
    title: "北向资金流",
    description:
      "每日陆股通北向资金流向头部标的。标出持续买入/卖出的、值得关注的信号。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "22 · 每天",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "资金流", color: "blue" },
      { label: "中", color: "neutral" },
    ],
  },
  {
    slug: "sector-rotation",
    title: "板块轮动指南针",
    description:
      "跨板块动量排名 + 相关性矩阵。告诉你哪些板块在领涨、滞涨、为什么。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "23 · 每周",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "板块", color: "purple" },
      { label: "宏观", color: "yellow" },
    ],
  },
  {
    slug: "anomaly-hunter",
    title: "异动股猎人",
    description:
      "自选股的量价异动扫描：成交量异常、跳空缺口、暗池大单、停牌复牌。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "24 · 盘中",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "异动", color: "red" },
      { label: "盘中", color: "orange" },
    ],
  },
  {
    slug: "52w-breakout",
    title: "52 周突破扫描",
    description:
      "突破 52 周新高/新低 + 成交量确认。筛出干净的技术面组合。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "25 · 每天",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "技术面", color: "blue" },
      { label: "突破", color: "orange" },
    ],
  },
  {
    slug: "pairs-trade",
    title: "配对交易",
    description:
      "跨板块协整扫描。返回 z-score、半衰期、进场信号最强的离散配对。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "26 · 每周",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "统计套利", color: "purple" },
      { label: "高阶", color: "red" },
    ],
  },
  {
    slug: "mean-reversion",
    title: "均值回归候选",
    description:
      "找超涨超跌准备回归的标的：RSI 极值、布林通道、距 50 日均线距离。附失效位。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "27 · 每周",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "均值回归", color: "teal" },
      { label: "技术面", color: "blue" },
    ],
  },

  {
    slug: "tearsheet",
    title: "个股 Tearsheet",
    description:
      "任意股票一键生成 tearsheet：业务、财务、可比、技术面、股权、近期新闻。可收藏。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "28 · 随需",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "Tearsheet", color: "blue" },
      { label: "新手", color: "green" },
    ],
  },
  {
    slug: "multifactor-screen",
    title: "多因子选股",
    description:
      "可自定义因子组合：价值 + 质量 + 动量 + 规模。输出头部标的 + 因子评分卡。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "29 · 每周",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "因子", color: "purple" },
      { label: "量化", color: "blue" },
    ],
  },
  {
    slug: "trade-journal",
    title: "交易日志自动化",
    description:
      "从模拟交易记录自动生成交易日志：理由、进场、出场、教训。Markdown 即可发布。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "30 · 每周",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "日志", color: "pink" },
      { label: "新手", color: "green" },
    ],
  },
];

const zhCN: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook — AI recipes for traders",
    description:
      "可直接运行的 AI Agent recipe。粘贴到 Claude Code、Codex、OpenClaw 等任何 AI 工具，你的 Agent 终于看得到你的自选股。不用写代码。",
  },
  nav: {
    brand: "Cookbook",
    links: [
      { label: "Recipes", href: "#recipes" },
      { label: "安装", href: SETUP_URL },
      { label: "常见问题", href: "#faq" },
      { label: "GitHub", href: "https://github.com/longbridge/developers" },
    ],
    searchPlaceholder: "Search recipes⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
  hero: {
    eyebrow: "Open source · 由 Longbridge Skill 驱动 · 模拟交易",
    title: "把券商塞进你的 Agent。",
    description:
      "为 Longbridge 设计的 AI Agent recipe。粘进 Claude Code、Codex、OpenClaw、Cursor 或任何 AI 工具，你的 Agent 立刻有了券商手脚 — 自选股、报价、期权链、持仓、模拟下单。不写代码。",
    primaryCta: "浏览 Recipes",
    primaryCtaHref: "#recipes",
    secondaryCta: "安装指南",
    secondaryCtaHref: SETUP_URL,
  },
  filterBar: {
    sortLabel: "筛选：",
    filters: [
      { label: "全部", value: "all" },
      { label: "事件", value: "events" },
      { label: "期权", value: "options" },
      { label: "投资组合", value: "portfolio" },
      { label: "扫描", value: "scanner" },
      { label: "工具", value: "tools" },
    ],
    statusLabels: { live: "上线", comingSoon: "即将推出" },
  },
  recipesSection: {
    title: "Recipes",
    countLabel: `共 ${RECIPES.length} 个 · ${RECIPES.filter((r) => r.status === "live").length} 个上线 · ${RECIPES.filter((r) => r.status === "coming-soon").length} 个即将推出`,
  },
  recipes: RECIPES,
  setupBanner: {
    title: "第一次来？两步搞定",
    body: "第一步 — 连接 Longbridge（CLI 或 MCP）。第二步 — 安装 Skill。整套不到 5 分钟。",
    primary: "安装指南 ↗",
    primaryHref: SETUP_URL,
    secondary: "官方文档 ↗",
    secondaryHref: "https://open.longbridge.com/skill?invite-code=F6HEGJ",
  },
  faq: {
    title: "常见问题",
    items: [
      {
        q: "我需要会写代码吗？",
        a: "不用。一次性编辑一个配置文件（纯复制粘贴），之后全部都是聊天。Recipe 就是 Prompt — 你只需要复制到 AI 应用。",
      },
      {
        q: "支持哪些 AI 工具？",
        a: "Longbridge Skill 适配绝大多数 AI Agent：Claude Code、Codex（Work locally 模式）、OpenClaw、Cursor、Claude Desktop（Code 标签）、Zed、Gemini CLI、Warp，以及任何支持 MCP 的客户端。",
      },
      {
        q: "安全吗？会不会帮我下实单？",
        a: "默认是模拟交易。Recipe 本身不会下单 — 只是读数据、写报告。我们刻意对实盘交易设了门槛。",
      },
      {
        q: "要钱吗？",
        a: "Longbridge 免费注册。你只付 AI 应用本身的钱（Claude Pro、Cursor 等）— 跟你用任何 Agent 一样。",
      },
      {
        q: "为什么要 Skill？我直接问 AI 不行吗？",
        a: "没有 Longbridge Skill，AI 看不到你真实的自选股、持仓、实时报价 — 它只能瞎编。Skill 给 Agent 真正的券商手脚。",
      },
      {
        q: "为什么安装要分两步？",
        a: "第一步（CLI 或 MCP）让 AI 有权限调用 Longbridge。第二步（Skill）告诉 AI Longbridge 能做什么。少了第二步，AI 可能根本不知道 Longbridge 可用。",
      },
      {
        q: "Claude Desktop / Codex 连不上。",
        a: "Claude Desktop 切到 Code 标签；Codex 新建会话时选 Work locally。Chat / Cowork / Cloud 模式因网络白名单会阻塞 CLI 安装和 MCP 连接 — 它们是沙盒环境。",
      },
      {
        q: "我可以贡献新的 Recipe 吗？",
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
      { label: "Substack", href: "https://chrisaiquant.substack.com" },
      { label: "WhatsApp", href: "https://wa.me/85266944195" },
      { label: "GitHub", href: "https://github.com/coolboylcy" },
    ],
  },
};

export default zhCN;
