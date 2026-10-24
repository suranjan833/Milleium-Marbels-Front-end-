import React from "react";
import Link from "next/link";
import { fetchBlogArticleBySlug } from "../../Utils/api";
import RichText from "@/app/components/common/RichText";
import type { SidebarRecentPost } from "../blog.types";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const post = await fetchBlogArticleBySlug(slug);
    const nextPosts: SidebarRecentPost[] = post.sidebar?.recent_posts
      ? post.sidebar.recent_posts.filter((p) => p.slug !== post.slug)
      : [];

    return (
      <main className="bg-white min-h-screen">
        {/* Top spacing block matching headers */}
        <div className="bg-[#101010] text-white h-40"></div>
        <div className="bg-[#101010] text-white mb-10 ">
          <div className="container mx-auto px-4 max-w-[1240px] flex justify-end py-2">
            <h4 className="text-[36px] font-serif tracking-wider font-light">
              Blogs
            </h4>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] pb-20">
          {/* 1. Hero Image Section with Banner Overlay */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] bg-gray-100 mb-10 overflow-hidden shadow-sm">
            <Image
              src={post.hero_image}
              alt={post.title}
              className="w-full h-full object-cover"
              fill
              sizes="(min-width: 1000px) 1000px, 100vw"
            />

            {/* Translucent Banner Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-[2px] p-6 sm:p-10 text-center border-t border-white/20">
              <h1 className="font-sans text-white text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide leading-tight max-w-3xl mx-auto mb-4 drop-shadow-md">
                {post.title}
              </h1>
              <div className="text-[10px] sm:text-xs tracking-[0.15em] text-gray-300 font-semibold uppercase">
                {post.published_date_formatted} / PUBLISHED IN {post.category_name}
              </div>
            </div>
          </div>

          {/* 2. Main Article Heading & Excerpt */}
          <div className="max-w-[860px] mx-auto">
            {/* Large Serif Title */}
            <h2 className="font-serif text-2xl sm:text-4xl md:text-[42px] font-normal text-[#111111] uppercase tracking-wide leading-tight mb-8 border-b border-transparent pb-2">
              {post.title}
            </h2>

            {/* Introductory Excerpt */}
            <div className="text-[#444444] text-base sm:text-lg font-light leading-relaxed space-y-6 mb-8">
              <p>{post.excerpt}</p>
            </div>

            <hr className="my-10 border-gray-200" />

            {/* Body Content Blocks */}
            <div className="prose max-w-none text-[#444444] leading-relaxed">
              {post.body && post.body.length > 0 ? (
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
                <p className="text-gray-500 italic">No additional content.</p>
              )}
            </div>

            {/* 3. "What you can read next" Section */}
            {nextPosts.length > 0 && (
              <div className="mt-20 pt-10 border-t border-gray-200">
                <h4 className="text-base text-gray-700 font-sans font-semibold mb-8">
                  What you can read next
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {nextPosts.slice(0, 2).map((item) => (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden mb-3 border border-gray-200 shadow-sm">
                        <Image
                          src={item.hero_image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                          <span className="text-white text-xs sm:text-sm font-extrabold uppercase tracking-wide leading-tight line-clamp-3">
                            {item.title}
                          </span>
                        </div>
                      </div>
                      <h5 className="font-sans font-bold text-xs sm:text-sm text-[#111111] group-hover:text-[#b08a4f] transition-colors leading-snug">
                        {item.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
            {err instanceof Error ? err.message : "Article not found"}
          </p>
          <Link
            href="/blog"
            className="px-6 py-2 border border-[#0f2d4a] text-[#0f2d4a] text-xs font-semibold tracking-wider uppercase hover:bg-[#0f2d4a] hover:text-white transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }
}