"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";
import { cn } from "@/lib/utils";

type StepId = "car" | "link" | "vision" | "pilot" | "launcher" | "grid";

const STEPS: {
  id: StepId;
  code: string;
  titleKey: MessageKey;
  textKey: MessageKey;
}[] = [
  {
    id: "car",
    code: "01",
    titleKey: "stack.steps.car.title",
    textKey: "stack.steps.car.text",
  },
  {
    id: "link",
    code: "02",
    titleKey: "stack.steps.link.title",
    textKey: "stack.steps.link.text",
  },
  {
    id: "vision",
    code: "03",
    titleKey: "stack.steps.vision.title",
    textKey: "stack.steps.vision.text",
  },
  {
    id: "pilot",
    code: "04",
    titleKey: "stack.steps.pilot.title",
    textKey: "stack.steps.pilot.text",
  },
  {
    id: "launcher",
    code: "05",
    titleKey: "stack.steps.launcher.title",
    textKey: "stack.steps.launcher.text",
  },
  {
    id: "grid",
    code: "06",
    titleKey: "stack.steps.grid.title",
    textKey: "stack.steps.grid.text",
  },
];

export function TechStackSection() {
  const t = useTranslations();
  const [active, setActive] = useState<StepId>("car");
  const activeIndex = Math.max(
    STEPS.findIndex((step) => step.id === active),
    0,
  );
  const activeStep = STEPS[activeIndex];

  return (
    <section
      id="stack"
      className="stack-section relative overflow-hidden border-t border-line px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("stack.eyebrow")}
          title={t("stack.title")}
          description={t("stack.description")}
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:gap-10">
          <div className="stack-stage relative border border-line bg-[color-mix(in_srgb,var(--bg-elevated)_70%,transparent)] p-5 md:p-8">
            <svg
              viewBox="0 0 720 320"
              className="h-auto w-full"
              role="img"
              aria-label={t("stack.title")}
            >
              <defs>
                <linearGradient id="stack-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82ff" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#16c1ae" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3b82ff" stopOpacity="0.15" />
                </linearGradient>
                <filter id="stack-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* backbone */}
              <path
                d="M55 160 H665"
                stroke="url(#stack-line)"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="stack-pulse"
                d="M55 160 H665"
                stroke="#4fffe6"
                strokeWidth="2"
                strokeDasharray="18 220"
                fill="none"
                opacity="0.85"
              />

              {/* nodes */}
              {STEPS.map((step, index) => {
                const x = 55 + index * 122;
                const isActive = step.id === active;
                const label = t(step.titleKey);
                const isLongLabel = label.length > 12;
                return (
                  <g
                    key={step.id}
                    className="cursor-pointer"
                    onClick={() => setActive(step.id)}
                    onMouseEnter={() => setActive(step.id)}
                  >
                    <circle
                      cx={x}
                      cy={160}
                      r={isActive ? 28 : 22}
                      fill={isActive ? "#0b2a28" : "#0a0e14"}
                      stroke={isActive ? "#16c1ae" : "rgba(255,255,255,0.22)"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      filter={isActive ? "url(#stack-glow)" : undefined}
                      className="transition-all duration-300"
                    />
                    <text
                      x={x}
                      y={165}
                      textAnchor="middle"
                      fill={isActive ? "#fff" : "rgba(255,255,255,0.65)"}
                      fontSize="11"
                      fontFamily="ui-monospace, monospace"
                      fontWeight="700"
                      className="pointer-events-none select-none"
                    >
                      {step.code}
                    </text>
                    <text
                      x={x}
                      y={210}
                      textAnchor="middle"
                      fill={isActive ? "#9ec1ff" : "rgba(255,255,255,0.45)"}
                      fontSize={isLongLabel ? "8" : "10"}
                      fontFamily="ui-monospace, monospace"
                      letterSpacing={isLongLabel ? "0.6" : "1.5"}
                      className="pointer-events-none select-none uppercase"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* side glyphs */}
              <g
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
                aria-hidden
              >
                <path d="M33 132 h24 v18 h-10 l-6 8 v-8 h-8 z" />
                <circle cx="687" cy="148" r="10" />
                <path d="M677 148 h20 M687 138 v20" />
              </g>
            </svg>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              <span>{t("stack.flowFrom")}</span>
              <span className="text-accent">{t("stack.flowLive")}</span>
              <span>{t("stack.flowTo")}</span>
            </div>
          </div>

          <div className="stack-panel border border-line bg-[color-mix(in_srgb,var(--bg-elevated)_88%,transparent)] p-5 md:p-6">
            <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
              LAYER {activeStep.code}
            </p>
            <h3 className="mt-3 font-display text-xl font-bold text-fg md:text-2xl">
              {t(activeStep.titleKey)}
            </h3>
            <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
              {t(activeStep.textKey)}
            </p>

            <ol className="mt-7 space-y-1.5">
              {STEPS.map((step) => {
                const isActive = step.id === active;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => setActive(step.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-left font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
                        isActive
                          ? "bg-accent/15 text-accent"
                          : "text-muted hover:bg-white/[0.04] hover:text-fg",
                      )}
                    >
                      <span className="tabular-nums opacity-70">{step.code}</span>
                      <span>{t(step.titleKey)}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
