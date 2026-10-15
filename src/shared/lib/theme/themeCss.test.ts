import { describe, expect, it } from "vitest";
import { TOKENS } from "@/shared/config";
import { themeCss, themeScript } from "./themeCss";

describe("themeCss", () => {
  it("defines light, dark and system-dark rules for every palette", () => {
    const css = themeCss();
    expect(css).toContain(`:root[data-palette="sage"]{--bg:${TOKENS.sage.light.bg}`);
    expect(css).toContain(`:root[data-palette="midnight"][data-mode="dark"]{--bg:${TOKENS.midnight.dark.bg}`);
    expect(css).toContain(`@media (prefers-color-scheme: dark){:root[data-palette="inferno"]:not([data-mode="light"])`);
  });

  it("only accepts known values from storage", () => {
    expect(themeScript).toContain('["sage","midnight","inferno"]');
    expect(themeScript).toContain('m==="light"||m==="dark"');
  });
});
