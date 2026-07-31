"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./ScrollFloat.css";

const ScrollFloat = dynamic(() => import("@/components/ScrollFloat"), {
  ssr: false,
});

type LazyScrollFloatProps = {
  children: string;
  containerClassName?: string;
  textClassName?: string;
};

/**
 * Same look as ScrollFloat, but GSAP loads only when the title nears the viewport.
 * Static markup matches to avoid layout shift.
 */
export function LazyScrollFloat({
  children,
  containerClassName = "",
  textClassName = "",
}: LazyScrollFloatProps) {
  const probeRef = useRef<HTMLHeadingElement | null>(null);
  const [enableMotion, setEnableMotion] = useState(false);

  useEffect(() => {
    const el = probeRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setEnableMotion(true);
        io.disconnect();
      },
      { rootMargin: "220px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (enableMotion) {
    return (
      <ScrollFloat
        containerClassName={containerClassName}
        textClassName={textClassName}
      >
        {children}
      </ScrollFloat>
    );
  }

  return (
    <h2
      ref={probeRef}
      className={cn("scroll-float", containerClassName)}
    >
      <span className={cn("scroll-float-text", textClassName)}>{children}</span>
    </h2>
  );
}
