"use client";

import { ChevronDownIcon } from "lucide-react";
import { localeLabels, locales, type Locale } from "@/i18n";
import { useLocale } from "@/i18n/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const flagMeta: Record<Locale, string[]> = {
  en: ["#012169", "#C8102E", "#FFFFFF"],
  ru: ["#FFFFFF", "#0039A6", "#D52B1E"],
  de: ["#000000", "#DD0000", "#FFCE00"],
};

function SkewedFlag({ code }: { code: Locale }) {
  if (code === "en") {
    return (
      <span className="lang-flag relative inline-block h-[11px] w-[16px] overflow-hidden -skew-x-[18deg] shadow-[0_0_0_1px_rgba(255,255,255,0.2)]">
        <span className="absolute inset-0 bg-[#012169]" />
        <span className="absolute inset-y-0 left-[42%] w-[16%] bg-white" />
        <span className="absolute inset-x-0 top-[35%] h-[30%] bg-white" />
        <span className="absolute inset-y-0 left-[45%] w-[10%] bg-[#C8102E]" />
        <span className="absolute inset-x-0 top-[40%] h-[20%] bg-[#C8102E]" />
      </span>
    );
  }

  return (
    <span className="lang-flag relative inline-flex h-[11px] w-[16px] flex-col overflow-hidden -skew-x-[18deg] shadow-[0_0_0_1px_rgba(255,255,255,0.2)]">
      {flagMeta[code].map((color) => (
        <span
          key={color}
          className="w-full flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const current = localeLabels[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="xs"
            className="gap-1.5 px-2 font-sans text-muted-foreground hover:bg-secondary hover:text-foreground"
          />
        }
        aria-label={`${t("common.language")}: ${current.aria}`}
      >
        <SkewedFlag code={locale} />
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase">
          {current.label}
        </span>
        <ChevronDownIcon className="size-3 opacity-70" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-36" sideOffset={8}>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => setLocale(value as Locale)}
        >
          {locales.map((code) => {
            const item = localeLabels[code];

            return (
              <DropdownMenuRadioItem
                key={code}
                value={code}
                className="gap-2.5 focus:bg-secondary focus:text-foreground"
              >
                <SkewedFlag code={code} />
                <span className="font-sans text-[11px] font-medium tracking-[0.06em] uppercase">
                  {item.label}
                </span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
