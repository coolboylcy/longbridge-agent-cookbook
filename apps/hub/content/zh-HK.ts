import type { HubContent } from "./types";

const zhHK: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook",
    description:
      "可執行的 AI Agent 食譜，專為 Longbridge 設計。貼到 Claude、Cursor、Codex 即可使用 — 不用寫程式碼。",
  },
  nav: { brand: "Agent Cookbook", allRecipes: "所有食譜" },
  hero: {
    eyebrow: "開源 · MCP 優先 · 模擬交易",
    title: "讓 AI 幫你處理交易裡無聊的部分。",
    description:
      "可執行的 AI Agent 食譜。把 Prompt 貼到 Claude，就能拿到一份乾淨的財報簡報、選擇權掃描或週度持倉複盤。不用寫程式碼。",
  },
  mcpBanner: {
    title: "第一次來？兩步搞定 Longbridge 設定",
    detail: "先連接（CLI 或 MCP）→ 再安裝 Skill。支援 Claude Code、Claude Desktop、Cursor、Codex。",
    cta: "安裝指南 ↗",
  },
  recipesSection: { title: "食譜" },
  recipes: [
    {
      title: "財報監控",
      description:
        "AI 監看你的自選股，提前 24 小時生成財報簡報，公佈後 1 小時生成複盤，全自動。",
      href: "https://earnings-monitor-ochre.vercel.app/zh-HK",
      status: "live",
      statusLabel: "上線",
    },
    {
      title: "選擇權掃描器",
      description:
        "AI 掃描你的自選股，找出最值錢的備兌買權機會 — 按年化權利金收益排序。",
      href: "https://options-scanner-three.vercel.app/zh-HK",
      status: "live",
      statusLabel: "上線",
    },
    {
      title: "投資組合回顧",
      description:
        "AI 讀你的模擬持倉，寫一份週度交易日誌 — 3 個觀察、下週 3 個問題。",
      href: "https://portfolio-review-three.vercel.app/zh-HK",
      status: "live",
      statusLabel: "上線",
    },
  ],
  quickstart: {
    title: "怎麼用（5 分鐘）",
    steps: [
      {
        title: "把 Longbridge 接到你的 AI 應用",
        body: "二選一：CLI（推薦 — brew install longbridge-terminal，然後 longbridge auth login）或 MCP（把 URL https://openapi.longbridge.com/mcp 加到客戶端設定）。OAuth 自動處理登入。",
      },
      {
        title: "安裝 Skill",
        body: "在 Claude Code 裡執行：/plugin marketplace add longbridge/skills 然後 /plugin install longbridge@longbridge-skills。或用 npx skills add longbridge/skills -g 適用任何工具。",
      },
      {
        title: "打開任一食譜，跑 Prompt",
        body: "點「在 Claude 開啟」（或複製貼上）。AI 抓你的自選股、跑分析、寫報告。你只需要等。",
      },
    ],
  },
  whyThisExists: {
    title: "這個專案存在的原因",
    body: [
      "大多數散戶投資者不會寫程式。大多數有用的 Agent 工作流被埋在 GitHub README 裡，假設你會 Python 和命令列。",
      "這本食譜把這件事翻轉過來。每個食譜都是一頁：一個 Prompt、一個 Copy 按鈕、一個說明告訴你會發生什麼。不用 clone、不用 Python、不用 SDK，只需要 MCP。",
      "由一個真實的 Longbridge 使用者親自打造和維護 — 這些都是我每週在自己模擬帳戶上實際在跑的工作流。",
    ],
  },
  faq: {
    title: "常見問題",
    items: [
      {
        q: "我需要會寫程式嗎？",
        a: "不用。MCP 的核心價值就是讓你不需要。一次性編輯一個設定檔（純複製貼上），之後全部都是聊天。",
      },
      {
        q: "安全嗎？會不會幫我下實單？",
        a: "預設是模擬交易。食譜本身不會下單 — 只是讀數據、寫報告。我們刻意對實盤交易設了門檻。",
      },
      {
        q: "要錢嗎？",
        a: "Longbridge MCP 免費。你只付 AI 應用本身的錢（Claude Pro、Cursor 等）— 跟你用任何 Agent 一樣。",
      },
      {
        q: "為什麼要 MCP？我直接問 Claude 不行嗎？",
        a: "沒有 MCP，Claude 看不到你真實的自選股、真實的持倉、即時行情 — 它只能瞎掰。MCP 給 Agent 真正的券商手腳。",
      },
      {
        q: "可以不用 Claude 嗎？",
        a: "可以。任何支援 MCP 的聊天應用都行 — Cursor、Codex、Claude Code、Claude Desktop。一模一樣可以跑。",
      },
      {
        q: "為什麼安裝要分兩步（連接 + 裝 Skill）？",
        a: "第一步（CLI 或 MCP）讓 AI 有權限呼叫 Longbridge。第二步（Skill）告訴 AI Longbridge 能做什麼。少了第二步，AI 可能根本不知道 Longbridge 可用。官方指南 open.longbridge.com/skill 對此有詳細說明。",
      },
      {
        q: "Claude Desktop 連不上。",
        a: "切到 Claude Desktop 的 Code 標籤。Chat 和 Cowork 模式因網路白名單會阻擋 CLI 安裝和 MCP 連線 — 它們是沙盒環境。Code 標籤是內嵌的 Claude Code，有完整終端權限。",
      },
      {
        q: "我有新食譜的想法，可以貢獻嗎？",
        a: "歡迎。在 GitHub 提 Issue 或讀 CONTRIBUTING.md。門檻很低：有用的 Prompt + 清楚的說明。",
      },
    ],
  },
  author: {
    title: "關於",
    line: "由 Chris Liang 製作 — Longbridge Securities 香港，增長負責人。",
    disclaimer: "個人專案。觀點僅代表個人，與雇主無關。不構成投資建議。",
    links: [
      { label: "X / Twitter", href: "https://x.com/chrisaiquant" },
      { label: "Substack", href: "https://chrisliang.substack.com" },
      { label: "GitHub", href: "https://github.com/chrisaiquant" },
    ],
  },
};

export default zhHK;
