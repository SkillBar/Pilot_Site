"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import { cn } from "@/lib/utils";

type PartId = "camera" | "receiver" | "controller" | "radio" | "drive";

const PARTS: {
  id: PartId;
  code: string;
  title: string;
  text: string;
  specification: string;
  image: string;
  imageClassName?: string;
}[] = [
  {
    id: "camera",
    code: "01",
    title: "Видеокамера",
    text: "FPV-камера даёт пилоту живую картинку с трассы и помогает вести машину по траектории.",
    specification: "FPV / PAN-TILT",
    image: "/anatomy/camera.webp",
    imageClassName: "object-contain object-center",
  },
  {
    id: "receiver",
    code: "02",
    title: "Видеоресивер",
    text: "Принимает видеопоток, держит стабильный сигнал и передаёт изображение в систему пилота.",
    specification: "5.8 GHZ / DUAL ANTENNA",
    image: "/anatomy/video-receiver.webp",
    imageClassName: "object-contain object-center",
  },
  {
    id: "controller",
    code: "03",
    title: "Бортовой контроллер",
    text: "Координирует исполнительные узлы, телеметрию и базовую логику поведения машины.",
    specification: "ESP32 / TELEMETRY",
    image: "/anatomy/controller.webp",
    imageClassName: "object-contain object-center",
  },
  {
    id: "radio",
    code: "04",
    title: "Радиомодуль",
    text: "Принимает команды газа, руля и режима с пульта — без лишней задержки на трассе.",
    specification: "2.4 GHZ / COMMAND LINK",
    image: "/anatomy/radio-module.webp",
    imageClassName: "object-contain object-center",
  },
  {
    id: "drive",
    code: "05",
    title: "Привод и редуктор",
    text: "Силовой узел преобразует команды пилота в тягу и удерживает мини-тачку в гонке.",
    specification: "AWD / TORQUE SYSTEM",
    image: "/anatomy/drive.webp",
    imageClassName: "object-contain object-center",
  },
];

export function AnatomySection() {
  const t = useTranslations();
  const [active, setActive] = useState<PartId>("camera");
  const activePart = PARTS.find((part) => part.id === active) ?? PARTS[0];

  return (
    <section id="system" className="anatomy-section relative overflow-hidden border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeader
          title={t("anatomy.title")}
          description="Выбирайте модуль — покажем его роль в настоящем гоночном железе Pilot."
        />
      </div>

      <div className="anatomy-open-field relative z-10 mt-12 md:mt-16">
        <div
          id="anatomy-active-panel"
          className="anatomy-stage-open"
          role="region"
          aria-live="polite"
        >
          <div className="anatomy-metadata font-mono text-[10px] font-bold tracking-[0.16em] text-white/55 uppercase">
            <span>{activePart.specification}</span>
          </div>

          <div key={`visual-${activePart.id}`} className="anatomy-visual anatomy-fade-swap">
            <div className="relative h-full w-full">
              <Image
                src={activePart.image}
                alt={activePart.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={cn(
                  "drop-shadow-[0_24px_30px_rgba(0,0,0,0.65)]",
                  activePart.imageClassName,
                )}
              />
            </div>
          </div>

          <div key={`copy-${activePart.id}`} className="anatomy-copy anatomy-fade-swap">
            <div className="anatomy-title-slot">
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.035em] text-white text-balance">{activePart.title}</h3>
            </div>
            <p className="anatomy-description mt-3 max-w-[46ch] font-sans text-[15px] leading-[1.5] text-white/68 md:text-base">{activePart.text}</p>
          </div>

          <span aria-hidden className="anatomy-watermark pointer-events-none font-display text-7xl font-black tracking-[-0.1em] text-white/[0.045]">{activePart.code}</span>
        </div>

        <div className="anatomy-selector-shell">
          <ul className="anatomy-selector-rail" aria-label="Список компонентов машины">
            {PARTS.map((part) => {
              const isActive = part.id === active;
              return (
                <li key={part.id}>
                  <button
                    type="button"
                    onClick={() => setActive(part.id)}
                    aria-pressed={isActive}
                    aria-controls="anatomy-active-panel"
                    className={cn(
                      "anatomy-selector flex h-16 w-full items-center gap-3 px-4 py-3 text-left font-sans text-[15px] font-semibold transition-colors",
                      isActive
                        ? "bg-[#ef5a16] text-white"
                        : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white",
                    )}
                  >
                    <span className="font-mono text-xs font-bold tabular-nums opacity-70">{part.code}</span>
                    <span className="leading-[1.3]">{part.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
