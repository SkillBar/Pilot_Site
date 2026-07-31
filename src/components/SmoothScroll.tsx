"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Desktop-only Lenis. Tuned for responsive feel:
 * - higher lerp (less mushy catch-up)
 * - own RAF loop (no GSAP ticker coupling)
 * - ScrollTrigger updated from Lenis scroll only
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (reduceMotion.matches || coarsePointer.matches) {
      return;
    }

    let disposed = false;
    let rafId = 0;
    let cleanup = () => {};

    void (async () => {
      const [{ ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      await import("lenis/dist/lenis.css");

      if (disposed) return;

      const lenis = new Lenis({
        // Snappier than 0.08 — low lerp + ScrollTrigger scrub felt like lag.
        lerp: 0.14,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 1,
        // Avoid fighting native anchor / overscroll jank.
        anchors: false,
      });

      // Keep ScrollTrigger in sync; don't double-drive via gsap.ticker.
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      // One deferred refresh after layout settles — avoid refresh storms.
      let refreshTimer = 0;
      const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 120);
      };

      scheduleRefresh();
      window.addEventListener("load", scheduleRefresh, { once: true });
      document.fonts?.ready?.then(scheduleRefresh);

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
        lenis.scrollTo(target as HTMLElement, {
          offset: -84,
          // Immediate enough that nav doesn't feel delayed.
          duration: 1.05,
        });
      };

      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        window.removeEventListener("load", scheduleRefresh);
        window.clearTimeout(refreshTimer);
        cancelAnimationFrame(rafId);
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
