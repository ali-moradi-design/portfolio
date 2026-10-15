"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PALETTES, TOKENS, type Mode, type Palette, type Tokens } from "@/shared/config";
import { DEFAULT_PALETTE, STORAGE_KEYS, type ModeChoice } from "./themeCss";

// The theme lives on <html data-palette data-mode>: an inline script sets it from localStorage
// before the first paint (see themeScript), CSS maps it to the color variables, and this store
// reads it back so components that draw with real colors (Highcharts, WebGL) can follow it.

const darkQuery = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const mql = window.matchMedia(darkQuery);
  mql.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    mql.removeEventListener("change", onChange);
  };
}

function read(): string {
  const el = document.documentElement;
  const dark = window.matchMedia(darkQuery).matches;
  return `${el.dataset.palette ?? DEFAULT_PALETTE}|${el.dataset.mode ?? "system"}|${dark ? "dark" : "light"}`;
}
const serverSnapshot = () => `${DEFAULT_PALETTE}|system|light`;

function write(key: "palette" | "mode", value: string) {
  document.documentElement.dataset[key] = value;
  try {
    localStorage.setItem(STORAGE_KEYS[key], value);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for this page only.
  }
  notify();
}

export type Theme = {
  palette: Palette;
  modeChoice: ModeChoice;
  /** The mode in effect: the system mode when the choice is "system". */
  mode: Mode;
  tokens: Tokens;
  setPalette: (p: Palette) => void;
  setMode: (m: ModeChoice) => void;
};

export function useTheme(): Theme {
  const snap = useSyncExternalStore(subscribe, read, serverSnapshot);
  const [p, m, system] = snap.split("|");
  const palette = (PALETTES as readonly string[]).includes(p) ? (p as Palette) : DEFAULT_PALETTE;
  const modeChoice: ModeChoice = m === "light" || m === "dark" ? m : "system";
  const mode: Mode = modeChoice === "system" ? (system as Mode) : modeChoice;
  const setPalette = useCallback((value: Palette) => write("palette", value), []);
  const setMode = useCallback((value: ModeChoice) => write("mode", value), []);
  return { palette, modeChoice, mode, tokens: TOKENS[palette][mode], setPalette, setMode };
}
