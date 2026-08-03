"use client";

import type { CSSProperties } from "react";
import {
  BookOpen,
  Brain,
  Car,
  Flag,
  Gamepad2,
  Smile,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const SEGMENTS: {
  key: MessageKey;
  textKey: MessageKey;
  tagKey?: MessageKey;
  Icon: typeof Users;
  accent: string;
}[] = [
  {
    key: "audience.segments.gamers.title",
    textKey: "audience.segments.gamers.text",
    Icon: Gamepad2,
    accent: "#7857ff",
  },
  {
    key: "audience.segments.teens.title",
    textKey: "audience.segments.teens.text",
    Icon: Users,
    accent: "#1769ff",
  },
  {
    key: "audience.segments.growth.title",
    textKey: "audience.segments.growth.text",
    Icon: BookOpen,
    accent: "#16a34a",
  },
  {
    key: "audience.segments.thinkers.title",
    textKey: "audience.segments.thinkers.text",
    Icon: Brain,
    accent: "#0891b2",
  },
  {
    key: "audience.segments.racing.title",
    textKey: "audience.segments.racing.text",
    Icon: Flag,
    accent: "#ef5a16",
  },
  {
    key: "audience.segments.cars.title",
    textKey: "audience.segments.cars.text",
    Icon: Car,
    accent: "#dc2626",
  },
  {
    key: "audience.segments.kids.title",
    textKey: "audience.segments.kids.text",
    tagKey: "audience.segments.kids.tag",
    Icon: Smile,
    accent: "#f59e0b",
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
          eyebrow={t("audience.eyebrow")}
          title={t("audience.title")}
          description={t("audience.description")}
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="audience-grid mt-12 md:mt-16">
          {SEGMENTS.map(({ key, textKey, tagKey, Icon, accent }, index) => (
            <article key={key} className="audience-card">
              <div
                className="audience-portrait"
                style={{ "--audience-accent": accent } as CSSProperties}
                aria-hidden
              >
                <span className="audience-portrait-head" />
                <span className="audience-portrait-body" />
                <Icon className="audience-icon" size={30} strokeWidth={1.6} />
                <span className="audience-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{t(key)}</h3>
              <p>{t(textKey)}</p>
              {tagKey ? <span className="audience-tag">{t(tagKey)}</span> : null}
            </article>
          ))}

          <article className="audience-card audience-card--wide">
            <div className="audience-wide-copy">
              <span className="audience-wide-mark">
                <Sparkles size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h3>{t("audience.everyone.title")}</h3>
                <p>{t("audience.everyone.text")}</p>
              </div>
            </div>
            <div className="audience-crowd" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
