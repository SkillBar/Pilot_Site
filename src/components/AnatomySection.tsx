"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";
import { cn } from "@/lib/utils";

type PartId = "camera" | "video" | "radio" | "battery" | "drive";

const PARTS: {
  id: PartId;
  cx: number;
  cy: number;
  code: string;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  {
    id: "camera",
    cx: 618,
    cy: 118,
    code: "01",
    titleKey: "anatomy.parts.camera.title",
    textKey: "anatomy.parts.camera.text",
  },
  {
    id: "video",
    cx: 470,
    cy: 98,
    code: "02",
    titleKey: "anatomy.parts.video.title",
    textKey: "anatomy.parts.video.text",
  },
  {
    id: "radio",
    cx: 340,
    cy: 92,
    code: "03",
    titleKey: "anatomy.parts.radio.title",
    textKey: "anatomy.parts.radio.text",
  },
  {
    id: "battery",
    cx: 250,
    cy: 148,
    code: "04",
    titleKey: "anatomy.parts.battery.title",
    textKey: "anatomy.parts.battery.text",
  },
  {
    id: "drive",
    cx: 160,
    cy: 188,
    code: "05",
    titleKey: "anatomy.parts.drive.title",
    textKey: "anatomy.parts.drive.text",
  },
];

export function AnatomySection() {
  const t = useTranslations();
  const [active, setActive] = useState<PartId>("camera");
  const activePart = PARTS.find((part) => part.id === active) ?? PARTS[0];

  return (
    <section
      id="system"
      className="anatomy-section relative overflow-hidden border-t border-line px-5 py-16 md:px-8 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("anatomy.eyebrow")}
          title={t("anatomy.title")}
          description={t("anatomy.description")}
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-12">
          <div className="anatomy-stage relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-4 left-[16%] right-[10%] border-x border-white/[0.06]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-white/[0.06]"
            />

            <svg
              viewBox="0 0 720 280"
              className="relative z-10 h-auto w-full"
              role="img"
              aria-label={t("anatomy.title")}
            >
              <defs>
                <linearGradient id="anatomy-body" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c9d2dc" />
                  <stop offset="42%" stopColor="#8b97a6" />
                  <stop offset="100%" stopColor="#3d4654" />
                </linearGradient>
                <linearGradient id="anatomy-glass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8f1ff" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#3b82ff" stopOpacity="0.18" />
                </linearGradient>
                <radialGradient id="anatomy-cut" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#f4f7fb" />
                  <stop offset="70%" stopColor="#d7dee8" />
                  <stop offset="100%" stopColor="#9aa6b5" />
                </radialGradient>
                <clipPath id="anatomy-shell">
                  <path d="M120 188 C145 132 210 108 290 102 L430 96 C520 92 585 108 640 148 L668 188 L650 208 L138 208 Z" />
                </clipPath>
              </defs>

              {/* wireframe ends */}
              <g
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              >
                <path d="M92 190 C110 150 140 128 176 118 L210 112" />
                <path d="M108 208 H176" />
                <path d="M640 148 L678 176 L690 208 H650" />
                <path d="M656 160 L700 160" />
                <circle cx="150" cy="208" r="26" />
                <circle cx="150" cy="208" r="10" />
                <circle cx="590" cy="208" r="26" />
                <circle cx="590" cy="208" r="10" />
              </g>

              {/* realistic center body */}
              <path
                d="M176 188 C198 140 240 112 308 104 L448 98 C520 94 575 112 628 152 L648 188 L630 208 L190 208 Z"
                fill="url(#anatomy-body)"
                opacity="0.95"
              />
              <path
                d="M320 106 L382 104 L410 148 L318 150 Z"
                fill="url(#anatomy-glass)"
              />
              <path
                d="M420 104 L490 106 L505 148 L418 148 Z"
                fill="url(#anatomy-glass)"
                opacity="0.7"
              />

              {/* cutaway circle reveal */}
              <g clipPath="url(#anatomy-shell)">
                <circle
                  cx="430"
                  cy="150"
                  r="58"
                  fill="url(#anatomy-cut)"
                  opacity="0.96"
                />
                <circle
                  cx="430"
                  cy="150"
                  r="58"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="2"
                />
                <circle
                  cx="430"
                  cy="150"
                  r="42"
                  fill="none"
                  stroke="rgba(11,16,32,0.18)"
                  strokeWidth="1"
                />
                {/* mini board stack inside cutaway */}
                <rect
                  x="402"
                  y="128"
                  width="56"
                  height="10"
                  rx="1.5"
                  fill="#1a2332"
                />
                <rect
                  x="408"
                  y="142"
                  width="44"
                  height="8"
                  rx="1"
                  fill="#3b82ff"
                  opacity="0.85"
                />
                <rect
                  x="414"
                  y="154"
                  width="32"
                  height="8"
                  rx="1"
                  fill="#16c1ae"
                  opacity="0.8"
                />
                <circle cx="418" cy="133" r="2" fill="#3dff9a" />
                <circle cx="448" cy="133" r="2" fill="#ff5a5a" />
              </g>

              {/* wheels filled */}
              <g>
                <circle cx="230" cy="208" r="28" fill="#0b1018" stroke="#8b97a6" strokeWidth="2.5" />
                <circle cx="230" cy="208" r="11" fill="#2a3340" />
                <circle cx="545" cy="208" r="28" fill="#0b1018" stroke="#8b97a6" strokeWidth="2.5" />
                <circle cx="545" cy="208" r="11" fill="#2a3340" />
              </g>

              {/* camera pod */}
              <g>
                <rect
                  x="608"
                  y="138"
                  width="30"
                  height="18"
                  rx="2"
                  fill="#d7e4f5"
                />
                <circle cx="623" cy="147" r="5.5" fill="#061018" />
                <circle cx="623" cy="147" r="2.2" fill="#3dff9a" />
              </g>

              {/* hotspot markers */}
              {PARTS.map((part) => {
                const isActive = part.id === active;
                return (
                  <g key={part.id} className="anatomy-hotspot">
                    <line
                      x1={part.cx}
                      y1={part.cy}
                      x2={part.cx + (part.cx > 400 ? 28 : -28)}
                      y2={part.cy - 28}
                      stroke={isActive ? "#3b82ff" : "rgba(255,255,255,0.2)"}
                      strokeWidth="1"
                    />
                    <circle
                      cx={part.cx}
                      cy={part.cy}
                      r={isActive ? 11 : 8}
                      fill={isActive ? "#3b82ff" : "rgba(10,14,20,0.9)"}
                      stroke={isActive ? "#9ec1ff" : "rgba(255,255,255,0.35)"}
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActive(part.id)}
                      onMouseEnter={() => setActive(part.id)}
                    />
                    <text
                      x={part.cx}
                      y={part.cy + 3.5}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill={isActive ? "#fff" : "rgba(255,255,255,0.7)"}
                      fontSize="8"
                      fontFamily="ui-monospace, monospace"
                      fontWeight="700"
                    >
                      {part.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="anatomy-panel relative border border-line bg-[color-mix(in_srgb,var(--bg-elevated)_88%,transparent)] p-5 md:p-6">
            <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
              MODULE {activePart.code}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-fg">
              {t(activePart.titleKey)}
            </h3>
            <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
              {t(activePart.textKey)}
            </p>

            <ul className="mt-6 space-y-1.5">
              {PARTS.map((part) => {
                const isActive = part.id === active;
                return (
                  <li key={part.id}>
                    <button
                      type="button"
                      onClick={() => setActive(part.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-left font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
                        isActive
                          ? "bg-accent/15 text-accent"
                          : "text-muted hover:bg-white/[0.04] hover:text-fg",
                      )}
                    >
                      <span className="tabular-nums opacity-70">{part.code}</span>
                      <span>{t(part.titleKey)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
