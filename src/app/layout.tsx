import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { seo, person } from "@/data/content";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ali-moradi-develop.com"),
  title: {
    default: seo.title,
    template: "%s — Ali Moradi",
  },
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
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1C1C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden bg-bg text-ink">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
