"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "../../blog/blog.types";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={post.hero_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 640px) 35vw, 100vw"
          />
          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-[#0f2d4a] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
            {post.category_name}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Date */}
        <span className="text-[11px] text-[#b08a4f] font-medium uppercase tracking-wider mb-2">
          {post.published_date_formatted}
        </span>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] font-normal text-[#111111] leading-snug mb-2 line-clamp-2 transition-colors group-hover:text-[#b08a4f]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-[13px] sm:text-sm text-[#666] leading-relaxed font-light mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="text-[11px] text-[#999] font-medium uppercase tracking-wider">
            By {post.author_name}
          </span>

          <Link
            href={`/blog/${post.slug}`}
            className="text-[11px] text-[#0f2d4a] font-semibold uppercase tracking-wider hover:text-[#b08a4f] transition-colors flex items-center gap-1"
          >
            Read More
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default React.memo(BlogCard);