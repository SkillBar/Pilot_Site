"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";

const leaders = [
  {
    rank: "02",
    name: "Алексей",
    surname: "Морозов",
    roleKey: "hardware" as const,
    code: "HW",
    initials: "АМ",
    accent: "#2b71ff",
  },
  {
    rank: "01",
    name: "Максим",
    surname: "Волков",
    roleKey: "founder" as const,
    code: "CEO",
    initials: "МВ",
    accent: "#7857ff",
    featured: true,
  },
  {
    rank: "03",
    name: "Илья",
    surname: "Соколов",
    roleKey: "game" as const,
    code: "GAME",
    initials: "ИС",
    accent: "#00a6e8",
  },
];

const crew = [
  {
    rank: "04",
    code: "FPV",
    name: "Антон Лебедев",
    roleKey: "race" as const,
    score: "96",
  },
  {
    rank: "05",
    code: "UX",
    name: "Мария Орлова",
    roleKey: "design" as const,
    score: "88",
  },
  {
    rank: "06",
    code: "NET",
    name: "Денис Крылов",
    roleKey: "backend" as const,
    score: "82",
  },
  {
    rank: "07",
    code: "EDU",
    name: "Анна Белова",
    roleKey: "education" as const,
    score: "75",
  },
  {
    rank: "08",
    code: "OPS",
    name: "Павел Романов",
    roleKey: "operations" as const,
    score: "64",
  },
];

export function TeamSection() {
  const t = useTranslations();

  return (
    <section
      id="team"
      className="team-race-bg relative isolate overflow-hidden px-5 py-16 text-[#090b10] md:px-8 md:py-24"
    >
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <rect width="1600" height="1200" fill="#f0f1f3" />

        <g fill="none" strokeLinecap="round">
          <path
            d="M-180 115 C300 35 910 10 1780 -125"
            stroke="#dfe1e4"
            strokeWidth="42"
          />
          <path
            d="M-170 205 C350 105 965 75 1770 -40"
            stroke="#fafafa"
            strokeWidth="54"
          />
          <path
            d="M-160 300 C385 175 1040 135 1770 42"
            stroke="#dfe1e4"
            strokeWidth="48"
          />
          <path
            d="M-160 384 C430 245 1090 208 1770 130"
            stroke="#f9f9fa"
            strokeWidth="58"
          />
        </g>

        <path
          d="M-220 620 C220 500 620 330 1040 220 C1270 160 1500 130 1760 120 L1760 315 C1490 330 1250 365 1010 430 C610 540 260 690 -220 820 Z"
          fill="#e0e2e5"
          opacity="0.72"
        />
        <path
          d="M-220 725 C260 585 650 430 1050 330 C1300 268 1530 248 1760 250 L1760 360 C1500 360 1295 390 1080 446 C670 554 300 708 -220 880 Z"
          fill="#f8f8f9"
          opacity="0.94"
        />
        <path
          d="M-200 1015 C190 860 560 770 955 700 C1230 650 1490 630 1770 635 L1770 810 C1495 805 1250 830 1000 880 C620 955 260 1055 -200 1215 Z"
          fill="#d9dce0"
          opacity="0.52"
        />
        <path
          d="M-180 1125 C240 970 630 890 1030 835 C1300 798 1530 795 1760 820 L1760 930 C1510 908 1285 915 1060 950 C660 1010 285 1095 -180 1260 Z"
          fill="#fafafa"
          opacity="0.9"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("team.title")}
          description={t("team.description")}
          className="[&_.section-display-title]:!text-black"
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="mx-auto mt-12 grid max-w-5xl items-end gap-2 md:mt-16 md:grid-cols-3">
          {leaders.map((member) => (
            <article
              key={member.rank}
              className={`team-leader-card relative overflow-hidden bg-black text-white ${
                member.featured ? "md:-translate-y-8" : ""
              }`}
            >
              <div
                className="relative flex h-60 items-end justify-center overflow-hidden md:h-72"
                style={{
                  background: `radial-gradient(circle at 50% 35%, ${member.accent} 0%, #111523 44%, #050609 76%)`,
                }}
              >
                <span className="absolute -left-2 top-0 font-display text-[8rem] font-black leading-none text-white/12 md:text-[10rem]">
                  {member.rank}
                </span>
                <div className="team-avatar relative mb-[-12px] flex h-48 w-48 items-center justify-center rounded-full border border-white/20 bg-black/35 shadow-[0_0_50px_rgba(0,0,0,.55)] md:h-56 md:w-56">
                  <span className="font-display text-5xl font-black tracking-[-0.08em] text-white md:text-6xl">
                    {member.initials}
                  </span>
                  <span className="absolute bottom-9 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-white/70 uppercase backdrop-blur">
                    {t(`team.roles.${member.roleKey}`)}
                  </span>
                </div>
                <span className="absolute right-4 top-4 font-mono text-[10px] font-bold tracking-[0.14em] text-white/65">
                  {member.code}
                </span>
              </div>

              <div className="flex items-end justify-between gap-4 px-4 py-4">
                <div>
                  <p className="font-display text-sm font-bold tracking-[0.04em]">
                    {member.name}
                  </p>
                  <p className="font-display text-lg font-black tracking-[-0.02em]">
                    {member.surname}
                  </p>
                </div>
                <p className="font-display text-3xl font-black">{member.rank}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-2 max-w-5xl space-y-1.5">
          {crew.map((member) => (
            <article
              key={member.rank}
              className="team-rank-row grid grid-cols-[42px_54px_1fr_auto] items-center gap-2 bg-black px-3 py-2.5 text-white sm:grid-cols-[54px_72px_1fr_150px_58px] md:px-5"
            >
              <span className="font-display text-xl font-black">
                {member.rank}
              </span>
              <span className="rounded-sm bg-[#1769ff] px-2 py-1 text-center font-display text-[11px] font-black tracking-[0.08em]">
                {member.code}
              </span>
              <span className="truncate font-display text-xs font-bold sm:text-base">
                {member.name}
              </span>
              <span className="hidden text-right font-mono text-[10px] tracking-[0.08em] text-white/55 uppercase sm:block">
                {t(`team.roles.${member.roleKey}`)}
              </span>
              <span className="text-right font-display text-lg font-black">
                {member.score}
              </span>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] tracking-[0.18em] text-black/45 uppercase">
          {t("team.footer")}
        </p>
      </div>
    </section>
  );
}
