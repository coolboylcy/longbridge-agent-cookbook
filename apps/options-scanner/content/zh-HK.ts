import type { PageContent } from "./types";

const SCAN_PROMPT = `使用 Longbridge MCP，掃描我自選股的備兌買權機會：

1. 取出我的自選股。剔除沒有選擇權的股票。
2. 對於剩下的股票，計算 252 天的 IV Rank：
     iv_rank = (iv_today - iv_min_252d) / (iv_max_252d - iv_min_252d)
   使用最接近 30 DTE 到期日的 ATM 買權 IV。
   只保留 iv_rank >= 0.5 的股票。
3. 對每隻股票抓取買權鏈。只保留符合以下條件的買權：
     - 30 <= DTE <= 45
     - 0.20 <= delta <= 0.35
     - 買價 > 0.05
     - 未平倉合約 >= 100
     - 履約價在現價之上（OTM）
4. 按年化權利金收益率排序：
     annualized_yield = (中價 / 履約價) * (365 / DTE)
   取前 10 名，輸出 Markdown 表格，欄位包括：
   Ticker | 履約價 | 到期日 | DTE | Delta | 中價 | IV Rank | 年化收益
5. 對前 3 名各寫一段話：
   為什麼選這個履約價、什麼情況下該離場、被指派的後果。
   如果 DTE 視窗內有財報，記得提醒。

僅限模擬交易帳戶。不會下單。`;

const SAMPLE_OUTPUT = `# 備兌買權掃描 — IV Rank ≥ 0.5

| Ticker | 履約價 | 到期日 | DTE | Delta | 中價 | IV Rank | 年化收益 |
| ------ | ------ | ------ | --- | ----- | ---- | ------- | -------- |
| TSLA   | 380    | Jun 20 | 32  | 0.28  | 7.85 | 0.71    | 23.4%    |
| AMD    | 165    | Jun 20 | 32  | 0.26  | 3.40 | 0.62    | 23.5%    |
| NVDA   | 360    | Jun 20 | 32  | 0.31  | 6.20 | 0.68    | 19.7%    |
| COIN   | 240    | Jun 20 | 32  | 0.30  | 4.10 | 0.78    | 19.5%    |
| MSTR   | 295    | Jun 20 | 32  | 0.27  | 4.55 | 0.82    | 17.6%    |

## 前三名理由

**TSLA Jun-20 380C @ 7.85** — IV rank 0.71，FOMC 後波動率衰減順風。履約價
鎖住 +10% 上行；若被指派，等於用較高價賣出持股。若中國零售消息引爆強勢
反彈進入 DTE 視窗，需檢視。

**AMD Jun-20 165C @ 3.40** — 前 10 名最高年化收益。0.26 delta 有緩衝。
財報 7/28，在 DTE 視窗外。

**NVDA Jun-20 360C @ 6.20** — Delta 0.31，指派風險適中。下次財報約 8/21，
在 DTE 視窗外。若 NVDA 放量突破 360 應考慮 roll。`;

