"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filters from "../components/live-stockyard/Filters";
import StockyardGrid from "../components/live-stockyard/StockyardGrid";
import type { SelectedFilters } from "../components/live-stockyard/stockyard.types";
import {
  buildLiveStockyardQuery,
  filtersFromQueryParams,
} from "../components/live-stockyard/stockyard.query";
import banner from "../../../public/assets/live-stock/livestock_changes.webp";

export default function LiveStockyardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The URL is the single source of truth for search + filters. Deriving
  // state directly from the URL (instead of mirroring it in useState/effects)
  // avoids feedback loops where the two get out of sync and ping-pong.
  const search = searchParams.get("search") ?? "";
  const selectedFilters = useMemo(
    () => filtersFromQueryParams(searchParams),
    [searchParams]
  );

  // Only write to the URL from explicit user actions (typing / toggling).
  const syncUrl = (nextSearch: string, nextFilters: SelectedFilters) => {
    const query = buildLiveStockyardQuery(nextSearch, nextFilters);
    if (query === searchParams.toString()) return;
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <main className="bg-[#FAF8F5]">
      {/* Banner Section */}
      <section className="min-h-[400px] xl:min-h-[70vh] relative flex items-center justify-center">
        <div className="imagebackground">
          <div
            className="relative h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${banner.src})` }}
          ></div>
        </div>
        <div className="relative z-3 text-center px-4">
          <h4 className="text-[38px] lg:text-5xl font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 mb-2">
             Stock 
          </h4>
        </div>
      </section>

      {/* Main Stockyard Layout */}
      <div className="flex flex-col md:flex-row min-h-screen container mx-auto px-4 py-8">
        {/* Filters component (client side) */}
        <Filters
          selectedFilters={selectedFilters}
          onFilterChange={(filters) => syncUrl(search, filters)}
        />

        {/* Stockyard Cards & Search Grid */}
        <StockyardGrid
          filters={selectedFilters}
          search={search}
          onSearchChange={(value) => syncUrl(value, selectedFilters)}
        />
      </div>
    </main>
  );
}
