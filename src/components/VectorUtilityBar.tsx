"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "@/i18n/client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
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
        <Separator orientation="vertical" className="hidden h-4 sm:block" />
        <span className="hidden font-sans text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase sm:inline">
          {t("header.eduPlatform")}
        </span>
      </a>

      <div className="flex items-center gap-1.5 md:gap-2">
        <NavigationMenu
          className="hidden lg:flex"
          aria-label={t("header.utilityNavAria")}
        >
          <NavigationMenuList className="gap-0.5">
            {utilityNav.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={item.href}
                  className="h-7 rounded-md px-2.5 py-0 font-sans text-[11px] font-medium tracking-[0.04em] text-muted-foreground hover:bg-secondary hover:text-foreground focus:bg-secondary focus:text-foreground data-active:bg-secondary data-active:text-foreground"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Separator orientation="vertical" className="mx-1 hidden h-4 sm:block" />

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
