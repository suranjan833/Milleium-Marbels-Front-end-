import LiveStockDetailHero from "../../components/live-stockyard/LiveStockDetailHero";
import StockyardDetailApplications from "../../components/live-stockyard/StockyardDetailApplications";
import StockyardSimilarProducts from "../../components/live-stockyard/StockyardSimilarProducts";
import { fetchStoneBySlug } from "../../Utils/api";
import type { MarbleSlab } from "../../components/live-stockyard/stockyard.types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getStoneData(slug: string): Promise<MarbleSlab | null> {
  try {
    return await fetchStoneBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch stone detail:", error);
    return null;
  }
}

export default async function LiveStockDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const stone = await getStoneData(slug);

  if (!stone) {
    return (
      <main className="bg-[#FAF8F5]">
        <div className="h-30 bg-[rgba(0,0,0,0.5)] mb-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20 text-center">
          <h1 className="text-2xl text-[#8C847B]">Stone not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FAF8F5]">
      <div className="h-30 bg-[rgba(0,0,0,0.5)] mb-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section 1: Hero Detail */}
        <LiveStockDetailHero data={stone} />

        {/* Section 2: Applications */}
        <StockyardDetailApplications
          stoneSlug={stone.slug}
          stoneId={stone.id}
          fallbackApplications={stone.applications}
        />

        {/* Section 3: Similar Products Slider */}
        <StockyardSimilarProducts
          stoneType={stone.stone_type?.slug ?? ""}
          currentSlug={stone.slug}
        />
      </div>
    </main>
  );
}