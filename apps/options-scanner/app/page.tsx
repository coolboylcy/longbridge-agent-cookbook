import en from "../content/en";
import { PageTemplate } from "../components/page-template";

export default function Page() {
  return (
    <PageTemplate
      locale="en"
      content={en}
      flowAgentLabel="Claude / Cursor"
      flowMcpLabel="Options + IV data"
      flowOutputLabel="Top-10 ranked"
    />
  );
}
