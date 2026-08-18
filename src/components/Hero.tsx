"use client";

import Image from "next/image";
import {
  AppleIcon,
  SteamIcon,
  WindowsIcon,
} from "@/components/PlatformIcons";
import RotatingText from "@/components/RotatingText";
import { useTranslations } from "@/i18n/client";

const SCALES = ["1:64", "1:43", "1:24", "1:10", "1:8"];

export function Hero() {
  const t = useTranslations();

  const platforms = [
    { id: "apple", label: t("hero.platformApple"), Icon: AppleIcon },
    { id: "windows", label: t("hero.platformWindows"), Icon: WindowsIcon },
    { id: "steam", label: t("hero.platformSteam"), Icon: SteamIcon },
  ] as const;

  return (
    <section
      id="about"
      className="relative min-h-[calc(100svh-84px)] overflow-hidden px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16"
    >
      <Image
        src="/hero-race.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="reveal font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
          {t("hero.eyebrow")}
        </p>

        <h1 className="reveal reveal-delay-1 mt-5">
          <Image
            src="/logo_big.svg"
            alt="PILOT"
            width={720}
            height={200}
            className="mx-auto h-[clamp(1.5rem,4.7vw,3rem)] w-auto object-contain"
            priority
          />
        </h1>

        <h2
          className="reveal reveal-delay-1 -mt-1 flex max-w-4xl flex-wrap items-center justify-center gap-x-2.5 gap-y-2 font-display text-[clamp(1.35rem,3.4vw,2.35rem)] font-bold leading-[1.15] tracking-tight text-fg md:mt-0"
          aria-label={`${t("hero.headline")} ${t("hero.scalesAria")}`}
        >
          <span>{t("hero.headline")}</span>
          <RotatingText
            texts={SCALES}
            mainClassName="hero-scale-chip inline-flex h-[1.05em] min-w-[3.6em] items-center justify-center overflow-hidden rounded-[0.28em] bg-[#ef5a16] px-[0.45em] font-mono text-[0.72em] font-bold tracking-[0.22em] text-white uppercase align-middle"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-[0.05em]"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h2>

        <div className="reveal reveal-delay-3 mt-8 flex flex-wrap items-center justify-center gap-5">
          <a href="#download" className="btn-tech font-mono text-[12px]">
            <span>{t("hero.ctaDownload")}</span>
          </a>
          <a href="#investors" className="btn-ghost font-mono text-[12px]">
            <span>{t("hero.ctaInvestors")}</span>
          </a>
        </div>

        <ul
          className="reveal reveal-delay-3 mt-7 flex items-center justify-center gap-5"
          aria-label={t("hero.platformsAria")}
        >
          {platforms.map(({ id, label, Icon }) => (
            <li key={id}>
              <a
                href="#download"
                className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white"
                aria-label={label}
                title={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
