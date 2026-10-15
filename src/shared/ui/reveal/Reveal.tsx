"use client";

import {
  useRef,
  type ElementType,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  EASE,
  gsap,
  prefersReducedMotion,
  ScrollTrigger,
  SplitText,
  useGSAP,
  watchPageHeight,
} from "@/shared/lib/motion";

// Scroll reveals after heronaiapp.com. Elements carry data-reveal so they start
// hidden (globals.css) until their tween takes over; with reduced motion they
// are simply shown.

const START = "top 88%";

type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/** Text whose lines slide up from behind a mask, one after another. */
export function RevealText<T extends ElementType = "p">({
  as,
  children,
  delay = 0,
  ...rest
}: Props<T>) {
  const Tag: ElementType = as ?? "p";
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      watchPageHeight();
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: EASE.out,
            stagger: 0.09,
            delay,
            scrollTrigger: { trigger: el, start: START, once: true },
          }),
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}

/**
 * A block that rises and fades in. With `each`, its children come in one by
 * one as each reaches the viewport (cards, rows).
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  each = false,
  y = 32,
  ...rest
}: Props<T> & { each?: boolean; y?: number }) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      watchPageHeight();
      const from = { y, autoAlpha: 0 };
      const to = {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: EASE.out,
        delay,
        stagger: 0.08,
        clearProps: "transform",
      };
      if (!each) {
        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: { trigger: el, start: START, once: true },
        });
        return;
      }
      const items = Array.from(el.children);
      gsap.set(items, from);
      ScrollTrigger.batch(items, {
        start: START,
        once: true,
        onEnter: (batch) => gsap.to(batch, to),
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/";

/** A short label that decodes from random characters when it comes into view. */
export function ScrambleText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      watchPageHeight();
      gsap.from(el, {
        duration: 0.9,
        delay,
        ease: "none",
        scrambleText: { text, chars: CHARS, speed: 0.6 },
        scrollTrigger: { trigger: el, start: START, once: true },
      });
    },
    { scope: ref },
  );
  return (
    <span ref={ref} data-reveal="" className={className}>
      {text}
    </span>
  );
}
