import type { ReactNode } from "react";

/** A small label chip: tools, tags and token names. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-raised px-2 py-1 text-xs leading-none text-text">
      {children}
    </span>
  );
}
