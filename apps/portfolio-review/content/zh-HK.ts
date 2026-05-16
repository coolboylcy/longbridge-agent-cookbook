import type { PageContent } from "./types";

const REVIEW_PROMPT = `使用 Longbridge MCP，幫我寫週度投資組合複盤：

1. 取出我模擬交易帳戶的狀態：NAV、現金、所有持倉。
2. 取出過去 7 天（或本 ISO 週）的所有成交。
3. 計算這些指標：
     - 已平倉交易的次數、勝率
     - 平均持倉時長
     - 本週最大已實現盈利、最大已實現虧損
     - 當前持倉的板塊分佈（GICS 行業，透過 security metadata）
     - 前三大持倉佔 NAV 的比例
     - 週度 NAV 變動
     - 未平倉持倉中最大未實現盈利、最大未實現虧損
4. 寫一份 Markdown 複盤，結構必須如下：
     # Week of <ISO 週，如 2026-W19>
     ## Stats
     <一行：NAV、WoW%、交易數、勝率>
     ## 3 observations
     <三點，編號，第一人稱，簡短，不要含糊用語>
     ## 3 questions for next week
     <三點，編號，下週要調查什麼，不是要做什麼>

風格：日誌式。短。立場明確。不要「考慮」、「可能值得」這種語氣。
這是寫給我自己看的，不是給客戶的。

僅限模擬交易帳戶。不會下單。`;

const SAMPLE_OUTPUT = `# Week of 2026-W19

## Stats
NAV $103,420 | WoW +2.1% | 8 筆交易 | 勝率 62%

## 3 觀察
1. 科技股集中度達 NAV 的 58% — 自 3 月以來最高。
2. 3 筆虧損中有 2 筆是同一天賣的；複盤入場時機。
3. 期權權利金完全抵消了本週股票虧損。

## 下週 3 個問題
1. 科技股集中度是有意為之，還是順勢漂移？
2. 為什麼週二的賣單都不如預期 — 滑點還是訊號錯？
3. AAPL 的備兌買權要不要在進入價內前先 roll？`;

const zhHK: PageContent = {
  meta: {
    title: "投資組合回顧 — Longbridge Agent Cookbook",
    description: "AI 幫你寫的週度交易日誌：三個觀察、三個下週問題。",
  },
  hero: {
    eyebrow: "食譜 03 · 投資組合",
    title: "投資組合回顧",
    description:
      "AI Agent 讀你的模擬持倉，寫一份精煉的週度複盤 — 三個觀察、三個問題、用你的語氣。",
    badges: ["新手友善", "模擬交易", "5 分鐘上手"],
  },
  whatItDoes: {
    title: "這個食譜做什麼",
    bullets: [
      "讀你的模擬帳戶：餘額、持倉、過去 7 天的所有成交。",
      "算出真正重要的指標 — 勝率、板塊分佈、集中度、週度 NAV 變動。",
      "寫一份日誌式複盤：3 個觀察 + 下週 3 個問題，用你的語氣。",
    ],
  },
  whatYouNeed: {
    title: "你需要準備",
    items: [
      {
        label: "Longbridge 模擬交易帳戶",
        detail: "免費註冊。模擬帳戶就好 — Prompt 預期是模擬。",
      },
      {
        label: "過去一週有一些交易紀錄",
        detail: "不然複盤會很單薄。幾筆模擬交易就足夠生成有用的輸出。",
      },
      {
        label: "一個 AI 對話應用（Claude / Cursor 等）",
        detail: "推薦 Claude Desktop。任何支援 MCP 的應用都可以。",
      },
    ],
  },
  howToRun: {
    title: "怎麼跑（3 步）",
    intro: "週五晚或週日晚跑，週度視角最乾淨。Longbridge 已裝好就跳到第 3 步。",
    setupLinkLabel: "完整安裝指南",
    setupLinkHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-TW.md",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 應用",
        body: "二選一：CLI（brew install --cask longbridge/tap/longbridge-terminal，再 longbridge auth login）或 MCP（把 https://openapi.longbridge.com/mcp 加到客戶端設定）。一次性 OAuth。",
      },
      {
        title: "安裝 Skill",
        body: "在 Claude Code 裡：/plugin marketplace add longbridge/skills 然後 /plugin install longbridge@longbridge-skills。其他工具：npx skills add longbridge/skills -g。",
      },
      {
        title: "複製下方 Prompt，貼上執行",
        body: "點 Copy（或「在 Claude 開啟」）。Claude 抓帳戶狀態、算指標、寫複盤。你只需要看。",
      },
    ],
  },
  prompt: {
    title: "複盤 Prompt",
    label: "portfolio review",
    body: REVIEW_PROMPT,
    openInClaude: "在 Claude 開啟",
    copy: "複製",
    copied: "已複製！",
  },
  sampleOutput: {
    title: "跑完你會得到什麼",
    label: "範例複盤",
    body: SAMPLE_OUTPUT,
  },
  flow: {
    title: "底層發生了什麼",
    steps: [
      {
        tool: "account.balance",
        description: "模擬帳戶的總 NAV 和現金餘額。",
      },
      {
        tool: "account.positions",
        description: "每個未平倉持倉的成本價、當前市值、未實現盈虧。",
      },
      {
        tool: "account.executions",
        description: "過去 7 天的所有成交 — 用來算交易次數、勝率、持倉時長。",
      },
      {
        tool: "security.meta",
        description:
          "每隻股票的行業分類，匯總成 GICS 板塊用於板塊分佈指標。",
      },
      {
        tool: "account.nav_history",
        description: "14 天的 NAV 歷史 — 用來算週度變動。",
      },
      {
        tool: "計算",
        description:
          "勝率、集中度、平均持倉時長、未實現盈虧排名。",
        noToolCall: true,
      },
      {
        tool: "整合輸出",
        description:
          "寫 Markdown 複盤：# Week of YYYY-Www → Stats → 3 觀察 → 下週 3 問題。",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "怎麼改成你想要的",
    items: [
      {
        label: "改複盤週期",
        detail:
          '把「過去 7 天」改成「過去 30 天」做月度；或「自上次以來」如果你的 Agent 有記憶。',
      },
      {
        label: "改觀察數量",
        detail:
          '預設 3 + 3。改成 5 + 5，或拆成「有效的 / 沒效的 / 下次試的」。',
      },
      {
        label: "改板塊分類",
        detail:
          '不用 GICS，改成你的自定義桶（"AI 算力 / 中國消費 / 港房 / 現金"）。純改 Prompt。',
      },
    ],
  },
  footer: { backToHub: "← 所有食譜", github: "GitHub ↗" },
  nav: { brand: "Agent Cookbook", allRecipes: "所有食譜" },
};

export default zhHK;
