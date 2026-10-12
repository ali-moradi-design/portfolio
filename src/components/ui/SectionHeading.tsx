"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ClipTitle } from "./ClipTitle";

type Props = {
  muted?: string;
  title: string;
  kicker?: string;
  action?: ReactNode;
  className?: string;
  id?: string;
};

export function SectionHeading({
  muted,
  title,
  kicker,
  action,
  className,
  id,
}: Props) {
  const label = muted ? `${muted} ${title}` : title;

  return (
    <header
      className={cn(
        "flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between sm:pb-8",
        className,
      )}
    >
      <div className="min-w-0">
        <ClipTitle id={id} className="section-title">
          {label}
        </ClipTitle>
        {kicker ? <p className="section-kicker">{kicker}</p> : null}
      </div>
      {action ? <div className="shrink-0 pb-0.5">{action}</div> : null}
    </header>
  );
}
