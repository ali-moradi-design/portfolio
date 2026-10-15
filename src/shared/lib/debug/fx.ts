// Temporary switches to find which effect slows a machine down, e.g.
// /?fx=nocursor,nolenis or /?fx=off. Read once per page load, in the browser.

export type Fx = "cursor" | "lenis" | "reveal" | "trail";

export function fxOff(name: Fx): boolean {
  if (typeof window === "undefined") return false;
  const list = (new URLSearchParams(location.search).get("fx") ?? "").split(
    ",",
  );
  return list.includes("off") || list.includes(`no${name}`);
}
