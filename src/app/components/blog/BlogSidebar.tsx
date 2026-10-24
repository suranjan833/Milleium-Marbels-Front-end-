"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { SidebarData } from "../../blog/blog.types";

interface BlogSidebarProps {
  sidebar?: SidebarData | null;
  loading?: boolean;
  onSearch?: (query: string) => void;
}

export default function BlogSidebar({
  sidebar,
  loading = false,
  onSearch,
}: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const isLoading = loading || !sidebar;

  return (
    <aside className="w-full space-y-6 sm:space-y-8">
      {/* Search Widget 1 */}
      <div className="bg-white p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm">
        <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Search
        </label>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 text-sm text-black bg-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
            placeholder="Search articles..."
          />
          <button
            type="submit"
            className="bg-[#2d3238] hover:bg-black text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#111111] mb-5 tracking-wide">
          Recent Posts
        </h3>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-3">
                <Skeleton
                  variant="text"
                  width={`${90 - idx * 8}%`}
                  height={22}
                  sx={{ backgroundColor: "#EAEAEA" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {sidebar.recent_posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-700 hover:text-[#0f2d4a] text-sm leading-snug block border-b border-gray-100 pb-3 transition-colors"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Comments */}
      <div className="bg-white p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#111111] mb-4">
          Recent Comments
        </h3>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-2">
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ backgroundColor: "#EAEAEA" }}
                />
              </div>
            ))}
          </div>
        ) : sidebar.recent_comments.length > 0 ? (
          <ul className="space-y-3">
            {sidebar.recent_comments.map((comment: any, index: number) => (
              <li key={index} className="text-gray-700 text-sm border-b border-gray-100 pb-2">
                {comment.text || comment.content || ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm italic">No comments to show.</p>
        )}
      </div>

      {/* Recent Posts Thumbnail */}
      <div className="bg-white p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm">
        <h4 className="font-serif text-base text-[#2b5480] uppercase tracking-widest mb-5">
          RECENT POSTS
        </h4>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-3 items-center border-b border-gray-100 pb-3">
                <Skeleton
                  variant="rectangular"
                  width={56}
                  height={56}
                  className="shrink-0"
                  sx={{ backgroundColor: "#EAEAEA" }}
                />
                <div className="flex-1 space-y-1">
                  <Skeleton
                    variant="text"
                    width="90%"
                    height={16}
                    sx={{ backgroundColor: "#EAEAEA" }}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={16}
                    sx={{ backgroundColor: "#EAEAEA" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sidebar.recent_posts.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-3 items-center border-b border-gray-100 pb-3"
              >
                <div className="relative w-14 h-14 shrink-0 overflow-hidden border border-gray-200">
                  <Image
                    src={post.hero_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    fill
                    sizes="56px"
                  />
                </div>
                <span className="text-lg text-gray-800 font-serif leading-tight line-clamp-2">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}