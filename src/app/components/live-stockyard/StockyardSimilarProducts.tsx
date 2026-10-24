"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { fetchStones } from "../../Utils/api";
import type { MarbleSlab } from "./stockyard.types";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

interface StockyardSimilarProductsProps {
  stoneType: string;
  currentSlug: string;
}

export default function StockyardSimilarProducts({
  stoneType,
  currentSlug,
}: StockyardSimilarProductsProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [products, setProducts] = useState<MarbleSlab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stoneType) {
      setLoading(false);
      return;
    }

    async function loadSimilar() {
      try {
        const data = await fetchStones({
          filters: {
            stone_types: [stoneType],
            colors: [],
            locations: [],
            countries: [],
            applications: [],
          },
        });
        // Filter out current stone and limit to 8
        const filtered = data.results
          .filter((s) => s.slug !== currentSlug)
          .slice(0, 8);
        setProducts(filtered);
      } catch (error) {
        console.error("Failed to load similar products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSimilar();
  }, [stoneType, currentSlug]);

  if (loading) {
    return (
      <section className="w-full mt-16 lg:mt-24 mb-16">
        <div className="flex items-center pb-4 mb-8 border-b border-[#E5DFD7]">
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1C1815] font-normal">
            Similar Products
          </h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#8C6D46] border-t-transparent" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full mt-16 lg:mt-24 mb-16">
      {/* Header & Controls */}
      <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E5DFD7]">
        <h2 className="text-3xl lg:text-4xl font-serif text-[#1C1815] font-normal">
          Similar Products
        </h2>

        {/* Custom Navigation Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            aria-label="Previous Slide"
            className="w-9 h-9 border border-[#E5DFD7] rounded-none flex items-center justify-center text-[#38302A] hover:border-[#8C6D46] hover:text-[#8C6D46] transition-colors"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
          <button
            ref={nextRef}
            aria-label="Next Slide"
            className="w-9 h-9 border border-[#E5DFD7] rounded-none flex items-center justify-center text-[#38302A] hover:border-[#8C6D46] hover:text-[#8C6D46] transition-colors"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
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
          320: { slidesPerView: 1.2, spaceBetween: 16 },
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 24 },
          1280: { slidesPerView: 3.8, spaceBetween: 24 },
        }}
        className="similar-products-swiper !pb-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col group">
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2ECE4] mb-3">
                <Image
                  src={product.main_image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 31vw, (min-width: 640px) 45vw, 83vw"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif text-[#1C1815] font-normal tracking-tight mb-1">
                {product.name}
              </h3>

              {/* Subtitle */}
              <p className="text-lg text-[#8C847B] font-normal mb-4 min-h-[18px]">
                {product.short_description}
              </p>

              {/* View Button */}
              <Link
                href={`/live-stockyard/${product.slug}`}
                className="w-full py-2.5 px-3 border border-[#38302A] text-[#38302A] text-lg font-semibold tracking-wider uppercase hover:border-[#8C6D46] hover:bg-[#8C6D46] hover:text-white transition-colors duration-200 text-center"
              >
                VIEW
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}