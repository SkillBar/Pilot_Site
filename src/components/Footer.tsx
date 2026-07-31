"use client";

import { useTranslations } from "@/i18n/client";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-line px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 font-mono text-[11px] tracking-wider text-muted md:flex-row md:items-center md:justify-between">
        <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
        <p className="text-muted/70">{t("footer.status")}</p>
      </div>
    </footer>
  );
}
