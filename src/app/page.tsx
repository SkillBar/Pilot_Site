import { DownloadSection } from "@/components/DownloadSection";
import { PilotInfrastructureSection } from "@/components/PilotInfrastructureSection";

export default function Home() {
  return (
    <main>
      <PilotInfrastructureSection />
      <DownloadSection />
    </main>
  );
}
