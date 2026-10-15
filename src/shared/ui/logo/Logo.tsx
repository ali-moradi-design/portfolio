import {
  LOGO_BRACKETS,
  LOGO_LETTERS,
  LOGO_STROKES,
  LOGO_VIEWBOX,
} from "@/shared/lib/logo";

/** The [AM] logo in the current palette: letters in the text color, brackets in the accent. */
export function Logo() {
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      className="block aspect-54/40 h-auto w-10.5 flex-none"
      aria-hidden="true"
    >
      <path
        className="fill-none stroke-text"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={LOGO_LETTERS}
        strokeWidth={LOGO_STROKES.letters}
      />
      <path
        className="fill-none stroke-accent"
        strokeLinecap="square"
        d={LOGO_BRACKETS}
        strokeWidth={LOGO_STROKES.brackets}
      />
    </svg>
  );
}
