"use client";

import { Skeleton } from "@mui/material";

export default function AwardCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ backgroundColor: "#EAEAEA" }} />
      </div>
      <div className="p-4">
        <Skeleton variant="text" width={70} height={12} sx={{ backgroundColor: "#EAEAEA" }} />
        <div className="mt-1.5 space-y-1">
          <Skeleton variant="text" width="90%" height={14} sx={{ backgroundColor: "#EAEAEA" }} />
          <Skeleton variant="text" width="70%" height={14} sx={{ backgroundColor: "#EAEAEA" }} />
        </div>
        <Skeleton variant="text" width="60%" height={12} sx={{ backgroundColor: "#EAEAEA" }} />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <Skeleton variant="circular" width={28} height={28} sx={{ backgroundColor: "#EAEAEA" }} />
          <Skeleton variant="text" width={50} height={12} sx={{ backgroundColor: "#EAEAEA" }} />
        </div>
      </div>
    </div>
  );
}

