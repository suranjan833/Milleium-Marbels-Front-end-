"use client";

import React, { useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CloseIcon from "@mui/icons-material/Close";

export interface AwardFilters {
  category: string;
  tier: string;
  year: string;
  search: string;
}

interface AwardFilterBarProps {
  categories: { id: number; name: string; slug: string }[];
  tiers: { name: string; slug: string; count: number }[];
  years: number[];
  filters: AwardFilters;
  onFilterChange: (filters: AwardFilters) => void;
}

const tierColors: Record<string, string> = {
  platinum: "bg-slate-300 text-slate-800",
  gold: "bg-[#b08a4f] text-white",
  silver: "bg-[#8a8a8a] text-white",
  bronze: "bg-[#CD7F32] text-white",
};

export default function AwardFilterBar({ categories, tiers, years, filters, onFilterChange }: AwardFilterBarProps) {
  const [sv, setSv] = useState(filters.search);
  const set = (k: keyof AwardFilters, v: string) => { onFilterChange({ ...filters, [k]: v }); if (k === "search") setSv(v); };
  const clearAll = () => { const c: AwardFilters = { category: "", tier: "", year: "", search: "" }; setSv(""); onFilterChange(c); };
  const hasAny = filters.category || filters.tier || filters.year || filters.search;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-light text-[#111111] flex items-center gap-2"><EmojiEventsIcon sx={{ fontSize: 22 }} className="text-[#b08a4f]" />Filters</h3>
        {hasAny && <button onClick={clearAll} className="text-[11px] text-[#b08a4f] font-semibold uppercase tracking-wider hover:text-red-500 transition-colors flex items-center gap-1"><CloseIcon sx={{ fontSize: 14 }} />Clear All</button>}
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1.5">Search</label>
          <input type="text" value={sv} onChange={(e) => setSv(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") set("search", sv); }} onBlur={() => set("search", sv)} placeholder="Search awards..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b08a4f]/20 focus:border-[#b08a4f] transition-all" />
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1.5">Category</label>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => set("category", "")} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${!filters.category ? "bg-[#0f2d4a] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>All</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => set("category", filters.category === c.slug ? "" : c.slug)} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${filters.category === c.slug ? "bg-[#0f2d4a] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{c.name}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1.5">Tier</label>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => set("tier", "")} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${!filters.tier ? "bg-[#0f2d4a] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>All</button>
            {tiers.filter(t => t.count > 0).map((t) => (
              <button key={t.slug} onClick={() => set("tier", filters.tier === t.slug ? "" : t.slug)} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${filters.tier === t.slug ? `${tierColors[t.slug] || tierColors.gold}` : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}><span className="w-1.5 h-1.5 rounded-full" />{t.name}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
