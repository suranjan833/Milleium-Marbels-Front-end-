"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { fetchStoneApplications } from "../../Utils/api";
import type { Application, StoneApplicationItem } from "./stockyard.types";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

interface StockyardDetailApplicationsProps {
  stoneSlug?: string;
  stoneId?: number;
  fallbackApplications?: Application[];
}

export default function StockyardDetailApplications({
  stoneSlug,
  stoneId,
  fallbackApplications = [],
}: StockyardDetailApplicationsProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [apiApplications, setApiApplications] = useState<StoneApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadApplications() {
      try {
        setLoading(true);
        const data = await fetchStoneApplications(stoneSlug, stoneId);
        if (isMounted) {
          setApiApplications(data);
        }
      } catch (err) {
        console.error("Failed to load stone applications:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadApplications();

    return () => {
      isMounted = false;
    };
  }, [stoneSlug, stoneId]);

  const hasApiItems = apiApplications.length > 0;
  const hasFallbackItems = fallbackApplications.length > 0;

  if (loading) {
    return (
      <section className="w-full mt-16 lg:mt-24">
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E5DFD7]">
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1C1815] font-normal">
            Applications
          </h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#8C6D46] border-t-transparent" />
        </div>
      </section>
    );
  }

  if (!hasApiItems && !hasFallbackItems) {
    return null;
  }

  const isVideo = (mediaType?: string, contentType?: string, url?: string) => {
    if (mediaType === "VIDEO") return true;
    if (contentType?.startsWith("video/")) return true;
    if (url?.endsWith(".mp4") || url?.endsWith(".webm") || url?.endsWith(".mov")) return true;
    return false;
  };

  return (
    <section className="w-full mt-16 lg:mt-24">
      {/* Header Row & Swiper Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 mb-8 border-b border-[#E5DFD7]">
        <div>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1C1815] font-normal">
            Applications
          </h2>
          <span className="text-xs sm:text-md font-bold text-[#8C847B] tracking-wider uppercase block mt-1">
            CRAFTED FOR ARCHITECTURAL PERMANENCE
          </span>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            aria-label="Previous Application Slide"
            className="w-9 h-9 border border-[#E5DFD7] rounded-none flex items-center justify-center text-[#38302A] hover:border-[#8C6D46] hover:text-[#8C6D46] transition-colors"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
          <button
            ref={nextRef}
            aria-label="Next Application Slide"
            className="w-9 h-9 border border-[#E5DFD7] rounded-none flex items-center justify-center text-[#38302A] hover:border-[#8C6D46] hover:text-[#8C6D46] transition-colors"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Applications Swiper Slider */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className="w-full !pb-4"
      >
        {hasApiItems
          ? apiApplications.map((item) => {
              const primaryMedia = item.media && item.media.length > 0 ? item.media[0] : null;
              const hasVideo = primaryMedia && isVideo(primaryMedia.media_type, undefined, primaryMedia.url);

              return (
                <SwiperSlide key={item.id}>
                  <div className="flex flex-col group">
                    {/* Media Container */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2ECE4] mb-3">
                      {primaryMedia ? (
                        hasVideo ? (
                          <video
                            src={primaryMedia.url}
                            controls
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={primaryMedia.url}
                            alt={item.application.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          />
                        )
                      ) : (
                        <div className="w-full h-full bg-[#E8E2D9] flex items-center justify-center">
                          <span className="text-[#8C847B] text-sm font-bold tracking-wider uppercase">
                            {item.application.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Application Label */}
                    <h3 className="text-md font-bold text-[#38302A] tracking-wider uppercase text-center mt-1">
                      {item.application.name}
                    </h3>
                  </div>
                </SwiperSlide>
              );
            })
          : fallbackApplications.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col group">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2ECE4] mb-3">
                    {item.main_image ? (
                      <Image
                        src={item.main_image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E8E2D9] flex items-center justify-center">
                        <span className="text-[#8C847B] text-sm font-bold tracking-wider uppercase">
                          {item.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Application Label */}
                  <h3 className="text-md font-bold text-[#38302A] tracking-wider uppercase text-center mt-1">
                    {item.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
}
