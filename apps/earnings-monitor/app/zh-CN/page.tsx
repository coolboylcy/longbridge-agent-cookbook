import zhCN from "../../content/zh-CN";
import { PageTemplate } from "../../components/page-template";

export const metadata = {
  title: zhCN.meta.title,
  description: zhCN.meta.description,
};

export default function Page() {
  return (
    <PageTemplate
      locale="zh-CN"
      content={zhCN}
      flowAgentLabel="Claude / Cursor"
      flowMcpLabel="你的自选股 + 数据"
      flowOutputLabel="Markdown 简报"
    />
  );
}
