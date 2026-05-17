/**
 * Recipe preview thumbnails. Civitai-style: each card has a visual preview
 * so the grid feels like a content marketplace rather than a docs list.
 *
 * Each thumbnail is a "mock report" or "mock terminal" rendered in SVG —
 * recognizable at a glance, all CSS-themable, zero raster assets.
 */

export function EarningsThumbnail({ className }: { className?: string | undefined }) {
  return (
    <svg
      viewBox="0 0 480 270"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="em-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f2128" />
          <stop offset="1" stopColor="#16181d" />
        </linearGradient>
      </defs>
      <rect width="480" height="270" fill="url(#em-bg)" />

      {/* Top bar */}
      <rect x="0" y="0" width="480" height="28" fill="#2a2d35" />
      <circle cx="14" cy="14" r="4" fill="#ff6b6b" opacity="0.55" />
      <circle cx="28" cy="14" r="4" fill="#ffd43b" opacity="0.55" />
      <circle cx="42" cy="14" r="4" fill="#00C896" opacity="0.55" />
      <text x="58" y="18" fontFamily="ui-monospace, monospace" fontSize="10" fill="#8a8f9b">
        earnings-brief.md
      </text>

      {/* Heading */}
      <text x="24" y="60" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="14" fontWeight="700" fill="#f0f1f3">
        Earnings Brief — Next 24h
      </text>

      {/* Ticker 1 */}
      <text x="24" y="92" fontFamily="ui-sans-serif" fontSize="11" fontWeight="700" fill="#00C896">
        ## NVDA
      </text>
      <text x="68" y="92" fontFamily="ui-monospace, monospace" fontSize="9" fill="#8a8f9b">
        reports 4:20pm ET
      </text>
      <rect x="24" y="100" width="180" height="6" rx="1" fill="#2e313a" />
      <rect x="24" y="111" width="220" height="6" rx="1" fill="#2e313a" />
      <rect x="24" y="122" width="160" height="6" rx="1" fill="#2e313a" />

      {/* Implied move bar */}
      <text x="24" y="148" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b">
        Implied move
      </text>
      <rect x="24" y="154" width="180" height="4" rx="2" fill="#2a2d35" />
      <rect x="24" y="154" width="65" height="4" rx="2" fill="#00C896" />
      <text x="210" y="158" fontFamily="ui-monospace" fontSize="9" fill="#f0f1f3">
        ±7.2%
      </text>

      {/* Ticker 2 */}
      <text x="24" y="184" fontFamily="ui-sans-serif" fontSize="11" fontWeight="700" fill="#00C896">
        ## TSLA
      </text>
      <text x="68" y="184" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b">
        reports 4:30pm ET
      </text>
      <rect x="24" y="192" width="200" height="6" rx="1" fill="#2e313a" />
      <rect x="24" y="203" width="170" height="6" rx="1" fill="#2e313a" />

      {/* Right side widget */}
      <g transform="translate(290, 50)">
        <rect width="170" height="200" rx="6" fill="#1f2128" stroke="#2e313a" />
        <text x="14" y="22" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="1">
          BEAT / MISS · 8Q
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={14 + i * 18}
            y={36}
            width="12"
            height={20 + (i % 3) * 14}
            rx="2"
            fill={i === 6 ? "#ff6b6b" : "#00C896"}
            opacity={i % 3 === 0 ? 1 : 0.7}
          />
        ))}
        <text x="14" y="110" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="1">
          CONSENSUS EPS
        </text>
        <text x="14" y="134" fontFamily="ui-sans-serif" fontSize="22" fontWeight="700" fill="#f0f1f3">
          $5.59
        </text>
        <text x="14" y="152" fontFamily="ui-monospace" fontSize="9" fill="#00C896">
          ↑ 8.3% YoY
        </text>
        <line x1="14" y1="166" x2="156" y2="166" stroke="#2e313a" />
        <text x="14" y="184" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b">
          revenue · $37.7B
        </text>
      </g>
    </svg>
  );
}

