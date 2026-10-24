export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogBodyBlock {
  type: "heading" | "paragraph" | "image";
  value: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  hero_image: string;
  published_date: string;
  published_date_formatted: string;
  category: BlogCategory;
  category_name: string;
  author_name: string;
  comments_count: number;
  comments_text: string;
  url: string;
  body?: BlogBodyBlock[];
  sidebar?: SidebarData;
}

export interface SidebarRecentPost {
  id: number;
  title: string;
  slug: string;
  hero_image: string;
  excerpt: string;
}

export interface SidebarData {
  recent_posts: SidebarRecentPost[];
  categories: BlogCategory[];
  recent_comments: unknown[];
}

export interface BlogApiResponse {
  count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
  sidebar: SidebarData;
}
