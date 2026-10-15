import { pixelLabel } from "./classes";

/** A label that rolls up on hover, a copy coming in from below (menu cells). */
export function RollLabel({ text }: { text: string }) {
  const part =
    "transition-transform duration-320 ease-out-soft group-hover/px:-translate-y-full group-focus-visible/px:-translate-y-full";
  return (
    <span
      className={`relative inline-grid h-[1.25em] overflow-hidden leading-[1.25] ${pixelLabel}`}
    >
      <span className={part}>{text}</span>
      <span aria-hidden="true" className={`absolute top-full left-0 ${part}`}>
        {text}
      </span>
    </span>
  );
}
