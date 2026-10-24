export interface AwardCategory {
  id: number;
  name: string;
  slug: string;
}

export interface AwardBodyBlock {
  type: "heading" | "paragraph" | "image";
  value: string;
}

export interface AwardPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  hero_image: string;
  award_date: string;
  award_date_formatted: string;
  year: number;
  category: AwardCategory;
  category_name: string;
  awarding_organization: string;
  recipient: string;
  location: string;
  tier: "gold" | "silver" | "bronze" | "platinum";
  url: string;
  body?: AwardBodyBlock[];
  sidebar?: AwardSidebarData;
}

export interface SidebarRecentAward {
  id: number;
  title: string;
  slug: string;
  hero_image: string;
  year: number;
  tier: "gold" | "silver" | "bronze" | "platinum";
}

export interface AwardSidebarData {
  recent_awards: SidebarRecentAward[];
  categories: AwardCategory[];
  tiers: { name: string; slug: string; count: number }[];
}

export interface AwardApiResponse {
  count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  results: AwardPost[];
  sidebar: AwardSidebarData;
}
