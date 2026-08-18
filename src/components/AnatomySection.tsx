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

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("anatomy.eyebrow")}
          title={t("anatomy.title")}
          description="Выбирайте модуль — покажем его роль в настоящем гоночном железе Pilot."
        />

        <div className="mt-12 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:grid-rows-[540px]">
          <div className="relative min-h-[420px] overflow-hidden bg-[#0b0d11] p-5 sm:min-h-[540px] sm:p-8 lg:min-h-0 lg:h-full">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:38px_38px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(239,90,22,0.2),transparent_42%)]" />
            <div className="relative z-10 flex items-center justify-between border-y border-white/15 py-2 font-mono text-[9px] font-bold tracking-[0.18em] text-white/55 uppercase">
              <span>Module {activePart.code}</span>
              <span>{activePart.specification}</span>
            </div>

            <div className="relative z-10 mx-auto mt-2 h-[330px] max-w-[650px] sm:h-[390px]">
              <Image
                key={activePart.image}
                src={activePart.image}
                alt={activePart.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={cn(
                  "drop-shadow-[0_24px_30px_rgba(0,0,0,0.65)] transition-opacity duration-300",
                  activePart.imageClassName,
                )}
              />
            </div>

            <div className="pointer-events-none absolute bottom-5 left-5 z-10 sm:bottom-8 sm:left-8">
              <p className="font-mono text-[9px] tracking-[0.18em] text-white/45 uppercase">Inside Pilot</p>
              <p className="mt-1 font-display text-2xl font-black tracking-[-0.05em] text-white uppercase">{activePart.title}</p>
            </div>
            <span aria-hidden className="pointer-events-none absolute bottom-5 right-5 font-display text-7xl font-black tracking-[-0.1em] text-white/[0.05] sm:bottom-7 sm:right-8">{activePart.code}</span>
          </div>

          <div className="flex min-h-[540px] flex-col bg-[#111318] p-5 sm:p-7 lg:min-h-0 lg:h-full">
            <p className="font-mono text-[9px] font-bold tracking-[0.22em] text-[#ef5a16] uppercase">Что внутри машинки</p>
            <h3 className="mt-3 font-display text-3xl font-black tracking-[-0.06em] text-white uppercase">{activePart.title}</h3>
            <p className="mt-3 min-h-[4.5rem] font-mono text-sm leading-relaxed text-white/60">{activePart.text}</p>

            <div className="mt-6 border-y border-white/15 py-3 font-mono text-[9px] font-bold tracking-[0.16em] text-white/50 uppercase">
              {activePart.specification}
            </div>

            <ul className="mt-auto space-y-1.5 pt-5" aria-label="Список компонентов машины">
              {PARTS.map((part) => {
                const isActive = part.id === active;
                return (
                  <li key={part.id}>
                    <button
                      type="button"
                      onClick={() => setActive(part.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex w-full items-center gap-3 border-l px-3 py-3 text-left font-mono text-[10px] font-bold tracking-[0.1em] uppercase transition-colors",
                        isActive
                          ? "border-[#ef5a16] bg-[#ef5a16] text-white"
                          : "border-white/15 text-white/50 hover:border-white/65 hover:bg-white/[0.05] hover:text-white",
                      )}
                    >
                      <span className="tabular-nums opacity-70">{part.code}</span>
                      <span>{part.title}</span>
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
