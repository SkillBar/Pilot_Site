"use client";

import Image from "next/image";
import { FaApple, FaSteam, FaWindows } from "react-icons/fa";
import Shuffle from "@/components/Shuffle";
import { useTranslations } from "@/i18n/client";

export function Hero() {
  const t = useTranslations();

  const platforms = [
    { id: "apple", label: t("hero.platformApple"), Icon: FaApple },
    { id: "windows", label: t("hero.platformWindows"), Icon: FaWindows },
    { id: "steam", label: t("hero.platformSteam"), Icon: FaSteam },
  ] as const;

  return (
    <section
      id="about"
      className="relative min-h-[calc(100svh-84px)] overflow-hidden px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16"
    >
      <Image
        src="/Main.png"
        alt=""
        fill
        preload
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

        <Shuffle
          text={t("hero.headline")}
          tag="h2"
          className="-mt-1 max-w-3xl font-display text-[clamp(1.35rem,3.4vw,2.35rem)] font-bold leading-[1.15] tracking-tight text-fg md:mt-0"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          rootMargin="0px"
          triggerOnce={true}
          triggerOnHover={true}
          respectReducedMotion={true}
          scrambleCharset="01ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ"
          colorFrom="rgba(94, 234, 212, 0.55)"
          colorTo="var(--fg)"
        />

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
                <Icon className="h-5 w-5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
