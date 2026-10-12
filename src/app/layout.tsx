import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { seo, person } from "@/data/content";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: seo.title,
    template: "%s — Ali Moradi",
  },
  description: seo.description,
  keywords: [
    "Ali Moradi",
    "Senior Front-end developer",
    "React",
    "Next.js",
    "dashboards",
    "data visualization",
    "Tehran",
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
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-bg text-ink">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
