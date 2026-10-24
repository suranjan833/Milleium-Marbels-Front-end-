import { base_url } from "./network";
import type {
  MarbleSlab,
  PaginatedCountryResponse,
  PaginatedFactoryLocationResponse,
  PaginatedFilterApiResponse,
  PaginatedStonesResponse,
  SelectedFilters,
  StoneApplicationItem,
} from "../components/live-stockyard/stockyard.types";
import type { BlogApiResponse, BlogPost } from "../blog/blog.types";

const STOCKYARD_API_BASE = `${base_url}api/stockyard/stones/`;
const BLOG_API_BASE = `${base_url}api/blog/articles/`;
const OUR_CLIENTS_API_BASE = `${base_url}api/insight/our-clients/`;
const EVENTS_API_BASE = `${base_url}api/insight/events/`;

interface FetchStonesParams {
  page?: number;
  search?: string;
  ordering?: string;
  filters?: SelectedFilters;
}

function buildQueryString(params: FetchStonesParams): string {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.ordering) {
    searchParams.set("ordering", params.ordering);
  }

  if (params.filters) {
    const { stone_types, categories, colors, locations, countries, applications } =
      params.filters;
    if (stone_types?.length) searchParams.set("stone_type", stone_types.join(","));
    if (categories?.length) searchParams.set("stone_category", categories.join(","));
    if (colors?.length) searchParams.set("color", colors.join(","));
    if (locations?.length) searchParams.set("location", locations.join(","));
    if (countries?.length) searchParams.set("country", countries.join(","));
    if (applications?.length) searchParams.set("application", applications.join(","));
  }

  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

// ===========================
//  STOCKYARD API
// ===========================

