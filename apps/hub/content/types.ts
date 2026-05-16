export type Locale = "en" | "zh-HK" | "zh-CN";

export interface RecipeCard {
  title: string;
  description: string;
  href: string;
  status: "live" | "coming-soon" | "beta";
  statusLabel: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HubContent {
  meta: { title: string; description: string };
  nav: { brand: string; allRecipes: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  mcpBanner: {
    title: string;
    detail: string;
    cta: string;
  };
  recipesSection: { title: string };
  recipes: RecipeCard[];
  quickstart: {
    title: string;
    steps: { title: string; body: string }[];
  };
  whyThisExists: {
    title: string;
    body: string[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  author: {
    title: string;
    line: string;
    disclaimer: string;
    links: { label: string; href: string }[];
  };
}
