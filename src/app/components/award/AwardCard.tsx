"use client";

import React from "react";
import { AwardPost } from "../../award/award.types";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Image from "next/image";

interface AwardCardProps {
  post: AwardPost;
}

function AwardCard({ post }: AwardCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={post.hero_image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Year Badge */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm flex items-center gap-1">
          <span className="text-lg font-bold text-[#0f2d4a] leading-none">{post.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1.5">
          {post.category_name}
        </span>

        {/* Title */}
        <h3 className="font-serif text-sm font-normal text-[#111111] leading-snug mb-2 line-clamp-2 group-hover:text-[#b08a4f] transition-colors flex-1">
          {post.title}
        </h3>

        {/* Organization */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#b08a4f] font-medium mb-3">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="truncate text-[11px]">{post.awarding_organization}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="w-7 h-7 rounded-full bg-[#b08a4f] flex items-center justify-center">
            <EmojiEventsIcon sx={{ fontSize: 14 }} className="text-white" />
          </div>
          <span className="text-[10px] text-gray-400 font-medium">{post.award_date_formatted}</span>
        </div>
      </div>
    </article>
  );
}

export default React.memo(AwardCard);


