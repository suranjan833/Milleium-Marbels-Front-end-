"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import EventCard from "../components/event/EventCard";
import EventCardSkeleton from "../components/event/EventCardSkeleton";
import EventSidebar from "../components/event/EventSidebar";
import { fetchEvents, type EventCategorySlug } from "../Utils/api";
import {
  EVENT_CATEGORIES,
  type EventPost,
  type SidebarData,
  type SidebarRecentEvent,
} from "./event.types";
import { mapEventToPost, mapEventToRecent } from "./event.utils";

export default function EventClient() {
  const [posts, setPosts] = useState<EventPost[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<SidebarRecentEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<EventCategorySlug | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const loadEvents = useCallback(
    async (search?: string, cat?: EventCategorySlug | null) => {
      const requestId = ++requestIdRef.current;
      setLoading(true);
      setError(null);
      try {
        const apiData = await fetchEvents({
          search: search?.trim() ? search : undefined,
          category: cat ?? undefined,
        });
        if (requestId !== requestIdRef.current) return;
        setPosts(apiData.results.map(mapEventToPost));
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(
          err instanceof Error ? err.message : "Failed to load events"
        );
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadEvents();
    // Load upcoming events for the sidebar (independent of search/category filters)
    fetchEvents({ is_past: false })
      .then((res) => setUpcomingEvents(res.results.map(mapEventToRecent)))
      .catch(() => {
        /* sidebar is non-critical; ignore errors */
      });
  }, [loadEvents]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadEvents(query || undefined, category);
  };

  const handleCategorySelect = (slug: string) => {
    const nextCategory: EventCategorySlug | null =
      category === slug ? null : (slug as EventCategorySlug);
    setCategory(nextCategory);
    loadEvents(searchQuery || undefined, nextCategory);
  };

  const sidebar: SidebarData = {
    upcoming_events: upcomingEvents,
    categories: EVENT_CATEGORIES,
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px] py-10">
      {/* 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column - Event Posts */}
        <div className="w-full lg:w-[70%]">
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-600 font-medium">
                Showing results for{" "}
                <span className="font-semibold text-black">
                  "{searchQuery}"
                </span>
              </span>
              <button
                onClick={() => handleSearch("")}
                className="text-xs text-[#b08a4f] underline hover:text-black transition-colors"
              >
                Clear search
              </button>
            </div>
          )}

          {category && (
            <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-600 font-medium">
                Category:{" "}
                <span className="font-semibold text-black">
                  {EVENT_CATEGORIES.find((c) => c.slug === category)?.name ??
                    category}
                </span>
              </span>
              <button
                onClick={() => handleCategorySelect(category)}
                className="text-xs text-[#b08a4f] underline hover:text-black transition-colors"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Loading Skeleton State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-gray-500 text-sm">{error}</p>
              <button
                onClick={() => loadEvents()}
                className="px-6 py-2 border border-[#0f2d4a] text-[#0f2d4a] text-xs font-semibold tracking-wider uppercase hover:bg-[#0f2d4a] hover:text-white transition-colors rounded-lg"
              >
                Retry
              </button>
            </div>
          )}

          {/* Event Posts */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <EventCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
              <p className="font-serif text-xl text-gray-600 mb-2">
                No events found.
              </p>
              <p className="text-xs text-gray-400">
                Try searching with a different keyword.
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full lg:w-[30%]">
          <EventSidebar
            sidebar={sidebar}
            loading={loading}
            onSearch={handleSearch}
            selectedCategory={category}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>
    </div>
  );
}
