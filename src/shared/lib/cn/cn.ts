import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge must know the custom font sizes, or it reads "text-body"
// as a color and drops it next to "text-muted".
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "body-sm",
            "body",
            "body-lg",
            "heading-sm",
            "heading-md",
            "heading-lg",
            "heading-xl",
            "display",
          ],
        },
      ],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts (the last class wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
