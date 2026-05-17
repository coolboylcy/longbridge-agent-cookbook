import type { PageContent } from "./types";

const PRE_BRIEF_PROMPT = `使用 Longbridge MCP，做一次財報掃描：

1. 取出我的自選股清單。
2. 對於每隻在未來 24 小時內公佈財報的股票，抓取：
   - 過去 4 季的 EPS 和營收（實際 vs 預期）
   - 本季當前的市場一致預期（EPS、營收）
   - 最近一週的選擇權鏈 — 計算隱含波動幅度：
     (ATM 買權中價 + ATM 賣權中價) / 即時價
   - 過去 8 季的「超預期 / 不及預期」歷史
3. 為每隻財報股寫一份精煉的 Markdown 摘要：
   - 上季回顧（1 行）
   - 本季共識預期（1 行）
   - 隱含波動幅度（1 行）
   - Beat/miss 歷史（1 行）
   - 三個值得關注的重點（3 條）

如果未來 24 小時內沒有財報，就明確說「沒有」並停止。`;

const POST_RECAP_PROMPT = `使用 Longbridge MCP，針對剛剛公佈財報的 [TICKER]：

1. 取出實際營收、EPS、以及任何指引更新。
2. 對比之前引用的市場共識和隱含波動幅度。
3. 寫一段話：「發生了什麼變化」。
4. 結尾給出結論一行：營收、EPS、指引分別是 beat / in-line / miss。`;

const SAMPLE_OUTPUT = `# 財報簡報 — 未來 24 小時

## NVDA — 明日美東 4:20pm 公佈
**上季：** EPS $5.16 超 $4.64 預期 | 營收 $35.1B 超 $33.2B
**本季共識：** EPS $5.59 | 營收 $37.7B
**隱含波動：** ±7.2%（買權 13.40 + 賣權 11.80 / 現價 349）
**Beat/miss（8 季）：** EPS 8/8 超預期，營收 7/8 超預期
**三個關注點：**
1. 數據中心業務 vs $33–34B 指引
2. 出口管制重置後的 China H20 表態
3. FY27 資本開支指引 vs 雲廠商訊號

## TSLA — 明日美東 4:30pm 公佈
**上季：** EPS $0.34 低於 $0.42 預期 | 營收 $21.3B 持平
**本季共識：** EPS $0.51 | 營收 $23.8B
**隱含波動：** ±9.4%
**三個關注點：**
1. 不含碳積分的汽車業務毛利率走勢
2. Robotaxi 單位經濟模型的表態
3. 儲能業務增長 — 上季是拐點訊號`;

