"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SidebarData } from "../../event/event.types";

interface EventSidebarProps {
  sidebar?: SidebarData | null;
  loading?: boolean;
  onSearch?: (query: string) => void;
  selectedCategory?: string | null;
  onCategorySelect?: (slug: string) => void;
}

export default function EventSidebar({
  sidebar,
  loading = false,
  onSearch,
  selectedCategory = null,
  onCategorySelect,
}: EventSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const isLoading = loading || !sidebar;

  return (
    <aside className="w-full space-y-6 sm:space-y-8">
      {/* Search Widget */}
      <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
        <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Search Events
        </label>
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b08a4f]/20 focus:border-[#b08a4f] transition-all"
            placeholder="Search events..."
          />
          <button
            type="submit"
            className="bg-[#2d3238] hover:bg-black text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#111111] mb-5 tracking-wide flex items-center gap-2 pb-5">
          <CalendarTodayIcon sx={{ fontSize: 20 }} className="text-[#b08a4f]" />
          Upcoming Events
        </h3>
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-4 items-start border-b border-gray-100 pb-6 last:border-0">
                <Skeleton variant="rectangular" width={68} height={68} className="shrink-0 rounded-lg" sx={{ backgroundColor: "#EAEAEA" }} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="90%" height={18} sx={{ backgroundColor: "#EAEAEA" }} />
                  <Skeleton variant="text" width="70%" height={15} sx={{ backgroundColor: "#EAEAEA" }} />
                  <Skeleton variant="text" width="50%" height={15} sx={{ backgroundColor: "#EAEAEA" }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sidebar.upcoming_events.slice(0, 4).map((event) => {
              const eventDate = new Date(event.start_date);
              const month = eventDate.toLocaleString("default", { month: "short" });
              const day = eventDate.getDate();
              return (
                <Link key={event.id} href={`/event/${event.slug}`} className="flex gap-4 items-start border-b border-gray-100 pb-6 last:border-0 group cursor-pointer">
                  <div className="w-[68px] h-[68px] shrink-0 rounded-lg bg-[#0f2d4a] text-white flex flex-col items-center justify-center leading-tight">
                    <span className="text-[11px] uppercase font-semibold tracking-wider">{month}</span>
                    <span className="text-2xl font-bold">{day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base text-gray-800 font-medium leading-snug line-clamp-2 group-hover:text-[#b08a4f] transition-colors">{event.title}</h4>
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-400">
                      <LocationOnIcon sx={{ fontSize: 14 }} />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#111111] mb-5 tracking-wide">Categories</h3>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} variant="text" width={`${85 - idx * 8}%`} height={20} sx={{ backgroundColor: "#EAEAEA" }} />
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {sidebar.categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => onCategorySelect?.(cat.slug)}
                    className={`flex items-center justify-between w-full text-sm py-2 border-b border-gray-50 last:border-0 transition-colors group cursor-pointer ${
                      isActive
                        ? "text-[#b08a4f] font-semibold"
                        : "text-gray-600 hover:text-[#b08a4f]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* CTA Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0f2d4a] to-[#1a4a73] p-6 sm:p-8 text-white shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#b08a4f]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#b08a4f]/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <h4 className="font-serif text-xl font-light pb-3 leading-snug">Contact us</h4>
          {/* <p className="text-white/70 text-xs leading-relaxed mb-5">Partner with Millenium Marbles to host your next design event, workshop, or exhibition at our premium showrooms.</p> */}
          <Link href="/contact" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider bg-[#b08a4f] hover:bg-[#c99a5b] text-white px-5 py-2.5 rounded-lg transition-all">
            Get in Touch
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
