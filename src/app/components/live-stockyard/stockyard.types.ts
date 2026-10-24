export interface StoneType {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}
export interface StoneCategory {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

export interface Origin {
  country: string;
  city: string;
  country_icon: string;
}

export interface Color {
  id: number;
  name: string;
  slug: string;
}

export interface Application {
  id: number;
  name: string;
  slug: string;
  main_image?: string;
}

export interface StoneApplicationMedia {
  id: number;
  media_file: string;
  media_type: "IMAGE" | "VIDEO" | string;
  sort_order: number;
  url: string;
}

export interface StoneApplicationItem {
  id: number;
  application: {
    id: number;
    name: string;
    slug: string;
    is_active?: boolean;
  };
  sort_order?: number;
  media: StoneApplicationMedia[];
}

export interface StoneMedia {
  id: number;
  file_name: string;
  url: string;
  is_primary: boolean;
  sort_order: number;
  media_type: "IMAGE" | "VIDEO" | string;
  content_type: string;
}

export interface MarbleSlab {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  media?: StoneMedia[];
  short_description: string;
  description?: string;
  stone_type: StoneType | null;
  stone_category?: StoneCategory | null;
  origin: Origin;
  colors: Color[];
  thickness: string;
  dimensions: string;
  lot_number: string;
  applications: Application[];
  is_featured?: boolean;
  is_active?: boolean;
  whatsapp_number?: string;
}

export interface PaginatedStonesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MarbleSlab[];
}

export interface FilterApiItem {
  id: number;
  name: string;
  slug: string;
  is_active?: boolean;
}

export interface PaginatedFilterApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FilterApiItem[];
}

export interface FactoryLocationApiItem {
  id: number;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  is_active?: boolean;
}

export interface PaginatedFactoryLocationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FactoryLocationApiItem[];
}

export interface CountryApiItem {
  id: number;
  name: string;
  country_icon?: string;
}

export interface PaginatedCountryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CountryApiItem[];
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

export interface SelectedFilters {
  stone_types: string[];
  categories?: string[];
  colors: string[];
  locations: string[];
  countries: string[];
  applications: string[];
}

