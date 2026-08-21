"use client";

import { useTranslations } from "@/i18n/client";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-line px-5 py-6 md:px-8">
      <div className="mx-auto max-w-6xl font-mono text-[11px] tracking-wider text-muted">
        <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
