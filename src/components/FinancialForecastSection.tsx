"use client";

import { useState, type KeyboardEvent, type PointerEvent } from "react";

const months = ["M1", "M4", "M8", "M12", "M16", "M20", "M24"];
const chartWidth = 720;
const chartTop = 28;
const chartBottom = 215;

const scenarios = {
  base: {
    label: "Base",
    network: [4, 8, 18, 31, 47, 65, 85],
    monetization: [0, 5, 17, 35, 48, 70, 94],
    stages: [0, 1, 1, 3, 4, 5, 6],
  },
  growth: {
    label: "Growth",
    network: [5, 15, 31, 48, 65, 82, 100],
    monetization: [0, 14, 32, 57, 75, 91, 100],
    stages: [0, 1, 2, 3, 5, 6, 6],
  },
} as const;

const metrics = [
  { value: "06", label: "Трасс в календаре", accent: "text-[#ef5a16]" },
  { value: "04", label: "Потока монетизации", accent: "text-white" },
  { value: "24", label: "Месяца прогноза", accent: "text-[#ef5a16]" },
  { value: "B2B + B2C", label: "Модель продаж", accent: "text-white" },
] as const;

function pointX(index: number) {
  return (index / (months.length - 1)) * chartWidth;
}

function pointY(value: number) {
  return chartBottom - (value / 100) * (chartBottom - chartTop);
}

function linePath(values: readonly number[]) {
  return values
    .map((value, index) => `${index === 0 ? "M" : "L"}${pointX(index)} ${pointY(value)}`)
    .join(" ");
}

function areaPath(values: readonly number[]) {
  return `${linePath(values)} L${chartWidth} ${chartBottom} L0 ${chartBottom} Z`;
}

