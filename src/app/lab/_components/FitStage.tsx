"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Lays its child out at a fixed design width and scales it to fit the available box ("contain"),
// so the hero always stays inside the viewport, at any window size.
export function FitStage({ width, maxScale = 1.25, children }: { width: number; maxScale?: number; children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, h: 0 });

  useEffect(() => {
    const box = boxRef.current;
    const inner = innerRef.current;
    if (!box || !inner) return;
    const measure = () => {
      const h = inner.offsetHeight;
      const scale = Math.min(box.clientWidth / width, box.clientHeight / h, maxScale);
      setFit((f) => (Math.abs(f.scale - scale) < 0.001 && f.h === h ? f : { scale, h }));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [width, maxScale]);

  return (
    <div ref={boxRef} className="fit-box">
      <div className="fit-sizer" style={{ width: width * fit.scale, height: fit.h * fit.scale }}>
        <div
          ref={innerRef}
          className="fit-inner"
          data-scale={fit.scale}
          style={{ width, transform: `scale(${fit.scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
