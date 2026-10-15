import { LOGO_BRACKETS, LOGO_LETTERS, LOGO_STROKES, LOGO_VIEWBOX } from "@/shared/lib/logo";
import styles from "./Logo.module.css";

/** The [AM] logo in the current palette: letters in the text color, brackets in the accent. */
export function Logo() {
  return (
    <svg viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`} className={styles.logo} aria-hidden="true">
      <path className={styles.letters} d={LOGO_LETTERS} strokeWidth={LOGO_STROKES.letters} />
      <path className={styles.brackets} d={LOGO_BRACKETS} strokeWidth={LOGO_STROKES.brackets} />
    </svg>
  );
}