export function FinancialForecastSection() {
  const [scenarioKey, setScenarioKey] = useState<keyof typeof scenarios>("base");
  const [activePoint, setActivePoint] = useState(3);
  const scenario = scenarios[scenarioKey];
  const activeMonth = months[activePoint];
  const tooltipPosition = (activePoint / (months.length - 1)) * 100;

  const selectPointFromPointer = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    setActivePoint(Math.round(ratio * (months.length - 1)));
  };

  const selectPointFromKeyboard = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setActivePoint((point) => Math.min(months.length - 1, Math.max(0, point + (event.key === "ArrowRight" ? 1 : -1))));
  };

  return (
    <section id="finance" className="relative overflow-hidden bg-[#090a0c] px-5 py-16 text-white md:px-8 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(239,90,22,0.18),transparent_24%),radial-gradient(circle_at_5%_88%,rgba(41,88,255,0.16),transparent_28%)]" />
      <div className="relative mx-auto max-w-[1480px]">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/20 pb-8 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#ef5a16] uppercase">Investor / Financial model</p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,2.5vw,2.35rem)] font-black leading-[1.12] tracking-[-0.03em] uppercase">Финансовый вектор</h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed text-white/55">Базовая модель строится на сети трасс, физических продуктах, цифровом опыте и медиа. Детальные значения фиксируются после закрытия инвестиционного раунда.</p>
        </div>

        <div className="grid overflow-hidden border border-white/20 bg-[#101115] xl:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="border-b border-white/20 p-5 xl:border-r xl:border-b-0 xl:p-7">
            <p className="font-mono text-[9px] font-bold tracking-[0.22em] text-white/40 uppercase">Investor deck</p>
            <nav className="mt-6 space-y-1" aria-label="Разделы инвестиционной модели">
              {[
                ["Рынок и аудитория", "#market"],
                ["Бизнес-модель", "#model"],
                ["Финансовые прогнозы", "#finance"],
                ["Капитализация", "#cap-table"],
              ].map(([item, href]) => (
                <a key={item} href={href} aria-current={item === "Финансовые прогнозы" ? "page" : undefined} className={`flex items-center gap-3 border-l px-3 py-3 font-mono text-[10px] font-bold tracking-[0.1em] uppercase transition-colors ${item === "Финансовые прогнозы" ? "border-[#ef5a16] bg-[#ef5a16] text-black" : "border-white/15 text-white/45 hover:border-white/60 hover:text-white"}`}>
                  <span className="size-1.5 rounded-full bg-current" />
                  {item}
                </a>
              ))}
            </nav>
            <div className="mt-8 border-t border-white/15 pt-5">
              <p className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">Scenario</p>
              <p className="mt-2 font-display text-xl font-black italic uppercase">{scenario.label} / 24 months</p>
            </div>
          </aside>

          <div className="min-w-0 p-5 sm:p-7 md:p-10">
            <div className="flex flex-col gap-5 border-b border-white/15 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[9px] font-bold tracking-[0.22em] text-[#ef5a16] uppercase">Прогноз продаж</p>
                <h3 className="mt-2 font-display text-[clamp(1.6rem,2.5vw,2.35rem)] font-black leading-[1.12] tracking-[-0.03em] uppercase">Рост сети и монетизации</h3>
              </div>
              <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] font-bold tracking-[0.12em] uppercase text-white/60">
                <span className="flex items-center gap-2"><i className="h-px w-5 bg-[#ef5a16]" />Сеть трасс</span>
                <span className="flex items-center gap-2"><i className="h-px w-5 bg-[#6c7cff]" />Индекс монетизации</span>
                <div className="flex border border-white/20 p-0.5" aria-label="Сценарий прогноза">
                  {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
                    <button key={key} type="button" onClick={() => { setScenarioKey(key); setActivePoint(3); }} aria-pressed={scenarioKey === key} className={`px-2 py-1 text-[8px] transition-colors ${scenarioKey === key ? "bg-[#ef5a16] text-black" : "text-white/45 hover:text-white"}`}>
                      {scenarios[key].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-7 overflow-hidden border border-white/15 bg-[#0b0c0f] px-3 pb-3 pt-6 sm:px-6 sm:pb-5 sm:pt-8">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />
              <svg viewBox="0 0 720 260" className="relative block h-auto w-full cursor-crosshair overflow-visible touch-none outline-none" role="slider" tabIndex={0} aria-label="Интерактивный график прогноза: используйте стрелки влево и вправо для смены месяца" aria-valuemin={1} aria-valuemax={24} aria-valuenow={[1, 4, 8, 12, 16, 20, 24][activePoint]} onPointerMove={selectPointFromPointer} onPointerDown={selectPointFromPointer} onKeyDown={selectPointFromKeyboard}>
                <defs>
                  <linearGradient id="finance-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ef5a16" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#ef5a16" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[35, 80, 125, 170, 215].map((y) => <line key={y} x1="0" x2="720" y1={y} y2={y} stroke="white" strokeOpacity="0.1" strokeDasharray="3 5" />)}
                {months.map((_, index) => <line key={index} x1={pointX(index)} x2={pointX(index)} y1="20" y2="215" stroke="white" strokeOpacity="0.08" strokeDasharray="3 5" />)}
                <path d={areaPath(scenario.network)} fill="url(#finance-area)" />
                <path d={linePath(scenario.network)} fill="none" stroke="#ef5a16" strokeWidth="3" />
                <path d={linePath(scenario.monetization)} fill="none" stroke="#6c7cff" strokeWidth="2" strokeDasharray="7 5" />
                <line x1={pointX(activePoint)} x2={pointX(activePoint)} y1="20" y2="215" stroke="white" strokeOpacity="0.45" />
                <circle cx={pointX(activePoint)} cy={pointY(scenario.network[activePoint])} r="6" fill="#ef5a16" stroke="#0b0c0f" strokeWidth="4" />
                <circle cx={pointX(activePoint)} cy={pointY(scenario.monetization[activePoint])} r="5" fill="#6c7cff" stroke="#0b0c0f" strokeWidth="3" />
                <g fill="white" fillOpacity="0.45" fontFamily="monospace" fontSize="11" textAnchor="middle">
                  {months.map((month, index) => <text key={month} x={pointX(index)} y="246">{month}</text>)}
                </g>
              </svg>
              <div className="pointer-events-none absolute top-[34%] hidden border border-white/20 bg-[#17181d]/95 p-4 shadow-2xl transition-[left,transform] duration-200 md:block" style={{ left: `${tooltipPosition}%`, transform: `translateX(${activePoint === 0 ? "0" : activePoint === months.length - 1 ? "-100" : "-50"}%)` }}>
                <p className="font-mono text-[9px] tracking-[0.16em] text-white/45 uppercase">Месяц {activeMonth.slice(1)}</p>
                <p className="mt-2 font-mono text-xs text-[#ef5a16]">Сеть: {scenario.stages[activePoint]}/6 этапов</p>
                <p className="mt-1 font-mono text-xs text-[#9da7ff]">Монетизация: {scenario.monetization[activePoint]}/100</p>
              </div>
              <p className="relative mt-2 text-center font-mono text-[9px] tracking-[0.1em] text-white/40 uppercase md:hidden">{activeMonth} · сеть {scenario.stages[activePoint]}/6 · монетизация {scenario.monetization[activePoint]}/100</p>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-px border border-white/15 bg-white/15">
              {months.map((month, index) => (
                <button key={month} type="button" onClick={() => setActivePoint(index)} aria-pressed={index === activePoint} className={`min-w-0 bg-[#101115] px-1 py-2 font-mono text-[9px] font-bold tracking-[0.08em] transition-colors ${index === activePoint ? "bg-[#ef5a16] text-black" : "text-white/45 hover:bg-white/10 hover:text-white"}`}>{month}</button>
              ))}
            </div>

            <div className="mt-6 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-[#101115] p-4">
                  <p className={`font-display text-3xl font-black tracking-[-0.06em] ${metric.accent}`}>{metric.value}</p>
                  <p className="mt-2 font-mono text-[9px] font-bold tracking-[0.12em] text-white/45 uppercase">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
