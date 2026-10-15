"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/shared/lib/cn";
import type { Project } from "../model/types";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const hoverQuery = "(hover: hover) and (pointer: fine)";
const subscribe = (query: string) => (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

// Decoding several videos at once halves the frame rate on ordinary machines,
// so at most one preview plays at any time.
let playing: HTMLVideoElement | null = null;
function play(video: HTMLVideoElement) {
  if (playing && playing !== video) playing.pause();
  playing = video;
  video.play().catch(() => {});
}
function stop(video: HTMLVideoElement) {
  video.pause();
  if (playing === video) playing = null;
}

/**
 * A muted looping preview that shows its poster until it plays. With a mouse
 * it plays while the card is hovered or focused; on touch screens while it is
 * mostly in view. Only one plays at a time, and none with reduced motion.
 */
export function ProjectPreview({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(
    subscribe(reducedQuery),
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
  const hover = useSyncExternalStore(
    subscribe(hoverQuery),
    () => window.matchMedia(hoverQuery).matches,
    () => true,
  );
  const preview = project.preview;

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("article");
    if (!video || !card || reduced) return;
    if (hover) {
      const on = () => play(video);
      const off = () => stop(video);
      card.addEventListener("pointerenter", on);
      card.addEventListener("pointerleave", off);
      card.addEventListener("focusin", on);
      card.addEventListener("focusout", off);
      return () => {
        stop(video);
        card.removeEventListener("pointerenter", on);
        card.removeEventListener("pointerleave", off);
        card.removeEventListener("focusin", on);
        card.removeEventListener("focusout", off);
      };
    }
    const io = new IntersectionObserver(
      ([entry]) =>
        entry.intersectionRatio >= 0.75 ? play(video) : stop(video),
      { threshold: [0, 0.75] },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      stop(video);
    };
  }, [reduced, hover]);

  const frame = cn(
    "relative aspect-16/10 overflow-hidden rounded-md border border-border bg-raised",
    className,
  );

  if (!preview) {
    return (
      <div
        className={cn(
          frame,
          "grid place-items-center bg-[radial-gradient(circle,color-mix(in_srgb,var(--muted)_30%,transparent)_1px,transparent_1.2px)] bg-size-[14px_14px]",
        )}
        aria-hidden="true"
      >
        <span className="rounded-sm bg-surface px-2 py-1 text-xs text-muted">
          Preview coming soon
        </span>
      </div>
    );
  }

  if (!preview.mp4 && !preview.webm) {
    return (
      <div className={frame}>
        <Image
          src={preview.poster}
          alt=""
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={preview.poster}
        aria-hidden="true"
        className="size-full object-cover"
      >
        {preview.mp4 && <source src={preview.mp4} type="video/mp4" />}
        {preview.webm && <source src={preview.webm} type="video/webm" />}
      </video>
    </div>
  );
}
