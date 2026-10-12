"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, person } from "@/data/content";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="nav-bar">
        <a href="#top" className="nav-cell nav-logo" onClick={() => setOpen(false)}>
          <span className="sm:hidden">
            <span className="text-accent">A</span>M
          </span>
          <span className="hidden sm:inline">
            <span className="text-accent">ALI</span>MORADI
          </span>
        </a>
        <button
          type="button"
          className="nav-cell nav-m"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <X aria-hidden="true" size={20} strokeWidth={1.5} />
          ) : (
            <Menu aria-hidden="true" size={20} strokeWidth={1.5} />
          )}
        </button>
      </header>

      {open ? (
        <nav id="site-menu" className="menu-overlay" aria-label="Primary">
          <ul className="section-shell flex min-h-[calc(100svh-54px)] flex-col justify-center gap-1 py-10">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block min-h-14 font-display text-[clamp(2rem,7vw,3.4rem)] font-light uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-8">
              <a
                href={person.emailHref}
                className="index-label inline-flex min-h-11 items-center"
                onClick={() => setOpen(false)}
              >
                {person.email}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}
