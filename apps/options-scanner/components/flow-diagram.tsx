export function FlowDiagram({
  agentLabel,
  mcpLabel,
  outputLabel,
}: {
  agentLabel: string;
  mcpLabel: string;
  outputLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 720 180"
      className="h-auto w-full"
      role="img"
      aria-label={`${agentLabel} → ${mcpLabel} → ${outputLabel}`}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#6B7A9A" />
        </marker>
      </defs>

      {/* You / agent box */}
      <g>
        <rect
          x="20"
          y="55"
          width="160"
          height="70"
          rx="8"
          fill="#0F1624"
          stroke="#1E2D42"
        />
        <text
          x="100"
          y="80"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="12"
          fontWeight="600"
          fill="#6B7A9A"
          letterSpacing="1.5"
        >
          YOU + AI APP
        </text>
        <text
          x="100"
          y="103"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="14"
          fill="#E8EDF5"
        >
          {agentLabel}
        </text>
      </g>

      {/* Arrow 1 */}
      <line
        x1="190"
        y1="90"
        x2="270"
        y2="90"
        stroke="#6B7A9A"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />

      {/* MCP box (green accent) */}
      <g>
        <rect
          x="280"
          y="55"
          width="160"
          height="70"
          rx="8"
          fill="rgba(0, 200, 150, 0.06)"
          stroke="#00C896"
          strokeWidth="1.5"
        />
        <text
          x="360"
          y="80"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="12"
          fontWeight="600"
          fill="#00C896"
          letterSpacing="1.5"
        >
          LONGBRIDGE MCP
        </text>
        <text
          x="360"
          y="103"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="14"
          fill="#E8EDF5"
        >
          {mcpLabel}
        </text>
      </g>

      {/* Arrow 2 */}
      <line
        x1="450"
        y1="90"
        x2="530"
        y2="90"
        stroke="#6B7A9A"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />

      {/* Output box */}
      <g>
        <rect
          x="540"
          y="55"
          width="160"
          height="70"
          rx="8"
          fill="#0F1624"
          stroke="#1E2D42"
        />
        <text
          x="620"
          y="80"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="12"
          fontWeight="600"
          fill="#6B7A9A"
          letterSpacing="1.5"
        >
          OUTPUT
        </text>
        <text
          x="620"
          y="103"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="14"
          fill="#E8EDF5"
        >
          {outputLabel}
        </text>
      </g>
    </svg>
  );
}
