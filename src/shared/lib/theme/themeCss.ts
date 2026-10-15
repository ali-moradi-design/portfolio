import {
  PALETTES,
  TOKENS,
  type Mode,
  type Palette,
  type Tokens,
} from "@/shared/config";

export type ModeChoice = Mode | "system";
export const DEFAULT_PALETTE: Palette = "sage";
export const STORAGE_KEYS = {
  palette: "theme-palette",
  mode: "theme-mode",
} as const;

const vars = (t: Tokens) =>
  Object.entries(t)
    .map(([k, v]) => `--${k}:${v}`)
    .join(";");

/**
 * Color variables for every palette and mode, keyed on <html data-palette
 * data-mode>. Without JavaScript there is no data-mode, so the system setting
 * decides.
 */
export function themeCss(): string {
  return PALETTES.map((p) => {
    const light = `${vars(TOKENS[p].light)};color-scheme:light`;
    const dark = `${vars(TOKENS[p].dark)};color-scheme:dark`;
    const sel = `:root[data-palette="${p}"]`;
    return [
      `${sel}{${light}}`,
      `${sel}[data-mode="dark"]{${dark}}`,
      `@media (prefers-color-scheme: dark){${sel}:not([data-mode]){${dark}}}`,
    ].join("");
  }).join("");
}

/** Sets the stored palette before the first paint (next-themes does the mode). */
export const paletteScript = `(function(){try{var p=localStorage.getItem("${STORAGE_KEYS.palette}");if(${JSON.stringify(PALETTES)}.indexOf(p)>-1)document.documentElement.dataset.palette=p;}catch(e){}})();`;
