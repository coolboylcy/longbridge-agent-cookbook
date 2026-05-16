import zhHK from "../../content/zh-HK";
import { PageTemplate } from "../../components/page-template";

export const metadata = {
  title: zhHK.meta.title,
  description: zhHK.meta.description,
};

export default function Page() {
  return (
    <PageTemplate
      locale="zh-HK"
      content={zhHK}
      flowAgentLabel="Claude / Cursor"
      flowMcpLabel="持倉 + 成交"
      flowOutputLabel="Markdown 複盤"
    />
  );
}
