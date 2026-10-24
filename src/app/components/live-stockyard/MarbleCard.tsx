import { memo } from "react";
import Link from "next/link";
import type { MarbleSlab } from "./stockyard.types";
import Image from "next/image";

function getLocation(origin: { country: string; city: string }): string {
  return `${origin.city}, ${origin.country}`;
}

function getApplicationTags(applications: { id: number; name: string; slug: string }[]): string[] {
  return applications.map((a) => a.name);
}

interface MarbleCardProps {
  slab: MarbleSlab;
}

function MarbleCard({ slab }: MarbleCardProps) {
  return (
    <div className="flex flex-col bg-transparent overflow-hidden">
      {/* Slab Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-4 bg-[#F2ECE4] group">
        <Image
          src={slab.main_image}
          alt={slab.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
        />
      </div>

      {/* Title with Country Flag */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-2xl font-serif text-[#1C1815] font-normal tracking-tight">
          {slab.name}
        </h3>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-[#6B635B] text-[14px] mb-3">
        <span className="text-xl leading-none" role="img" aria-label="country flag">
          <Image
            src={slab?.origin?.country_icon}
            alt={slab.origin.country}
            width={20}
            height={20}
            className="rounded-full"
          />
        </span>
        <span>{getLocation(slab.origin)}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-[#6B635B] leading-relaxed mb-4 line-clamp-2 min-h-[34px]">
        {slab.short_description}
      </p>

      {/* Tags and Item Code */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {getApplicationTags(slab.applications).map((tag) => (
            <span
              key={tag}
              className="bg-[#F2ECE4] text-[#6E645A] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-[#A8A096] font-normal">
          {slab.lot_number}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`live-stockyard/${slab?.slug}`} className="w-full py-2.5 text-center px-3 border border-[#8C6D46] text-[#8C6D46] text-lg font-semibold tracking-wider uppercase hover:bg-[#8C6D46] hover:text-white transition-colors duration-200">
          DETAILED VIEW
        </Link>
        {/* <button className="w-full py-2.5 px-3 border border-[#E5E0D8] text-[#6B635B] text-xs font-semibold tracking-wider uppercase hover:border-[#8C6D46] hover:text-[#8C6D46] transition-colors duration-200">
          COMPARE
        </button> */}
      </div>
    </div>
  );
}

export default memo(MarbleCard);
