"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "@/features/switch-theme";
import { nav, person } from "@/shared/config";
import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui/logo";
import { Pixels, pixelHost, RollLabel } from "@/shared/ui/pixels";

// Menu after heronaiapp.com: equal cells divided by rules, uppercase labels, a
// pixel dissolve on hover, a rolling label and an accent square that follows
// the cursor inside the cell.

const cell = cn(
  pixelHost,
  "block h-full min-w-32 cursor-pointer border-l border-border px-3 py-2.5 text-left tracking-[inherit] text-muted uppercase no-underline",
  "after:pointer-events-none after:absolute after:top-[var(--my,-20px)] after:left-[var(--mx,-20px)] after:size-1.5 after:-translate-1/2 after:bg-accent after:opacity-0 after:content-[''] hover:after:opacity-100",
  "focus-visible:-outline-offset-2",
);

/** `showWork` hides the Work link while there are no projects to show. */
export function Header({ showWork = true }: { showWork?: boolean }) {
  const items = nav.filter(
    (n) => n.href !== "#contact" && (showWork || n.href !== "#work"),
  );
  const [open, setOpen] = useState(false);

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const target = (e.target as Element).closest<HTMLElement>("[data-cell]");
    if (!target) return;
    const r = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - r.left}px`);
    target.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <>
      <a
        href="#main"
        className="absolute -top-25 left-3 z-50 bg-accent px-3 py-2 text-on-accent no-underline focus:top-3"
      >
        Skip to content
      </a>
      <header
        className="sticky top-0 z-30 grid h-header auto-cols-auto grid-flow-col grid-cols-[minmax(0,1fr)] items-stretch border-b border-border bg-bg text-xs tracking-[0.06em] uppercase"
        onPointerMove={track}
      >
        <div className="flex min-w-0 items-stretch">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-4 text-body tracking-normal text-text normal-case no-underline"
          >
            <Logo />
            <span className="max-[560px]:hidden">{person.name}</span>
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className={cn(
            "max-[1100px]:absolute max-[1100px]:top-full max-[1100px]:right-0 max-[1100px]:z-40 max-[1100px]:border max-[1100px]:border-border max-[1100px]:bg-bg",
            !open && "max-[1100px]:hidden",
          )}
        >
          <ul className="m-0 flex h-full list-none p-0 max-[1100px]:h-auto max-[1100px]:flex-col">
            {items.map((item) => (
              <li key={item.href} className="flex">
                <Link
                  href={`/${item.href}`}
                  className={cn(
                    cell,
                    "max-[1100px]:h-header max-[1100px]:min-w-55 max-[1100px]:border-t max-[1100px]:border-l-0",
                  )}
                  data-cell
                  onClick={() => setOpen(false)}
                >
                  <Pixels cols={13} rows={6} />
                  <RollLabel text={item.label} />
                  <span
                    className="absolute right-1 bottom-1 size-1.25 border-r border-b border-border-strong"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={cn(
            cell,
            "hidden max-[1100px]:block max-[1100px]:min-w-24 max-[560px]:min-w-0",
          )}
          data-cell
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Pixels cols={13} rows={6} />
          <RollLabel text={open ? "Close" : "Menu"} />
        </button>

        <Link
          href="/#contact"
          className={cn(
            cell,
            "group/cta min-w-37.5 text-accent [--px-fill:var(--accent)] [--px-ink:var(--on-accent)] max-[1100px]:min-w-28 max-[560px]:min-w-0 max-[560px]:pr-7.5",
          )}
          data-cell
        >
          <Pixels cols={13} rows={6} />
          <RollLabel text="Contact" />
          <span
            className="absolute right-2.5 bottom-2 text-sm transition-colors delay-190 duration-0 group-hover/cta:text-on-accent group-focus-visible/cta:text-on-accent"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
        <div className="flex items-center border-l border-border px-4 max-[560px]:px-3">
          <ThemeSwitcher />
        </div>
      </header>
    </>
  );
}
