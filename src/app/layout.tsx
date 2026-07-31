import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Unbounded } from "next/font/google";
import { Providers } from "@/components/Providers";
import { defaultLocale, dictionaries } from "@/i18n";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const defaultDictionary = dictionaries[defaultLocale];

export const metadata: Metadata = {
  title: defaultDictionary.meta.title,
  description: defaultDictionary.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={cn(
        "dark h-full antialiased",
        geist.variable,
        unbounded.variable,
        jetbrainsMono.variable,
      )}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="v-grid flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
