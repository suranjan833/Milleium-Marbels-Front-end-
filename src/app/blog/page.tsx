import { Suspense } from "react";
import BlogClient from "./BlogClient";

export default function BlogPage() {
  return (
    <main className="bg-[#f4f4f4] min-h-screen">
      {/* Top Spacer */}
      <div className="bg-[#101010] text-white h-40"></div>

      {/* Page Heading */}
      <div className="bg-[#101010] text-white mb-10">
        <div className="container mx-auto flex justify-center items-center">
          <h4 className="text-[42px] text-center">Blogs</h4>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px] py-10 min-h-[400px]" />}>
        <BlogClient />
      </Suspense>
    </main>
  );
}