import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { defaultLocale, dictionaries } from "@/i18n";
import { cn } from "@/lib/utils";
import "./globals.css";

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
      className={cn("dark h-full antialiased")}
      style={{
        "--font-sans": "Arial, sans-serif",
        "--font-display": "Arial, sans-serif",
        "--font-mono": "Consolas, monospace",
      } as React.CSSProperties}
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
