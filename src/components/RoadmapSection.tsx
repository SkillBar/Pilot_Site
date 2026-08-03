"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { RaceCheckers } from "@/components/RaceCheckers";
import { Timeline } from "@/components/ui/timeline";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const PHASES: {
  titleKey: MessageKey;
  textKey: MessageKey;
  itemKeys: MessageKey[];
}[] = [
  {
    titleKey: "roadmap.phases.now.title",
    textKey: "roadmap.phases.now.text",
    itemKeys: [
      "roadmap.phases.now.item1",
      "roadmap.phases.now.item2",
      "roadmap.phases.now.item3",
      "roadmap.phases.now.item4",
    ],
  },
  {
    titleKey: "roadmap.phases.scale.title",
    textKey: "roadmap.phases.scale.text",
    itemKeys: [
      "roadmap.phases.scale.item1",
      "roadmap.phases.scale.item2",
      "roadmap.phases.scale.item3",
      "roadmap.phases.scale.item4",
    ],
  },
  {
    titleKey: "roadmap.phases.global.title",
    textKey: "roadmap.phases.global.text",
    itemKeys: [
      "roadmap.phases.global.item1",
      "roadmap.phases.global.item2",
      "roadmap.phases.global.item3",
      "roadmap.phases.global.item4",
    ],
  },
  {
    titleKey: "roadmap.phases.network.title",
    textKey: "roadmap.phases.network.text",
    itemKeys: [
      "roadmap.phases.network.item1",
      "roadmap.phases.network.item2",
      "roadmap.phases.network.item3",
      "roadmap.phases.network.item4",
    ],
  },
];

export function RoadmapSection() {
  const t = useTranslations();

  const data = PHASES.map((phase) => ({
    title: t(phase.titleKey),
    content: (
      <div>
        <p className="mb-5 max-w-xl text-sm leading-relaxed text-[#111318]/55 md:text-base">
          {t(phase.textKey)}
        </p>
        <ul className="space-y-2.5">
          {phase.itemKeys.map((key) => (
            <li
              key={key}
              className="flex items-start gap-2.5 text-sm text-[#111318]/75 md:text-[15px]"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef5a16]"
                aria-hidden
              />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section
      id="roadmap"
      className="roadmap-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <RaceCheckers dark className="race-checkers--bottom-right" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("roadmap.eyebrow")}
          title={t("roadmap.title")}
          description={t("roadmap.description")}
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-xl text-black/55"
        />
      </div>

      <div className="relative z-10 mt-6 md:mt-10">
        <Timeline data={data} />
      </div>
    </section>
  );
}
