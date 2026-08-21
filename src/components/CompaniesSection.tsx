"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";

const COMPANIES = [
  { name: "ФСП России", description: "Общероссийская спортивная федерация, развивающая и популяризирующая спортивное программирование.", href: "https://fsp-russia.ru/", logoSrc: "/partners/fsp-compact.svg", logoWidth: 345, logoHeight: 116, logoClassName: "max-h-[55px] max-w-[176px]" },
  { name: "Институт развития мозга", description: "Разработка нейроинтерфейсов, игр с использованием биометрии и когнитивных тренажёров.", href: "https://irm.ru/", logoSrc: "/partners/rudn-university.png", logoWidth: 1852, logoHeight: 551, logoClassName: "max-h-[52px] max-w-[176px]" },
  { name: "ВОСВОД России", description: "Всероссийское общество спасания на водах; взаимодействие в контексте безопасности на воде, образовательных и прикладных проектов.", href: "https://vosvod.com/", logoSrc: "/partners/vosvod-russia-180.png", logoWidth: 180, logoHeight: 180, logoClassName: "max-h-[68px] max-w-[68px]" },
  { name: "ФВСМ России", description: "Партнёрская организация в области водно-спасательного спорта, подготовки и профильных соревновательных инициатив.", href: "https://fvsmrus.ru/", logoSrc: "/partners/fvsm-mark-black.png", logoWidth: 1620, logoHeight: 419, logoClassName: "max-h-[55px] max-w-[190px]" },
  { name: "Сколтех", description: "Научно-технологическое и образовательное взаимодействие в рамках профильных проектных инициатив.", href: "https://www.skoltech.ru/", logoSrc: "/partners/skoltech-mark.png", logoWidth: 512, logoHeight: 512, logoClassName: "max-h-16 max-w-16" },
  { name: "НМИЦ им. В. А. Алмазова", description: "Научно-медицинская организация; взаимодействие в рамках исследовательских, технологических и междисциплинарных инициатив.", href: "https://www.almazovcentre.ru/", logoSrc: "/partners/almazov-mark.png", logoWidth: 425, logoHeight: 425, logoClassName: "max-h-[72px] max-w-[72px]" },
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
          title={t("companies.title")}
          description="Партнёрства, объединяющие спорт, технологии, образование и прикладные исследования."
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="mt-12 grid border border-black/15 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {COMPANIES.map((company, index) => (
            <article key={company.name} className="group flex min-h-[250px] flex-col border-b border-black/15 p-6 transition-colors hover:bg-black/[0.035] md:p-7 sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
              <div className="flex min-h-[72px] items-start gap-5">
                {"logoSrc" in company ? (
                  <Image
                    src={company.logoSrc}
                    alt=""
                    width={company.logoWidth}
                    height={company.logoHeight}
                    sizes="176px"
                    unoptimized={company.logoSrc.endsWith(".svg")}
                    className={`h-auto w-auto object-contain object-left-top ${company.logoClassName}`}
                  />
                ) : null}
                <span className="ml-auto font-mono text-[clamp(1.125rem,1.5vw,1.25rem)] font-bold tracking-[-0.03em] text-[#ef5a16]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[clamp(1.125rem,1.7vw,1.375rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-[#111318]">{company.name}</h3>
              <p className="mt-4 font-sans text-[15px] leading-[1.55] text-black/62 md:text-base">{company.description}</p>
              <a href={company.href} target="_blank" rel="noreferrer" className="mt-auto flex min-h-11 items-center gap-2 pt-5 font-sans text-sm font-bold text-[#111318] underline decoration-[#ef5a16] decoration-2 underline-offset-4 transition-colors hover:text-[#ef5a16] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef5a16]">
                Сайт <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
                <span className="sr-only">, откроется в новой вкладке</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
