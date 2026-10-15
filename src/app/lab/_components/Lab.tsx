"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { TokensContext } from "../_lib/theme";
import { PALETTES, TOKENS, type Mode } from "../_lib/tokens";
import { HeroCombined } from "./HeroCombined";
import { HeroNav, type ModeStyle } from "./HeroNav";

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
    (key: "p" | "m" | "d", value: string) => {
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

  const theme = { palette, mode, onPalette: (p: string) => set("p", p), onMode: (m: string) => set("m", m) };
  // Lab only: compare the dark mode control designs.
  const modeStyle = pick(params.get("d"), ["1", "2", "3", "4"] as const, "1") as ModeStyle;

  const style = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [`--${k}`, v]),
  ) as CSSProperties;

  return (
    <TokensContext.Provider value={{ tokens, mode }}>
      <div ref={rootRef} className="lab-root" style={{ ...style, colorScheme: mode }} data-mode={mode}>
        <div ref={barRef}>
          <HeroNav {...theme} modeStyle={modeStyle} />
        </div>
        <main>
          <HeroCombined tokens={tokens} />
        </main>
        <div className="lab-variants" role="group" aria-label="Dark mode control design">
          {(["1", "2", "3", "4"] as const).map((d) => (
            <button key={d} type="button" aria-pressed={d === modeStyle} onClick={() => set("d", d)}>
              {d}
            </button>
          ))}
        </div>
      </div>
    </TokensContext.Provider>
  );
}
