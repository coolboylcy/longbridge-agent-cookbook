import { ImageResponse } from "next/og";

export const alt = "Earnings Monitor — Longbridge Agent Cookbook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0E1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 72,
            bottom: 72,
            width: 4,
            background: "#00C896",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingLeft: 28,
            color: "#6B7A9A",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 36,
              height: 36,
              background: "#00C896",
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              color: "#0A0E1A",
              fontSize: 16,
              fontWeight: 900,
            }}
          >
            LB
          </div>
          <span>Longbridge Agent Cookbook</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 800,
            color: "#E8EDF5",
            marginTop: 40,
            paddingLeft: 28,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Earnings Monitor
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#6B7A9A",
            marginTop: 24,
            paddingLeft: 28,
            maxWidth: 920,
            lineHeight: 1.35,
          }}
        >
          AI agent watches your watchlist for earnings — 24h pre-brief + 1h post-recap.
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            paddingLeft: 28,
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              background: "rgba(0, 200, 150, 0.12)",
              border: "1px solid rgba(0, 200, 150, 0.3)",
              color: "#00C896",
              fontSize: 22,
              fontWeight: 600,
              borderRadius: 6,
            }}
          >
            Recipe 01
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              background: "rgba(0, 200, 150, 0.12)",
              border: "1px solid rgba(0, 200, 150, 0.3)",
              color: "#00C896",
              fontSize: 22,
              fontWeight: 600,
              borderRadius: 6,
            }}
          >
            MCP First
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
