"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "@/i18n/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { VectorLogo } from "./VectorLogo";

type VectorUtilityBarProps = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  className?: string;
};

export function VectorUtilityBar({
  theme,
  onToggleTheme,
  className,
}: VectorUtilityBarProps) {
  const t = useTranslations();

  const utilityNav = [
    { href: "#games", label: t("header.games") },
    { href: "#apps", label: t("header.apps") },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex h-10 max-w-7xl items-center justify-between gap-3 px-4 md:px-8",
        className,
      )}
    >
      <a
        href="#about"
        className="group flex min-w-0 items-center gap-2.5 rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label={t("header.vectorAria")}
      >
        <VectorLogo />
        <span
          aria-hidden
          className="hidden h-4 w-px bg-border sm:block"
        />
        <span className="hidden font-sans text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase sm:inline">
          {t("header.eduPlatform")}
        </span>
      </a>

      <div className="flex items-center gap-1.5 md:gap-2">
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label={t("header.utilityNavAria")}
        >
          {utilityNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex h-7 items-center rounded-md px-2.5 font-sans text-[11px] font-medium tracking-[0.04em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:outline-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <span aria-hidden className="mx-1 hidden h-4 w-px bg-border sm:block" />

        <LanguageSwitcher />

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={onToggleTheme}
          className="text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label={
            theme === "dark" ? t("common.lightTheme") : t("common.darkTheme")
          }
          title={
            theme === "dark" ? t("common.lightTheme") : t("common.darkTheme")
          }
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>

        <Button
          size="xs"
          nativeButton={false}
          className="h-7 px-3 font-sans text-[11px] font-semibold tracking-[0.06em]"
          render={<a href="#login" />}
        >
          {t("common.login")}
        </Button>
      </div>
    </div>
  );
}
