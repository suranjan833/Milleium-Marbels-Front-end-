import type { EventApiItem, EventDetailItem } from "../Utils/api";
import {
  EVENT_CATEGORIES,
  type EventPost,
  type SidebarRecentEvent,
} from "./event.types";

export function formatEventDate(dateStr: string, dayOfWeek?: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  const day =
    dayOfWeek?.trim() ||
    d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const month = d.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  return `${day}, ${d.getDate()} ${month} ${d.getFullYear()}`;
}

export function eventLocation(item: EventApiItem): string {
  return (
    [item.city_name, item.country_name].filter(Boolean).join(", ") ||
    item.venue ||
    ""
  );
}

export function mapEventToPost(item: EventApiItem): EventPost {
  const category =
    EVENT_CATEGORIES.find((c) => c.slug === item.category) ?? {
      id: 0,
      name: item.category_display,
      slug: item.category,
    };

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.summary,
    hero_image: item.banner_url ?? "",
    start_date: item.start_date,
    end_date: item.end_date,
    start_date_formatted: formatEventDate(item.start_date, item.day_of_week),
    end_date_formatted: formatEventDate(item.end_date),
    location: eventLocation(item),
    venue: item.venue ?? "",
    category,
    category_name: item.category_display,
    organizer: item.organizer,
    is_featured: item.is_featured,
    url: `/event/${item.slug}`,
  };
}

export function mapEventDetailToPost(item: EventDetailItem): EventPost {
  return {
    ...mapEventToPost(item),
    content: item.content,
  };
}

export function mapEventToRecent(item: EventApiItem): SidebarRecentEvent {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    hero_image: item.banner_url ?? "",
    start_date: item.start_date,
    location: eventLocation(item),
  };
}
