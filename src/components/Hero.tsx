"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
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
  const prefersReducedMotion = useReducedMotion();

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
      <div className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-[1]" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <h1 className="reveal reveal-delay-1 mt-2">
          <Image
            src="/logo_big.svg"
            alt="PILOT"
            width={720}
            height={200}
            className="mx-auto h-[clamp(2rem,5vw,4rem)] w-auto object-contain"
            priority
          />
        </h1>

        <h2
          className="reveal reveal-delay-1 mt-2 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-[clamp(1.875rem,4.2vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-fg"
          aria-label={`${t("hero.headline")} ${t("hero.scalesAria")}`}
        >
          <span>{t("hero.headline")}</span>
          <RotatingText
            texts={SCALES}
            mainClassName="hero-scale-chip inline-flex h-[1.05em] w-[4.2em] min-w-[4.2em] shrink-0 items-center justify-center overflow-hidden rounded-[0.28em] bg-[#ef5a16] px-[0.45em] font-mono text-[0.72em] font-bold tracking-[0.22em] text-white uppercase align-middle tabular-nums"
            animatePresenceMode="sync"
            staggerFrom="last"
            initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: "100%" }}
            animate={{ y: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: "-120%" }}
            staggerDuration={prefersReducedMotion ? 0 : 0.015}
            splitLevelClassName="overflow-hidden pb-[0.05em]"
            transition={prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h2>

        <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          <a href="#download" className="btn-tech font-sans text-sm">
            <span>{t("hero.ctaDownload")}</span>
          </a>
          <a href="#investors" className="btn-ghost font-sans text-sm">
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
