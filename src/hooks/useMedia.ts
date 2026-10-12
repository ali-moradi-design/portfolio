"use client";

import { useEffect, useState } from "react";

function useMatch(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMatch("(prefers-reduced-motion: reduce)", false);
}

export function useFinePointer() {
  return useMatch("(hover: hover) and (pointer: fine)", false);
}

export function useIsMobile() {
  return useMatch("(max-width: 767px)", true);
}

export function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setOk(Boolean(gl));
    } catch {
      setOk(false);
    }
  }, []);

  return ok;
}

export function usePageVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return visible;
}
