import { describe, expect, it } from "vitest";
import { TOKENS } from "@/shared/config";
import { paletteScript, themeCss } from "./themeCss";

describe("themeCss", () => {
  it("defines light, dark and no-script rules for every palette", () => {
    const css = themeCss();
    expect(css).toContain(
      `:root[data-palette="sage"]{--bg:${TOKENS.sage.light.bg}`,
    );
    expect(css).toContain(
      `:root[data-palette="midnight"][data-mode="dark"]{--bg:${TOKENS.midnight.dark.bg}`,
    );
    expect(css).toContain(
      `@media (prefers-color-scheme: dark){:root[data-palette="inferno"]:not([data-mode])`,
    );
  });

  it("only accepts a known palette from storage", () => {
    expect(paletteScript).toContain('["sage","midnight","inferno"]');
  });
});
