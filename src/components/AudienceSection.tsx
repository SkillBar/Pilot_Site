"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const SEGMENTS: {
  key: MessageKey;
  textKey: MessageKey;
  imageSrc: string;
  imageAlt: string;
  objectPosition: string;
}[] = [
  {
    key: "audience.segments.gamers.title",
    textKey: "audience.segments.gamers.text",
    imageSrc: "/audience/vr-players.jpg",
    imageAlt: "Игрок в VR-гарнитуре",
    objectPosition: "52% 44%",
  },
  {
    key: "audience.segments.teens.title",
    textKey: "audience.segments.teens.text",
    imageSrc: "/audience/teenagers.jpg",
    imageAlt: "Подростки на технологической игровой площадке",
    objectPosition: "58% 42%",
  },
  {
    key: "audience.segments.growth.title",
    textKey: "audience.segments.growth.text",
    imageSrc: "/audience/self-development.jpg",
    imageAlt: "Участник развивает реакцию и концентрацию",
    objectPosition: "61% 48%",
  },
  {
    key: "audience.segments.thinkers.title",
    textKey: "audience.segments.thinkers.text",
    imageSrc: "/audience/thinkers.jpg",
    imageAlt: "Участник анализирует гоночную стратегию",
    objectPosition: "50% 42%",
  },
  {
    key: "audience.segments.racing.title",
    textKey: "audience.segments.racing.text",
    imageSrc: "/audience/racing-fans.jpg",
    imageAlt: "Болельщики на гоночном событии",
    objectPosition: "48% 45%",
  },
  {
    key: "audience.segments.cars.title",
    textKey: "audience.segments.cars.text",
    imageSrc: "/audience/car-enthusiasts.jpg",
    imageAlt: "Энтузиасты автомобильной техники",
    objectPosition: "52% 49%",
  },
  {
    key: "audience.segments.kids.title",
    textKey: "audience.segments.kids.text",
    imageSrc: "/audience/kids.jpg",
    imageAlt: "Дети знакомятся с безопасными мини-гонками",
    objectPosition: "50% 48%",
  },
];

export function AudienceSection() {
  const t = useTranslations();

  return (
    <section
      id="audience"
      className="audience-section relative flex min-h-dvh items-center overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <SectionHeader
          title={t("audience.title")}
          description={t("audience.description")}
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="audience-grid mt-12 md:mt-16">
          {SEGMENTS.map(
            ({ key, textKey, imageSrc, imageAlt, objectPosition }, index) => (
            <article key={key} className="audience-card">
              <div className="audience-portrait">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="audience-photo"
                  style={{ objectPosition }}
                />
                <span className="audience-photo-shade" aria-hidden />
                <span className="audience-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{t(key)}</h3>
              <p>{t(textKey)}</p>
            </article>
            ),
          )}

          <article className="audience-card audience-card--wide">
            <Image
              src="/audience/everyone.jpg"
              alt="Участница интерактивной технологической площадки Pilot"
              fill
              sizes="100vw"
              className="audience-wide-photo"
            />
            <span className="audience-wide-shade" aria-hidden />
            <div className="audience-wide-copy">
              <div>
                <h3>{t("audience.everyone.title")}</h3>
                <p>{t("audience.everyone.text")}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
