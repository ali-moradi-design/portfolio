"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/shared/lib/theme";

// Cursor after heronaiapp.com, measured frame by frame there. The native
// pointer stays; a 10 px square in the accent color follows it, closing 10%
// of the gap every 60 Hz frame. Behind the square runs a 1 px line along the
// path it took, up to MAX_LENGTH long and fading toward its old end. While
// the square still moves, the old end holds; once it almost stops, the line
// retracts into it. Over links and controls nothing is drawn, nor inside the
// hero, which has its own mark.

const SIZE = 10;
/** Share of the gap left after one 60 Hz frame. */
const DECAY = 0.9;
/** Spacing of the recorded path points, px. */
const STEP = 4;
const MAX_LENGTH = 560;
/** Speed below which the square counts as stopped, px per frame. */
const REST_SPEED = 0.4;
/** How fast the line retracts once the square stops, px per frame. */
const RETRACT = 24;
const SKIP =
  "a, button, input, select, textarea, label, summary, [role='tab'], [role='switch'], [role='radio'], [role='option'], [data-trail], [data-cursor='native']";

type Point = { x: number; y: number };

export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { tokens } = useTheme();
  const color = useRef(tokens.accent);
  useEffect(() => {
    color.current = tokens.accent;
  }, [tokens.accent]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointer: Point = { x: 0, y: 0 };
    const square: Point = { x: 0, y: 0 };
    /** Path behind the square, oldest first, STEP px apart. */
    let path: Point[] = [];
    let visible = false;
    let started = false;
    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      request();
    };

    /** Adds points along the way to the square, then trims to MAX_LENGTH. */
    const record = () => {
      let tip = path.at(-1);
      if (!tip) {
        path.push({ ...square });
        return;
      }
      let d = Math.hypot(square.x - tip.x, square.y - tip.y);
      while (d >= STEP) {
        const k = STEP / d;
        tip = {
          x: tip.x + (square.x - tip.x) * k,
          y: tip.y + (square.y - tip.y) * k,
        };
        path.push(tip);
        d -= STEP;
      }
      const max = Math.ceil(MAX_LENGTH / STEP);
      if (path.length > max) path = path.slice(path.length - max);
    };

    const draw = (time: number) => {
      raf = 0;
      const dt = last ? Math.min(time - last, 100) : 16.7;
      last = time;
      const frames = dt / 16.67;
      const keep = still ? 0 : Math.pow(DECAY, frames);
      const before = { ...square };
      square.x = pointer.x + (square.x - pointer.x) * keep;
      square.y = pointer.y + (square.y - pointer.y) * keep;
      const speed =
        Math.hypot(square.x - before.x, square.y - before.y) / frames;

      if (still) path = [];
      else {
        record();
        if (speed < REST_SPEED && path.length > 1) {
          path = path.slice(
            Math.min(path.length - 1, Math.ceil((RETRACT * frames) / STEP)),
          );
        }
      }

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (visible) {
        const c = color.current;
        const n = path.length;
        if (n > 1) {
          // Each segment a little more transparent toward the old end.
          ctx.lineWidth = 1;
          ctx.strokeStyle = c;
          for (let i = 1; i < n; i++) {
            ctx.globalAlpha = i / n;
            ctx.beginPath();
            ctx.moveTo(path[i - 1].x, path[i - 1].y);
            ctx.lineTo(path[i].x, path[i].y);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(path[n - 1].x, path[n - 1].y);
          ctx.lineTo(square.x, square.y);
          ctx.stroke();
        }
        ctx.fillStyle = c;
        ctx.fillRect(square.x - SIZE / 2, square.y - SIZE / 2, SIZE, SIZE);
      }
      // Keep animating until the square has arrived and the line is gone.
      if (
        Math.hypot(pointer.x - square.x, pointer.y - square.y) > 0.3 ||
        path.length > 1
      )
        request();
      else last = 0;
    };

    function request() {
      if (!raf) raf = requestAnimationFrame(draw);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!started) {
        square.x = pointer.x;
        square.y = pointer.y;
        path = [];
        started = true;
      }
      visible = !(e.target as Element | null)?.closest?.(SKIP);
      request();
    };
    const onLeave = () => {
      visible = false;
      started = false;
      request();
    };

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] size-full"
    />
  );
}
