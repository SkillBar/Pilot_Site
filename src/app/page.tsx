import { AnatomySection } from "@/components/AnatomySection";
import { BusinessTracksSection } from "@/components/BusinessTracksSection";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InvestorsSection } from "@/components/InvestorsSection";
import { MarketSection } from "@/components/MarketSection";
import { PartnersStrip } from "@/components/PartnersStrip";
import { TeamSection } from "@/components/TeamSection";
import { TechStackSection } from "@/components/TechStackSection";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PartnersStrip />
        <DownloadSection />
        <BusinessTracksSection />
        <AnatomySection />
        <TechStackSection />
        <TeamSection />
        <MarketSection />
        <InvestorsSection />
      </main>
      <Footer />
    </div>
  );
}
