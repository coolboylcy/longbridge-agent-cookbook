import zhCN from "../../content/zh-CN";
import { HubTemplate } from "../../components/page-template";

export const metadata = {
  title: zhCN.meta.title,
  description: zhCN.meta.description,
};

export default function Page() {
  return <HubTemplate locale="zh-CN" content={zhCN} />;
}
