"use client";

import { useTranslations } from "@/i18n/client";

const partners = [
  { mark: "V", name: "Vector" },
  { mark: "P", name: "Pilot Lab" },
  { mark: "FPV", name: "FPV Systems" },
  { mark: "RG", name: "Race Grid" },
  { mark: "TH", name: "Tech Hub" },
];

export function PartnersStrip() {
  const t = useTranslations();

  return (
    <section
      id="partners"
      className="partners-strip relative overflow-hidden border-y border-white/15 bg-black text-white"
      aria-label={t("partners.aria")}
    >
      <div className="mx-auto flex min-h-12 max-w-7xl items-stretch px-5 md:px-8">
        <div className="flex shrink-0 items-center gap-3 border-r border-white/15 pr-4 md:pr-6">
          <CheckeredFlag />
          <div className="hidden sm:block">
            <p className="font-mono text-[7px] tracking-[0.22em] text-white/45 uppercase">
              {t("partners.official")}
            </p>
            <p className="font-display text-[9px] font-black tracking-[0.14em] uppercase">
              {t("partners.partners")}
            </p>
          </div>
        </div>

        <div className="partners-rail flex min-w-0 flex-1 items-center overflow-x-auto px-4 md:px-6">
          <div className="flex min-w-max items-center gap-9 md:w-full md:justify-around md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center gap-2.5 text-white/55 transition-colors hover:text-white"
              >
                <span className="flex h-5 min-w-5 -skew-x-12 items-center justify-center border border-current px-1 font-display text-[6px] font-black">
                  <span className="skew-x-12">{partner.mark}</span>
                </span>
                <span className="font-display text-[8px] font-bold tracking-[0.12em] uppercase md:text-[9px]">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="partners-finish pointer-events-none absolute inset-y-0 right-0 w-7 opacity-65 md:w-10"
        aria-hidden
      />
    </section>
  );
}

function CheckeredFlag() {
  return (
    <svg viewBox="0 0 42 42" className="h-6 w-6 text-white" aria-hidden>
      <path d="M8 4v34" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 7c8-5 15 5 24 0v19c-9 5-16-5-24 0V7Z"
        fill="currentColor"
        opacity="0.16"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="m10 7 6 1.5V15L10 14V7Zm12 3 6 .3v6.5l-6-.3V10Zm-6 5 6 1.5V23l-6-1.4V15Zm12 1.8 6-1.3V22l-6 1.3v-6.5Zm-18 3.7 6 1.1v6.5L10 27v-6.5Zm12 2.5 6 .3v6.2l-6-.3V23Z"
        fill="currentColor"
      />
    </svg>
  );
}
