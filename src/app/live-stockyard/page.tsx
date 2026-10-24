import { Suspense } from "react";
import LiveStockyardClient from "./LiveStockyardClient";

export default function LiveStockyardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <LiveStockyardClient />
    </Suspense>
  );
}
