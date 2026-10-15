import { PALETTES, TOKENS, type Mode, type Palette, type Tokens } from "@/shared/config";

export type ModeChoice = Mode | "system";
export const DEFAULT_PALETTE: Palette = "sage";
export const STORAGE_KEYS = { palette: "theme-palette", mode: "theme-mode" } as const;

const vars = (t: Tokens) =>
  Object.entries(t)
    .map(([k, v]) => `--${k}:${v}`)
    .join(";");

/** Color variables for every palette and mode, keyed on <html data-palette data-mode>. */
export function themeCss(): string {
  return PALETTES.map((p) => {
    const light = `${vars(TOKENS[p].light)};color-scheme:light`;
    const dark = `${vars(TOKENS[p].dark)};color-scheme:dark`;
    const sel = `:root[data-palette="${p}"]`;
    return [
      `${sel}{${light}}`,
      `${sel}[data-mode="dark"]{${dark}}`,
      `@media (prefers-color-scheme: dark){${sel}:not([data-mode="light"]){${dark}}}`,
    ].join("");
  }).join("");
}

/** Runs before the first paint, so a stored theme never flashes the default one. */
export const themeScript = `(function(){try{var d=document.documentElement,p=localStorage.getItem("${STORAGE_KEYS.palette}"),m=localStorage.getItem("${STORAGE_KEYS.mode}");if(${JSON.stringify(PALETTES)}.indexOf(p)>-1)d.dataset.palette=p;if(m==="light"||m==="dark")d.dataset.mode=m;}catch(e){}})();`;
