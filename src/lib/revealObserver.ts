/** Shared IntersectionObserver — one instance for all fade-ins. */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.visible = "true";
          observer?.unobserve(el);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );
  }

  return observer;
}

export function observeReveal(el: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.dataset.visible = "true";
    return () => {};
  }

  const io = getObserver();
  if (!io) return () => {};

  io.observe(el);

  return () => {
    io.unobserve(el);
  };
}
