import type { HubContent, RecipeCard } from "./types";

const SETUP_URL =
  "https://open.longbridge.com/skill?invite-code=F6HEGJ";
const ISSUES_URL =
  "https://github.com/longbridge/developers/issues/new";

const RECIPES: RecipeCard[] = [
  {
    slug: "earnings-monitor",
    title: "財報監控",
    description:
      "AI 監看你的自選股，提前 24 小時生成財報簡報，公佈後 1 小時生成複盤，全自動。",
    href: "https://earnings-monitor-ochre.vercel.app/zh-HK",
    thumbnail: "earnings",
    meta: "01 · 5 分鐘",
    status: "live",
    category: "events",
    tags: [
      { label: "財報", color: "blue" },
      { label: "新手", color: "green" },
      { label: "每天", color: "neutral" },
    ],
  },
  {
    slug: "options-scanner",
    title: "選擇權掃描器",
    description:
      "掃描你的自選股，找出最值錢的備兌買權機會 — 按年化權利金收益排序。",
    href: "https://options-scanner-three.vercel.app/zh-HK",
    thumbnail: "options",
    meta: "02 · 5 分鐘",
    status: "live",
    category: "options",
    tags: [
      { label: "選擇權", color: "purple" },
      { label: "進階", color: "orange" },
      { label: "每週", color: "pink" },
    ],
  },
  {
    slug: "portfolio-review",
    title: "投資組合回顧",
    description:
      "讀你的模擬持倉，寫一份週度交易日誌 — 3 個觀察、下週 3 個問題。",
    href: "https://portfolio-review-three.vercel.app/zh-HK",
    thumbnail: "portfolio",
    meta: "03 · 5 分鐘",
    status: "live",
    category: "portfolio",
    tags: [
      { label: "投資組合", color: "teal" },
      { label: "新手", color: "green" },
      { label: "每週", color: "pink" },
    ],
  },

  // Events & corporate actions
  {
    slug: "morning-brief",
    title: "盤前簡報",
    description:
      "美股開盤前 30 分鐘：自選股異動、隔夜新聞、今天該關注什麼。配咖啡服用。",
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
    title: "IPO 雷達",
    description:
      "即將上市的美港 IPO，含申購視窗、解禁期、可比公司、定價區間判讀。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "05 · 每週",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "IPO", color: "yellow" },
      { label: "港 · 美", color: "neutral" },
    ],
  },
  {
    slug: "buyback-tracker",
    title: "回購追蹤器",
    description:
      "監控自選股的回購公告，計算回購占流通股本比例，標記重要催化劑。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "06 · 每天",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "回購", color: "teal" },
      { label: "事件驅動", color: "purple" },
    ],
  },
  {
    slug: "insider-watch",
    title: "內部人交易監控",
    description:
      "追蹤美股 Form 4 / 港股 Form 3A 內部人增減持，計算淨流向、發出群聚信號。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "07 · 每天",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "內部人", color: "red" },
      { label: "訊號", color: "orange" },
    ],
  },
  {
    slug: "dividend-capture",
    title: "股息捕捉",
    description:
      "自選股即將除息的日期清單 + 捕捉策略可行性（收益率 vs 預期跌幅）。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "08 · 每週",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "股息", color: "teal" },
      { label: "收息", color: "green" },
    ],
  },
  {
    slug: "index-rebalance",
    title: "指數調整預警",
    description:
      "預測恒指、國企指數、標普 500、羅素的成分股調整，搶在強制買賣盤之前布局。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "09 · 每季",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "指數", color: "purple" },
      { label: "港 · 美", color: "neutral" },
    ],
  },
  {
    slug: "catalyst-radar",
    title: "催化劑雷達",
    description:
      "彙整自選股的財報、股息、拆股、FDA 日期、重大宏觀事件，一個日曆視圖看完。",
    href: ISSUES_URL,
    thumbnail: "earnings",
    meta: "10 · 每天",
    status: "coming-soon",
    category: "events",
    tags: [
      { label: "催化劑", color: "yellow" },
      { label: "日曆", color: "blue" },
    ],
  },

  // Options
  {
    slug: "csp-scanner",
    title: "現金擔保賣權掃描",
    description:
      "找最好的 CSP 機會：高 IV、你願意接貨的履約價、DTE 內無財報事件。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "11 · 每週",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "選擇權", color: "purple" },
      { label: "收息", color: "green" },
    ],
  },
  {
    slug: "wheel-planner",
    title: "輪轉策略規劃器",
    description:
      "完整輪轉：CSP → 被指派 → 備兌買權 → 平倉。逐步追蹤，需要時建議 roll。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "12 · 每週",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "輪轉", color: "purple" },
      { label: "進階", color: "orange" },
    ],
  },
  {
    slug: "iv-crush-hunter",
    title: "IV Crush 獵人",
    description:
      "找財報後的 IV crush 機會 — 公佈後做空 straddle/strangle，趁 IV 還沒收斂。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "13 · 財報季",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "選擇權", color: "purple" },
      { label: "高階", color: "red" },
    ],
  },
  {
    slug: "earnings-straddle",
    title: "財報跨式建構器",
    description:
      "財報前建構多頭 straddle / strangle 部位。Kelly 公式定倉、按 IV rank 對比歷史走幅排序。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "14 · 財報季",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "選擇權", color: "purple" },
      { label: "波動率", color: "pink" },
    ],
  },
  {
    slug: "vol-surface",
    title: "波動率曲面解讀",
    description:
      "繪製履約價 × 到期日的 IV 曲面，標記偏斜和期限結構異常，快速找出便宜/昂貴的波動率。",
    href: ISSUES_URL,
    thumbnail: "options",
    meta: "15 · 每週",
    status: "coming-soon",
    category: "options",
    tags: [
      { label: "波動率", color: "purple" },
      { label: "高階", color: "red" },
    ],
  },

  // Portfolio & risk
  {
    slug: "tax-loss-harvest",
    title: "稅損收割掃描",
    description:
      "年末掃描：已實現獲利、可收割的虧損、wash sale 標記、相似敞口的替代標的。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "16 · 年末",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "稅務", color: "yellow" },
      { label: "美股", color: "neutral" },
    ],
  },
  {
    slug: "concentration-audit",
    title: "集中度風險審計",
    description:
      "審查持倉大小、行業、因子、地域的集中度。標記前 3、前 5 占 NAV 的比例。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "17 · 每月",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "風險", color: "red" },
      { label: "投資組合", color: "teal" },
    ],
  },
  {
    slug: "rebalance-calc",
    title: "再平衡計算器",
    description:
      "給定目標權重，計算精確的買賣張數做再平衡 — 最小化周轉率和稅務影響。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "18 · 每季",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "投資組合", color: "teal" },
      { label: "稅務感知", color: "yellow" },
    ],
  },
  {
    slug: "sector-drift",
    title: "板塊漂移偵測",
    description:
      "追蹤板塊配置因贏家奔跑而漂移多少。建議在保留 thesis 的前提下做的微調。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "19 · 每月",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "風險", color: "red" },
      { label: "投資組合", color: "teal" },
    ],
  },
  {
    slug: "performance-attribution",
    title: "業績歸因",
    description:
      "拆解月度 P&L：選股 vs 配置 vs 時機。告訴你為什麼贏過或輸給指數。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "20 · 每月",
    status: "coming-soon",
    category: "portfolio",
    tags: [
      { label: "歸因", color: "teal" },
      { label: "分析", color: "blue" },
    ],
  },

  // Scanner
  {
    slug: "ah-premium",
    title: "AH 溢價追蹤",
    description:
      "監控 A/H 雙重上市股票的溢價百分位。標記極端值 — 收斂交易候選。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "21 · 每天",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "AH 溢價", color: "orange" },
      { label: "港 · 中", color: "neutral" },
    ],
  },
  {
    slug: "northbound-flow",
    title: "北向資金流",
    description:
      "每日陸股通北向資金流向頭部標的。標出持續買入/賣出的、值得關注的訊號。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "22 · 每天",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "資金流", color: "blue" },
      { label: "中", color: "neutral" },
    ],
  },
  {
    slug: "sector-rotation",
    title: "板塊輪動指南針",
    description:
      "跨板塊動量排名 + 相關性矩陣。告訴你哪些板塊在領漲、滯漲、為什麼。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "23 · 每週",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "板塊", color: "purple" },
      { label: "宏觀", color: "yellow" },
    ],
  },
  {
    slug: "anomaly-hunter",
    title: "異動股獵人",
    description:
      "自選股的量價異動掃描：成交量異常、跳空缺口、暗池大單、停牌復牌。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "24 · 盤中",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "異動", color: "red" },
      { label: "盤中", color: "orange" },
    ],
  },
  {
    slug: "52w-breakout",
    title: "52 週突破掃描",
    description:
      "突破 52 週新高/新低 + 成交量確認。篩出乾淨的技術面組合。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "25 · 每天",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "技術面", color: "blue" },
      { label: "突破", color: "orange" },
    ],
  },
  {
    slug: "pairs-trade",
    title: "配對交易",
    description:
      "跨板塊協整掃描。回傳 z-score、半衰期、進場訊號最強的離散配對。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "26 · 每週",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "統計套利", color: "purple" },
      { label: "高階", color: "red" },
    ],
  },
  {
    slug: "mean-reversion",
    title: "均值回歸候選",
    description:
      "找超漲超跌準備回歸的標的：RSI 極值、布林通道、距 50 日均線距離。附失效位。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "27 · 每週",
    status: "coming-soon",
    category: "scanner",
    tags: [
      { label: "均值回歸", color: "teal" },
      { label: "技術面", color: "blue" },
    ],
  },

  // Tools & beginner
  {
    slug: "tearsheet",
    title: "個股 Tearsheet",
    description:
      "任意股票一鍵生成 tearsheet：業務、財務、可比、技術面、股權、近期新聞。可收藏。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "28 · 隨需",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "Tearsheet", color: "blue" },
      { label: "新手", color: "green" },
    ],
  },
  {
    slug: "multifactor-screen",
    title: "多因子選股",
    description:
      "可自定義因子組合：價值 + 質量 + 動量 + 規模。輸出頭部標的 + 因子評分卡。",
    href: ISSUES_URL,
    thumbnail: "scanner",
    meta: "29 · 每週",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "因子", color: "purple" },
      { label: "量化", color: "blue" },
    ],
  },
  {
    slug: "trade-journal",
    title: "交易日誌自動化",
    description:
      "從模擬交易紀錄自動生成交易日誌：理由、進場、出場、教訓。Markdown 即可發布。",
    href: ISSUES_URL,
    thumbnail: "portfolio",
    meta: "30 · 每週",
    status: "coming-soon",
    category: "tools",
    tags: [
      { label: "日誌", color: "pink" },
      { label: "新手", color: "green" },
    ],
  },
];

