"use client";

import Image from "next/image";
import { useSyncExternalStore, type ComponentType, type SVGProps } from "react";
import { AppleIcon, SteamIcon, WindowsIcon } from "@/components/PlatformIcons";
import { useLocale, useTranslations } from "@/i18n/client";
import {
  detectDownloadPlatform,
  type DownloadPlatform,
} from "@/lib/detectPlatform";
import styles from "./DownloadSection.module.css";

type PlatformIcon = ComponentType<SVGProps<SVGSVGElement>>;

const SUPPORT_COPY = {
  ru: {
    alternate: "Также доступно для",
    conjunction: "и",
    visualAlt: "Pilot Launcher на мониторе Pro Display XDR и смартфоне",
  },
  en: {
    alternate: "Also available for",
    conjunction: "and",
    visualAlt: "Pilot Launcher displayed on a Pro Display XDR and smartphone",
  },
  de: {
    alternate: "Auch verfügbar für",
    conjunction: "und",
    visualAlt: "Pilot Launcher auf einem Pro Display XDR und Smartphone",
  },
} as const;

const subscribeToPlatform = () => () => undefined;

function usePrimaryPlatform(): Exclude<DownloadPlatform, "steam"> {
  const detected = useSyncExternalStore(
    subscribeToPlatform,
    detectDownloadPlatform,
    () => "windows",
  );

  return detected === "macos" ? "macos" : "windows";
}

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
  const primaryPlatform = usePrimaryPlatform();
  const platforms = {
    windows: {
      label: t("download.platformWindows"),
      url: safeHttpsUrl(process.env.NEXT_PUBLIC_PILOT_WINDOWS_URL),
      Icon: WindowsIcon,
    },
    macos: {
      label: t("download.platformMac"),
      url: safeHttpsUrl(process.env.NEXT_PUBLIC_PILOT_MACOS_URL),
      Icon: AppleIcon,
    },
    steam: {
      label: t("download.platformSteam"),
      url: safeHttpsUrl(process.env.NEXT_PUBLIC_PILOT_STEAM_URL),
      Icon: SteamIcon,
    },
  } satisfies Record<DownloadPlatform, {
    label: string;
    url: string | null;
    Icon: PlatformIcon;
  }>;
  const primary = platforms[primaryPlatform];
  const alternatePlatforms: DownloadPlatform[] = [
    primaryPlatform === "macos" ? "windows" : "macos",
    "steam",
  ];

  const renderAlternate = (platform: DownloadPlatform) => {
    const item = platforms[platform];
    return item.url ? (
      <a className={styles.alternateLink} href={item.url} aria-label={item.label}>
        <item.Icon aria-hidden />
        {item.label}
      </a>
    ) : (
      <button
        className={styles.alternateLink}
        type="button"
        aria-disabled="true"
      >
        <item.Icon aria-hidden />
        {item.label}
      </button>
    );
  };

  return (
    <section id="download" className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.copy}>
          <Image
            src="/launcher/pilot-launcher-icon.webp"
            alt="Pilot Launcher"
            width={256}
            height={256}
            sizes="(max-width: 900px) 64px, 80px"
            className={styles.launcherLogo}
          />
          <h2>
            {locale === "ru" ? (
              <>
                <span className={styles.titleLine}>Скачивайте</span>
                <span className={styles.titleLine}>лаунчер Pilot</span>
              </>
            ) : (
              t("download.title")
            )}
          </h2>
          <p className={styles.description}>{t("download.description")}</p>

          {primary.url ? (
            <a className={styles.primaryCta} href={primary.url}>
              <span className={styles.primaryCtaInner}>
                <primary.Icon aria-hidden />
                <span>{t("download.ctaFor", { os: primary.label })}</span>
              </span>
            </a>
          ) : (
            <button className={styles.primaryCta} type="button">
              <span className={styles.primaryCtaInner}>
                <primary.Icon aria-hidden />
                <span>{t("download.ctaFor", { os: primary.label })}</span>
              </span>
            </button>
          )}

          <div className={styles.alternate}>
            <span>{copy.alternate}</span>
            {alternatePlatforms.map((platform, index) => (
              <span className={styles.alternateItem} key={platform}>
                {index > 0 ? <span aria-hidden>{copy.conjunction}</span> : null}
                {renderAlternate(platform)}
              </span>
            ))}
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
