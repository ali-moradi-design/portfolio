import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { person, seo, TOKENS } from "@/shared/config";
import { DEFAULT_PALETTE, themeCss, themeScript } from "@/shared/lib/theme";
import { huninn } from "../styles/fonts";
import "../styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ali-moradi-develop.com"),
  title: { default: seo.title, template: "%s — Ali Moradi" },
  description: seo.description,
  keywords: ["Ali Moradi", "Senior Frontend Developer", "React", "Next.js", "dashboards", "data visualization", "Istanbul", "remote"],
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  openGraph: { title: seo.title, description: seo.description, type: "website", locale: "en_US", siteName: person.name },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: TOKENS[DEFAULT_PALETTE].light.bg },
    { media: "(prefers-color-scheme: dark)", color: TOKENS[DEFAULT_PALETTE].dark.bg },
  ],
  width: "device-width",
  initialScale: 1,
};

const css = themeCss();

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The theme script may change data-palette and data-mode before React hydrates.
    <html lang="en" className={huninn.variable} data-palette={DEFAULT_PALETTE} data-mode="system" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
