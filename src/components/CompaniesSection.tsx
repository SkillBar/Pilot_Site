"use client";

import type { CSSProperties } from "react";
import { Building2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";

const COMPANIES = [
  { id: "vector", name: "Vector", accent: "#ef5a16" },
  { id: "arena", name: "ARENA", accent: "#1769ff" },
  { id: "dialog", name: "Dialog", accent: "#7857ff" },
  { id: "era", name: "ERA DAO", accent: "#16a34a" },
  { id: "unior", name: "Vector Unior", accent: "#0891b2" },
  { id: "lab", name: "Pilot Lab", accent: "#dc2626" },
] as const;

export function CompaniesSection() {
  const t = useTranslations();

  return (
    <section
      id="companies"
      className="companies-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("companies.eyebrow")}
          title={t("companies.title")}
          description={t("companies.description")}
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="audience-grid mt-12 md:mt-16">
          {COMPANIES.map((company, index) => (
            <article key={company.id} className="audience-card">
              <div
                className="companies-portrait"
                style={
                  { "--companies-accent": company.accent } as CSSProperties
                }
                aria-hidden
              >
                <span className="companies-mark">{company.name.slice(0, 2)}</span>
                <Building2 className="companies-icon" size={28} strokeWidth={1.6} />
                <span className="audience-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{company.name}</h3>
              <p>{t("companies.partnerLabel")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
