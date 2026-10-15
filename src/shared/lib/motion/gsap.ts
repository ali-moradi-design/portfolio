"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);

/** Motion tokens shared by every reveal (after heronaiapp.com). */
export const EASE = {
  /** Lines and blocks sliding into place. */
  out: "power4.out",
  /** Softer, for fades. */
  soft: "power2.out",
} as const;

/** True when the visitor asked for less motion. Read in effects only. */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let watching = false;

/**
 * Recomputes where scroll reveals start whenever the page height changes: a
 * row of the experience list opens or closes, an image or a font loads.
 * ScrollTrigger does this only on window resize, so content that moved up
 * stayed hidden, waiting for a scroll position it had before. One observer
 * for the whole page; reveals call this when they set up.
 */
export function watchPageHeight() {
  if (watching) return;
  watching = true;
  let frame = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => ScrollTrigger.refresh());
  }).observe(document.body);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
