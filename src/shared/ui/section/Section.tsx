import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { RevealText, ScrambleText } from "../reveal";

/** Horizontal padding shared by the hero and every section. */
export const gutter = "px-[clamp(16px,2.5vw,48px)]";

/**
 * A home page section: a ruled header row (index, label, optional note), a
 * large title, then the content.
 */
export function Section({
  id,
  index,
  label,
  title,
  note,
  children,
  className,
}: {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-t border-border", className)}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4 border-b border-border py-3 text-xs tracking-[0.06em] text-muted uppercase",
          gutter,
        )}
      >
        <p>
          <span className="text-accent">{index}</span>
          <span aria-hidden="true"> / </span>
          <ScrambleText text={label} />
        </p>
        {note && <p className="text-right">{note}</p>}
      </div>
      <div
        className={cn(
          "pt-[clamp(32px,6vw,96px)] pb-[clamp(48px,8vw,128px)]",
          gutter,
        )}
      >
        <RevealText
          as="h2"
          id={headingId}
          className="max-w-[22ch] text-[clamp(2rem,4.6vw,3.1875rem)] leading-[1.1] tracking-[-0.015em] text-balance"
        >
          {title}
        </RevealText>
        <div className="mt-[clamp(32px,5vw,72px)]">{children}</div>
      </div>
    </section>
  );
}
