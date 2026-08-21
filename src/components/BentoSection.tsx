"use client";

import Image from "next/image";
import {
  ArrowRight,
  Cpu,
  Gauge,
  Glasses,
  Globe2,
  Monitor,
  Smartphone,
  Store,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RaceCheckers } from "@/components/RaceCheckers";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const MODES: MessageKey[] = [
  "bento.modes.drift",
  "bento.modes.formula",
  "bento.modes.city",
  "bento.modes.free",
];

const PLATFORMS: {
  key: MessageKey;
  Icon: typeof Monitor;
}[] = [
  { key: "bento.platforms.pc", Icon: Monitor },
  { key: "bento.platforms.mobile", Icon: Smartphone },
  { key: "bento.platforms.vr", Icon: Glasses },
  { key: "bento.platforms.kiosk", Icon: Store },
];

const LEADERS = [
  { position: "01", name: "EINSTEIN", gap: "LEADER", color: "#ef5a16" },
  { position: "02", name: "NEWTON", gap: "+0.284", color: "#1769ff" },
  { position: "03", name: "BOHR", gap: "+0.617", color: "#16a34a" },
  { position: "04", name: "FEYNMAN", gap: "+1.042", color: "#7857ff" },
] as const;

function BentoArrow({ href = "#download" }: { href?: string }) {
  return (
    <a href={href} className="bento-arrow" aria-label="Open">
      <ArrowRight size={16} strokeWidth={2.4} />
    </a>
  );
}

export function BentoSection() {
  const t = useTranslations();

  return (
    <section
      id="bento"
      className="bento-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <RaceCheckers dark className="race-checkers--bottom-left" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("bento.title")}
          description={t("bento.description")}
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="bento-grid mt-12 md:mt-16">
          <article className="bento-card bento-card--wide bento-card--media">
            <Image
              src="/Main.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="bento-card-img object-cover"
            />
            <div className="bento-card-shade" />
            <div className="bento-card-body">
              <h3>{t("bento.cards.universe.title")}</h3>
              <p>{t("bento.cards.universe.text")}</p>
              <BentoArrow />
            </div>
          </article>

          <article className="bento-card">
            <div className="bento-card-body">
              <h3>{t("bento.cards.modes.title")}</h3>
              <div className="bento-modes">
                {MODES.map((mode) => (
                  <div key={mode} className="bento-mode">
                    <Gauge size={18} strokeWidth={1.8} />
                    <span>{t(mode)}</span>
                  </div>
                ))}
              </div>
              <BentoArrow />
            </div>
          </article>

          <article className="bento-card bento-card--dark">
            <div className="bento-card-body">
              <h3>{t("bento.cards.physics.title")}</h3>
              <p>{t("bento.cards.physics.text")}</p>
              <div className="bento-orb" aria-hidden />
              <BentoArrow href="#system" />
            </div>
          </article>

          <article className="bento-card">
            <div className="bento-card-body">
              <h3 className="bento-card-title-stack">
                {t("bento.cards.platforms.title")}
              </h3>
              <div className="bento-platforms">
                {PLATFORMS.map(({ key, Icon }) => (
                  <div key={key} className="bento-platform">
                    <Icon size={28} strokeWidth={1.5} />
                    <span>{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="bento-card bento-card--wide bento-card--soft">
            <div className="bento-card-body bento-card-body--split">
              <div>
                <h3>{t("bento.cards.build.title")}</h3>
                <p>{t("bento.cards.build.text")}</p>
                <div className="bento-swatches" aria-hidden>
                  <span style={{ background: "#111318" }} />
                  <span style={{ background: "#ef5a16" }} />
                  <span style={{ background: "#1769ff" }} />
                  <span style={{ background: "#e8e9ec" }} />
                </div>
                <BentoArrow />
              </div>
              <div className="bento-silhouette" aria-hidden />
            </div>
          </article>

          <article className="bento-card">
            <div className="bento-card-body">
              <h3>{t("bento.cards.friends.title")}</h3>
              <p>{t("bento.cards.friends.text")}</p>
              <div className="bento-avatars" aria-hidden>
                <span>DZ</span>
                <span>EX</span>
                <span>KA</span>
                <Users size={16} className="bento-avatars-icon" />
              </div>
              <BentoArrow />
            </div>
          </article>

          <article className="bento-card bento-card--wide bento-card--race-control">
            <div className="bento-race-head">
              <div>
                <h3>{t("bento.cards.raceControl.title")}</h3>
              </div>
              <span className="bento-race-live">
                <i />
                LIVE
              </span>
            </div>

            <div className="bento-race-layout">
              <div className="bento-leaderboard">
                <div className="bento-race-label">
                  {t("bento.cards.raceControl.leaderboard")}
                </div>
                {LEADERS.map((leader) => (
                  <div key={leader.position} className="bento-leader-row">
                    <span className="bento-leader-pos">{leader.position}</span>
                    <i style={{ backgroundColor: leader.color }} />
                    <strong>{leader.name}</strong>
                    <span>{leader.gap}</span>
                  </div>
                ))}
              </div>

              <div className="bento-circuit-panel">
                <div className="bento-race-label">
                  {t("bento.cards.raceControl.circuit")}
                </div>
                <svg
                  className="bento-circuit"
                  viewBox="0 0 420 230"
                  role="img"
                  aria-label={t("bento.cards.raceControl.circuit")}
                >
                  <path
                    className="bento-circuit-grid"
                    d="M15 30H405M15 65H405M15 100H405M15 135H405M15 170H405M15 205H405M45 15V215M85 15V215M125 15V215M165 15V215M205 15V215M245 15V215M285 15V215M325 15V215M365 15V215"
                  />
                  <path
                    className="bento-circuit-line"
                    d="M76 78 C111 42 169 35 205 58 C232 76 243 102 271 105 C306 109 331 75 360 89 C388 103 380 139 350 150 C318 162 293 145 268 161 C243 178 231 202 193 198 C158 194 158 166 132 160 C107 154 79 176 58 156 C35 134 55 100 76 78 Z"
                  />
                  <circle cx="76" cy="78" r="5" className="bento-circuit-point" />
                  <circle cx="350" cy="150" r="5" className="bento-circuit-point" />
                  <path
                    className="bento-circuit-direction"
                    d="M182 194 l16 -14 l5 20 Z"
                  />
                </svg>
                <div className="bento-circuit-meta">
                  <span>12 LAPS</span>
                  <span>02:14.826 BEST</span>
                </div>
              </div>
            </div>
          </article>

          <article className="bento-card bento-card--map">
            <Image
              src="/world-map-light.svg"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 25vw"
              className="bento-map-img object-cover object-center opacity-40"
            />
            <div className="bento-card-body">
              <h3>{t("bento.cards.tracks.title")}</h3>
              <p>{t("bento.cards.tracks.text")}</p>
              <Globe2 className="bento-map-icon" size={22} strokeWidth={1.6} />
              <BentoArrow href="#world-map" />
            </div>
          </article>

          <article className="bento-card">
            <div className="bento-card-body">
              <h3>{t("bento.cards.tech.title")}</h3>
              <p>{t("bento.cards.tech.text")}</p>
              <Cpu className="bento-tech-icon" size={36} strokeWidth={1.4} />
              <BentoArrow href="#stack" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
