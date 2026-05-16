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
      flowMcpLabel="持仓 + 成交"
      flowOutputLabel="Markdown 复盘"
    />
  );
}
