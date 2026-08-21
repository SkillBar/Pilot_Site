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
        <div className="mb-4 border-b border-white/20 pb-8 md:mb-8">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            Трассы сезона
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-base leading-[1.55] text-white/70 md:text-lg">
            Шесть городов. Шесть конфигураций. Одна стартовая решётка Pilot.
          </p>
        </div>

        <div className="grid gap-px bg-white/20 md:grid-cols-2 xl:grid-cols-3">
          {circuits.map((track) => (
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
                <div className="relative flex flex-1 items-center justify-center px-1 py-9">
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
                  <p className="font-display text-[clamp(2.15rem,4vw,3.9rem)] font-extrabold leading-[0.86] tracking-[-0.065em] uppercase">
                    {track.country}
                  </p>
                  <p className="mt-3 font-sans text-base font-bold leading-tight text-white/90 md:text-xl">
                    {track.venue}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
