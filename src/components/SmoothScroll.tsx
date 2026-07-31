"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Smooth scroll is desktop-only and loaded async so GSAP/Lenis
 * stay off the critical path. Visual of the page is unchanged.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (reduceMotion.matches || coarsePointer.matches) {
      return;
    }

    let disposed = false;
    let cleanup = () => {};

    void (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
      await import("lenis/dist/lenis.css");

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.08,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const update = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      const refresh = () => ScrollTrigger.refresh();
      refresh();
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);
      document.fonts?.ready?.then(refresh);

      const onClick = (event: MouseEvent) => {
        const anchor = (event.target as HTMLElement | null)?.closest(
          'a[href^="#"]',
        );
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -84 });
      };

      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        window.removeEventListener("load", refresh);
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(update);
        lenis.destroy();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return children;
}
