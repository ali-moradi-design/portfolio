// Parses the `data-tokens` attribute of an inspectable element:
// "bg --surface; series --chart-1 / --chart-2; numbers tabular" → one group per role.

export type TokenGroup = { role: string; items: string[] };

/** WCAG 2.x AA minimums: 4.5:1 for body text (1.4.3), 3:1 for graphics such as chart series (1.4.11). */
export const AA_TEXT = 4.5;
export const AA_GRAPHICS = 3;

/** Roles whose colors are graphics, checked against the element background at 3:1. */
const GRAPHIC_ROLES = new Set(["series"]);

export function parseTokens(attr: string | null): TokenGroup[] {
  return (attr ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [role, ...rest] = part.split(/\s+/);
      const items = rest.join(" ").split("/").map((t) => t.trim()).filter(Boolean);
      return { role, items };
    });
}

export function isGraphicRole(role: string): boolean {
  return GRAPHIC_ROLES.has(role);
}

export function isToken(item: string): boolean {
  return item.startsWith("--");
}
