import type { PageContent } from "./types";

const PRE_BRIEF_PROMPT = `使用 Longbridge MCP，做一次财报扫描：

1. 取出我的自选股清单。
2. 对于每只在未来 24 小时内公布财报的股票，抓取：
   - 过去 4 个季度的 EPS 和营收（实际 vs 预期）
   - 本季当前的市场一致预期（EPS、营收）
   - 最近一周的期权链 — 计算隐含波动幅度：
     (ATM 看涨期权中价 + ATM 看跌期权中价) / 现价
   - 过去 8 个季度的"超预期 / 不及预期"历史
3. 为每只财报股写一份精炼的 Markdown 简报：
   - 上季回顾（1 行）
   - 本季共识预期（1 行）
   - 隐含波动幅度（1 行）
   - Beat/miss 历史（1 行）
   - 三个值得关注的重点（3 条）

如果未来 24 小时内没有财报，就明确说"没有"并停止。`;

const POST_RECAP_PROMPT = `使用 Longbridge MCP，针对刚刚公布财报的 [TICKER]：

1. 取出实际营收、EPS、以及任何指引更新。
2. 对比之前引用的市场共识和隐含波动幅度。
3. 写一段话："发生了什么变化"。
4. 结尾给出结论一行：营收、EPS、指引分别是 beat / in-line / miss。`;

const SAMPLE_OUTPUT = `# 财报简报 — 未来 24 小时

## NVDA — 明日美东 4:20pm 公布
**上季：** EPS $5.16 超 $4.64 预期 | 营收 $35.1B 超 $33.2B
**本季共识：** EPS $5.59 | 营收 $37.7B
**隐含波动：** ±7.2%（看涨 13.40 + 看跌 11.80 / 现价 349）
**Beat/miss（8 季）：** EPS 8/8 超预期，营收 7/8 超预期
**三个关注点：**
1. 数据中心业务 vs $33–34B 指引
2. 出口管制重置后的 China H20 表态
3. FY27 资本开支指引 vs 云厂商信号

## TSLA — 明日美东 4:30pm 公布
**上季：** EPS $0.34 低于 $0.42 预期 | 营收 $21.3B 持平
**本季共识：** EPS $0.51 | 营收 $23.8B
**隐含波动：** ±9.4%
**三个关注点：**
1. 不含碳积分的汽车业务毛利率走势
2. Robotaxi 单位经济模型的表态
3. 储能业务增长 — 上季是拐点信号`;

const zhCN: PageContent = {
  meta: {
    title: "财报监控 — Longbridge Agent Cookbook",
    description: "让 AI 提前 24 小时帮你准备好自选股的财报简报。零代码。",
  },
  hero: {
    eyebrow: "食谱 01 · 财报",
    title: "财报监控",
    description:
      "AI Agent 监看你的 Longbridge 自选股，提前 24 小时生成财报简报，公布后 1 小时生成复盘。",
    badges: ["新手友好", "模拟交易", "5 分钟上手"],
  },
  whatItDoes: {
    title: "这个食谱做什么",
    bullets: [
      "扫描你的自选股，找出未来 24 小时内公布财报的所有股票。",
      "抓取过去 4 季业绩、市场共识预期、期权隐含波动幅度。",
      "为每只股票写一份精炼摘要 — 预期什么、需要留意什么，白话呈现。",
    ],
  },
  whatYouNeed: {
    title: "你需要准备",
    items: [
      {
        label: "一个 Longbridge 账户",
        detail: "免费注册（longbridge.com）。模拟交易账户即可 — 不需要真金白银。",
      },
      {
        label: "一个 AI 对话应用（Claude / Cursor 等）",
        detail:
          "推荐 Claude Desktop，最容易上手。任何支持 MCP 的应用都可以。下方有逐步说明。",
      },
      {
        label: "两分钟的复制粘贴时间",
        detail: "不写代码。不开终端。一次性编辑一个配置文件即可。",
      },
    ],
  },
  howToRun: {
    title: "怎么跑（3 步）",
    intro: "如果你已经装好了 Longbridge，直接跳到第 3 步。",
    setupLinkLabel: "完整安装指南",
    setupLinkHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-CN.md",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 应用",
        body: "二选一：CLI（brew install --cask longbridge/tap/longbridge-terminal，再 longbridge auth login）或 MCP（把 https://openapi.longbridge.com/mcp 加到客户端配置）。OAuth 自动处理登录。",
      },
      {
        title: "安装 Skill",
        body: "在 Claude Code 里：/plugin marketplace add longbridge/skills 然后 /plugin install longbridge@longbridge-skills。其他工具：npx skills add longbridge/skills -g。Skill 告诉 AI Longbridge 能做什么。",
      },
      {
        title: "复制下方 Prompt，粘贴运行",
        body: "点 Copy（或「在 Claude 打开」）。Agent 抓你的自选股、拉财报数据、写简报。你只需要等。",
      },
    ],
  },
  prompt: {
    title: "财报前 24 小时 Prompt",
    label: "pre-brief",
    body: PRE_BRIEF_PROMPT,
    openInClaude: "在 Claude 打开",
    copy: "复制",
    copied: "已复制！",
    secondary: {
      title: "财报后 1 小时 Prompt",
      intro:
        "公司公布财报后约 1 小时运行。把 [TICKER] 换成刚公布财报的代号。",
      label: "post-recap",
      body: POST_RECAP_PROMPT,
    },
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
        description: "拉取你追踪的股票清单。Agent 确认要扫描的范围。",
      },
      {
        tool: "calendar.events",
        description: "筛选未来 24 小时内的财报事件。范围外的全部过滤掉。",
      },
      {
        tool: "fundamentals.quarterly",
        description: "过去 4 个季度的 EPS 和营收 — 实际 vs 预期。",
      },
      {
        tool: "fundamentals.consensus",
        description: "本季卖方分析师的 EPS 和营收共识预期。",
      },
      {
        tool: "options.chain_expiries + options.chain",
        description:
          "挑最近的周度期权到期日，读 ATM 看涨/看跌期权中价，计算隐含波动 = (看涨中价 + 看跌中价) / 现价。",
      },
      {
        tool: "fundamentals.beat_miss_history",
        description: "每只股票过去 8 个季度的 beat/miss 模式。",
      },
      {
        tool: "整合输出",
        description:
          "Agent 整理 Markdown 简报 — 或者干脆回'未来 24 小时没有财报'。",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "怎么改成你想要的",
    items: [
      {
        label: "改时间窗",
        detail:
          '把"未来 24 小时"改成"未来 7 天"做周看点，或"未来 4 小时"做同日扫描。改 Prompt 即可。',
      },
      {
        label: "改简报结构",
        detail:
          "拿掉隐含波动那行、加一段'宏观环境'、把语气从中性改成立场明确 — 纯改 Prompt。",
      },
      {
        label: "改输出格式",
        detail:
          "要接到别的工具？要求改成 JSON。要发社交媒体？要求'每只一条 tweet'。",
      },
    ],
  },
  footer: {
    backToHub: "← 所有食谱",
    github: "GitHub ↗",
  },
  nav: {
    brand: "Agent Cookbook",
    allRecipes: "所有食谱",
  },
};

export default zhCN;
