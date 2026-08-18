import Image from "next/image";

const circuits = [
  {
    country: "ОАЭ",
    venue: "Яс Марина",
    background: "/tracks/yas-marina-bg.webp",
    circuit: "/tracks/yas-marina.webp",
    glow: "#1bd7ff",
  },
  {
    country: "Грозный",
    venue: "Крепость Грозная",
    background: "/tracks/grozny-bg.webp",
    circuit: "/tracks/grozny.webp",
    glow: "#19e88a",
  },
  {
    country: "Сочи",
    venue: "Сочи Автодром",
    background: "/tracks/sochi-bg.webp",
    circuit: "/tracks/sochi.webp",
    glow: "#2658ff",
  },
  {
    country: "Казань",
    venue: "Казань Ринг",
    background: "/tracks/kazan-bg.webp",
    circuit: "/tracks/kazan.webp",
    glow: "#a94cff",
  },
  {
    country: "Беларусь",
    venue: "Минская кольцевая",
    background: "/tracks/minsk-bg.webp",
    circuit: "/tracks/minsk.webp",
    glow: "#ff3028",
  },
  {
    country: "Бразилия",
    venue: "Интерлагос",
    background: "/tracks/interlagos-bg.webp",
    circuit: "/tracks/interlagos.webp",
    glow: "#ff9a18",
  },
] as const;

export function CircuitCalendarSection() {
  return (
    <section
      id="circuit-calendar"
      className="relative overflow-hidden bg-[#08090b] px-5 py-16 text-white md:px-8 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="relative mx-auto max-w-[1480px]">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/20 pb-8 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#ef5a16] uppercase">
              Pilot / Race Week
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,2.5vw,2.35rem)] font-black leading-[1.12] tracking-[-0.03em] uppercase">
              Трассы сезона
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs leading-relaxed text-white/55">
            Шесть городов. Шесть конфигураций. Одна стартовая решётка Pilot.
          </p>
        </div>

        <div className="grid gap-px bg-white/20 md:grid-cols-2 xl:grid-cols-3">
          {circuits.map((track, index) => (
            <article
              key={track.venue}
              className="group relative aspect-[3/4] min-h-[440px] overflow-hidden bg-[#0c0d10]"
            >
              <Image
                src={track.background}
                alt=""
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.04)_38%,rgba(0,0,0,0.18)_100%)]" />

              <div className="relative z-10 flex h-full flex-col p-5 sm:p-7">
                <div className="flex items-center justify-between border-y border-white/30 py-2 font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/75">
                  <span>Race week</span>
                  <span>0{index + 1} / 06</span>
                </div>

                <div className="relative flex flex-1 items-center justify-center px-1 py-7">
                  <Image
                    src={track.circuit}
                    alt={`Контур трассы ${track.venue}`}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 88vw"
                    className="object-contain mix-blend-screen transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{
                      filter: `drop-shadow(0 0 5.6px ${track.glow}) drop-shadow(0 0 16.8px ${track.glow})`,
                    }}
                  />
                </div>

                <div className="border-t border-white/30 pt-4">
                  <p className="font-display text-[clamp(2.55rem,5vw,4.8rem)] font-black leading-[0.8] tracking-[-0.075em] uppercase">
                    {track.country}
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-white/80 uppercase">
                      {track.venue}
                    </p>
                    <span className="font-mono text-[9px] tracking-[0.18em] text-white/50 uppercase">
                      Pilot 2026
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
