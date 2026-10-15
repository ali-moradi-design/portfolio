import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("keeps a custom font size next to a text color", () => {
    expect(cn("text-body-sm text-muted")).toBe("text-body-sm text-muted");
  });

  it("lets the last conflicting class win", () => {
    expect(cn("p-2", false, "p-4")).toBe("p-4");
  });
});
