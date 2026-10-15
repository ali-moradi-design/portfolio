"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "@/features/switch-theme";
import { nav, person } from "@/shared/config";
import { Logo } from "@/shared/ui/logo";
import { Pixels, pixelHost, RollLabel } from "@/shared/ui/pixels";
import styles from "./Header.module.css";

// Menu after heronaiapp.com: equal cells divided by rules, uppercase labels, a pixel dissolve on
// hover, a rolling label and an accent square that follows the cursor inside the cell.
const ITEMS = nav.filter((n) => n.href !== "#contact");
const cell = `${styles.cell} ${pixelHost}`;

export function Header() {
  const [open, setOpen] = useState(false);

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const target = (e.target as Element).closest<HTMLElement>("[data-cell]");
    if (!target) return;
    const r = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - r.left}px`);
    target.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <header className={styles.root} onPointerMove={track}>
      <div className={styles.left}>
        <Link href="/" className={styles.brand}>
          <Logo />
          <span>{person.name}</span>
        </Link>
      </div>

      <nav aria-label="Primary" className={`${styles.menu}${open ? ` ${styles.open}` : ""}`}>
        <ul>
          {ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={`/${item.href}`} className={cell} data-cell onClick={() => setOpen(false)}>
                <Pixels cols={13} rows={6} />
                <RollLabel text={item.label} />
                <span className={styles.corner} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className={`${cell} ${styles.burger}`} data-cell aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Pixels cols={13} rows={6} />
        <RollLabel text={open ? "Close" : "Menu"} />
      </button>

      <Link href="/#contact" className={`${cell} ${styles.cta}`} data-cell>
        <Pixels cols={13} rows={6} />
        <RollLabel text="Contact" />
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
      <div className={styles.tools}>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
