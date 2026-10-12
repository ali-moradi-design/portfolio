"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { bindSceneScroll, setSceneScroll } from "@/lib/sceneState";
import "lenis/dist/lenis.css";

function ScrollBinder() {
  useLenis((lenis) => {
    setSceneScroll(lenis.progress);
  });

  useEffect(() => bindSceneScroll(), []);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (!reduce) return;
    return bindSceneScroll();
  }, [reduce]);

  if (reduce) return children;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        smoothWheel: true,
        autoRaf: true,
        syncTouch: false,
      }}
    >
      <ScrollBinder />
      {children}
    </ReactLenis>
  );
}
