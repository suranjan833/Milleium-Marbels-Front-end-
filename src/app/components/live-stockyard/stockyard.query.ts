import type { SelectedFilters } from "./stockyard.types";

/**
 * Maps SelectedFilters keys to the query param names the API expects.
 * These must match the keys produced by buildQueryString() in Utils/api.ts.
 */
const FILTER_PARAM_KEYS = {
  stone_types: "stone_type",
  categories: "stone_category",
  colors: "color",
  locations: "location",
  countries: "country",
  applications: "application",
} as const;

type FilterKey = keyof typeof FILTER_PARAM_KEYS;

function readArrayParam(params: URLSearchParams, key: string): string[] {
  const value = params.get(key);
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Write the given filters into the provided URLSearchParams instance. */
export function filtersToQueryParams(
  filters: SelectedFilters,
  params: URLSearchParams
): void {
  (Object.keys(FILTER_PARAM_KEYS) as FilterKey[]).forEach((key) => {
    const values = filters[key];
    if (values && values.length > 0) {
      params.set(FILTER_PARAM_KEYS[key], values.join(","));
    }
  });
}

/** Parse the given URLSearchParams instance back into a SelectedFilters object. */
export function filtersFromQueryParams(
  params: URLSearchParams
): SelectedFilters {
  return {
    stone_types: readArrayParam(params, "stone_type"),
    categories: readArrayParam(params, "stone_category"),
    colors: readArrayParam(params, "color"),
    locations: readArrayParam(params, "location"),
    countries: readArrayParam(params, "country"),
    applications: readArrayParam(params, "application"),
  };
}

/** Build the full query string (search + filters) for the live-stockyard page. */
export function buildLiveStockyardQuery(
  search: string,
  filters: SelectedFilters
): string {
  const params = new URLSearchParams();
  const trimmedSearch = search.trim();
  if (trimmedSearch) {
    params.set("search", trimmedSearch);
  }
  filtersToQueryParams(filters, params);
  return params.toString();
}
