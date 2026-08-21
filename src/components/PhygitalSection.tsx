"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import { useEffect, useRef } from "react";

export function PhygitalSection() {
  const t = useTranslations();
  const sectionTitle = t("phygital.title");
  const balancedTitle =
    sectionTitle === "Два мира сходятся в одной точке"
      ? "Два мира сходятся\nв одной точке"
      : sectionTitle;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isNearViewport = true;

    const syncPlayback = () => {
      if (
        reducedMotion.matches ||
        document.visibilityState !== "visible" ||
        !isNearViewport
      ) {
        video.pause();
        return;
      }

      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = Boolean(entry?.isIntersecting);
        syncPlayback();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(section);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      id="phygital"
      className="phygital-section phygital-video-section relative isolate flex overflow-hidden bg-[#07080a] px-5 py-16 text-white md:px-8 md:py-24"
    >
      <div className="phygital-video-poster absolute inset-0" aria-hidden />
      <video
        ref={videoRef}
        className="phygital-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/video/phygital-poster.webp"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="/video/phygital-loop-mobile.mp4"
          media="(max-width: 767px)"
          type="video/mp4"
        />
        <source src="/video/phygital-loop.mp4" type="video/mp4" />
      </video>
      <div className="phygital-video-shade absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 items-end">
        <SectionHeader
          align="left"
          title={balancedTitle}
          description={t("phygital.description")}
          descriptionAnimated={false}
          className="phygital-video-copy max-w-4xl"
          descriptionClassName="max-w-2xl text-white/78"
        />
      </div>
    </section>
  );
}
