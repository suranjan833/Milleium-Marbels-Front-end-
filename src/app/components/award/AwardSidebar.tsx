"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { AwardSidebarData } from "../../award/award.types";
import Image from "next/image";

interface AwardSidebarProps {
  sidebar?: AwardSidebarData | null;
  loading?: boolean;
  onSearch?: (query: string) => void;
}

const tierColors: Record<string, string> = {
  platinum: "bg-slate-300 text-slate-800",
  gold: "bg-[#b08a4f] text-white",
  silver: "bg-[#8a8a8a] text-white",
  bronze: "bg-[#CD7F32] text-white",
};

export default function AwardSidebar({
  sidebar,
  loading = false,
  onSearch,
}: AwardSidebarProps) {
  const [q, setQ] = useState("");
  const hs = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(q);
  };
  const il = loading || !sidebar;

  return (
    <aside className="w-full space-y-6 sm:space-y-8">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
        <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Search Awards
        </label>
        <form onSubmit={hs} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b08a4f]/20 focus:border-[#b08a4f] transition-all"
            placeholder="Search awards..."
          />
          <button
            type="submit"
            className="bg-[#2d3238] hover:bg-black text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#111111] mb-5 tracking-wide flex items-center gap-2">
          <EmojiEventsIcon sx={{ fontSize: 20 }} className="text-[#b08a4f]" />
          Award Tiers
        </h3>
        {il ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={`${90 - i * 10}%`}
                height={22}
                sx={{ backgroundColor: "#EAEAEA" }}
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-1.5">
            {sidebar.tiers.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/award?tier=${t.slug}`}
                  className="flex items-center justify-between text-sm py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${t.slug === "platinum" ? "bg-slate-300" : t.slug === "gold" ? "bg-[#b08a4f]" : t.slug === "silver" ? "bg-[#8a8a8a]" : "bg-[#CD7F32]"}`}
                    />
                    <span className="text-gray-700 font-medium">{t.name}</span>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {t.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#111111] mb-5 tracking-wide">
          Recent Awards
        </h3>
        {il ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-3 items-center border-b border-gray-100 pb-3 last:border-0"
              >
                <Skeleton
                  variant="rectangular"
                  width={48}
                  height={48}
                  className="shrink-0 rounded-lg"
                  sx={{ backgroundColor: "#EAEAEA" }}
                />
                <div className="flex-1 space-y-1.5">
                  <Skeleton
                    variant="text"
                    width="85%"
                    height={14}
                    sx={{ backgroundColor: "#EAEAEA" }}
                  />
                  <Skeleton
                    variant="text"
                    width="50%"
                    height={12}
                    sx={{ backgroundColor: "#EAEAEA" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sidebar.recent_awards.slice(0, 4).map((a) => (
              <Link
                key={a.id}
                href={`/award/${a.slug}`}
                className="flex gap-3 items-center border-b border-gray-100 pb-3 last:border-0 group cursor-pointer"
              >
                <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={a.hero_image}
                    alt={a.title}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs text-gray-800 font-medium leading-snug line-clamp-2 group-hover:text-[#b08a4f] transition-colors">
                    {a.title}
                  </h4>
                  <span
                    className={`inline-block mt-1 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${tierColors[a.tier] || tierColors.gold}`}
                  >
                    {a.tier}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#111111] mb-5 tracking-wide">
          Categories
        </h3>
        {il ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={`${85 - i * 8}%`}
                height={20}
                sx={{ backgroundColor: "#EAEAEA" }}
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            {sidebar.categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/award?category=${c.slug}`}
                  className="flex items-center justify-between text-gray-600 hover:text-[#b08a4f] text-sm py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span>{c.name}</span>
                  <svg
                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
