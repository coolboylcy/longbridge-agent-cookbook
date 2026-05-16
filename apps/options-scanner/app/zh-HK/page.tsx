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
      flowMcpLabel="選擇權 + IV 數據"
      flowOutputLabel="前 10 名排序"
    />
  );
}
