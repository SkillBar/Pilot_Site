"use client";

import Image from "next/image";
import { type ComponentType, type SVGProps } from "react";
import { AppleIcon, SteamIcon, WindowsIcon } from "@/components/PlatformIcons";
import { useLocale, useTranslations } from "@/i18n/client";
import styles from "./DownloadSection.module.css";

type PlatformIcon = ComponentType<SVGProps<SVGSVGElement>>;

const SUPPORT_COPY = {
  ru: {
    primary: "Установить на Mac",
    alternate: "Также доступно для",
    conjunction: "и",
    visualAlt: "Pilot Launcher на мониторе Pro Display XDR и смартфоне",
  },
  en: {
    primary: "Install on Mac",
    alternate: "Also available for",
    conjunction: "and",
    visualAlt: "Pilot Launcher displayed on a Pro Display XDR and smartphone",
  },
  de: {
    primary: "Auf dem Mac installieren",
    alternate: "Auch verfügbar für",
    conjunction: "und",
    visualAlt: "Pilot Launcher auf einem Pro Display XDR und Smartphone",
  },
} as const;

function safeHttpsUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function DownloadSection() {
  const t = useTranslations();
  const { locale } = useLocale();
  const copy = SUPPORT_COPY[locale];
  const primaryUrl = safeHttpsUrl(process.env.NEXT_PUBLIC_PILOT_MACOS_URL);
  const windowsUrl = safeHttpsUrl(process.env.NEXT_PUBLIC_PILOT_WINDOWS_URL);
  const steamUrl = safeHttpsUrl(process.env.NEXT_PUBLIC_PILOT_STEAM_URL);
  const windowsLabel = t("download.platformWindows");
  const steamLabel = t("download.platformSteam");

  const renderAlternate = (
    label: string,
    url: string | null,
    Icon: PlatformIcon,
  ) =>
    url ? (
      <a className={styles.alternateLink} href={url} aria-label={label}>
        <Icon aria-hidden />
        {label}
      </a>
    ) : (
      <button
        className={styles.alternateLink}
        type="button"
        aria-disabled="true"
      >
        <Icon aria-hidden />
        {label}
      </button>
    );

  return (
    <section id="download" className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.copy}>
          <h2>{t("download.title")}</h2>
          <p className={styles.description}>{t("download.description")}</p>

          {primaryUrl ? (
            <a className={styles.primaryCta} href={primaryUrl}>
              <AppleIcon aria-hidden />
              <span>{copy.primary}</span>
            </a>
          ) : (
            <button className={styles.primaryCta} type="button" aria-disabled="true">
              <AppleIcon aria-hidden />
              <span>{copy.primary}</span>
            </button>
          )}

          <div className={styles.alternate}>
            <span>{copy.alternate}</span>
            {renderAlternate(windowsLabel, windowsUrl, WindowsIcon)}
            <span aria-hidden>{copy.conjunction}</span>
            {renderAlternate(steamLabel, steamUrl, SteamIcon)}
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualGlow} aria-hidden />
          <Image
            src="/launcher/pro-display-xdr.png"
            alt={copy.visualAlt}
            width={568}
            height={421}
            sizes="(max-width: 900px) calc(100vw - 64px), 568px"
            className={styles.mockup}
            unoptimized
          />
          <Image
            src="/launcher/iphone-16-dark.png"
            alt=""
            width={149}
            height={304}
            sizes="(max-width: 900px) 28vw, 168px"
            className={styles.phoneMockup}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
