"use client";

import { FadeIn } from "@/components/FadeIn";
import { LazyScrollFloat } from "@/components/LazyScrollFloat";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  eyebrowClassName?: string;
  descriptionClassName?: string;
  before?: ReactNode;
  after?: ReactNode;
};

/**
 * Shared section intro — ScrollFloat look preserved, GSAP deferred until near viewport.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  eyebrowClassName,
  descriptionClassName,
  before,
  after,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        centered ? "mx-auto max-w-2xl text-center" : "max-w-xl text-left",
        className,
      )}
    >
      {before}

      {eyebrow ? (
        <p
          className={cn(
            "font-mono text-[11px] tracking-[0.28em] text-accent uppercase",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <LazyScrollFloat
        containerClassName={cn(eyebrow ? "mt-4" : "mt-0", !centered && "text-left")}
        textClassName="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl"
      >
        {title}
      </LazyScrollFloat>

      {description ? (
        <FadeIn
          className={cn(
            "mt-4 font-mono text-sm leading-relaxed text-muted md:text-[15px]",
            centered && "mx-auto",
            descriptionClassName,
          )}
        >
          {description}
        </FadeIn>
      ) : null}

      {after}
    </header>
  );
}
