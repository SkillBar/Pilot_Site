"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  isLocale,
  localeLabels,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";
import { getMessage, type MessageKey } from "./getMessage";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(saved) ? saved : defaultLocale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const saved = readStoredLocale();
    const frame = requestAnimationFrame(() => setLocaleState(saved));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const htmlLang = localeLabels[locale].htmlLang;
    const frame = requestAnimationFrame(() => {
      document.documentElement.lang = htmlLang;
    });
    return () => cancelAnimationFrame(frame);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const dictionary = dictionaries[locale];

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) =>
      getMessage(dictionary, key, vars),
    [dictionary],
  );

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      setLocale,
      t,
    }),
    [locale, dictionary, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function useTranslations() {
  return useLocale().t;
}
