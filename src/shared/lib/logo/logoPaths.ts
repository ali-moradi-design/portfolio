// The [AM] logo: capital A and M drawn with one monoline stroke, between square brackets that
// read both as a selection box and as an array in code. Shared by the menu logo, the favicon,
// the Apple touch icon and the social preview image.

export const LOGO_VIEWBOX = { width: 54, height: 40 } as const;
/** Letters, drawn with round caps in the text color. */
export const LOGO_LETTERS =
  "M11 31 L17.5 9 L24 31 M14.2 23 H20.8 M28 31 V9 L34.5 21 L41 9 V31";
/** Brackets, drawn with square ends in the accent color. */
export const LOGO_BRACKETS = "M8 3 H3 V37 H8 M46 3 H51 V37 H46";
export const LOGO_STROKES = { letters: 3, brackets: 2.4 } as const;

/** Standalone SVG markup, for places that need a string (icons rendered with ImageResponse). */
export function logoSvg({
  text,
  accent,
  scale = 1,
}: {
  text: string;
  accent: string;
  scale?: number;
}) {
  const { width, height } = LOGO_VIEWBOX;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="0 0 ${width} ${height}"><path d="${LOGO_LETTERS}" fill="none" stroke="${text}" stroke-width="${LOGO_STROKES.letters}" stroke-linecap="round" stroke-linejoin="round"/><path d="${LOGO_BRACKETS}" fill="none" stroke="${accent}" stroke-width="${LOGO_STROKES.brackets}" stroke-linecap="square"/></svg>`;
}
