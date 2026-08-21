"use client";

import { FadeIn } from "@/components/FadeIn";
import { LazyScrollFloat } from "@/components/LazyScrollFloat";
import { cn } from "@/lib/utils";
import { balanceDisplayTitle } from "@/lib/typography";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  eyebrowClassName?: string;
  descriptionClassName?: string;
  descriptionAnimated?: boolean;
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
  descriptionAnimated = true,
  before,
  after,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        centered ? "mx-auto max-w-5xl text-center" : "max-w-5xl text-left",
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
        textClassName="section-display-title font-display text-fg"
      >
        {balanceDisplayTitle(title)}
      </LazyScrollFloat>

      {description
        ? descriptionAnimated
          ? (
              <FadeIn
                className={cn(
                  "mt-4 font-sans text-[15px] leading-[1.5] text-muted md:text-[17px] md:leading-[1.55]",
                  "max-w-2xl",
                  centered && "mx-auto",
                  descriptionClassName,
                )}
              >
                {description}
              </FadeIn>
            )
          : (
              <p
                className={cn(
                  "mt-4 max-w-2xl font-sans text-[15px] leading-[1.5] text-muted md:text-[17px] md:leading-[1.55]",
                  centered && "mx-auto",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            )
        : null}

      {after}
    </header>
  );
}
