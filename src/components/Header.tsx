"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/client";
import { VectorUtilityBar } from "./VectorUtilityBar";

export function Header() {
  const t = useTranslations();
  const [isAtTop, setIsAtTop] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("#about");

  const primaryNav = [
    { href: "#about", label: t("header.navProject") },
    { href: "#bento", label: t("header.navProduct") },
    { href: "#subscription", label: t("header.navPricing") },
    { href: "#org-structure", label: t("header.navStructure") },
    { href: "#investors", label: t("header.navInvestors") },
  ] as const;
  useEffect(() => {
    const savedTheme = localStorage.getItem("pilot-theme");
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    let frame = 0;
    let lastAtTop = window.scrollY < 8;
    const initialFrame = requestAnimationFrame(() => {
      setTheme(initialTheme);
      setIsAtTop(lastAtTop);
    });

    const handleScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY < 8;
        if (next !== lastAtTop) {
          lastAtTop = next;
          setIsAtTop(next);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(initialFrame);
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const ids = [
      "about",
      "bento",
      "subscription",
      "org-structure",
      "investors",
    ];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    // One IO instead of getBoundingClientRect on every scroll frame.
    const ratios = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId = sections[0]?.id ?? "about";
        let bestRatio = -1;
        for (const section of sections) {
          const ratio = ratios.get(section.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = section.id;
          }
        }

        // Near page bottom — pin last nav item.
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
        ) {
          bestId = sections[sections.length - 1]?.id ?? bestId;
        }

        const next = `#${bestId}`;
        setActiveSection((prev) => (prev === next ? prev : next));
      },
      {
        root: null,
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-30% 0px -45% 0px",
      },
    );

    for (const section of sections) io.observe(section);

    return () => io.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("pilot-theme", nextTheme);
  };

  return (
    <>
      <header className="header-shell fixed inset-x-0 top-0 z-50 border-b border-line">
        <div
          className={`header-utility relative z-[60] border-b border-border/80 transition-[height,opacity] duration-300 ease-out ${
            isAtTop
              ? "h-10 overflow-visible opacity-100"
              : "pointer-events-none h-0 overflow-hidden opacity-0"
          }`}
        >
          <VectorUtilityBar theme={theme} onToggleTheme={toggleTheme} />
        </div>

        <div className="pilot-menu relative z-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[72%] opacity-50 md:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(132deg, transparent 0 56px, rgba(255,255,255,.045) 57px 79px, transparent 80px 118px)",
            }}
          />

          <div className="relative mx-auto flex h-11 max-w-7xl items-center px-4 md:h-12 md:px-8">
            <a
              href="#top"
              className="group flex shrink-0 items-center border-r border-white/10 pr-5 transition-opacity hover:opacity-90"
              aria-label={t("header.pilotHomeAria")}
            >
              <Image
                src="/logo_big.svg"
                alt="Pilot"
                width={280}
                height={80}
                className="h-[1.15rem] w-auto object-contain md:h-[1.35rem]"
                priority
              />
            </a>

            <nav
              className="absolute left-1/2 hidden h-full -translate-x-1/2 items-stretch justify-center lg:flex"
              aria-label={t("header.primaryNavAria")}
            >
              <div className="flex h-full items-stretch gap-2">
                {primaryNav.map((item) => {
                  const isActive = activeSection === item.href;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveSection(item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`pilot-nav-item group relative flex min-h-11 shrink-0 items-center justify-center px-4 font-display text-[9px] font-bold tracking-[0.05em] uppercase transition-[color,background-color,box-shadow] duration-300 lg:text-[10px] ${
                        isActive
                          ? "pilot-nav-item--active text-white"
                          : "text-white/38 hover:bg-white/[0.035] hover:text-white/75"
                      }`}
                    >
                      {isActive ? <span className="pilot-nav-spark" aria-hidden>✦</span> : null}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>

            <div className="ml-auto flex items-center">
              <details className="group relative lg:hidden">
                <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-white/15 text-fg [&::-webkit-details-marker]:hidden">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M5 7h14M5 12h14M5 17h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="sr-only">{t("common.openMenu")}</span>
                </summary>
                <nav
                  className="header-mobile-menu absolute right-0 top-11 flex w-56 flex-col border border-line p-2 shadow-2xl"
                  aria-label={t("header.mobileNavAria")}
                >
                  {primaryNav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex min-h-11 items-center border-b border-white/5 px-4 py-3 font-mono text-xs text-fg/80 transition-colors last:border-0 hover:bg-accent/10 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </details>
            </div>
          </div>
        </div>
      </header>
      <div className="h-[84px] md:h-[88px]" aria-hidden />
    </>
  );
}
