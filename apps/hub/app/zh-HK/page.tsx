import zhHK from "../../content/zh-HK";
import { HubTemplate } from "../../components/page-template";

export const metadata = {
  title: zhHK.meta.title,
  description: zhHK.meta.description,
};

export default function Page() {
  return <HubTemplate locale="zh-HK" content={zhHK} />;
}
