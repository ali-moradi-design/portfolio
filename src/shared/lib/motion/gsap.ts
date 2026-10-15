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

export { gsap, ScrollTrigger, SplitText, useGSAP };
