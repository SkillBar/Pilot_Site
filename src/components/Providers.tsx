"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { LocaleProvider } from "@/i18n/client";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </LocaleProvider>
  );
}
