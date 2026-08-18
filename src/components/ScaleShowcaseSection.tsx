"use client";

import { FleetShowcaseCanvas } from "@/features/three";
import { useEffect, useRef, useState } from "react";

const scaleModels = [
  {
    scale: "1:64",
    code: "PILOT / POCKET",
    title: "Городской спринт",
    modelUrl: "/three/models/dodge.hq.glb",
    motionModelUrl: "/three/models/dodge.motion.glb",
  },
  {
    scale: "1:43",
    code: "PILOT / STREET",
    title: "Свободный маршрут",
    modelUrl: "/three/models/meshy-ai-jeep.hq.glb",
    motionModelUrl: "/three/models/meshy-ai-jeep.motion.glb",
  },
  {
    scale: "1:24",
    code: "PILOT / RACING",
    title: "Трековая серия",
    modelUrl: "/three/models/meshy-scale-24.hq.glb",
    motionModelUrl: "/three/models/meshy-scale-24.motion.glb",
  },
  {
    scale: "1:10",
    code: "PILOT / PRO",
    title: "Большая лига",
    modelUrl: "/three/models/meshy-scale-10.hq.glb",
    motionModelUrl: "/three/models/meshy-scale-10.motion.glb",
  },
] as const;

export function ScaleShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldMount3D, setShouldMount3D] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setShouldMount3D(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldMount3D(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scale"
      className="relative overflow-hidden border-y border-black/10 bg-[#f2f2f0] px-5 py-16 text-[#111318] md:px-8 md:py-24"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rotate-12 bg-[#ef5a16] opacity-90 [clip-path:polygon(45%_0,58%_34%,100%_20%,66%_48%,100%_70%,59%_60%,51%_100%,39%_64%,0_82%,31%_53%,0_30%,39%_40%)]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-7 border-b border-black/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#ef5a16] uppercase">
              Коллекция Pilot
            </p>
            <h2 className="mt-3 max-w-4xl font-display text-[clamp(1.6rem,2.5vw,2.35rem)] font-black leading-[1.12] tracking-[-0.03em] uppercase">
              Выберите свой масштаб
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs leading-relaxed text-black/50 md:pb-1">
            Четыре формата одной экосистемы. Вращайте модель и выберите масштаб,
            с которого начнётся ваша гонка.
          </p>
        </div>

        <div className="relative h-[340px] overflow-hidden border-x border-black/10 bg-[#f7f7f5] md:h-[460px]">
          <span className="pointer-events-none absolute right-4 top-2 z-[1] font-display text-[clamp(4rem,12vw,11rem)] font-black tracking-[-0.08em] text-black/[0.035] uppercase">
            Pilot
          </span>
          {shouldMount3D ? (
            <FleetShowcaseCanvas
              models={scaleModels}
              activeIndex={activeIndex}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(17,19,24,0.06),transparent_58%)]" aria-hidden />
          )}
        </div>

        <div className="grid border-x border-black/10 sm:grid-cols-2 xl:grid-cols-4">
          {scaleModels.map((item, index) => (
            <button
              type="button"
              key={item.scale}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={`group relative min-w-0 border-b border-black/10 px-5 py-5 text-left transition-colors duration-300 sm:border-r xl:border-b-0 ${index === activeIndex ? "bg-[#111318] text-white" : "bg-[#f7f7f5] hover:bg-white"}`}
            >
              <div className="flex items-start justify-between">
                <span className={`font-mono text-[9px] font-bold tracking-[0.18em] ${index === activeIndex ? "text-white/35" : "text-black/40"}`}>
                  0{index + 1} / 04
                </span>
                <span className={`size-2 rounded-full ${index === activeIndex ? "bg-[#ef5a16] shadow-[0_0_16px_rgba(239,90,22,0.8)]" : "bg-black/15"}`}>
                </span>
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <p className={`font-mono text-[9px] font-bold tracking-[0.14em] uppercase ${index === activeIndex ? "text-white/45" : "text-black/40"}`}>
                  {item.title}
                </p>
                <strong className="font-display text-4xl font-black tracking-[-0.08em] text-[#ef5a16]">
                  {item.scale}
                </strong>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/80 bg-[#111318] px-5 py-3 text-white">
          <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/55">
            Digital race / Physical model / One Pilot ID
          </p>
          <p className="font-display text-sm font-black italic tracking-[-0.03em] uppercase">
            Играй. Собирай. Масштабируй.
          </p>
        </div>
      </div>
    </section>
  );
}
