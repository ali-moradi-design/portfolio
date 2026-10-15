// WCAG 2.x relative luminance and contrast ratio.

export type Rgb = { r: number; g: number; b: number };

export function parseColor(value: string): Rgb | null {
  const v = value.trim();
  const hex = /^#([0-9a-f]{6})$/i.exec(v);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)$/i.exec(v);
  if (rgb) {
    const alpha = rgb[4] === undefined ? 1 : parseFloat(rgb[4]) / (rgb[4].endsWith("%") ? 100 : 1);
    if (alpha === 0) return null;
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
  }
  return null;
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance({ r, g, b }: Rgb): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function hexToVec3(hex: string): [number, number, number] {
  const c = parseColor(hex) ?? { r: 0, g: 0, b: 0 };
  return [c.r / 255, c.g / 255, c.b / 255];
}
