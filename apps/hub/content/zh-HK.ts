import type { HubContent } from "./types";

const zhHK: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook — 給交易者的 AI 食譜庫",
    description:
      "可執行的 AI Agent 食譜，專為 Longbridge 設計。貼到 Claude、Cursor、Codex 即可使用 — 不用寫程式碼。",
  },
  nav: {
    brand: "Cookbook",
    links: [
      { label: "食譜", href: "#recipes" },
      { label: "安裝", href: "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-TW.md" },
      { label: "常見問題", href: "#faq" },
      { label: "GitHub", href: "https://github.com/coolboylcy/longbridge-agent-cookbook" },
    ],
    searchPlaceholder: "搜尋食譜⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridge.com",
  },
  hero: {
    eyebrow: "開源 · MCP 優先 · 模擬交易",
    title: "為你的券商帳戶準備的 AI 食譜。",
    description:
      "把 Prompt 貼到 Claude，就能拿到一份乾淨的財報簡報、選擇權掃描或週度持倉複盤。不寫程式碼。不用 SDK。你的 AI 終於看得到你的自選股。",
    primaryCta: "瀏覽食譜",
    primaryCtaHref: "#recipes",
    secondaryCta: "安裝指南",
    secondaryCtaHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-TW.md",
  },
  filterBar: {
    sortLabel: "篩選：",
    filters: [
      { label: "全部", value: "all" },
      { label: "財報", value: "earnings" },
      { label: "選擇權", value: "options" },
      { label: "投資組合", value: "portfolio" },
      { label: "新手", value: "beginner" },
    ],
  },
  recipesSection: {
    title: "食譜",
    countLabel: (n) => `共 ${n} 個食譜`,
  },
  recipes: [
    {
      slug: "earnings-monitor",
      title: "財報監控",
      description:
        "AI 監看你的自選股，提前 24 小時生成財報簡報，公佈後 1 小時生成複盤，全自動。",
      href: "https://earnings-monitor-ochre.vercel.app/zh-HK",
      thumbnail: "earnings",
      meta: "食譜 01 · 5 分鐘",
      tags: [
        { label: "財報", color: "blue" },
        { label: "新手", color: "green" },
        { label: "模擬", color: "neutral" },
      ],
    },
    {
      slug: "options-scanner",
      title: "選擇權掃描器",
      description:
        "AI 掃描你的自選股，找出最值錢的備兌買權機會 — 按年化權利金收益排序。",
      href: "https://options-scanner-three.vercel.app/zh-HK",
      thumbnail: "options",
      meta: "食譜 02 · 5 分鐘",
      tags: [
        { label: "選擇權", color: "purple" },
        { label: "進階", color: "orange" },
        { label: "模擬", color: "neutral" },
      ],
    },
    {
      slug: "portfolio-review",
      title: "投資組合回顧",
      description:
        "AI 讀你的模擬持倉，寫一份週度交易日誌 — 3 個觀察、下週 3 個問題。",
      href: "https://portfolio-review-three.vercel.app/zh-HK",
      thumbnail: "portfolio",
      meta: "食譜 03 · 5 分鐘",
      tags: [
        { label: "投資組合", color: "teal" },
        { label: "新手", color: "green" },
        { label: "週度", color: "pink" },
      ],
    },
  ],
  setupBanner: {
    title: "第一次來？兩步搞定",
    body: "第一步 — 連接 Longbridge（CLI 或 MCP）。第二步 — 安裝 Skill。整套不到 5 分鐘。",
    primary: "安裝指南 ↗",
    primaryHref:
      "https://github.com/coolboylcy/longbridge-agent-cookbook/blob/main/MCP_SETUP.zh-TW.md",
    secondary: "官方文件 ↗",
    secondaryHref: "https://open.longbridge.com/skill/install.md",
  },
  faq: {
    title: "常見問題",
    items: [
      {
        q: "我需要會寫程式嗎？",
        a: "不用。一次性編輯一個設定檔（純複製貼上），之後全部都是聊天。食譜就是 Prompt — 你只需要複製到 AI 應用。",
      },
      {
        q: "安全嗎？會不會幫我下實單？",
        a: "預設是模擬交易。食譜本身不會下單 — 只是讀數據、寫報告。我們刻意對實盤交易設了門檻。",
      },
      {
        q: "要錢嗎？",
        a: "Longbridge 免費註冊。你只付 AI 應用本身的錢（Claude Pro、Cursor 等）— 跟你用任何 Agent 一樣。",
      },
      {
        q: "為什麼要 MCP / Skill？我直接問 Claude 不行嗎？",
        a: "沒有 Longbridge Skill，Claude 看不到你真實的自選股、持倉、即時報價 — 它只能瞎掰。Skill 給 Agent 真正的券商手腳。",
      },
      {
        q: "為什麼安裝要分兩步？",
        a: "第一步（CLI 或 MCP）讓 AI 有權限呼叫 Longbridge。第二步（Skill）告訴 AI Longbridge 能做什麼。少了第二步，AI 可能根本不知道 Longbridge 可用。",
      },
      {
        q: "Claude Desktop 連不上。",
        a: "切到 Claude Desktop 的 Code 標籤。Chat 和 Cowork 模式因網路白名單會阻擋 CLI 安裝和 MCP 連線。Code 標籤是內嵌的 Claude Code，有完整終端權限。",
      },
      {
        q: "我可以貢獻食譜嗎？",
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
