"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/useMedia";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (!fine || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </div>
  );
}