export function OptionsThumbnail({ className }: { className?: string | undefined }) {
  const rows = [
    { ticker: "TSLA", iv: 0.71, yield: "23.4%" },
    { ticker: "AMD", iv: 0.62, yield: "23.5%" },
    { ticker: "NVDA", iv: 0.68, yield: "19.7%" },
    { ticker: "COIN", iv: 0.78, yield: "19.5%" },
    { ticker: "MSTR", iv: 0.82, yield: "17.6%" },
  ];
  return (
    <svg
      viewBox="0 0 480 270"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="opt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f2128" />
          <stop offset="1" stopColor="#16181d" />
        </linearGradient>
      </defs>
      <rect width="480" height="270" fill="url(#opt-bg)" />

      <rect x="0" y="0" width="480" height="28" fill="#2a2d35" />
      <circle cx="14" cy="14" r="4" fill="#ff6b6b" opacity="0.55" />
      <circle cx="28" cy="14" r="4" fill="#ffd43b" opacity="0.55" />
      <circle cx="42" cy="14" r="4" fill="#00C896" opacity="0.55" />
      <text x="58" y="18" fontFamily="ui-monospace" fontSize="10" fill="#8a8f9b">
        covered-call-scan.md
      </text>

      <text x="24" y="60" fontFamily="ui-sans-serif" fontSize="13" fontWeight="700" fill="#f0f1f3">
        Top covered calls · IV rank ≥ 0.5
      </text>

      {/* Header row */}
      <text x="24" y="86" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="0.6">
        TICKER
      </text>
      <text x="160" y="86" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="0.6">
        IV RANK
      </text>
      <text x="360" y="86" fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="0.6" textAnchor="end">
        ANN YIELD
      </text>
      <line x1="24" y1="94" x2="360" y2="94" stroke="#2e313a" />

      {rows.map((r, i) => {
        const y = 112 + i * 28;
        return (
          <g key={r.ticker}>
            <text x="24" y={y} fontFamily="ui-sans-serif" fontSize="12" fontWeight="600" fill="#f0f1f3">
              {r.ticker}
            </text>
            <rect x="160" y={y - 8} width="120" height="6" rx="3" fill="#2a2d35" />
            <rect
              x="160"
              y={y - 8}
              width={120 * r.iv}
              height="6"
              rx="3"
              fill={r.iv >= 0.7 ? "#00C896" : "#4dabf7"}
            />
            <text x="290" y={y} fontFamily="ui-monospace" fontSize="10" fill="#c3c7cf">
              {r.iv.toFixed(2)}
            </text>
            <text x="360" y={y} fontFamily="ui-monospace" fontSize="11" fontWeight="600" fill="#00C896" textAnchor="end">
              {r.yield}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function PortfolioThumbnail({ className }: { className?: string | undefined }) {
  const lines = [80, 90, 75, 92, 82, 96, 102];
  const max = 110;
  return (
    <svg
      viewBox="0 0 480 270"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pf-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f2128" />
          <stop offset="1" stopColor="#16181d" />
        </linearGradient>
        <linearGradient id="pf-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00C896" stopOpacity="0.4" />
          <stop offset="1" stopColor="#00C896" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="480" height="270" fill="url(#pf-bg)" />

      <rect x="0" y="0" width="480" height="28" fill="#2a2d35" />
      <circle cx="14" cy="14" r="4" fill="#ff6b6b" opacity="0.55" />
      <circle cx="28" cy="14" r="4" fill="#ffd43b" opacity="0.55" />
      <circle cx="42" cy="14" r="4" fill="#00C896" opacity="0.55" />
      <text x="58" y="18" fontFamily="ui-monospace" fontSize="10" fill="#8a8f9b">
        portfolio-review.md
      </text>

      {/* Stats row */}
      <g transform="translate(24, 50)">
        <text fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="0.6">
          NAV
        </text>
        <text y="20" fontFamily="ui-sans-serif" fontSize="18" fontWeight="700" fill="#f0f1f3">
          $103,420
        </text>
        <text y="36" fontFamily="ui-monospace" fontSize="10" fill="#00C896">
          +2.1% WoW
        </text>
      </g>
      <g transform="translate(160, 50)">
        <text fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="0.6">
          TRADES
        </text>
        <text y="20" fontFamily="ui-sans-serif" fontSize="18" fontWeight="700" fill="#f0f1f3">
          8
        </text>
        <text y="36" fontFamily="ui-monospace" fontSize="10" fill="#c3c7cf">
          win 62%
        </text>
      </g>
      <g transform="translate(264, 50)">
        <text fontFamily="ui-monospace" fontSize="9" fill="#8a8f9b" letterSpacing="0.6">
          TOP-3 CONC
        </text>
        <text y="20" fontFamily="ui-sans-serif" fontSize="18" fontWeight="700" fill="#f0f1f3">
          58%
        </text>
        <text y="36" fontFamily="ui-monospace" fontSize="10" fill="#ffa94d">
          tech heavy
        </text>
      </g>

      {/* NAV line chart */}
      {(() => {
        const w = 432;
        const h = 110;
        const left = 24;
        const top = 130;
        const step = w / (lines.length - 1);
        const pts = lines.map((v, i) => `${left + i * step},${top + h - (v / max) * h}`).join(" ");
        const area = `${left},${top + h} ${pts} ${left + w},${top + h}`;
        return (
          <g>
            <polygon points={area} fill="url(#pf-fill)" />
            <polyline points={pts} fill="none" stroke="#00C896" strokeWidth="2" />
            {lines.map((v, i) => (
              <circle
                key={i}
                cx={left + i * step}
                cy={top + h - (v / max) * h}
                r={i === lines.length - 1 ? 4 : 2.5}
                fill="#00C896"
                stroke="#16181d"
                strokeWidth={i === lines.length - 1 ? 2 : 0}
              />
            ))}
            <text x="24" y="252" fontFamily="ui-monospace" fontSize="9" fill="#5d626c">
              Mon
            </text>
            <text x="448" y="252" fontFamily="ui-monospace" fontSize="9" fill="#5d626c" textAnchor="end">
              Fri
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

const map = {
  earnings: EarningsThumbnail,
  options: OptionsThumbnail,
  portfolio: PortfolioThumbnail,
} as const;

export type ThumbnailKey = keyof typeof map;

export function RecipeThumbnail({
  kind,
  className,
}: {
  kind: ThumbnailKey;
  className?: string | undefined;
}) {
  const Component = map[kind];
  return <Component className={className} />;
}