export async function fetchStones(
  params: FetchStonesParams = {}
): Promise<PaginatedStonesResponse> {
  const url = `${STOCKYARD_API_BASE}${buildQueryString(params)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch stones: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchStonesByUrl(url: string): Promise<PaginatedStonesResponse> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch stones: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchStoneBySlug(slug: string): Promise<MarbleSlab> {
  const res = await fetch(`${STOCKYARD_API_BASE}${slug}/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch stone detail: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function fetchStoneTypes(
  pageOrUrl: number | string = 1
): Promise<PaginatedFilterApiResponse> {
  const url =
    typeof pageOrUrl === "string"
      ? pageOrUrl
      : `${base_url}api/stockyard/types/?page=${pageOrUrl}&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch stone types: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchStoneCategories(
  pageOrUrl: number | string = 1
): Promise<PaginatedFilterApiResponse> {
  const url =
    typeof pageOrUrl === "string"
      ? pageOrUrl
      : `${base_url}api/stockyard/categories/?page=${pageOrUrl}&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch stone categories: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchColors(
  pageOrUrl: number | string = 1
): Promise<PaginatedFilterApiResponse> {
  const url =
    typeof pageOrUrl === "string"
      ? pageOrUrl
      : `${base_url}api/stockyard/colors/?page=${pageOrUrl}&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch colors: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchApplications(
  pageOrUrl: number | string = 1
): Promise<PaginatedFilterApiResponse> {
  const url =
    typeof pageOrUrl === "string"
      ? pageOrUrl
      : `${base_url}api/stockyard/applications/?page=${pageOrUrl}&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch applications: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchFactoryLocations(
  pageOrUrl: number | string = 1
): Promise<PaginatedFactoryLocationResponse> {
  const url =
    typeof pageOrUrl === "string"
      ? pageOrUrl
      : `${base_url}api/stockyard/factory-locations/?page=${pageOrUrl}&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch factory locations: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchCountries(
  pageOrUrl: number | string = 1
): Promise<PaginatedCountryResponse> {
  const url =
    typeof pageOrUrl === "string"
      ? pageOrUrl
      : `${base_url}api/stockyard/countries/?page=${pageOrUrl}&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch countries: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchStoneApplications(
  stoneSlug?: string,
  stoneId?: number
): Promise<StoneApplicationItem[]> {
  const params = new URLSearchParams();
  if (stoneSlug) {
    params.set("stone__slug", stoneSlug);
  } else if (stoneId) {
    params.set("stone", stoneId.toString());
  }

  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${base_url}api/stockyard/stone-applications/${query}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch stone applications: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  if (Array.isArray(data)) {
    return data;
  }
  return data.results || [];
}

// ===========================
//  CONTACT API
// ===========================

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(
  payload: ContactFormPayload
): Promise<{ success: boolean; message?: string }> {
  const url = `${base_url}api/contact-us/send-us-a-message/`;
  const sanitizedPayload = {
    ...payload,
    subject: payload.subject?.trim() || "General Inquiry",
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sanitizedPayload),
  });

  if (!res.ok) {
    let errorMessage = `Failed to send message: ${res.status} ${res.statusText}`;
    try {
      const errorData = await res.json();
      if (typeof errorData === "object" && errorData !== null) {
        const firstKey = Object.keys(errorData)[0];
        const val = errorData[firstKey];
        if (Array.isArray(val) && val.length > 0) {
          errorMessage = `${val[0]}`;
        } else if (typeof val === "string") {
          errorMessage = val;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      }
    } catch {
      // fallback to statusText
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function sendGetInTouch(
  payload: Omit<ContactFormPayload, "subject">
): Promise<{ success: boolean; message?: string }> {
  const url = `${base_url}api/contact-us/GetInTouch/`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to send message: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

// ===========================
//  BLOG API
// ===========================

export async function fetchBlogArticles(
  page?: number,
  search?: string
): Promise<BlogApiResponse> {
  const params = new URLSearchParams();
  if (page && page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  const qs = params.toString();
  const url = `${BLOG_API_BASE}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch blog articles: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

export async function fetchBlogArticleBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`${BLOG_API_BASE}${slug}/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch blog article: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

// ===========================
//  OUR CLIENTS (INSIGHT) API
// ===========================

export type OurClientType = "real_estate_corporate" | "hospitality_luxury";

export interface OurClient {
  id: number;
  name: string;
  logo: string | null;
  logo_url: string | null;
  type: OurClientType;
  type_display: string;
  index: number;
  created_at: string;
  modified_at: string;
}

export interface OurClientsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OurClient[];
}

export async function fetchOurClients(
  params: { type?: OurClientType; search?: string } = {}
): Promise<OurClientsResponse> {
  const searchParams = new URLSearchParams();
  if (params.type) searchParams.set("type", params.type);
  if (params.search) searchParams.set("search", params.search);

  const qs = searchParams.toString();
  const url = `${OUR_CLIENTS_API_BASE}${qs ? `?page_size=50&${qs}` : "?page_size=50"}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch our clients: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

// ===========================
//  EVENTS (INSIGHT) API
// ===========================

export type EventCategorySlug =
  | "trade_fair"
  | "collection_launch"
  | "exhibition"
  | "factory_tour"
  | "conference";

export interface EventApiItem {
  id: number;
  title: string;
  slug: string;
  category: EventCategorySlug;
  category_display: string;
  is_featured: boolean;
  is_past: boolean;
  start_date: string;
  end_date: string;
  day_of_week: string;
  country: string | null;
  country_name: string | null;
  city: string | null;
  city_name: string | null;
  venue: string | null;
  organizer: string;
  summary: string;
  banner_url: string | null;
  index: number;
  created_at: string;
  modified_at: string;
}

export interface EventApiResponse {
  count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  results: EventApiItem[];
}

export async function fetchEvents(
  params: {
    category?: EventCategorySlug;
    search?: string;
    page?: number;
    is_featured?: boolean;
    is_past?: boolean;
  } = {}
): Promise<EventApiResponse> {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set("category", params.category);
  if (params.search) searchParams.set("search", params.search);
  if (params.page && params.page > 1) searchParams.set("page", String(params.page));
  if (params.is_featured !== undefined)
    searchParams.set("is_featured", String(params.is_featured));
  if (params.is_past !== undefined)
    searchParams.set("is_past", String(params.is_past));

  const qs = searchParams.toString();
  const url = `${EVENTS_API_BASE}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export interface EventDetailItem extends EventApiItem {
  content: string;
}

export async function fetchEventBySlug(slug: string): Promise<EventDetailItem> {
  const url = `${EVENTS_API_BASE}by-slug/${encodeURIComponent(slug)}/`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch event detail: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
