import { LOGO_BRACKETS, LOGO_LETTERS, LOGO_STROKES, LOGO_VIEWBOX } from "@/lib/logo";

/** The [AM] logo in the current palette: letters in the text color, brackets in the accent. */
export function Logo() {
  return (
    <svg viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`} className="logo" aria-hidden="true">
      <path className="logo-letters" d={LOGO_LETTERS} strokeWidth={LOGO_STROKES.letters} />
      <path className="logo-brackets" d={LOGO_BRACKETS} strokeWidth={LOGO_STROKES.brackets} />
    </svg>
  );
}