const zhHK: PageContent = {
  meta: {
    title: "財報監控 — Longbridge Agent Cookbook",
    description:
      "讓 AI 提前 24 小時幫你準備好自選股的財報簡報。零代碼。",
  },
  hero: {
    eyebrow: "Recipe 01 · 財報",
    title: "財報監控",
    description:
      "AI Agent 監看你的 Longbridge 自選股，提前 24 小時生成財報簡報，公佈後 1 小時生成複盤。",
    badges: ["新手友善", "模擬交易", "5 分鐘上手"],
    thumbnail: "earnings",
    tags: [
      { label: "財報", color: "blue" },
      { label: "新手", color: "green" },
      { label: "模擬", color: "neutral" },
      { label: "MCP", color: "purple" },
    ],
  },
  sidebar: {
    title: "詳情",
    rows: [
      { label: "Recipe", value: "01 · 財報監控" },
      { label: "難度", value: "新手" },
      { label: "上手時間", value: "約 5 分鐘" },
      { label: "市場", value: "美股 · 港股" },
      { label: "頻率", value: "每天" },
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
      "掃描你的自選股，找出未來 24 小時內公佈財報的所有股票。",
      "抓取過去 4 季業績、市場共識預期、選擇權隱含波動幅度。",
      "為每隻股票寫一份精煉摘要 — 預期什麼、需要留意什麼，白話呈現。",
    ],
  },
  whatYouNeed: {
    title: "你需要準備",
    items: [
      {
        label: "一個 Longbridge 帳戶",
        detail:
          "免費註冊（longbridge.com）。模擬交易帳戶即可 — 不需要真金實銀。",
      },
      {
        label: "一個 AI 對話應用（Claude / Cursor 等）",
        detail:
          "推薦 Claude Desktop，最容易上手。任何支援 MCP 的應用都可以。下方有逐步說明。",
      },
      {
        label: "兩分鐘的複製貼上時間",
        detail: "不寫程式碼。不開終端機。一次性編輯一個設定檔案即可。",
      },
    ],
  },
  howToRun: {
    title: "怎麼跑（3 步）",
    intro: "如果你已經裝好了 Longbridge，直接跳到第 3 步。",
    setupLinkLabel: "完整安裝指南",
    setupLinkHref:
      "https://open.longbridge.com/skill/install.md",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 應用",
        body: "二選一：CLI（brew install --cask longbridge/tap/longbridge-terminal，再 longbridge auth login）或 MCP（把 https://openapi.longbridge.com/mcp 加到客戶端設定）。OAuth 自動處理登入。",
      },
      {
        title: "安裝 Skill",
        body: "Claude Code 用戶執行 `/plugin marketplace add longbridge/skills` 然後 `/plugin install longbridge@longbridge-skills`。Codex、OpenClaw、Cursor 等其他工具執行 `npx skills add longbridge/skills -g`（或貼上 ZIP 安裝連結）。Skill 告訴 AI Longbridge 能做什麼。",
      },
      {
        title: "複製下方 Prompt，貼上執行",
        body: "點 Copy（或「在 Claude 開啟」）。Agent 抓你的自選股、拉財報數據、寫簡報。你只需要等。",
      },
    ],
  },
  prompt: {
    title: "財報前 24 小時 Prompt",
    label: "pre-brief",
    body: PRE_BRIEF_PROMPT,
    openInClaude: "在 Claude 開啟",
    copy: "複製",
    copied: "已複製！",
    secondary: {
      title: "財報後 1 小時 Prompt",
      intro:
        "公司公佈財報後約 1 小時運行。把 [TICKER] 換成剛公佈財報的代號。",
      label: "post-recap",
      body: POST_RECAP_PROMPT,
    },
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
        description: "拉取你追蹤的股票清單。Agent 確認要掃描的範圍。",
      },
      {
        tool: "calendar.events",
        description:
          "篩選未來 24 小時內的財報事件。範圍外的全部過濾掉。",
      },
      {
        tool: "fundamentals.quarterly",
        description: "過去 4 季的 EPS 和營收 — 實際 vs 預期。",
      },
      {
        tool: "fundamentals.consensus",
        description: "本季賣方分析師的 EPS 和營收共識預期。",
      },
      {
        tool: "options.chain_expiries + options.chain",
        description:
          "挑最近的週度選擇權到期日，讀 ATM 買賣權中價，計算隱含波動 = (買權中價 + 賣權中價) / 現價。",
      },
      {
        tool: "fundamentals.beat_miss_history",
        description: "每隻股票過去 8 季的 beat/miss 模式。",
      },
      {
        tool: "整合輸出",
        description:
          "Agent 整理 Markdown 簡報 — 或者乾脆回「未來 24 小時沒有財報」。",
        noToolCall: true,
      },
    ],
  },
  customize: {
    title: "怎麼改成你想要的",
    items: [
      {
        label: "改時間窗",
        detail:
          '把「未來 24 小時」改成「未來 7 天」做週看點，或「未來 4 小時」做同日掃描。改 Prompt 即可。',
      },
      {
        label: "改簡報結構",
        detail:
          "拿掉隱含波動那行、加一段「宏觀環境」、把語氣從中性改成立場明確 — 純改 Prompt。",
      },
      {
        label: "改輸出格式",
        detail:
          "要接到別的工具？要求改成 JSON。要發社交媒體？要求「每隻一條 tweet」。",
      },
    ],
  },
  footer: {
    backToHub: "← All recipes",
    github: "GitHub ↗",
  },
  nav: {
    brand: "Cookbook",
    allRecipes: "All recipes",
    links: [
      { label: "All recipes", href: "https://longbridge-cookbook-hub.vercel.app/zh-HK" },
      { label: "安裝", href: "https://open.longbridge.com/skill/install.md" },
      { label: "GitHub", href: "https://github.com/longbridge/developers" },
    ],
    searchPlaceholder: "Search recipes⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
};

export default zhHK;
