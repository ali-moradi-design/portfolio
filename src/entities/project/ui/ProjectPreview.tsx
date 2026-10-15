"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/shared/lib/cn";
import type { Project } from "../model/types";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(reducedQuery);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/**
 * A muted looping preview. With preload="none" nothing but the poster loads
 * until it plays; it plays while it is on screen and pauses off screen. With reduced motion it stays still until
 * the visitor presses play.
 */
export function ProjectPreview({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [userPlay, setUserPlay] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
  const preview = project.preview;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.4;
        if (visible && (!reduced || userPlay)) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.4] },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced, userPlay]);

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
        {preview.webm && <source src={preview.webm} type="video/webm" />}
        {preview.mp4 && <source src={preview.mp4} type="video/mp4" />}
      </video>
      {reduced && (
        <button
          type="button"
          onClick={() => {
            const next = !userPlay;
            setUserPlay(next);
            if (next) ref.current?.play().catch(() => {});
            else ref.current?.pause();
          }}
          className="absolute right-2 bottom-2 cursor-pointer rounded-sm bg-surface/90 px-2 py-1 text-xs text-text"
        >
          {userPlay ? "Pause preview" : "Play preview"}
        </button>
      )}
    </div>
  );
}