const zhHK: HubContent = {
  meta: {
    title: "Longbridge Agent Cookbook — AI recipes for traders",
    description:
      "可執行的 AI Agent recipe。貼到 Claude Code、Codex、OpenClaw 等任何 AI 工具，你的 Agent 終於看得到你的自選股。不用寫程式碼。",
  },
  nav: {
    brand: "Cookbook",
    links: [
      { label: "Recipes", href: "#recipes" },
      { label: "安裝", href: SETUP_URL },
      { label: "常見問題", href: "#faq" },
      { label: "GitHub", href: "https://github.com/longbridge/developers" },
    ],
    searchPlaceholder: "Search recipes⋯",
    signIn: "Longbridge",
    signInHref: "https://longbridgeapp.com/invite/F6HEGJ",
  },
  hero: {
    eyebrow: "Open source · 由 Longbridge Skill 驅動 · 模擬交易",
    title: "把券商塞進你的 Agent。",
    description:
      "為 Longbridge 設計的 AI Agent recipe。貼進 Claude Code、Codex、OpenClaw、Cursor 或任何 AI 工具，你的 Agent 立刻有了券商手腳 — 自選股、報價、選擇權鏈、持倉、模擬下單。不寫程式碼。",
    primaryCta: "瀏覽 Recipes",
    primaryCtaHref: "#recipes",
    secondaryCta: "安裝指南",
    secondaryCtaHref: SETUP_URL,
  },
  filterBar: {
    sortLabel: "篩選：",
    filters: [
      { label: "全部", value: "all" },
      { label: "事件", value: "events" },
      { label: "選擇權", value: "options" },
      { label: "投資組合", value: "portfolio" },
      { label: "掃描", value: "scanner" },
      { label: "工具", value: "tools" },
    ],
    statusLabels: { live: "上線", comingSoon: "即將推出" },
  },
  recipesSection: {
    title: "Recipes",
    countLabel: `共 ${RECIPES.length} 個 · ${RECIPES.filter((r) => r.status === "live").length} 個上線 · ${RECIPES.filter((r) => r.status === "coming-soon").length} 個即將推出`,
  },
  recipes: RECIPES,
  setupBanner: {
    title: "第一次來？兩步搞定",
    body: "第一步 — 連接 Longbridge（CLI 或 MCP）。第二步 — 安裝 Skill。整套不到 5 分鐘。",
    primary: "安裝指南 ↗",
    primaryHref: SETUP_URL,
    secondary: "官方文件 ↗",
    secondaryHref: "https://open.longbridge.com/skill?invite-code=F6HEGJ",
  },
  faq: {
    title: "常見問題",
    items: [
      {
        q: "我需要會寫程式嗎？",
        a: "不用。一次性編輯一個設定檔（純複製貼上），之後全部都是聊天。Recipe 就是 Prompt — 你只需要複製到 AI 應用。",
      },
      {
        q: "支援哪些 AI 工具？",
        a: "Longbridge Skill 適配絕大多數 AI Agent：Claude Code、Codex（Work locally 模式）、OpenClaw、Cursor、Claude Desktop（Code 標籤）、Zed、Gemini CLI、Warp，以及任何支援 MCP 的客戶端。",
      },
      {
        q: "安全嗎？會不會幫我下實單？",
        a: "預設是模擬交易。Recipe 本身不會下單 — 只是讀數據、寫報告。我們刻意對實盤交易設了門檻。",
      },
      {
        q: "要錢嗎？",
        a: "Longbridge [免費註冊](https://longbridgeapp.com/invite/F6HEGJ)。你只付 AI 應用本身的錢（Claude Pro、Cursor 等）— 跟你用任何 Agent 一樣。",
      },
      {
        q: "為什麼要 Skill？我直接問 AI 不行嗎？",
        a: "沒有 Longbridge Skill，AI 看不到你真實的自選股、持倉、即時報價 — 它只能瞎掰。Skill 給 Agent 真正的券商手腳。",
      },
      {
        q: "為什麼安裝要分兩步？",
        a: "第一步（CLI 或 MCP）讓 AI 有權限呼叫 Longbridge。第二步（Skill）告訴 AI Longbridge 能做什麼。少了第二步，AI 可能根本不知道 Longbridge 可用。",
      },
      {
        q: "Claude Desktop / Codex 連不上。",
        a: "Claude Desktop 切到 Code 標籤；Codex 新建會話時選 Work locally。Chat / Cowork / Cloud 模式因網路白名單會阻擋 CLI 安裝和 MCP 連線 — 它們是沙盒環境。",
      },
      {
        q: "我可以貢獻新的 Recipe 嗎？",
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
      { label: "Substack", href: "https://chrisaiquant.substack.com" },
      { label: "WhatsApp", href: "https://wa.me/85266944195" },
      { label: "GitHub", href: "https://github.com/coolboylcy" },
    ],
  },
};

export default zhHK;
