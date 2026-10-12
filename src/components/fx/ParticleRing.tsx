"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { usePrefersReducedMotion, useWebGL } from "@/hooks/useMedia";

const ParticleRingCanvas = dynamic(
  () => import("./ParticleRingCanvas").then((m) => m.ParticleRingCanvas),
  { ssr: false },
);

function Placeholder() {
  return <div className="h-full w-full" aria-hidden="true" />;
}

function SoftRing() {
  return (
    <div
      className="h-full w-full"
      aria-hidden="true"
      style={{
        background: [
          "radial-gradient(circle at 50% 48%, transparent 27%, rgba(63,208,184,0.22) 40%, rgba(63,208,184,0.07) 54%, transparent 70%)",
          "radial-gradient(ellipse 72% 58% at 50% 50%, rgba(63,208,184,0.08) 0%, transparent 56%)",
        ].join(","),
      }}
    />
  );
}

function Bloom() {
  return (
    <div
      className="pointer-events-none absolute inset-[10%] rounded-full"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, transparent 30%, rgba(63,208,184,0.16) 44%, rgba(63,208,184,0.05) 58%, transparent 72%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

export function ParticleRing() {
  const reduce = usePrefersReducedMotion();
  const webgl = useWebGL();

  let inner: ReactNode = null;
  let bloom = false;
  if (webgl !== null) {
    if (!reduce && webgl) {
      inner = <ParticleRingCanvas />;
      bloom = true;
    } else {
      inner = <SoftRing />;
      bloom = true;
    }
  }

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {inner ?? <Placeholder />}
      {bloom ? <Bloom /> : null}
    </div>
  );
}
