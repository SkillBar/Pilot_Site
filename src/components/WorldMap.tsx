"use client";

import { cn } from "@/lib/utils";
import { useEffect, useId, useState } from "react";

export type WorldMapDot = {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
};

export type WorldMapProps = {
  dots?: WorldMapDot[];
  lineColor?: string;
  className?: string;
  fadeEdges?: boolean;
};

/** ViewBox of prebuilt public/world-map-*.svg (height 72 dotted-map). */
const VB_W = 143;
const VB_H = 72;

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sync = () => {
      setIsDark(document.documentElement.dataset.theme !== "light");
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function WorldMap({
  dots = [],
  lineColor = "#ef5a16",
  className,
  fadeEdges = false,
}: WorldMapProps) {
  const isDark = useIsDarkTheme();
  const rawId = useId().replace(/:/g, "");
  const gradId = `wm-grad-${rawId}`;
  const strokeW = 0.35;
  const pointR = 0.55;
  const mapSrc = isDark ? "/world-map-dark.svg" : "/world-map-light.svg";

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (VB_W / 360),
    y: (90 - lat) * (VB_H / 180),
  });

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - Math.max(8, VB_H * 0.12);
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className={cn(
        "world-map relative aspect-[2/1] min-h-[200px] w-full overflow-hidden",
        className,
      )}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static prebuilt SVG */}
      <img
        src={mapSrc}
        alt=""
        width={VB_W}
        height={VB_H}
        decoding="async"
        loading="lazy"
        draggable={false}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full select-none object-contain",
          fadeEdges &&
            "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
        )}
      />
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <path
              key={`path-${i}`}
              className="world-map-route"
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={strokeW}
              strokeLinecap="round"
              pathLength={1}
              style={{ animationDelay: `${0.35 * i}s` }}
            />
          );
        })}

        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          const pulseFrom = String(pointR);
          const pulseTo = String(pointR * 3.2);
          return (
            <g key={`points-${i}`}>
              <circle cx={start.x} cy={start.y} r={pointR} fill={lineColor} />
              <circle
                cx={start.x}
                cy={start.y}
                r={pointR}
                fill={lineColor}
                opacity="0.4"
              >
                <animate
                  attributeName="r"
                  from={pulseFrom}
                  to={pulseTo}
                  dur="1.6s"
                  begin={`${i * 0.12}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.4"
                  to="0"
                  dur="1.6s"
                  begin={`${i * 0.12}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={end.x} cy={end.y} r={pointR} fill={lineColor} />
              <circle
                cx={end.x}
                cy={end.y}
                r={pointR}
                fill={lineColor}
                opacity="0.4"
              >
                <animate
                  attributeName="r"
                  from={pulseFrom}
                  to={pulseTo}
                  dur="1.6s"
                  begin={`${0.2 + i * 0.12}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.4"
                  to="0"
                  dur="1.6s"
                  begin={`${0.2 + i * 0.12}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
