export type Locale = "en" | "zh-HK" | "zh-CN";

export interface PageContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    badges: string[];
  };
  whatItDoes: { title: string; bullets: string[] };
  whatYouNeed: { title: string; items: { label: string; detail: string }[] };
  howToRun: {
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
    setupLinkLabel: string;
    setupLinkHref: string;
  };
  prompt: {
    title: string;
    label: string;
    body: string;
    openInClaude: string;
    copy: string;
    copied: string;
    secondary?: {
      title: string;
      intro: string;
      label: string;
      body: string;
    };
  };
  sampleOutput: { title: string; label: string; body: string };
  flow: {
    title: string;
    steps: { tool: string; description: string; noToolCall?: boolean }[];
  };
  customize: { title: string; items: { label: string; detail: string }[] };
  footer: { backToHub: string; github: string };
  nav: { brand: string; allRecipes: string };
}
