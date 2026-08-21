"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const STREAMS: {
  code: string;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  {
    code: "01",
    titleKey: "businessModel.streams.hardware.title",
    textKey: "businessModel.streams.hardware.text",
  },
  {
    code: "02",
    titleKey: "businessModel.streams.unior.title",
    textKey: "businessModel.streams.unior.text",
  },
  {
    code: "03",
    titleKey: "businessModel.streams.software.title",
    textKey: "businessModel.streams.software.text",
  },
  {
    code: "04",
    titleKey: "businessModel.streams.media.title",
    textKey: "businessModel.streams.media.text",
  },
];

export function BusinessModelSection() {
  const t = useTranslations();

  return (
    <section
      id="model"
      className="biz-model-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("businessModel.title")}
          description={t("businessModel.description")}
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="biz-model-grid mt-12 md:mt-16">
          {STREAMS.map((stream) => (
            <article key={stream.code} className="biz-model-card">
              <div className="biz-model-card-top">
                <span className="biz-model-code">STREAM {stream.code}</span>
              </div>
              <h3 className="biz-model-title">{t(stream.titleKey)}</h3>
              <p className="biz-model-text">{t(stream.textKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
