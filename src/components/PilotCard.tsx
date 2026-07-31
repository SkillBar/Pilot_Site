"use client";

import { cn } from "@/lib/utils";
import { useId, type ReactNode } from "react";

type PilotCardProps = {
  children: ReactNode;
  className?: string;
  featured?: boolean;
  href?: string;
  download?: string;
};

type PilotCardGridProps = {
  children: ReactNode;
  className?: string;
};

/** Shared neon-card shell — change CSS once, updates tracks + download. */
export function PilotCard({
  children,
  className,
  featured = false,
  href,
  download,
}: PilotCardProps) {
  const borderId = useId();

  const body = (
    <>
      <span className="pilot-card-glow" aria-hidden />
      {featured ? (
        <svg
          className="pilot-card-border"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={borderId} x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0"
                stopColor="var(--pilot-card-cyan)"
                stopOpacity="0.92"
              />
              <stop
                offset="0.48"
                stopColor="var(--pilot-card-blue)"
                stopOpacity="0.46"
              />
              <stop
                offset="1"
                stopColor="var(--pilot-card-cyan)"
                stopOpacity="0.98"
              />
            </linearGradient>
          </defs>
          <path
            d="M 40 1 H 960 Q 999 1 999 40 V 900 L 900 999 H 40 Q 1 999 1 960 V 40 Q 1 1 40 1 Z"
            fill="none"
            stroke={`url(#${borderId})`}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
      {children}
    </>
  );

  return (
    <div
      className={cn(
        "pilot-card-wrap relative",
        featured && "pilot-card-wrap--featured",
      )}
    >
      {href ? (
        <a
          href={href}
          download={download}
          className={cn(
            "pilot-card group relative flex h-full flex-col overflow-hidden rounded-[22px] px-5 py-8 md:px-7 md:py-10",
            featured && "pilot-card--featured",
            className,
          )}
        >
          {body}
        </a>
      ) : (
        <article
          className={cn(
            "pilot-card group relative flex h-full flex-col overflow-hidden rounded-[22px] px-5 py-8 md:px-7 md:py-10",
            featured && "pilot-card--featured",
            className,
          )}
        >
          {body}
        </article>
      )}
      {featured ? <span className="pilot-card-corner" aria-hidden /> : null}
    </div>
  );
}

export function PilotCardGrid({ children, className }: PilotCardGridProps) {
  return (
    <div className={cn("pilot-card-grid mt-14 grid gap-3 md:grid-cols-3", className)}>
      {children}
    </div>
  );
}
