import { Suspense } from "react";
import { getPageMetadata } from "../seo.config";
import LiveStockyardClient from "./LiveStockyardClient";

export const metadata = getPageMetadata("liveStockyard");

export default function LiveStockyardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <LiveStockyardClient />
    </Suspense>
  );
}
