"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useSyncExternalStore, type CSSProperties } from "react";
import { PALETTES, PALETTE_LABELS, TOKENS, type Mode, type Palette } from "../_lib/tokens";
import { HeroCombined } from "./HeroCombined";
import { HeroInspector } from "./HeroInspector";
import { HeroTrail } from "./HeroTrail";

const VARIANTS = [
  { id: "a", label: "Inspector" },
  { id: "b", label: "Halftone trail" },
  { id: "c", label: "Combined" },
] as const;
type VariantId = (typeof VARIANTS)[number]["id"];
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

  const style = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [`--${k}`, v]),
  ) as CSSProperties;

  return (
    <div className="lab-root" style={{ ...style, colorScheme: mode }} data-mode={mode}>
      <header className="lab-bar">
        <strong className="lab-bar-title">Hero lab</strong>
        <Segmented
          label="Variant"
          value={variant}
          options={VARIANTS.map((v) => ({ value: v.id, label: v.label }))}
          onChange={(v) => set("v", v as VariantId)}
        />
        <Segmented
          label="Palette"
          value={palette}
          options={PALETTES.map((p) => ({ value: p, label: PALETTE_LABELS[p as Palette] }))}
          onChange={(v) => set("p", v)}
        />
        <Segmented
          label="Mode"
          value={modeChoice}
          options={[
            { value: "system", label: "System" },
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
          onChange={(v) => set("m", v)}
        />
      </header>
      <main>
        {variant === "a" && <HeroInspector />}
        {variant === "b" && <HeroTrail tokens={tokens} />}
        {variant === "c" && <HeroCombined tokens={tokens} />}
      </main>
    </div>
  );
}

function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="lab-ctl">
      <span>{label}</span>
      <div className="lab-seg" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
