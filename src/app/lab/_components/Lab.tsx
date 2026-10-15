"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { TokensContext } from "../_lib/theme";
import { PALETTES, TOKENS, type Mode } from "../_lib/tokens";
import { HeroCombined } from "./HeroCombined";
import { HeroInspector } from "./HeroInspector";
import { HeroNav } from "./HeroNav";
import { HeroTrail } from "./HeroTrail";

const VARIANTS = [
  { id: "a", label: "Inspector" },
  { id: "b", label: "Halftone trail" },
  { id: "c", label: "Combined" },
] as const;
type ModeChoice = Mode | "system";

const darkQuery = "(prefers-color-scheme: dark)";
function subscribeDark(onChange: () => void) {
  const mql = window.matchMedia(darkQuery);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

export function Lab() {
  const router = useRouter();
  const params = useSearchParams();
  const variant = pick(params.get("v"), VARIANTS.map((v) => v.id), "a");
  const palette = pick(params.get("p"), PALETTES, "sage");
  const modeChoice = pick<ModeChoice>(params.get("m"), ["system", "light", "dark"], "system");

  const systemDark = useSyncExternalStore(
    subscribeDark,
    () => window.matchMedia(darkQuery).matches,
    () => false,
  );
  const mode: Mode = modeChoice === "system" ? (systemDark ? "dark" : "light") : modeChoice;
  const tokens = TOKENS[palette][mode];

  const set = useCallback(
    (key: "v" | "p" | "m", value: string) => {
      const next = new URLSearchParams(params.toString());
      next.set(key, value);
      router.replace(`?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  // Heroes fill the viewport below the lab toolbar; the toolbar wraps on small screens.
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    const root = rootRef.current;
    if (!bar || !root) return;
    const ro = new ResizeObserver(() => root.style.setProperty("--lab-bar-h", `${bar.offsetHeight}px`));
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  const style = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [`--${k}`, v]),
  ) as CSSProperties;

  return (
    <TokensContext.Provider value={{ tokens, mode }}>
      <div ref={rootRef} className="lab-root" style={{ ...style, colorScheme: mode }} data-mode={mode}>
        <div ref={barRef}>
          <HeroNav palette={palette} mode={mode} onPalette={(p) => set("p", p)} onMode={(m) => set("m", m)} />
        </div>
        <main>
          {variant === "a" && <HeroInspector />}
          {variant === "b" && <HeroTrail tokens={tokens} />}
          {variant === "c" && <HeroCombined tokens={tokens} />}
        </main>
        <div className="lab-variants" role="group" aria-label="Lab variant">
          {VARIANTS.map((v) => (
            <button key={v.id} type="button" aria-pressed={v.id === variant} title={v.label} onClick={() => set("v", v.id)}>
              {v.id.toUpperCase()}
              <span className="sr-only"> {v.label}</span>
            </button>
          ))}
        </div>
      </div>
    </TokensContext.Provider>
  );
}
