"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";
import { useCallback, useSyncExternalStore, type ReactNode } from "react";
import {
  PALETTES,
  TOKENS,
  type Mode,
  type Palette,
  type Tokens,
} from "@/shared/config";
import { DEFAULT_PALETTE, STORAGE_KEYS, type ModeChoice } from "./themeCss";

// Two theme axes on <html>: the mode (data-mode, light or dark) is kept by
// next-themes; the palette (data-palette) by the small store below. Both are
// set by inline scripts before the first paint, and the CSS from themeCss()
// maps them to the color variables. useTheme() gives the real colors to the
// code that draws them itself (Highcharts, WebGL).

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-mode"
      defaultTheme="system"
      enableSystem
      storageKey={STORAGE_KEYS.mode}
    >
      {children}
    </NextThemesProvider>
  );
}

const listeners = new Set<() => void>();

function subscribePalette(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

const readPalette = () =>
  document.documentElement.dataset.palette ?? DEFAULT_PALETTE;

function writePalette(value: Palette) {
  document.documentElement.dataset.palette = value;
  try {
    localStorage.setItem(STORAGE_KEYS.palette, value);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for this page.
  }
  listeners.forEach((l) => l());
}

const noop = () => () => {};

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
  const stored = useSyncExternalStore(
    subscribePalette,
    readPalette,
    () => DEFAULT_PALETTE,
  );
  const palette = (PALETTES as readonly string[]).includes(stored)
    ? (stored as Palette)
    : DEFAULT_PALETTE;
  const { theme, resolvedTheme, setTheme } = useNextTheme();
  // next-themes only knows the stored mode in the browser; render the server's
  // values until hydration is done so the markup matches.
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const mode: Mode = hydrated && resolvedTheme === "dark" ? "dark" : "light";
  const modeChoice: ModeChoice =
    hydrated && (theme === "light" || theme === "dark") ? theme : "system";
  const setPalette = useCallback((value: Palette) => writePalette(value), []);
  return {
    palette,
    modeChoice,
    mode,
    tokens: TOKENS[palette][mode],
    setPalette,
    setMode: setTheme,
  };
}
