import { ImageResponse } from "next/og";

export const alt = "Longbridge Agent Cookbook — Runnable AI agent recipes for Longbridge MCP";
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
            color: "#00C896",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              background: "#00C896",
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
              color: "#0A0E1A",
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            LB
          </div>
          <span>Open Source · MCP First</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#E8EDF5",
            marginTop: 36,
            paddingLeft: 28,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          Longbridge
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#00C896",
            marginTop: -6,
            paddingLeft: 28,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          Agent Cookbook
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#6B7A9A",
            marginTop: 32,
            paddingLeft: 28,
            maxWidth: 980,
            lineHeight: 1.35,
          }}
        >
          Runnable AI agent recipes for Longbridge MCP. Drop into Claude, Cursor, or Codex — your agent gets broker hands.
        </div>
      </div>
    ),
    { ...size }
  );
}
