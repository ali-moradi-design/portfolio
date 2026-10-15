import type { Metadata, Viewport } from "next";
import { person, seo, TOKENS } from "@/shared/config";
import {
  DEFAULT_PALETTE,
  paletteScript,
  themeCss,
  ThemeProvider,
} from "@/shared/lib/theme";
import { motionScript, SmoothScroll } from "@/shared/lib/motion";
import { CursorTrail } from "@/shared/ui/cursor";
import { huninn } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ali-moradi-develop.com"),
  title: { default: seo.title, template: "%s — Ali Moradi" },
  description: seo.description,
  keywords: [
    "Ali Moradi",
    "Senior Frontend Developer",
    "React",
    "Next.js",
    "dashboards",
    "data visualization",
    "Istanbul",
    "remote",
  ],
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    locale: "en_US",
    siteName: person.name,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: TOKENS[DEFAULT_PALETTE].light.bg,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: TOKENS[DEFAULT_PALETTE].dark.bg,
    },
  ],
};

const themeStyles = themeCss();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Inline scripts set data-palette and data-mode before React hydrates.
    <html
      lang="en"
      className={huninn.variable}
      data-palette={DEFAULT_PALETTE}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll />
          <CursorTrail />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
