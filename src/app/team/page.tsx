import { getPageMetadata } from "../seo.config";
import TeamHero from "../components/team/TeamHero";

export const metadata = getPageMetadata("team");
import TeamHistory from "../components/team/TeamHistory";
import TeamImage from "../components/team/TeamImage";

export default function TeamPage() {
  return (
    <main className="bg-[#0b0b0b] min-h-screen">
      {/* Spacer only for desktop */}
      <div className="hidden lg:block h-[120px] bg-[#0b0b0b]" />

      <TeamHero />
      <TeamImage />
      <TeamHistory />
    </main>
  );
}