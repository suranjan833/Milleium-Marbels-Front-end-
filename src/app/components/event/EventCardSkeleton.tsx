"use client";

import { Skeleton } from "@mui/material";

export default function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      {/* Image Skeleton */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ backgroundColor: "#EAEAEA" }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6">
        {/* Location Skeleton */}
        <Skeleton
          variant="text"
          width={130}
          height={14}
          sx={{ backgroundColor: "#EAEAEA" }}
        />

        {/* Title Skeleton */}
        <div className="mt-2 space-y-1.5">
          <Skeleton
            variant="text"
            width="90%"
            height={26}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={26}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
        </div>

        {/* Excerpt Skeleton */}
        <div className="mt-3 space-y-1.5">
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
          <Skeleton
            variant="text"
            width="95%"
            height={16}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={16}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
        </div>

        {/* Date & Venue Skeleton */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
          <Skeleton
            variant="text"
            width="80%"
            height={14}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={12}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <Skeleton
            variant="text"
            width={100}
            height={14}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
          <Skeleton
            variant="text"
            width={90}
            height={14}
            sx={{ backgroundColor: "#EAEAEA" }}
          />
        </div>
      </div>
    </div>
  );
}
