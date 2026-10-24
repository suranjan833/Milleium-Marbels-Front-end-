"use client";

import { useState, useEffect, useCallback } from "react";
import { Drawer, IconButton, Checkbox, CircularProgress, Skeleton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import type { FilterOption, SelectedFilters } from "./stockyard.types";
import {
  fetchStoneTypes,
  fetchStoneCategories,
  fetchColors,
  fetchApplications,
  fetchFactoryLocations,
  fetchCountries,
} from "../../Utils/api";



interface FiltersProps {
  selectedFilters: SelectedFilters;
  onFilterChange: (filters: SelectedFilters) => void;
}

function getFilterArray(
  filters: SelectedFilters,
  groupId: string
): string[] {
  switch (groupId) {
    case "stone_type":
      return filters.stone_types || [];
    case "category":
      return filters.categories || [];
    case "color":
      return filters.colors || [];
    case "location":
      return filters.locations || [];
    case "country":
      return filters.countries || [];
    case "application":
      return filters.applications || [];
    default:
      return [];
  }
}

function setFilterArray(
  filters: SelectedFilters,
  groupId: string,
  value: string[]
): SelectedFilters {
  const updated = { ...filters };
  switch (groupId) {
    case "stone_type":
      updated.stone_types = value;
      break;
    case "category":
      updated.categories = value;
      break;
    case "color":
      updated.colors = value;
      break;
    case "location":
      updated.locations = value;
      break;
    case "country":
      updated.countries = value;
      break;
    case "application":
      updated.applications = value;
      break;
  }
  return updated;
}

function FilterOptionSkeleton() {
  return (
    <div className="flex items-center justify-between py-1.5 px-1 -mx-1">
      <div className="flex items-center gap-2.5 w-full">
        <Skeleton
          variant="rectangular"
          width={18}
          height={18}
          className="rounded shrink-0"
          sx={{ backgroundColor: "#EFEBE4" }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          sx={{ backgroundColor: "#EFEBE4" }}
        />
      </div>
    </div>
  );
}

interface FilterSectionProps {
  groupId: string;
  title: string;
  fetchFn?: (pageOrUrl: number | string) => Promise<any>;
  staticOptions?: FilterOption[];
  mapItem?: (item: any) => FilterOption;
  selectedValues: string[];
  onToggle: (groupId: string, optionId: string) => void;
}

function FilterSection({
  groupId,
  title,
  fetchFn,
  staticOptions,
  mapItem,
  selectedValues,
  onToggle,
}: FilterSectionProps) {
  const [options, setOptions] = useState<FilterOption[]>(staticOptions || []);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(Boolean(fetchFn));
  const [loading, setLoading] = useState<boolean>(Boolean(fetchFn));
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadInitial = useCallback(async () => {
    if (!fetchFn) return;
    try {
      setLoading(true);
      const res = await fetchFn(1);
      const rawResults = res.results || [];
      const mapped: FilterOption[] = rawResults
        .filter((item: any) => item.is_active !== false)
        .map(
          mapItem ||
            ((item: any) => ({
              id: item.slug || item.id,
              label: item.name,
            }))
        );

      setOptions(mapped);
      setPage(1);
      setNextUrl(res.next || null);
      setHasMore(Boolean(res.next));
    } catch (err) {
      console.error(`Error loading filter section ${title}:`, err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, mapItem, title]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const loadMore = async () => {
    if (!hasMore || loading || loadingMore || !fetchFn) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await (nextUrl ? fetchFn(nextUrl) : fetchFn(nextPage));
      const rawResults = res.results || [];
      const mapped: FilterOption[] = rawResults
        .filter((item: any) => item.is_active !== false)
        .map(
          mapItem ||
            ((item: any) => ({
              id: item.slug || item.id,
              label: item.name,
            }))
        );

      setOptions((prev) => {
        const existingIds = new Set(prev.map((o) => o.id));
        const newOnly = mapped.filter((o) => !existingIds.has(o.id));
        return [...prev, ...newOnly];
      });

      setPage(nextPage);
      setNextUrl(res.next || null);
      setHasMore(Boolean(res.next));
    } catch (err) {
      console.error(`Error loading more for ${title}:`, err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight <= 15) {
      loadMore();
    }
  };

  if (!loading && options.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-[14px] font-bold text-[#2C2621] tracking-wider uppercase mb-3">
        {title}
      </h4>

      {loading ? (
        <div className="space-y-1 pr-1.5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <FilterOptionSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div
          onScroll={handleScroll}
          className="max-h-48 overflow-y-auto space-y-1 pr-1.5 scrollbar-thin scrollbar-thumb-[#D4C9BD] scrollbar-track-transparent"
        >
          {options.map((option) => {
            const isChecked = selectedValues.includes(option.id);
            return (
              <div
                key={option.id}
                onClick={() => onToggle(groupId, option.id)}
                className="flex items-center justify-between py-1 cursor-pointer select-none group hover:bg-[#FAF6F0] rounded px-1 -mx-1 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => {
                      e.stopPropagation();
                      onToggle(groupId, option.id);
                    }}
                    sx={{
                      color: "#D4C9BD",
                      p: 0,
                      "&.Mui-checked": {
                        color: "#74532B",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                    disableRipple
                  />
                  {/* {option.icon && (
                    <img
                      src={option.icon}
                      alt={option.label}
                      className="w-4 h-3 object-cover rounded-xs"
                    />
                  )} */}
                  <span className="text-[15px] text-[#3D352E] font-normal leading-tight group-hover:text-[#1F1914]">
                    {option.label}
                  </span>
                </div>
                {typeof option.count === "number" && (
                  <span className="text-[14px] text-[#A8A096] font-normal leading-tight pl-2">
                    ({option.count})
                  </span>
                )}
              </div>
            );
          })}

          {loadingMore && (
            <div className="flex items-center justify-center py-2">
              <CircularProgress size={16} sx={{ color: "#8C6D46" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Filters({ selectedFilters, onFilterChange }: FiltersProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleToggle = useCallback(
    (groupId: string, optionId: string) => {
      const current = getFilterArray(selectedFilters, groupId);
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      onFilterChange(setFilterArray(selectedFilters, groupId, updated));
    },
    [selectedFilters, onFilterChange]
  );

  const mapFactoryLocation = useCallback((item: any): FilterOption => {
    return {
      id: item.city || item.name,
      label: item.city || item.name,
    };
  }, []);

  const mapCountry = useCallback((item: any): FilterOption => {
    return {
      id: item.name,
      label: item.name,
      icon: item.country_icon,
    };
  }, []);

  const filterContent = (
    <div className="w-full text-[#38302A]">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[16px] font-bold text-[#8C6D46] tracking-wider uppercase mb-3">
          FILTER RESULTS
        </h3>
        <div className="h-[1px] w-full bg-[#E8E2D9]" />
      </div>

      {/* Filter Sections with Infinite Scroll & Scrollable Containers */}
      <div className="space-y-6">
        <FilterSection
          groupId="stone_type"
          title="FILTER BY STONE TYPE"
          fetchFn={fetchStoneTypes}
          selectedValues={getFilterArray(selectedFilters, "stone_type")}
          onToggle={handleToggle}
        />

        <FilterSection
          groupId="category"
          title="FILTER BY STONE CATEGORY"
          fetchFn={fetchStoneCategories}
          selectedValues={getFilterArray(selectedFilters, "category")}
          onToggle={handleToggle}
        />

        <FilterSection
          groupId="color"
          title="FILTER BY COLOR"
          fetchFn={fetchColors}
          selectedValues={getFilterArray(selectedFilters, "color")}
          onToggle={handleToggle}
        />

        <FilterSection
          groupId="location"
          title="FILTER BY LOCATION"
          fetchFn={fetchFactoryLocations}
          mapItem={mapFactoryLocation}
          selectedValues={getFilterArray(selectedFilters, "location")}
          onToggle={handleToggle}
        />

        <FilterSection
          groupId="country"
          title="FILTER BY COUNTRY"
          fetchFn={fetchCountries}
          mapItem={mapCountry}
          selectedValues={getFilterArray(selectedFilters, "country")}
          onToggle={handleToggle}
        />

        <FilterSection
          groupId="application"
          title="FILTER BY APPLICATION"
          fetchFn={fetchApplications}
          selectedValues={getFilterArray(selectedFilters, "application")}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile drawer toggle button */}
      <div className="md:hidden my-4 px-4">
        <button
          onClick={toggleDrawer(true)}
          className="flex items-center gap-2 text-xs font-bold text-[#8C6D46] uppercase tracking-wider bg-white border border-[#E8E2D9] px-4 py-2.5 rounded shadow-sm hover:bg-[#FAF8F5] transition-colors"
        >
          <FilterListIcon className="text-[#8C6D46]" fontSize="small" />
          <span>FILTER RESULTS</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 p-6 bg-[#FAF8F5] min-h-screen border-r border-[#E8E2D9]">
        {filterContent}
      </aside>

      {/* Mobile Drawer using Material UI */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div className="relative w-[300px] p-[24px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase font-bold text-[#A8A096]">Close Filter</span>
            <IconButton onClick={toggleDrawer(false)} size="small">
              <CloseIcon className="text-[#3D352E]" fontSize="small" />
            </IconButton>
          </div>
          {filterContent}
        </div>
      </Drawer>
    </>
  );
}