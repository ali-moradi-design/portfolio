"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { TokensContext } from "../_lib/theme";
import { PALETTES, TOKENS, type Mode } from "../_lib/tokens";
import { HeroCombined } from "./HeroCombined";
import { HeroNav, type SwatchStyle } from "./HeroNav";

const VARIANTS = [
  { id: "c", label: "Combined" },
  { id: "d", label: "Combined with photo" },
] as const;
// Styles for the palette picker; the user compares these and picks one.
const SWATCH_STYLES = [
  { id: "1", label: "Dots" },
  { id: "2", label: "Split circles" },
  { id: "3", label: "Pixel tiles" },
  { id: "4", label: "Stripes" },
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
  const variant = pick(params.get("v"), VARIANTS.map((v) => v.id), "c");
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
    (key: "v" | "p" | "m" | "r", value: string) => {
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

  const swatch = pick(params.get("r"), SWATCH_STYLES.map((s) => s.id), "1");
  const theme = { palette, mode, onPalette: (p: string) => set("p", p), onMode: (m: string) => set("m", m) };

  const style = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [`--${k}`, v]),
  ) as CSSProperties;

  return (
    <TokensContext.Provider value={{ tokens, mode }}>
      <div ref={rootRef} className="lab-root" style={{ ...style, colorScheme: mode }} data-mode={mode}>
        <div ref={barRef}>
          <HeroNav swatchStyle={`s${swatch}` as SwatchStyle} {...theme} />
        </div>
        <main>
          <HeroCombined key={variant} tokens={tokens} photo={variant === "d"} />
        </main>
        <div className="lab-variants">
          <div role="group" aria-label="Lab variant">
            {VARIANTS.map((v) => (
              <button key={v.id} type="button" aria-pressed={v.id === variant} title={v.label} onClick={() => set("v", v.id)}>
                {v.id.toUpperCase()}
                <span className="sr-only"> {v.label}</span>
              </button>
            ))}
          </div>
          <div role="group" aria-label="Palette picker style">
            {SWATCH_STYLES.map((s) => (
              <button key={s.id} type="button" aria-pressed={s.id === swatch} title={s.label} onClick={() => set("r", s.id)}>
                {s.id}
                <span className="sr-only"> {s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </TokensContext.Provider>
  );
}
