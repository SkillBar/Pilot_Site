"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import { InvestorForm } from "./InvestorForm";

export function InvestorsSection() {
  const t = useTranslations();

  return (
    <section
      id="investors"
      className="relative border-t border-line px-5 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("investors.eyebrow")}
          title={t("investors.title")}
          description={t("investors.description")}
          after={
            <div className="mt-6 flex flex-col items-center gap-3">
              <a href="#download" className="btn-ghost font-mono text-[12px]">
                <span>{t("investors.launcherFirst")}</span>
              </a>
              <p className="font-mono text-[11px] tracking-wider text-muted/70">
                {t("investors.fineprint")}
              </p>
            </div>
          }
        />

        <div className="investor-card relative mt-14 overflow-hidden border border-line px-6 py-10 md:px-12 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,255,0.18),transparent_60%)]"
          />

          <div className="relative mx-auto max-w-xl">
            <p className="mb-5 text-center font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              {t("investors.formEyebrow")}
            </p>
            <InvestorForm />
          </div>
        </div>
      </div>
    </section>
  );
}
