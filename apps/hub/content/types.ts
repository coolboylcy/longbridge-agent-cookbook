export type Locale = "en" | "zh-HK" | "zh-CN";

export type TagColor =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "pink"
  | "yellow"
  | "teal"
  | "red"
  | "neutral";

export type ThumbnailKey = "earnings" | "options" | "portfolio";

export interface Tag {
  label: string;
  color: TagColor;
}

export interface RecipeCard {
  slug: string;
  title: string;
  description: string;
  href: string;
  thumbnail: ThumbnailKey;
  tags: Tag[];
  meta: string; // e.g. "Recipe 01 · 5 min"
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HubContent {
  meta: { title: string; description: string };
  nav: {
    brand: string;
    links: { label: string; href: string }[];
    searchPlaceholder: string;
    signIn: string;
    signInHref: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    primaryCtaHref: string;
    secondaryCta: string;
    secondaryCtaHref: string;
  };
  filterBar: {
    sortLabel: string;
    filters: { label: string; value: string }[];
  };
  recipesSection: {
    title: string;
    countLabel: (n: number) => string;
  };
  recipes: RecipeCard[];
  setupBanner: {
    title: string;
    body: string;
    primary: string;
    primaryHref: string;
    secondary: string;
    secondaryHref: string;
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
