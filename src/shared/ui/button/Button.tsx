import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Pixels, pixelHost, pixelLabel } from "../pixels";

type Variant = "primary" | "secondary";
type Size = "default" | "small";

const base =
  "inline-flex cursor-pointer items-center border border-transparent text-xs leading-none tracking-[0.06em] text-text uppercase no-underline disabled:pointer-events-none disabled:opacity-50";
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent [--px-fill:var(--text)] [--px-ink:var(--bg)]",
  secondary: "border-border-strong",
};
const sizes: Record<Size, string> = {
  default: "rounded-[2px] px-4.5 py-3",
  small: "rounded-md px-3 py-2 text-body-sm tracking-normal normal-case",
};

function classes(variant: Variant, size: Size) {
  return cn(pixelHost, base, variants[variant], sizes[size]);
}

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <Pixels cols={16} rows={4} />
      <span className={pixelLabel}>{children}</span>
    </>
  );
}

/**
 * A link styled as a button. Page links use next/link; mailto, external links
 * and downloads use <a>.
 */
export function ButtonLink({
  href,
  variant = "secondary",
  size = "default",
  download,
  external,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  /** File name to save the linked file as. */
  download?: string;
  /** Opens in a new tab. */
  external?: boolean;
  children: ReactNode;
}) {
  const className = classes(variant, size);
  if (
    !download &&
    !external &&
    (href.startsWith("/") || href.startsWith("#"))
  ) {
    return (
      <Link href={href} className={className}>
        <Inner>{children}</Inner>
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      download={download}
      {...(external && { target: "_blank", rel: "noreferrer" })}
    >
      <Inner>{children}</Inner>
    </a>
  );
}

export function Button({
  variant = "secondary",
  size = "default",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button type="button" {...rest} className={classes(variant, size)}>
      <Inner>{children}</Inner>
    </button>
  );
}
