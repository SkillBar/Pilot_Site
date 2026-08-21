"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const months = ["M1", "M4", "M8", "M12", "M16", "M20", "M24"];
const monthNumbers = [1, 4, 8, 12, 16, 20, 24];
const chartWidth = 720;
const chartPadding = 20;
const chartTop = 18;
const chartBottom = 182;

const scenarios = {
  base: { label: "Base", network: [4, 8, 18, 31, 47, 65, 85], monetization: [0, 5, 17, 35, 48, 70, 94], stages: [0, 1, 1, 3, 4, 5, 6] },
  growth: { label: "Growth", network: [5, 15, 31, 48, 65, 82, 100], monetization: [0, 14, 32, 57, 75, 91, 100], stages: [0, 1, 2, 3, 5, 6, 6] },
} as const;

const metrics = [
  { value: "06", label: "Трасс в календаре", accent: "text-[#ef5a16]" },
  { value: "04", label: "Потока монетизации", accent: "text-[#111318]" },
  { value: "24", label: "Месяца прогноза", accent: "text-[#ef5a16]" },
  { value: "B2B + B2C", label: "Модель продаж", accent: "text-[#111318]" },
] as const;

function pointX(index: number) {
  return chartPadding + (index / (months.length - 1)) * (chartWidth - chartPadding * 2);
}

function pointY(value: number) {
  return chartBottom - (value / 100) * (chartBottom - chartTop);
}

function linePath(values: readonly number[]) {
  return values.map((value, index) => `${index === 0 ? "M" : "L"}${pointX(index)} ${pointY(value)}`).join(" ");
}

function areaPath(values: readonly number[]) {
  return `${linePath(values)} L${pointX(months.length - 1)} ${chartBottom} L${pointX(0)} ${chartBottom} Z`;
}

