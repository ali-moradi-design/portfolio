import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Lab } from "./_components/Lab";
import "./lab.css";

const huninn = localFont({
  src: "../fonts/huninn-latin.woff2",
  variable: "--font-huninn",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hero lab",
  description: "Hero prototypes for the portfolio redesign.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <div className={huninn.variable}>
      <Suspense>
        <Lab />
      </Suspense>
    </div>
  );
}
