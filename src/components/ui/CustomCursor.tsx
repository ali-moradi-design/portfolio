"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = "a, button, [role='button']";
const LERP = 0.16;

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const markRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setActive(fine.matches && !reduce.matches);
    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const mark = markRef.current;
    const bg = bgRef.current;
    const fill = fillRef.current;
    if (!mark || !bg || !fill) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let mouseX = 0;
    let mouseY = 0;
    let bgX = 0;
    let bgY = 0;
    let scale = 1;
    let hovering = false;
    let visible = false;
    let seeded = false;
    let raf = 0;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      mark.classList.toggle("is-visible", next);
      bg.classList.toggle("is-visible", next);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!seeded) {
        bgX = mouseX;
        bgY = mouseY;
        seeded = true;
      }
      mark.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const node = event.target;
      if (!(node instanceof Element)) return;
      hovering = Boolean(node.closest(HOVER_SELECTOR));
    };

    const onLeaveWindow = () => setVisible(false);

    const tick = () => {
      bgX += (mouseX - bgX) * LERP;
      bgY += (mouseY - bgY) * LERP;
      const target = hovering ? 2 : 1;
      scale += (target - scale) * 0.18;
      bg.style.transform = `translate3d(${bgX}px, ${bgY}px, 0)`;
      fill.style.transform = `scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("blur", onLeaveWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      root.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("blur", onLeaveWindow);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="site-cursor" aria-hidden="true">
      <div ref={bgRef} className="cursor-bg">
        <span ref={fillRef} className="cursor-bg-fill" />
      </div>
      <div ref={markRef} className="cursor-mark" />
    </div>
  );
}
