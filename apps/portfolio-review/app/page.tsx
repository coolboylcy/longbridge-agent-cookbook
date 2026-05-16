import en from "../content/en";
import { PageTemplate } from "../components/page-template";

export default function Page() {
  return (
    <PageTemplate
      locale="en"
      content={en}
      flowAgentLabel="Claude / Cursor"
      flowMcpLabel="Positions + executions"
      flowOutputLabel="Markdown review"
    />
  );
}
