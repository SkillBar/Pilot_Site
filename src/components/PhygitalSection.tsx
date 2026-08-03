"use client";

import { useEffect, useRef, useState } from "react";
import { RaceCheckers } from "@/components/RaceCheckers";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";

export function PhygitalSection() {
  const t = useTranslations();
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="phygital"
      className="phygital-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-28"
    >
      <RaceCheckers dark className="race-checkers--top-right" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("phygital.eyebrow")}
          title={t("phygital.title")}
          description={t("phygital.description")}
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-2xl text-black/55"
        />

        <div
          ref={stageRef}
          className={`phygital-euler mt-14 md:mt-20${active ? " is-active" : ""}`}
          aria-hidden
        >
          <div className="phygital-circle phygital-circle--physical">
            <span>{t("phygital.physical")}</span>
          </div>
          <div className="phygital-circle phygital-circle--digital">
            <span>{t("phygital.digital")}</span>
          </div>
          <div className="phygital-merge">
            <span>{t("phygital.merge")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
