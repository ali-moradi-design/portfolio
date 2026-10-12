"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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

let webglSupport: boolean | undefined;

function detectWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
      );
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const subscribeNoop = () => () => {};

export function useWebGL(): boolean | null {
  return useSyncExternalStore(subscribeNoop, detectWebGL, () => null);
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
