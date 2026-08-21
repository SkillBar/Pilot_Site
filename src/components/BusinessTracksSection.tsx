"use client";

import Image from "next/image";
import { PilotCard, PilotCardGrid } from "@/components/PilotCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

type TrackId = "pilot" | "unior" | "launcher";

const TRACKS: {
  id: TrackId;
  code: string;
  labelKey: MessageKey;
  tagKey: MessageKey;
  textKey: MessageKey;
  suffix?: string;
  pointKeys: [MessageKey, MessageKey, MessageKey];
}[] = [
  {
    id: "pilot",
    code: "01",
    labelKey: "tracks.pilot.label",
    tagKey: "tracks.pilot.tag",
    textKey: "tracks.pilot.text",
    pointKeys: [
      "tracks.pilot.point1",
      "tracks.pilot.point2",
      "tracks.pilot.point3",
    ],
  },
  {
    id: "unior",
    code: "02",
    labelKey: "tracks.unior.label",
    tagKey: "tracks.unior.tag",
    textKey: "tracks.unior.text",
    suffix: "Unior",
    pointKeys: [
      "tracks.unior.point1",
      "tracks.unior.point2",
      "tracks.unior.point3",
    ],
  },
  {
    id: "launcher",
    code: "03",
    labelKey: "tracks.launcher.label",
    tagKey: "tracks.launcher.tag",
    textKey: "tracks.launcher.text",
    suffix: "Launcher",
    pointKeys: [
      "tracks.launcher.point1",
      "tracks.launcher.point2",
      "tracks.launcher.point3",
    ],
  },
];

export function BusinessTracksSection() {
  const t = useTranslations();

  return (
    <section
      id="tracks"
      className="tracks-section relative overflow-hidden px-5 py-16 md:px-8 md:py-24"
    >
      <div className="tracks-ambient-grid" aria-hidden>
        <span className="tracks-ambient-cell tracks-ambient-cell--one" />
        <span className="tracks-ambient-cell tracks-ambient-cell--two" />
        <span className="tracks-ambient-cell tracks-ambient-cell--three" />
        <span className="tracks-ambient-cell tracks-ambient-cell--four" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("tracks.title")}
          description={t("tracks.description")}
        />

        <PilotCardGrid>
          {TRACKS.map((track, index) => (
            <PilotCard
              key={track.id}
              featured={index === 1}
              className="min-h-[320px]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
                  TRACK {track.code}
                </p>
                <span className="pilot-card-accent font-mono text-[10px] tracking-[0.18em] uppercase">
                  {t(track.tagKey)}
                </span>
              </div>

              <h3 className="mt-5 flex h-12 items-center gap-x-2.5 md:h-14">
                <Image
                  src="/logo_big.svg"
                  alt={t(track.labelKey)}
                  width={420}
                  height={120}
                  className="h-10 w-auto shrink-0 object-contain object-left md:h-12"
                />
                {track.suffix ? (
                  <span className="font-display text-xl font-extrabold italic leading-none tracking-[0.04em] text-fg md:text-2xl">
                    {track.suffix}
                  </span>
                ) : null}
              </h3>

              <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted">
                {t(track.textKey)}
              </p>

              <ul className="mt-8 space-y-3">
                {track.pointKeys.map((pointKey, pointIndex) => (
                  <li
                    key={pointKey}
                    className="flex items-start gap-3 font-mono text-[12px] leading-relaxed text-fg/85"
                  >
                    <span className="pilot-card-accent mt-0.5">
                      0{pointIndex + 1}
                    </span>
                    <span>{t(pointKey)}</span>
                  </li>
                ))}
              </ul>
            </PilotCard>
          ))}
        </PilotCardGrid>
      </div>
    </section>
  );
}
