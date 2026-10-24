"use client";

import React from "react";
import Link from "next/link";
import { EventPost } from "../../event/event.types";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";

interface EventCardProps {
  post: EventPost;
}

function EventCard({ post }: EventCardProps) {
  const isMultiDay = post.start_date !== post.end_date;
  const isPast = new Date(post.end_date) < new Date();

  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#b08a4f]/30">
      {/* Image with Overlay */}
      <Link href={`/event/${post.slug}`} className="block overflow-hidden relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={post.hero_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            fill
            sizes="(min-width: 640px) 35vw, 100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category & Featured Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#0f2d4a] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
              {post.category_name}
            </span>
            {post.is_featured && (
              <span className="bg-[#b08a4f] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                Featured
              </span>
            )}
          </div>

          {/* Past Event Badge */}
          {isPast && (
            <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
              Past Event
            </div>
          )}

          {/* Date Badge on Bottom */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[11px] font-medium">
            <CalendarTodayIcon sx={{ fontSize: 13 }} className="text-[#b08a4f]" />
            <span>{post.start_date_formatted.split(",")[0]}</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Location — Prominent Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-[#b08a4f]/10 text-[#b08a4f] text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <LocationOnIcon sx={{ fontSize: 16 }} />
            {post.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] font-normal text-[#111111] leading-snug mb-4 line-clamp-2 transition-colors group-hover:text-[#b08a4f]">
          <Link href={`/event/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Date — Prominent Block */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center gap-3 bg-[#0f2d4a] text-white rounded-xl px-4 py-3">
            <CalendarTodayIcon sx={{ fontSize: 20 }} className="text-[#b08a4f] shrink-0" />
            <div className="flex flex-col">
              <span className="text-md  font-bold leading-tight">
                {isMultiDay
                  ? `${post.start_date_formatted}`
                  : post.start_date_formatted}
              </span>
              {isMultiDay && (
                <span className="text-md  font-bold leading-tight">
                  - {post.end_date_formatted}
                </span>
              )}
            </div>
          </div>
          {post.venue && (
            <p className="text-xs text-gray-500 font-medium pl-1">
              📍 {post.venue}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
          <span className="text-[11px] text-[#999] font-medium uppercase tracking-wider">
            {post.organizer}
          </span>
          <Link
            href={`/event/${post.slug}`}
            className="text-[11px] text-[#0f2d4a] font-semibold uppercase tracking-wider hover:text-[#b08a4f] transition-colors flex items-center gap-1.5"
          >
            View Details
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default React.memo(EventCard);
