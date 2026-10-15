import { describe, expect, it } from "vitest";
import { isGraphicRole, isToken, parseTokens, typeStep } from "./inspectTokens";

describe("parseTokens", () => {
  it("splits roles and alternatives", () => {
    expect(parseTokens("series --chart-1 / --chart-2; grid --border")).toEqual([
      { role: "series", items: ["--chart-1", "--chart-2"] },
      { role: "grid", items: ["--border"] },
    ]);
  });

  it("keeps plain words and ignores empty parts", () => {
    expect(parseTokens("numbers tabular; ;")).toEqual([{ role: "numbers", items: ["tabular"] }]);
    expect(parseTokens(null)).toEqual([]);
  });

  it("knows tokens and graphic roles", () => {
    expect(isToken("--s-5")).toBe(true);
    expect(isToken("tabular")).toBe(false);
    expect(isGraphicRole("series")).toBe(true);
    expect(isGraphicRole("bg")).toBe(false);
  });
});

describe("typeStep", () => {
  it("names sizes on the scale and rejects others", () => {
    expect(typeStep(17)).toBe("Body");
    expect(typeStep(14)).toBe("Body S");
    expect(typeStep(21.0001)).toBe("Body L");
    expect(typeStep(11)).toBeNull();
  });
});
