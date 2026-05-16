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
      flowMcpLabel="你的自選股 + 數據"
      flowOutputLabel="Markdown 簡報"
    />
  );
}
