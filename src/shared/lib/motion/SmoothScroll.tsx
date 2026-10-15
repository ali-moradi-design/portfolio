"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";

/**
 * Smooth, eased scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger
 * reveals stay in step with it. In-page links (#work, /#contact on the home
 * page) glide to their section, below the sticky header. Off for reduced
 * motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;
      const a = (e.target as Element).closest("a");
      if (!a?.hash || a.target) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname)
        return;
      const target = document.querySelector(a.hash);
      if (!target) return;
      e.preventDefault();
      // Stop next/link from jumping; glide instead and keep the hash in the URL.
      e.stopPropagation();
      history.pushState(null, "", a.hash);
      // Lenis honours the html scroll-padding-top, so the header gap is kept.
      lenis.scrollTo(target as HTMLElement);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
