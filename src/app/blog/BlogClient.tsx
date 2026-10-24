"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import BlogCard from "../components/blog/BlogCard";
import BlogCardSkeleton from "../components/blog/BlogCardSkeleton";
import BlogSidebar from "../components/blog/BlogSidebar";
import { fetchBlogArticles } from "../Utils/api";
import type { BlogApiResponse, BlogPost } from "./blog.types";

export default function BlogClient() {
  const [data, setData] = useState<BlogApiResponse | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const loadArticles = useCallback(
    async (search?: string) => {
      const requestId = ++requestIdRef.current;
      setLoading(true);
      setError(null);

      try {
        const apiData = await fetchBlogArticles(undefined, search || undefined);
        if (requestId !== requestIdRef.current) return;
        setData(apiData);
        setPosts(apiData.results);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(
          err instanceof Error ? err.message : "Failed to load blog articles"
        );
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      loadArticles();
      return;
    }

    loadArticles(query);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px]">
      {/* 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column - Blog Posts */}
        <div className="w-full lg:w-[70%]">
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between bg-gray-50 p-4 border border-gray-200">
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

          {/* Loading Skeleton State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-gray-500 text-sm">{error}</p>

              <button
                onClick={() => loadArticles()}
                className="px-6 py-2 border border-[#0f2d4a] text-[#0f2d4a] text-xs font-semibold tracking-wider uppercase hover:bg-[#0f2d4a] hover:text-white transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Blog Posts */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-gray-200">
              <p className="font-serif text-xl text-gray-600 mb-2">
                No blog posts found.
              </p>

              <p className="text-xs text-gray-400">
                Try searching with a different keyword.
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full lg:w-[30%]">
          <BlogSidebar
            sidebar={data?.sidebar}
            loading={loading}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
