"use client";

import { useEffect, useState } from "react";

const TICKS = 80;

function tickHeight(i: number) {
  if (i % 10 === 0) return 14;
  if (i % 5 === 0) return 9;
  return 5;
}

export function Ruler() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = Math.round(progress * (TICKS - 1));

  return (
    <div className="ruler" aria-hidden="true">
      {Array.from({ length: TICKS }, (_, i) => (
        <span
          key={i}
          className={i === active ? "tick tick-on" : "tick"}
          style={{ height: tickHeight(i) }}
        />
      ))}
    </div>
  );
}
