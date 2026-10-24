import AboutHero from "../components/about/AboutHero";
import History from "../components/about/History";
import Mission from "../components/about/Mission";
import Vision from "../components/about/Vision";
import WorldSupply from "../components/about/WorldSupply";
import WhatSetsApart from "../components/about/WhatSetsUsApart";

export default function AboutPage() {
  return (
    <main className="bg-[#0b0b0b] min-h-screen">
      {/* Spacer only for desktop */}
      <div className="hidden lg:block h-24 bg-[#0b0b0b]"></div>

      <AboutHero />
      <History />
      <Mission />
      <Vision />
      <WhatSetsApart />
      <WorldSupply />
    </main>
  );
}