"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { WorldMap } from "@/components/WorldMap";
import { useTranslations } from "@/i18n/client";

const SERVER_LINKS = [
  { start: { lat: 55.7558, lng: 37.6173 }, end: { lat: 50.1109, lng: 8.6821 } },
  { start: { lat: 50.1109, lng: 8.6821 }, end: { lat: 1.3521, lng: 103.8198 } },
  { start: { lat: 1.3521, lng: 103.8198 }, end: { lat: 35.6762, lng: 139.6503 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 39.0438, lng: -77.4874 } },
  { start: { lat: 50.1109, lng: 8.6821 }, end: { lat: 25.2048, lng: 55.2708 } },
  { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: -33.8688, lng: 151.2093 } },
];

const HUBS = ["Moscow", "Frankfurt", "Singapore", "Tokyo"] as const;

export function WorldMapSection() {
  const t = useTranslations();

  return (
    <section
      id="world-map"
      className="world-map-section relative overflow-hidden border-t border-line px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("worldMap.title")}
          description={t("worldMap.description")}
        />

        <div className="world-map-frame mt-12 md:mt-16">
          <WorldMap
            className="world-map-live"
            dots={SERVER_LINKS}
            lineColor="#ef5a16"
            fadeEdges
          />
          <div className="world-map-meta" aria-hidden>
            {HUBS.map((hub) => (
              <span key={hub}>{hub}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
