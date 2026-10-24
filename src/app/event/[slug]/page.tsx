import React from "react";
import Link from "next/link";
import RichText from "@/app/components/common/RichText";
import { fetchEventBySlug, fetchEvents } from "../../Utils/api";
import { mapEventDetailToPost, mapEventToRecent } from "../event.utils";
import type { SidebarRecentEvent } from "../event.types";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const detail = await fetchEventBySlug(slug);
    const post = mapEventDetailToPost(detail);

    let nextEvents: SidebarRecentEvent[] = [];

    try {
      const upcoming = await fetchEvents({ is_past: false });
      nextEvents = upcoming.results
        .filter((e) => e.slug !== slug)
        .map(mapEventToRecent);
    } catch {
      /* ignore non-critical upcoming events error */
    }

    const isMultiDay = post.start_date !== post.end_date;
    const isPast = new Date(post.end_date) < new Date();

    return (
      <main className="bg-white min-h-screen">
        <div className="bg-[#101010] text-white h-40"></div>
        <div className="bg-[#101010] text-white mb-10 ">
          <div className="container mx-auto px-4 max-w-[1240px] flex justify-between items-center py-2">
            <Link
              href="/event"
              className="text-white/60 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All Events
            </Link>
            <h4 className="text-[36px] font-serif tracking-wider font-light">
              Events
            </h4>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] pb-20">
          {/* Hero Image */}
          <div className="relative w-full aspect-[75/50] sm:aspect-[75/50] bg-gray-100 mb-10 overflow-hidden rounded-xl shadow-md">
            <Image
              src={post.hero_image}
              alt={post.title}
              className="w-full h-full object-cover"
              fill
              sizes="(min-width: 1000px) 1000px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-[#0f2d4a] text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm backdrop-blur-sm">
                {post.category_name}
              </span>
              {isPast && (
                <span className="bg-gray-900/80 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm">
                  Past Event
                </span>
              )}
            </div>
          </div>

          <div className="max-w-[860px] mx-auto">
            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-4xl md:text-[42px] font-normal text-[#111111] uppercase tracking-wide leading-tight mb-6">
              {post.title}
            </h2>

            {/* Event Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#b08a4f]/10 flex items-center justify-center shrink-0">
                  <CalendarTodayIcon
                    sx={{ fontSize: 18 }}
                    className="text-[#b08a4f]"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    {isMultiDay ? "Date & Time" : "Date"}
                  </p>
                  <p className="text-sm text-[#333] font-medium leading-snug">
                    {isMultiDay
                      ? `${post.start_date_formatted} – ${post.end_date_formatted}`
                      : post.start_date_formatted}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#b08a4f]/10 flex items-center justify-center shrink-0">
                  <LocationOnIcon
                    sx={{ fontSize: 18 }}
                    className="text-[#b08a4f]"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Location
                  </p>
                  <p className="text-sm text-[#333] font-medium">
                    {post.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{post.venue}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#b08a4f]/10 flex items-center justify-center shrink-0">
                  <ApartmentIcon
                    sx={{ fontSize: 18 }}
                    className="text-[#b08a4f]"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Organizer
                  </p>
                  <p className="text-sm text-[#333] font-medium">
                    {post.organizer}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#b08a4f]/10 flex items-center justify-center shrink-0">
                  <AccessTimeIcon
                    sx={{ fontSize: 18 }}
                    className="text-[#b08a4f]"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Event Type
                  </p>
                  <p className="text-sm text-[#333] font-medium">
                    {post.category_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="text-[#444444] text-base sm:text-lg font-light leading-relaxed space-y-6 mb-8 bg-[#fafafa] border-l-4 border-[#b08a4f] rounded-r-lg p-5 italic">
              <p>{post.excerpt}</p>
            </div>

            <hr className="my-10 border-gray-200" />

            {/* Body Content */}
            <div className="prose max-w-none text-[#444444] leading-relaxed">
              {post.content ? (
                <RichText
                  content={post.content}
                  className="text-[#444444] text-base sm:text-lg font-light leading-relaxed"
                />
              ) : post.body && post.body.length > 0 ? (
                post.body.map((block, idx) => {
                  if (block.type === "heading") {
                    return (
                      <h3
                        key={idx}
                        className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mt-10 mb-4 tracking-wide"
                      >
                        {block.value}
                      </h3>
                    );
                  }
                  if (block.type === "paragraph") {
                    return (
                      <RichText
                        key={idx}
                        content={block.value}
                        className="text-[#444444] text-base sm:text-lg font-light leading-relaxed mb-6"
                      />
                    );
                  }
                  return null;
                })
              ) : (
                <p className="text-gray-500 italic">
                  No additional details available.
                </p>
              )}
            </div>

            {/* More Events */}
            {nextEvents.length > 0 && (
              <div className="mt-20 pt-10 border-t border-gray-200">
                <h4 className="text-base text-gray-700 font-sans font-semibold mb-8">
                  More Upcoming Events
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {nextEvents.slice(0, 2).map((item) => {
                    const eventDate = new Date(item.start_date);
                    const month = eventDate.toLocaleString("default", {
                      month: "short",
                    });
                    const day = eventDate.getDate();
                    return (
                      <Link
                        key={item.id}
                        href={`/event/${item.slug}`}
                        className="group block"
                      >
                        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden mb-3 rounded-xl border border-gray-200 shadow-sm">
                          <Image
                            src={item.hero_image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            fill
                            sizes="(min-width: 640px) 50vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <span className="inline-flex items-center gap-1 bg-[#b08a4f] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
                              {month} {day}
                            </span>
                          </div>
                        </div>
                        <h5 className="font-sans font-bold text-xs sm:text-sm text-[#111111] group-hover:text-[#b08a4f] transition-colors leading-snug">
                          {item.title}
                        </h5>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back to Events */}
            <div className="mt-16 text-center">
              <Link
                href="/event"
                className="inline-flex items-center gap-2 text-sm text-[#0f2d4a] hover:text-[#b08a4f] font-semibold transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to All Events
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (err) {
    return (
      <main className="bg-white min-h-screen">
        <div className="bg-[#101010] text-white h-40"></div>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="text-gray-500 text-sm">
            {err instanceof Error ? err.message : "Event not found"}
          </p>
          <Link
            href="/event"
            className="px-6 py-2 border border-[#0f2d4a] text-[#0f2d4a] text-xs font-semibold tracking-wider uppercase hover:bg-[#0f2d4a] hover:text-white transition-colors rounded-lg"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }
}
