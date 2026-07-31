"use client";

import { cn } from "@/lib/utils";
import { observeReveal } from "@/lib/revealObserver";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Extra delay after enter (ms) — keeps titles ahead of copy. */
  delayMs?: number;
};

/**
 * Scroll-triggered fade/slide-in.
 * Uses one shared IntersectionObserver (no GSAP) and compositor-friendly CSS.
 */
export function FadeIn({
  children,
  className,
  as: Tag = "p",
  delayMs = 120,
}: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el);
  }, []);

  const style =
    delayMs > 0
      ? ({ "--fade-delay": `${delayMs}ms` } as CSSProperties)
      : undefined;

  return (
    <Tag ref={ref} className={cn("fade-in", className)} style={style}>
      {children}
    </Tag>
  );
}
