"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const FleetShowcaseCanvas = dynamic(
  () =>
    import("@/features/three/fleet-showcase-canvas").then(
      (module) => module.FleetShowcaseCanvas,
    ),
  { ssr: false },
);

const compactQuery = "(max-width: 899px)";

function subscribeToMobile(callback: () => void) {
  const query = window.matchMedia(compactQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(compactQuery).matches;
}

const scaleModels = [
  {
    scale: "1:64",
    displayName: "Dodge",
    visualYOffset: 0.52,
    label: "Dodge, масштаб 1 к 64",
    modelUrl: "/three/models/dodge.web.glb",
    motionModelUrl: "/three/models/dodge.motion.glb",
  },
  {
    scale: "1:43",
    displayName: "Jeep",
    visualYOffset: 0,
    label: "Jeep, масштаб 1 к 43",
    modelUrl: "/three/models/meshy-ai-jeep.web.glb",
    motionModelUrl: "/three/models/meshy-ai-jeep.motion.glb",
  },
  {
    scale: "1:24",
    displayName: "Нива",
    visualYOffset: 0,
    label: "Нива, масштаб 1 к 24",
    modelUrl: "/three/models/meshy-scale-24.web.glb",
    motionModelUrl: "/three/models/meshy-scale-24.motion.glb",
  },
  {
    scale: "1:10",
    displayName: "Nissan",
    visualYOffset: 0.56,
    label: "Nissan, масштаб 1 к 10",
    modelUrl: "/three/models/meshy-scale-10.web.glb",
    motionModelUrl: "/three/models/meshy-scale-10.motion.glb",
  },
] as const;

export function ScaleShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldMount3D, setShouldMount3D] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    () => false,
  );

  useEffect(() => {
    let cancelled = false;

    void import("@/features/three/fleet-showcase-canvas").then((module) => {
      module.preloadFleetModels(scaleModels);
      if (!cancelled) setShouldMount3D(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scale"
      className="relative overflow-hidden border-y border-black/10 bg-[#f2f2f0] px-5 py-16 text-[#111318] md:px-8 md:py-24"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rotate-12 bg-[#ef5a16] opacity-90 [clip-path:polygon(45%_0,58%_34%,100%_20%,66%_48%,100%_70%,59%_60%,51%_100%,39%_64%,0_82%,31%_53%,0_30%,39%_40%)]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="border-b border-black/15 pb-8">
          <h2 className="max-w-4xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            Выберите свой масштаб
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-base leading-[1.55] text-black/65 md:text-lg">
            Четыре формата одной экосистемы. Вращайте модель и выберите масштаб,
            с которого начнётся ваша гонка.
          </p>
        </div>

        <div className="relative mt-4 h-[340px] overflow-hidden border-x border-black/10 bg-[#f7f7f5] md:mt-8 md:h-[460px]">
          <span className="pointer-events-none absolute right-4 top-2 z-[1] font-display text-[clamp(4rem,12vw,11rem)] font-black tracking-[-0.08em] text-black/[0.035] uppercase">
            Pilot
          </span>
          {shouldMount3D ? (
            <FleetShowcaseCanvas
              models={scaleModels}
              activeIndex={activeIndex}
              activeOnly={isMobile}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(17,19,24,0.06),transparent_58%)]" aria-hidden />
          )}
        </div>

        <div className="grid grid-cols-2 border-x border-black/10 lg:grid-cols-4">
          {scaleModels.map((item, index) => (
            <button
              type="button"
              key={item.scale}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              aria-label={`Выбрать ${item.displayName}, масштаб ${item.scale}`}
              className={`group relative min-w-0 border-b border-r border-black/10 px-4 py-4 text-left transition-colors duration-300 odd:border-l-0 even:border-r-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-5 lg:last:border-r-0 ${index === activeIndex ? "bg-[#111318] text-white" : "bg-[#f7f7f5] hover:bg-white"}`}
            >
              <div className="flex justify-end">
                <span className={`size-2 rounded-full ${index === activeIndex ? "bg-[#ef5a16] shadow-[0_0_16px_rgba(239,90,22,0.8)]" : "bg-black/15"}`}>
                </span>
              </div>
              <div className="mt-4 flex min-h-[68px] flex-col items-end justify-end gap-1 sm:min-h-[44px] sm:flex-row sm:items-end sm:justify-between sm:gap-3">
                <span className="max-w-full font-display text-[clamp(0.875rem,1.35vw,1.125rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-current text-balance">
                  {item.displayName}
                </span>
                <strong className="shrink-0 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-none tracking-[-0.07em] text-[#ef5a16] tabular-nums">
                  {item.scale}
                </strong>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
