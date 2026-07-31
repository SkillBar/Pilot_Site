import dynamic from "next/dynamic";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PartnersStrip } from "@/components/PartnersStrip";

const BusinessTracksSection = dynamic(
  () =>
    import("@/components/BusinessTracksSection").then((m) => m.BusinessTracksSection),
  { loading: () => <SectionSkeleton /> },
);
const AnatomySection = dynamic(
  () => import("@/components/AnatomySection").then((m) => m.AnatomySection),
  { loading: () => <SectionSkeleton /> },
);
const TechStackSection = dynamic(
  () => import("@/components/TechStackSection").then((m) => m.TechStackSection),
  { loading: () => <SectionSkeleton /> },
);
const TeamSection = dynamic(
  () => import("@/components/TeamSection").then((m) => m.TeamSection),
  { loading: () => <SectionSkeleton /> },
);
const MarketSection = dynamic(
  () => import("@/components/MarketSection").then((m) => m.MarketSection),
  { loading: () => <SectionSkeleton /> },
);
const WorldMapSection = dynamic(
  () => import("@/components/WorldMapSection").then((m) => m.WorldMapSection),
  { loading: () => <SectionSkeleton /> },
);
const MarketDistributionSection = dynamic(
  () =>
    import("@/components/MarketDistributionSection").then(
      (m) => m.MarketDistributionSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const InvestorsSection = dynamic(
  () => import("@/components/InvestorsSection").then((m) => m.InvestorsSection),
  { loading: () => <SectionSkeleton /> },
);

function SectionSkeleton() {
  return (
    <div
      className="mx-auto min-h-[40vh] max-w-6xl animate-pulse px-5 py-16 md:px-8"
      aria-hidden
    >
      <div className="mx-auto h-8 w-48 rounded bg-white/5" />
      <div className="mx-auto mt-4 h-4 w-80 max-w-full rounded bg-white/5" />
      <div className="mt-10 h-64 rounded-2xl bg-white/[0.03]" />
    </div>
  );
}

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
        <WorldMapSection />
        <MarketDistributionSection />
        <InvestorsSection />
      </main>
      <Footer />
    </div>
  );
}
