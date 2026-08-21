"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const ADVANTAGES: {
  id: string;
  titleKey: MessageKey;
  textKey: MessageKey;
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
}[] = [
  {
    id: "unique",
    titleKey: "bento.advantages.unique.title",
    textKey: "bento.advantages.unique.text",
    imageSrc: "/advantages/cis-unique.png",
    imageAlt: "Площадка Pilot — уникальный FPV-формат для рынка СНГ",
    objectPosition: "center",
  },
  {
    id: "ar",
    titleKey: "bento.advantages.ar.title",
    textKey: "bento.advantages.ar.text",
    imageSrc: "/advantages/ar.webp",
    imageAlt: "Дополненная реальность поверх гоночной трассы Pilot",
    objectPosition: "center",
  },
  {
    id: "map",
    titleKey: "bento.advantages.map.title",
    textKey: "bento.advantages.map.text",
    imageSrc: "/advantages/endless-map.jpg",
    imageAlt: "Большая масштабируемая карта гоночной вселенной",
    objectPosition: "center",
  },
  {
    id: "app",
    titleKey: "bento.advantages.app.title",
    textKey: "bento.advantages.app.text",
    imageSrc: "/advantages/app-player-fpv.webp",
    imageAlt: "Пилот управляет FPV-машиной через приложение Pilot",
    objectPosition: "center",
  },
  {
    id: "boards",
    titleKey: "bento.advantages.boards.title",
    textKey: "bento.advantages.boards.text",
    imageSrc: "/advantages/vr.jpg",
    imageAlt: "VR-режим и соревновательный интерфейс Pilot",
    objectPosition: "center",
  },
  {
    id: "production",
    titleKey: "bento.advantages.production.title",
    textKey: "bento.advantages.production.text",
    imageSrc: "/advantages/production.jpg",
    imageAlt: "Собственное производство машин и компонентов Pilot",
    objectPosition: "center",
  },
];

export function AdvantagesSection() {
  const t = useTranslations();

  return (
    <section
      id="advantages"
      className="advantages-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader title={t("bento.advantages.title")} />

        <div className="bento-advantages-grid mt-12 md:mt-16">
          {ADVANTAGES.map((item) => (
            <article key={item.id} className="bento-card bento-card--adv">
              <div className="bento-media-slot bento-media-slot--image">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1101px) 33vw, (min-width: 701px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: item.objectPosition }}
                />
              </div>
              <div className="bento-card-body">
                <h3>{t(item.titleKey)}</h3>
                <p>{t(item.textKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
