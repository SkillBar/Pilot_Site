"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

type CountryCode =
  | "ru"
  | "by"
  | "kz"
  | "am"
  | "kg"
  | "uz"
  | "br"
  | "sv"
  | "ar"
  | "uy"
  | "ae"
  | "tr"
  | "us"
  | "cn";

type RegionId = "cis" | "latam" | "mena" | "na" | "asia";

type DistRow = {
  code: CountryCode;
  region: RegionId;
  nameKey: MessageKey;
  cityKey?: MessageKey;
  /** Product points; null = уточняется */
  pilot: number | null;
  unior: number | null;
  flag: string[];
};

const ROWS: DistRow[] = [
  {
    code: "ru",
    region: "cis",
    nameKey: "distribution.countries.ru",
    pilot: 10,
    unior: 40,
    flag: ["#FFFFFF", "#0039A6", "#D52B1E"],
  },
  {
    code: "by",
    region: "cis",
    nameKey: "distribution.countries.by",
    pilot: 2,
    unior: 10,
    flag: ["#FFFFFF", "#00966E", "#D22730"],
  },
  {
    code: "kz",
    region: "cis",
    nameKey: "distribution.countries.kz",
    pilot: 2,
    unior: 10,
    flag: ["#00AFCA", "#FEC50C"],
  },
  {
    code: "am",
    region: "cis",
    nameKey: "distribution.countries.am",
    pilot: 1,
    unior: 3,
    flag: ["#D90012", "#0033A0", "#F2A800"],
  },
  {
    code: "kg",
    region: "cis",
    nameKey: "distribution.countries.kg",
    pilot: 1,
    unior: 3,
    flag: ["#E8112D", "#FFFFFF", "#000000"],
  },
  {
    code: "uz",
    region: "cis",
    nameKey: "distribution.countries.uz",
    pilot: 1,
    unior: 4,
    flag: ["#1EB53A", "#0099B5", "#CE1126", "#FFFFFF"],
  },
  {
    code: "br",
    region: "latam",
    nameKey: "distribution.countries.br",
    pilot: 2,
    unior: 6,
    flag: ["#009C3B", "#FFDF00", "#002776"],
  },
  {
    code: "sv",
    region: "latam",
    nameKey: "distribution.countries.sv",
    pilot: 1,
    unior: 3,
    flag: ["#0047AB", "#FFFFFF"],
  },
  {
    code: "ar",
    region: "latam",
    nameKey: "distribution.countries.ar",
    pilot: 1,
    unior: 3,
    flag: ["#74ACDF", "#FFFFFF", "#F6B40E"],
  },
  {
    code: "uy",
    region: "latam",
    nameKey: "distribution.countries.uy",
    pilot: 1,
    unior: 3,
    flag: ["#0038A8", "#FFFFFF"],
  },
  {
    code: "ae",
    region: "mena",
    nameKey: "distribution.countries.ae",
    pilot: null,
    unior: null,
    flag: ["#00732F", "#FFFFFF", "#FF0000", "#000000"],
  },
  {
    code: "tr",
    region: "mena",
    nameKey: "distribution.countries.tr",
    pilot: 4,
    unior: 10,
    flag: ["#E30A17", "#FFFFFF"],
  },
  {
    code: "us",
    region: "na",
    nameKey: "distribution.countries.us",
    cityKey: "distribution.cities.la",
    pilot: 20,
    unior: 100,
    flag: ["#B22234", "#FFFFFF", "#3C3B6E"],
  },
  {
    code: "cn",
    region: "asia",
    nameKey: "distribution.countries.cn",
    pilot: 20,
    unior: 100,
    flag: ["#DE2910"],
  },
];

const REGION_ORDER: RegionId[] = ["cis", "asia", "mena", "na", "latam"];

const REGION_KEYS: Record<RegionId, MessageKey> = {
  cis: "distribution.regions.cis",
  latam: "distribution.regions.latam",
  mena: "distribution.regions.mena",
  na: "distribution.regions.na",
  asia: "distribution.regions.asia",
};

function rowScore(row: DistRow) {
  return (row.pilot ?? 0) + (row.unior ?? 0);
}

