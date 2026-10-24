export interface EventCategory {
  id: number;
  name: string;
  slug: string;
}

export const EVENT_CATEGORIES: EventCategory[] = [
  { id: 1, name: "Trade Fair", slug: "trade_fair" },
  { id: 2, name: "Collection Launch", slug: "collection_launch" },
  { id: 3, name: "Exhibition", slug: "exhibition" },
  { id: 4, name: "Factory Tour", slug: "factory_tour" },
  { id: 5, name: "Conference", slug: "conference" },
];

export interface EventBodyBlock {
  type: "heading" | "paragraph" | "image";
  value: string;
}

export interface EventPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  hero_image: string;
  start_date: string;
  end_date: string;
  start_date_formatted: string;
  end_date_formatted: string;
  location: string;
  venue: string;
  category: EventCategory;
  category_name: string;
  organizer: string;
  is_featured: boolean;
  registration_url?: string;
  url: string;
  body?: EventBodyBlock[];
  content?: string;
  sidebar?: SidebarData;
}

export interface SidebarRecentEvent {
  id: number;
  title: string;
  slug: string;
  hero_image: string;
  start_date: string;
  location: string;
}

export interface SidebarData {
  upcoming_events: SidebarRecentEvent[];
  categories: EventCategory[];
}

export interface EventApiResponse {
  count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  results: EventPost[];
  sidebar: SidebarData;
}
