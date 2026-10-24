import type { Metadata } from "next";

export const SITE_URL = "https://milleniummarbles.com";
export const SITE_NAME = "Millenium Marbles";
export const DEFAULT_OG_IMAGE = "/assets/homepage/0001.jpg";

export interface PageSeoItem {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  ogImage?: string;
}

export interface CategorySeoItem {
  title: string;
  description: string;
  keywords: string[];
}

export const SEO_PAGES: Record<string, PageSeoItem> = {
  home: {
    title: "Premium Marble | Natural Stone Supplier in India — Millenium Marbles",
    description:
      "Explore premium marble, imported natural stones, granite, onyx and travertine at Millenium Marbles. Discover distinctive stone collections for luxury spaces.",
    keywords: [
      "Marble Manufacturer in India",
      "Marble Supplier in India",
      "Natural Stone Supplier in India",
      "Imported Marble in India",
      "Marble & Stone in India",
    ],
    path: "/",
  },
  about: {
    title: "About Us — Collection of Marbles & Stones in India",
    description:
      "Discover Millenium Marbles, with 25+ years of experience sourcing and crafting premium marble and natural stones for elegant spaces.",
    keywords: [
      "Millenium Marbles Mumbai",
      "Imported Marble Supplier in Mumbai",
      "Natural Stone Supplier in Mumbai",
    ],
    path: "/about",
  },
  collections: {
    title:
      "Explore Marble, Onyx, Granite & Travertine Collections: Millenium Marbles",
    description:
      "Browse an extensive range of marble, travertine, onyx, granite and exotic stones with distinctive colours, textures and patterns for sophisticated interiors.",
    keywords: [
      "Premium marble slabs",
      "Travertine stone",
      "Onyx stone slabs",
      "Exotic natural stones",
      "Premium granite slabs",
    ],
    path: "/collections",
  },
  event: {
    title: "Marble & Natural Stone Events | Millenium Marbles",
    description:
      "Stay updated with Millenium Marbles events, exhibitions and industry activities showcasing premium marble and natural stone collections.",
    keywords: [
      "Marble events India",
      "natural stone supplier India",
      "marble & stone showroom India",
    ],
    path: "/event",
  },
  contact: {
    title: "Contact Millenium Marbles | Marble Showrooms & Factories India",
    description:
      "Contact Millenium Marbles for premium marble and natural stone enquiries. Visit our showrooms and factories across Mumbai, Gurugram, Indore and India.",
    keywords: [
      "Imported Marble Supplier in Gurgaon",
      "Luxury Marble Supplier in India",
      "Marble Manufacturer",
      "Natural Stone in India",
    ],
    path: "/contact",
  },
  award: {
    title: "Awards & Recognition | Millenium Marbles",
    description:
      "Discover the awards and industry recognitions earned by Millenium Marbles for excellence in imported natural stones and luxury architectural surfaces.",
    keywords: [
      "Millenium Marbles Awards",
      "Natural Stone Awards",
      "Excellence in Marble India",
    ],
    path: "/award",
  },
  team: {
    title: "Our Team & Leadership | Millenium Marbles",
    description:
      "Meet the leadership and team behind Millenium Marbles, delivering the world's finest imported marbles and stones across India.",
    keywords: [
      "Millenium Marbles Leadership",
      "Marble experts India",
      "Natural stone specialists",
    ],
    path: "/team",
  },
  blog: {
    title: "Blogs & Insights on Natural Stones & Marbles | Millenium Marbles",
    description:
      "Read the latest articles, design tips, and guides on imported Italian marbles, granites, onyx, and luxury interior stone styling.",
    keywords: [
      "Marble blogs",
      "Italian marble guides",
      "Natural stone design ideas",
    ],
    path: "/blog",
  },
  liveStockyard: {
    title: "Live Stockyard — Real-Time Natural Stone Inventory | Millenium Marbles",
    description:
      "Browse our live stockyard inventory of premium imported marble slabs, granites, onyx, and quartzites ready for inspection and delivery.",
    keywords: [
      "Live marble stockyard",
      "Imported marble slabs inventory",
      "Natural stones India stock",
    ],
    path: "/live-stockyard",
  },
};

export const SEO_CATEGORIES: Record<string, CategorySeoItem> = {
  marbles: {
    title: "Premium Marble Slabs for Luxury Interiors — Millenium Marbles",
    description:
      "Discover premium marble slabs in elegant colours and natural patterns for flooring, feature walls, countertops and bespoke architectural interiors.",
    keywords: [
      "Marble supplier in Mumbai",
      "marble supplier in Gurgaon",
      "Marble supplier in Indore",
      "Marble dealer in India",
    ],
  },
  granite: {
    title: "Premium Granite Slabs for Countertops — Millenium Marbles",
    description:
      "Explore granite slabs with attractive textures, varied colours and lasting durability for countertops, flooring and other residential or commercial applications.",
    keywords: [
      "granite dealers in Mumbai",
      "granite suppliers in Gurgaon",
      "granite showroom in Mumbai",
      "granite factory in Indore",
      "granite in India",
    ],
  },
  onyx: {
    title: "Luxury Onyx Stone Slabs with Distinctive Natural Patterns — Millenium Marbles",
    description:
      "Explore premium onyx stone featuring translucent patterns and natural beauty, ideal for statement walls, counters, interiors and luxury spaces.",
    keywords: [
      "onyx marble showroom in Indore",
      "onyx marble suppliers in Gurgaon",
      "onyx marble suppliers",
      "luxury onyx marble in Mumbai",
    ],
  },
  exotic: {
    title: "Exotic Natural Stones for Unique Luxury Interiors — Millenium Marbles",
    description:
      "Find exotic natural stones with rare colours, expressive veining and distinctive textures to create exceptional interiors and standout architectural features.",
    keywords: [
      "exotic marble suppliers Mumbai",
      "exotic marble dealers Indore",
      "natural exotic marble Gurgaon",
      "exotic marble India",
    ],
  },
  quartzite: {
    title: "Premium Quartzite Collection | Natural Quartzite Stone — Millenium Marbles",
    description:
      "Explore premium quartzite stone with distinctive patterns, durability and natural beauty for countertops, walls, flooring and luxury interiors.",
    keywords: [
      "quartzite stone supplier Mumbai",
      "quartzite dealer Indore",
      "quartzite stone showroom Gurgaon",
      "quartzite marble & Stone",
    ],
  },
  limestone: {
    title: "Limestone Collection | Natural Limestone for Interiors & Design",
    description:
      "Discover natural limestone with timeless textures and earthy tones for elegant flooring, walls, architectural features and interior applications.",
    keywords: [
      "limestone stone supplier Indore",
      "limestone marble slabs Mumbai",
      "limestone supplier Gurgaon",
      "limestone marble india",
    ],
  },
};

export type PageKey = keyof typeof SEO_PAGES;

/**
 * Generate Next.js Metadata for any registered page
 */
export function getPageMetadata(pageKey: PageKey): Metadata {
  const page = SEO_PAGES[pageKey];
  if (!page) {
    throw new Error(`SEO configuration not found for page: ${String(pageKey)}`);
  }

  const canonicalUrl = page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`;
  const image = page.ogImage || DEFAULT_OG_IMAGE;
  const fullImageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [fullImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