const zhHK: PageContent = {
  meta: {
    title: "選擇權掃描器 — Longbridge Agent Cookbook",
    description: "AI 幫你掃自選股最值錢的備兌買權 — 不用自己算數學。",
  },
  hero: {
    eyebrow: "Recipe 02 · 選擇權",
    title: "選擇權掃描器",
    description:
      "AI Agent 掃你的 Longbridge 自選股，找出年化權利金最高的備兌買權機會 — 按 IV Rank、delta、財報風險篩選。",
    badges: ["需要基本選擇權知識", "模擬交易", "5 分鐘上手"],
    thumbnail: "options",
    tags: [
      { label: "選擇權", color: "purple" },
      { label: "進階", color: "orange" },
      { label: "模擬", color: "neutral" },
      { label: "MCP", color: "purple" },
    ],
  },
  sidebar: {
    title: "詳情",
    rows: [
      { label: "Recipe", value: "02 · 選擇權掃描器" },
      { label: "難度", value: "進階" },
      { label: "上手時間", value: "約 5 分鐘" },
      { label: "市場", value: "美股（港股有限）" },
      { label: "頻率", value: "每週" },
      { label: "交易模式", value: "僅限模擬" },
      { label: "作者", value: "Chris Liang" },
      { label: "授權", value: "MIT" },
    ],
    primaryCta: "在 Claude 開啟",
    primaryCtaHref: "",
  },
  whatItDoes: {
    title: "這個 Recipe 做什麼",
    bullets: [
      "看你自選股中支援選擇權的股票。",
      "只留高 IV Rank 的 — 也就是選擇權權利金比平時更貴的時候。",
      "回一份前 10 名備兌買權清單，再幫前 3 名寫好理由。",
    ],
  },
  whatYouNeed: {
    title: "你需要準備",
    items: [
      {
        label: "Longbridge 帳戶（開通選擇權）",
        detail: "[免費註冊](https://longbridgeapp.com/invite/F6HEGJ)。模擬帳戶即可。",
      },
      {
        label: "基本選擇權知識",
        detail:
          "知道「備兌買權」、「delta」、「DTE（到期天數）」是什麼就夠了。IV Rank 我下面解釋。",
      },
      {
        label: "一個 AI 對話應用（Claude / Cursor 等）",
        detail: "推薦 Claude Desktop。任何支援 MCP 的都可以。",
      },
    ],
  },
  howToRun: {
    title: "怎麼跑（3 步）",
    intro: "如果你已經裝好 Longbridge，直接跳到第 3 步。",
    setupLinkLabel: "完整安裝指南",
    setupLinkHref:
      "https://open.longbridge.com/skill?invite-code=F6HEGJ",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 應用",
        body: "二選一：CLI（brew install --cask longbridge/tap/longbridge-terminal，再 `longbridge auth login`，最後 `longbridge init F6HEGJ` 完成歸因）或 MCP（把 https://openapi.longbridge.com/mcp 加到客戶端設定）。OAuth 自動處理登入。",
      },
      {
        title: "安裝 Skill",
        body: "Claude Code 用戶執行 `/plugin marketplace add longbridge/skills` 然後 `/plugin install longbridge@longbridge-skills`。Codex、OpenClaw、Cursor 等其他工具執行 `npx skills add longbridge/skills -g`（或貼上 ZIP 安裝連結）。Skill 告訴 AI Longbridge 能做什麼。",
      },
      {
        title: "複製下方 Prompt，貼上執行",
        body: "點 Copy（或「在 Claude 開啟」）。Agent 抓自選股、算 IV Rank、回排好的表格。",
      },
    ],
  },
  prompt: {
    title: "掃描 Prompt",
    label: "covered-call scan",
    body: SCAN_PROMPT,
    openInClaude: "在 Claude 開啟",
    copy: "複製",
    copied: "已複製！",
  },
  sampleOutput: {
    title: "跑完你會得到什麼",
    label: "範例輸出",
    body: SAMPLE_OUTPUT,
  },
  flow: {
    title: "底層發生了什麼",
    steps: [
      {
        tool: "watchlist.list",
        description: "拉取你追蹤的股票清單 — 待掃描的範圍。",
      },
      {
        tool: "security.meta",
        description:
          "剔除不支援選擇權的股票。港股選擇權覆蓋有限，這層會看到。",
      },
      {
        tool: "options.iv_history",
        description:
          "每隻股票 252 天的 ATM 買權 IV。Agent 即時計算 IV rank，過濾到 ≥ 0.5。",
      },
      {
        tool: "options.chain_expiries + options.chain",
        description:
          "抓 30–45 DTE 的買權切片。每筆有履約價、買賣中價、delta、未平倉、IV。",
      },
      {
        tool: "篩選 + 排序",
        description:
          "Agent 套用 delta / 買價 / 未平倉的篩選，按年化收益排序。",
        noToolCall: true,
      },
      {
        tool: "calendar.events",
        description:
          "檢查前三名候選在 DTE 視窗內是否有財報 — 給理由段落標記事件風險。",
      },
      {
        tool: "整合輸出",
        description: "做好 Markdown 表格（10 行）+ 三段理由。",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "怎麼改成你想要的",
    items: [
      {
        label: "改篩選條件",
        detail:
          '改「30 ≤ DTE ≤ 45」或「0.20 ≤ delta ≤ 0.35」。delta 越緊 = 被指派風險越低，權利金也越小。',
      },
      {
        label: "改 IV Rank 門檻",
        detail:
          "預設 0.5。低波動環境降到 0.3；要更嚴格的訊號就升到 0.7。",
      },
      {
        label: "加上持倉限制",
        detail:
          '加一句：「只篩選我模擬帳戶持有 100 股以上的股票」。Agent 會調 account.positions 過濾 — 真正的備兌 vs 裸賣。',
      },
    ],
  },
  footer: { backToHub: "← All recipes", github: "GitHub ↗" },
  nav: {
    brand: "Cookbook",
    allRecipes: "All recipes",
    links: [
      { label: "All recipes", href: "https://longbridge-cookbook-hub.vercel.app/zh-HK" },
      { label: "安裝", href: "https://open.longbridge.com/skill?invite-code=F6HEGJ" },
      { label: "GitHub", href: "https://github.com/longbridge/developers" },
    ],
    searchPlaceholder: "Search recipes⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridgeapp.com/invite/F6HEGJ",
  },
};

export default zhHK;
