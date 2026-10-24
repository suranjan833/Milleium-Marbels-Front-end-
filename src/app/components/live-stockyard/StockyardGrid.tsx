"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { OutlinedInput, InputAdornment, Menu, MenuItem, Skeleton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import MarbleCard from "./MarbleCard";
import { fetchStones, fetchStonesByUrl } from "../../Utils/api";
import type { MarbleSlab, SelectedFilters } from "./stockyard.types";

const SORT_OPTIONS: Record<string, string> = {
  NEWEST: "newest",
  OLDEST: "oldest",
  "NAME A-Z": "name_asc",
  "NAME Z-A": "name_desc",
};

interface StockyardGridProps {
  filters: SelectedFilters;
  search?: string;
  onSearchChange?: (value: string) => void;
}

function MarbleCardSkeleton() {
  return (
    <div className="flex flex-col bg-transparent overflow-hidden">
      {/* Slab Image Skeleton */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ backgroundColor: "#EFEBE4", borderRadius: "0.5rem" }}
        />
      </div>

      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-1">
        <Skeleton
          variant="text"
          width="60%"
          height={32}
          sx={{ backgroundColor: "#EFEBE4" }}
        />
      </div>

      {/* Location Skeleton */}
      <div className="flex items-center gap-1.5 mb-3">
        <Skeleton
          variant="circular"
          width={20}
          height={20}
          sx={{ backgroundColor: "#EFEBE4" }}
        />
        <Skeleton
          variant="text"
          width="40%"
          height={20}
          sx={{ backgroundColor: "#EFEBE4" }}
        />
      </div>

      {/* Description Skeleton (2 lines matching min-h-[34px] mb-4) */}
      <div className="flex flex-col gap-1 mb-4 min-h-[34px]">
        <Skeleton
          variant="text"
          width="100%"
          height={14}
          sx={{ backgroundColor: "#EFEBE4" }}
        />
        <Skeleton
          variant="text"
          width="80%"
          height={14}
          sx={{ backgroundColor: "#EFEBE4" }}
        />
      </div>

      {/* Tags and Item Code Skeleton */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Skeleton
            variant="rectangular"
            width={64}
            height={22}
            sx={{ backgroundColor: "#EFEBE4", borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            width={54}
            height={22}
            sx={{ backgroundColor: "#EFEBE4", borderRadius: "4px" }}
          />
        </div>
        <Skeleton
          variant="text"
          width={55}
          height={16}
          sx={{ backgroundColor: "#EFEBE4" }}
        />
      </div>

      {/* Buttons Skeleton */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton
          variant="rectangular"
          height={38}
          className="w-full"
          sx={{ backgroundColor: "#EFEBE4" }}
        />
        {/* <Skeleton
          variant="rectangular"
          height={38}
          className="w-full"
          sx={{ backgroundColor: "#EFEBE4" }}
        /> */}
      </div>
    </div>
  );
}

export default function StockyardGrid({
  filters,
  search = "",
  onSearchChange,
}: StockyardGridProps) {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState("NEWEST");

  const [slabs, setSlabs] = useState<MarbleSlab[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSortOpen = Boolean(sortAnchorEl);
  const hasMore = nextUrl !== null;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestIdRef = useRef(0);
  const filterKey = useMemo(
    () => JSON.stringify({ search: debouncedSearch, sort: selectedSort, ...filters }),
    [debouncedSearch, selectedSort, filters]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = search.trim();
      if (trimmed.length === 0) setDebouncedSearch("");
      else if (trimmed.length >= 4) setDebouncedSearch(trimmed);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => setSortAnchorEl(event.currentTarget);
  const handleSortClose = (sortOption?: string) => {
    if (sortOption) setSelectedSort(sortOption);
    setSortAnchorEl(null);
  };

  const loadInitial = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true); setError(null);
    try {
      const ordering = SORT_OPTIONS[selectedSort] || "newest";
      const data = await fetchStones({ page: 1, search: debouncedSearch || undefined, ordering, filters });
      if (requestId !== requestIdRef.current) return;
      setSlabs(data.results);
      setTotalCount(data.count);
      setNextUrl(data.next);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load stones");
      setSlabs([]);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  useEffect(() => { loadInitial(); }, [loadInitial]);

  const loadMore = useCallback(async () => {
    if (!nextUrl || loadingMore) return;
    const requestId = requestIdRef.current;
    setLoadingMore(true);
    try {
      const data = await fetchStonesByUrl(nextUrl);
      if (requestId !== requestIdRef.current) return;
      setSlabs((prev) => [...prev, ...data.results]);
      setTotalCount(data.count);
      setNextUrl(data.next);
    } catch (err) { console.error("Failed to load more:", err); }
    finally {
      if (requestId === requestIdRef.current) setLoadingMore(false);
    }
  }, [nextUrl, loadingMore]);

  useEffect(() => {
    if (!hasMore || loading) return;
    const el = sentinelRef.current; if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && hasMore && !loadingMore) loadMore(); },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore, loading]);

  return (
    <div className="flex-1 p-4 md:p-8">
      {/* Top Bar: Search Input, Slab Count, Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E2D9]">
        {/* MUI Search Input */}
        <div className="w-full sm:w-auto">
          <OutlinedInput
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="search marble"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#8C847B", fontSize: 20 }} />
              </InputAdornment>
            }
            sx={{
              backgroundColor: "#F4F0EA",
              borderRadius: "50px",
              height: "42px",
              fontSize: "14px",
              fontFamily: "inherit",
              width: { xs: "100%", sm: "320px" },
              "& fieldset": { border: "1px solid #E5DFD7" },
              "&:hover fieldset": { borderColor: "#D4C9BD" },
              "&.Mui-focused fieldset": { borderColor: "#8C6D46" },
            }}
          />
          {/* {search.trim().length > 0 && search.trim().length < 4 && (
            <p className="text-[11px] text-[#A8A096] mt-1 pl-3">
              Type at least 4 characters to search...
            </p>
          )} */}
        </div>

        {/* Info & Sort */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <span className="text-[#8C847B] font-normal">
            Showing {totalCount} Slabs
          </span>
          <span className="text-[#E8E2D9]">|</span>
          <button
            onClick={handleSortClick}
            className="flex items-center gap-1.5 font-bold uppercase text-[12px] tracking-wider text-[#38302A] hover:text-[#8C6D46] transition-colors"
          >
            <span>SORT BY: {selectedSort}</span>
            <SortIcon fontSize="small" />
          </button>
          <Menu
            anchorEl={sortAnchorEl}
            open={isSortOpen}
            onClose={() => handleSortClose()}
            disableScrollLock
            slotProps={{
              backdrop: { invisible: true, sx: { backgroundColor: "transparent" } },
              paper: {
                sx: {
                  mt: 1,
                  backgroundColor: "#FAF8F5",
                  borderRadius: "8px",
                  border: "1px solid #E8E2D9",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  minWidth: 160,
                },
              },
              list: { sx: { py: 0.5 } },
            }}
          >
            <MenuItem onClick={() => handleSortClose("NEWEST")}>NEWEST</MenuItem>
            <MenuItem onClick={() => handleSortClose("OLDEST")}>OLDEST</MenuItem>
            <MenuItem onClick={() => handleSortClose("NAME A-Z")}>
              NAME A-Z
            </MenuItem>
            <MenuItem onClick={() => handleSortClose("NAME Z-A")}>
              NAME Z-A
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {Array.from({ length: 4 }).map((_, idx) => (
            <MarbleCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[#8C847B] text-sm">{error}</p>
          <button
            // onClick={loadStones}
            className="px-6 py-2 border border-[#8C6D46] text-[#8C6D46] text-xs font-semibold tracking-wider uppercase hover:bg-[#8C6D46] hover:text-white transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && slabs.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <p className="text-[#8C847B] text-sm">No stones found matching your criteria.</p>
        </div>
      )}

      {/* Marble Cards Grid */}
      {!loading && slabs.length > 0 && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
            {slabs.map((slab) => (
              <MarbleCard key={slab.id} slab={slab} />
            ))}
          </div>

          {/* Sentinel for infinite scroll */}
          {hasMore && (
            <div ref={sentinelRef} className="flex justify-center py-8">
              {loadingMore && <CircularProgress size={28} sx={{ color: "#8C6D46" }} />}
            </div>
          )}

          {/* All loaded */}
          {!hasMore && (
            <div className="text-center py-8 border-t border-[#E8E2D9]/60">
              <p className="text-xs text-[#8C847B]">All {totalCount} slabs loaded</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}