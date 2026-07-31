"use client";

import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const SEGMENTS: {
  id: "ram" | "tam" | "sam" | "som";
  label: string;
  titleKey: MessageKey;
  textKey: MessageKey;
  valueKey: MessageKey;
}[] = [
  {
    id: "ram",
    label: "RAM",
    titleKey: "market.ram.title",
    textKey: "market.ram.text",
    valueKey: "market.ram.value",
  },
  {
    id: "tam",
    label: "TAM",
    titleKey: "market.tam.title",
    textKey: "market.tam.text",
    valueKey: "market.tam.value",
  },
  {
    id: "sam",
    label: "SAM",
    titleKey: "market.sam.title",
    textKey: "market.sam.text",
    valueKey: "market.sam.value",
  },
  {
    id: "som",
    label: "SOM",
    titleKey: "market.som.title",
    textKey: "market.som.text",
    valueKey: "market.som.value",
  },
];

export function MarketSection() {
  const t = useTranslations();

  return (
    <section
      id="market"
      className="market-section relative overflow-hidden border-t border-line px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("market.eyebrow")}
          title={t("market.title")}
          description={t("market.description")}
          eyebrowClassName="market-accent"
        />

        <div className="market-funnel mt-14" aria-label={t("market.title")}>
          <svg
            className="pointer-events-none absolute h-0 w-0"
            aria-hidden
            focusable="false"
          >
            <defs>
              <clipPath
                id="market-ram-shape"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M.035 0 C.014 0 0 .018 0 .05 L0 .95 C0 .982 .014 1 .035 1 L.84 .96 C.93 .955 .98 .91 .98 .82 L.98 .18 C.98 .09 .93 .045 .84 .04 Z" />
              </clipPath>
              <clipPath
                id="market-tam-shape"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M0 .04 L.84 .09 C.93 .095 .98 .14 .98 .23 L.98 .77 C.98 .86 .93 .905 .84 .91 L0 .96 Z" />
              </clipPath>
              <clipPath
                id="market-sam-shape"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M0 .09 L.83 .14 C.92 .145 .977 .19 .977 .28 L.977 .72 C.977 .81 .92 .855 .83 .86 L0 .91 Z" />
              </clipPath>
              <clipPath
                id="market-som-shape"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M0 .14 L.82 .19 C.93 .198 1 .27 1 .4 L1 .6 C1 .73 .93 .802 .82 .81 L0 .86 Z" />
              </clipPath>
            </defs>
          </svg>

          {SEGMENTS.map((segment, index) => (
            <article
              key={segment.id}
              className={`market-segment market-segment--${segment.id}`}
              style={{ "--market-index": index } as CSSProperties}
            >
              <div className="market-segment-content">
                <p className="market-kicker">{segment.label}</p>
                <h3>{t(segment.titleKey)}</h3>
                <p className="market-copy">{t(segment.textKey)}</p>
                <div className="market-value">{t(segment.valueKey)}</div>
                {segment.id === "som" ? (
                  <span className="market-share">{t("market.som.share")}</span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