export function FinancialForecastSection() {
  const [scenarioKey, setScenarioKey] = useState<keyof typeof scenarios>("base");
  const [activePoint, setActivePoint] = useState(3);
  const navRef = useRef<HTMLElement | null>(null);
  const isDraggingRef = useRef(false);
  const scenario = scenarios[scenarioKey];
  const activeMonth = months[activePoint];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const centerActive = () => {
      const activeTab = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (!activeTab || nav.scrollWidth <= nav.clientWidth) return;
      nav.scrollLeft = activeTab.offsetLeft - (nav.clientWidth - activeTab.offsetWidth) / 2;
    };
    const resizeObserver = new ResizeObserver(centerActive);
    resizeObserver.observe(nav);
    window.addEventListener("orientationchange", centerActive);
    centerActive();
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("orientationchange", centerActive);
    };
  }, []);

  const selectPointFromPointer = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    setActivePoint(Math.round(ratio * (months.length - 1)));
  };

  const startPointDrag = (event: PointerEvent<SVGSVGElement>) => {
    isDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    selectPointFromPointer(event);
  };

  const finishPointDrag = (event: PointerEvent<SVGSVGElement>) => {
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const selectPointFromKeyboard = (event: KeyboardEvent<SVGSVGElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") return setActivePoint(0);
    if (event.key === "End") return setActivePoint(months.length - 1);
    setActivePoint((point) => Math.min(months.length - 1, Math.max(0, point + (event.key === "ArrowRight" ? 1 : -1))));
  };

  return (
    <section id="finance" className="finance-open-section relative overflow-hidden px-5 py-16 text-[#111318] md:px-8">
      <div className="relative mx-auto max-w-[1320px]">
        <div className="mb-10 md:mb-12">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">Финансовый вектор</h2>
          <p className="mt-4 max-w-[760px] font-sans text-sm leading-[1.5] text-black/62 md:text-base">Базовая модель строится на сети трасс, физических продуктах, цифровом опыте и медиа. Детальные значения фиксируются после закрытия инвестиционного раунда.</p>
        </div>

        <div className="finance-open-field">
          <div className="finance-tabs-shell">
            <nav ref={navRef} className="finance-tabs grid h-11 snap-x snap-mandatory auto-cols-[minmax(150px,1fr)] grid-flow-col overflow-x-auto overscroll-x-contain scroll-smooth motion-reduce:scroll-auto [scrollbar-width:none]" aria-label="Разделы инвестиционной модели">
            {[["Рынок и аудитория", "#market"], ["Бизнес-модель", "#model"], ["Финансовые прогнозы", "#finance"], ["Капитализация", "#cap-table"]].map(([item, href]) => (
              <a key={item} href={href} aria-current={item === "Финансовые прогнозы" ? "page" : undefined} className={`flex h-11 snap-center items-center justify-center gap-2 px-3 text-center font-sans text-xs font-bold transition-colors md:text-[13px] ${item === "Финансовые прогнозы" ? "bg-[#c54812] text-white" : "bg-black/[0.035] text-black/55 hover:bg-black/[0.07] hover:text-black"}`}>
                <span className="size-1.5 rounded-full bg-current" />{item}
              </a>
            ))}
            </nav>
          </div>

          <div className="min-w-0 pt-5 md:pt-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="max-w-[24ch] font-display text-[clamp(1.25rem,2vw,1.625rem)] font-semibold leading-[1.2] tracking-[-0.02em]">Рост сети и монетизации</h3>
              <div className="grid grid-cols-[1fr_auto] items-center gap-3 font-sans text-xs font-bold text-black/62 md:flex md:flex-wrap md:text-[13px]">
                <div className="flex flex-col gap-1 md:contents">
                  <span className="flex items-center gap-2"><i className="h-px w-5 bg-[#ef5a16]" />Индекс сети</span>
                  <span className="flex items-center gap-2"><i className="h-px w-5 bg-[#6c7cff]" />Индекс монетизации</span>
                </div>
                <div className="flex gap-1 bg-black/[0.045] p-1" aria-label="Сценарий прогноза">
                  {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
                    <button key={key} type="button" onClick={() => { setScenarioKey(key); setActivePoint(3); }} aria-pressed={scenarioKey === key} className={`min-h-11 px-4 py-2 text-xs transition-colors ${scenarioKey === key ? "bg-[#c54812] text-white" : "text-black/52 hover:bg-black/[0.06] hover:text-black"}`}>{scenarios[key].label}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="finance-chart-field mt-4 px-0 py-2 md:mt-5 md:py-3">
              <svg viewBox="0 0 720 200" preserveAspectRatio="none" className="block h-[168px] w-full cursor-crosshair touch-pan-y outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef5a16] sm:h-[200px] lg:h-[240px]" role="slider" tabIndex={0} aria-label="Интерактивный график прогноза. Стрелки меняют месяц, Home выбирает первый, End — последний." aria-valuemin={1} aria-valuemax={24} aria-valuenow={monthNumbers[activePoint]} aria-valuetext={`Месяц ${activeMonth.slice(1)}, сеть ${scenario.stages[activePoint]} из 6 этапов, монетизация ${scenario.monetization[activePoint]} из 100`} onPointerMove={(event) => { if (isDraggingRef.current) selectPointFromPointer(event); }} onPointerDown={startPointDrag} onPointerUp={finishPointDrag} onPointerCancel={finishPointDrag} onLostPointerCapture={() => { isDraggingRef.current = false; }} onKeyDown={selectPointFromKeyboard}>
                <defs><linearGradient id="finance-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ef5a16" stopOpacity="0.28" /><stop offset="100%" stopColor="#ef5a16" stopOpacity="0" /></linearGradient></defs>
                {[20, 60, 100, 140, 180].map((y) => <line key={y} x1="0" x2="720" y1={y} y2={y} stroke="#111318" strokeOpacity="0.11" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />)}
                {months.map((_, index) => <line key={index} x1={pointX(index)} x2={pointX(index)} y1="12" y2={chartBottom} stroke="#111318" strokeOpacity="0.08" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />)}
                <path d={areaPath(scenario.network)} fill="url(#finance-area)" />
                <path d={linePath(scenario.network)} fill="none" stroke="#ef5a16" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                <path d={linePath(scenario.monetization)} fill="none" stroke="#6c7cff" strokeWidth="2" strokeDasharray="7 5" vectorEffect="non-scaling-stroke" />
                <line x1={pointX(activePoint)} x2={pointX(activePoint)} y1="12" y2={chartBottom} stroke="#111318" strokeOpacity="0.38" vectorEffect="non-scaling-stroke" />
                <circle cx={pointX(activePoint)} cy={pointY(scenario.network[activePoint])} r="6" fill="#ef5a16" stroke="#f3f4f5" strokeWidth="4" vectorEffect="non-scaling-stroke" />
                <circle cx={pointX(activePoint)} cy={pointY(scenario.monetization[activePoint])} r="5" fill="#5968e8" stroke="#f3f4f5" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              </svg>
              <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-xs font-semibold text-black/62 md:text-[13px]" aria-live="polite">
                <span className="text-[#111318]">{activeMonth}</span><span>Сеть <strong className="text-[#c54812]">{scenario.stages[activePoint]}/6</strong></span><span>Монетизация <strong className="text-[#4f5edb]">{scenario.monetization[activePoint]}/100</strong></span>
              </p>
            </div>

            <div className="finance-months mt-2 grid grid-flow-col auto-cols-[44px] gap-1 overflow-x-auto [scrollbar-width:none] md:grid-flow-row md:grid-cols-7 md:overflow-visible">
              {months.map((month, index) => <button key={month} type="button" onClick={() => setActivePoint(index)} aria-pressed={index === activePoint} className={`min-h-11 min-w-11 px-1 py-2 font-mono text-[11px] font-bold tracking-[0.02em] transition-colors md:min-w-0 md:text-xs ${index === activePoint ? "bg-[#c54812] text-white" : "bg-black/[0.035] text-black/52 hover:bg-black/[0.07] hover:text-black"}`}>{month}</button>)}
            </div>

            <div className="finance-metrics mt-5 grid grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex h-[72px] items-center gap-2 px-2 py-3 md:gap-3 md:px-4"><p className={`font-display text-[clamp(1.35rem,2.5vw,2rem)] font-bold leading-none tracking-[-0.05em] ${metric.accent}`}>{metric.value}</p><p className="font-sans text-[11px] font-semibold leading-snug text-black/58 md:text-[13px]">{metric.label}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
