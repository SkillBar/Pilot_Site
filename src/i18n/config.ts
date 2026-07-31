export const locales = ["ru", "en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const LOCALE_STORAGE_KEY = "pilot-locale";

export const localeLabels: Record<
  Locale,
  { label: string; aria: string; htmlLang: string }
> = {
  ru: { label: "RU", aria: "Русский", htmlLang: "ru" },
  en: { label: "ENG", aria: "English", htmlLang: "en" },
  de: { label: "DE", aria: "Deutsch", htmlLang: "de" },
};

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
