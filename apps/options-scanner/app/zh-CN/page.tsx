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
      flowMcpLabel="期权 + IV 数据"
      flowOutputLabel="前 10 名排序"
    />
  );
}