function CountryFlag({ colors, code }: { colors: string[]; code: CountryCode }) {
  if (code === "tr") {
    return (
      <span className="dist-flag dist-flag--tr" aria-hidden>
        <span className="dist-flag-crescent" />
      </span>
    );
  }

  if (code === "cn") {
    return (
      <span className="dist-flag dist-flag--cn" aria-hidden>
        <span className="dist-flag-cn-star dist-flag-cn-star--lg" />
        <span className="dist-flag-cn-star dist-flag-cn-star--s1" />
        <span className="dist-flag-cn-star dist-flag-cn-star--s2" />
        <span className="dist-flag-cn-star dist-flag-cn-star--s3" />
        <span className="dist-flag-cn-star dist-flag-cn-star--s4" />
      </span>
    );
  }

  return (
    <span className="dist-flag" aria-hidden>
      {colors.map((color) => (
        <span key={`${code}-${color}`} style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}

function PlusMarks({ className = "dist-plus" }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function formatValue(value: number | null, pendingLabel: string) {
  if (value === null) return pendingLabel;
  return String(value);
}

export function MarketDistributionSection() {
  const t = useTranslations();
  const pending = t("distribution.pending");

  const totals = ROWS.reduce(
    (acc, row) => ({
      pilot: acc.pilot + (row.pilot ?? 0),
      unior: acc.unior + (row.unior ?? 0),
    }),
    { pilot: 0, unior: 0 },
  );

  let rank = 0;

  return (
    <section
      id="distribution"
      className="dist-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("distribution.eyebrow")}
          title={t("distribution.title")}
          description={t("distribution.description")}
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="dist-board mt-12 md:mt-16">
          <PlusMarks className="dist-plus dist-plus--board" />

          <div className="dist-board-inner">
            <div className="dist-head" role="row">
              <PlusMarks className="dist-plus dist-plus--row" />
              <span className="dist-cell dist-cell--rank">#</span>
              <span className="dist-cell dist-cell--country">
                {t("distribution.colCountry")}
              </span>
              <span className="dist-cell dist-cell--num">
                {t("distribution.colPilot")}
              </span>
              <span className="dist-cell dist-cell--num">
                {t("distribution.colUnior")}
              </span>
            </div>

            <div
              className="dist-body"
              role="table"
              aria-label={t("distribution.title")}
            >
              {REGION_ORDER.map((region) => {
                const rows = ROWS.filter((row) => row.region === region).sort(
                  (a, b) => rowScore(b) - rowScore(a),
                );

                if (rows.length === 0) return null;

                return (
                  <div key={region} className="dist-region">
                    <div className="dist-region-label">
                      {t(REGION_KEYS[region])}
                    </div>

                    {rows.map((row) => {
                      rank += 1;
                      const rankLabel = String(rank).padStart(2, "0");

                      return (
                        <div key={row.code} className="dist-row" role="row">
                          <PlusMarks className="dist-plus dist-plus--row" />
                          <span className="dist-cell dist-cell--rank">
                            {rankLabel}
                          </span>
                          <span className="dist-cell dist-cell--country">
                            <CountryFlag colors={row.flag} code={row.code} />
                            <span className="dist-country-text">
                              <span>{t(row.nameKey)}</span>
                              {row.cityKey ? (
                                <span className="dist-city">
                                  {t(row.cityKey)}
                                </span>
                              ) : null}
                            </span>
                          </span>
                          <span
                            className={`dist-cell dist-cell--num${
                              row.pilot === null ? " dist-cell--muted" : ""
                            }`}
                          >
                            {formatValue(row.pilot, pending)}
                          </span>
                          <span
                            className={`dist-cell dist-cell--num${
                              row.unior === null ? " dist-cell--muted" : ""
                            }`}
                          >
                            {formatValue(row.unior, pending)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div className="dist-row dist-row--total" role="row">
                <PlusMarks className="dist-plus dist-plus--row" />
                <span className="dist-cell dist-cell--rank">Σ</span>
                <span className="dist-cell dist-cell--country">
                  <span className="dist-country-text">
                    <span>{t("distribution.total")}</span>
                  </span>
                </span>
                <span className="dist-cell dist-cell--num">{totals.pilot}</span>
                <span className="dist-cell dist-cell--num">{totals.unior}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
