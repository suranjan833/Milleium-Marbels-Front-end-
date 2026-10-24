"use client";

import AwardCard from "../components/award/AwardCard";
import { awardApiData } from "./awardData";

export default function AwardClient() {
  const posts = awardApiData.results;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px] py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {posts.map((post) => (
          <AwardCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
