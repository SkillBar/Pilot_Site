import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Unbounded } from "next/font/google";
import { Providers } from "@/components/Providers";
import { defaultLocale, dictionaries } from "@/i18n";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("pilot-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;document.documentElement.classList.toggle("dark",t==="dark");}}catch(e){}})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
