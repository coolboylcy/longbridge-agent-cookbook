import en from "../content/en";
import { HubTemplate } from "../components/page-template";

export default function Page() {
  return <HubTemplate locale="en" content={en} />;
}
