"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  AppleIcon,
  SteamIcon,
  WindowsIcon,
} from "@/components/PlatformIcons";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import {
  detectDownloadPlatform,
  type DownloadPlatform,
} from "@/lib/detectPlatform";
import { cn } from "@/lib/utils";

type PlatformIcon = ComponentType<SVGProps<SVGSVGElement>>;

const BUILDS: Record<
  DownloadPlatform,
  {
    labelKey: "download.platformWindows" | "download.platformMac" | "download.platformSteam";
    file: string;
    href: string;
    Icon: PlatformIcon;
  }
> = {
  windows: {
    labelKey: "download.platformWindows",
    file: "pilot-launcher-win.exe",
    href: "#",
    Icon: WindowsIcon,
  },
  macos: {
    labelKey: "download.platformMac",
    file: "pilot-launcher-mac.dmg",
    href: "#",
    Icon: AppleIcon,
  },
  steam: {
    labelKey: "download.platformSteam",
    file: "steam",
    href: "#",
    Icon: SteamIcon,
  },
};

const PLATFORM_ORDER: DownloadPlatform[] = ["windows", "macos", "steam"];

export function DownloadSection() {
  const t = useTranslations();
  const [platform, setPlatform] = useState<DownloadPlatform>("windows");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlatform(detectDownloadPlatform());
    setReady(true);
  }, []);

  const primary = BUILDS[platform];
  const alternates = useMemo(
    () => PLATFORM_ORDER.filter((id) => id !== platform),
    [platform],
  );

  return (
    <section
      id="download"
      className="relative border-t border-line px-5 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={t("download.title")}
          description={t("download.description")}
          before={
            <Image
              src="/Logo_App.webp"
              alt="Pilot Launcher"
              width={96}
              height={96}
              className="mx-auto mb-5 h-20 w-20 object-contain md:h-24 md:w-24"
            />
          }
          after={
            <p className="mt-4 font-mono text-[11px] tracking-wider text-muted">
              STATUS: <span className="text-ok">READY</span> · CHANNEL: PUBLIC
            </p>
          }
        />

        <div className="mx-auto mt-12 flex max-w-xl flex-col items-center">
          <a
            href={primary.href}
            download={primary.file === "steam" ? undefined : primary.file}
            className={cn(
              "btn-tech download-cta font-mono text-[12px] md:text-[13px]",
              !ready && "opacity-90",
            )}
            aria-label={t("download.ctaFor", {
              os: t(primary.labelKey),
            })}
          >
            <span className="inline-flex items-center gap-3">
              <primary.Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span>
                {t("download.ctaFor", {
                  os: t(primary.labelKey),
                })}
              </span>
            </span>
          </a>

          <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
            {t("download.alsoAvailable")}
          </p>

          <ul className="mt-4 flex items-center justify-center gap-6">
            {alternates.map((id) => {
              const item = BUILDS[id];
              return (
                <li key={id}>
                  <a
                    href={item.href}
                    download={item.file === "steam" ? undefined : item.file}
                    className="group flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
                    aria-label={t("download.ctaFor", {
                      os: t(item.labelKey),
                    })}
                    title={t(item.labelKey)}
                  >
                    <item.Icon
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                      aria-hidden
                    />
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase">
                      {t(item.labelKey)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
