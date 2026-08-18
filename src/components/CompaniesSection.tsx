"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";

const COMPANIES = [
  { name: "Федерация спортивного программирования России", description: "Общероссийская спортивная федерация, развивающая и популяризирующая спортивное программирование, включая соревнования, образовательные проекты и технологические дисциплины.", href: "https://fsp-russia.ru/" },
  { name: "Институт развития мозга", description: "Разработка нейроинтерфейсов, игр с использованием биометрии и когнитивных тренажёров.", href: "https://irm.ru/" },
  { name: "ВОСВОД России", description: "Всероссийское общество спасания на водах; взаимодействие в контексте безопасности на воде, образовательных и прикладных проектов.", href: "https://vosvod.com/" },
  { name: "Федерация водно-спасательного многоборья", description: "Партнёрская организация в области водно-спасательного спорта, подготовки и профильных соревновательных инициатив.", href: "https://fvsmrus.ru/" },
  { name: "Сколковский институт науки и технологий", description: "Научно-технологическое и образовательное взаимодействие в рамках профильных проектных инициатив.", href: "https://www.skoltech.ru/" },
  { name: "Национальный медицинский исследовательский центр им. В. А. Алмазова", description: "Научно-медицинская организация; взаимодействие в рамках исследовательских, технологических и междисциплинарных инициатив.", href: "https://www.almazovcentre.ru/" },
] as const;

export function CompaniesSection() {
  const t = useTranslations();

  return (
    <section
      id="companies"
      className="companies-section relative overflow-hidden border-t border-black/10 px-5 py-14 md:px-8 md:py-18"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("companies.eyebrow")}
          title={t("companies.title")}
          description="Партнёрства, объединяющие спорт, технологии, образование и прикладные исследования."
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="mt-9 grid border border-black/15 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((company, index) => (
            <article key={company.name} className="group flex min-h-[190px] flex-col border-b border-black/15 p-5 transition-colors hover:bg-black/[0.035] sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-bold tracking-[0.16em] text-[#ef5a16] uppercase">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>Partner</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-black leading-[1.02] tracking-[-0.045em] text-[#111318] uppercase">{company.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/58">{company.description}</p>
              <a href={company.href} target="_blank" rel="noreferrer" className="mt-auto flex items-center gap-2 pt-5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#111318] underline decoration-[#ef5a16] decoration-2 underline-offset-4 transition-colors hover:text-[#ef5a16]">
                Сайт <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
