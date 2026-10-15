import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Pixels, pixelHost, pixelLabel } from "../pixels";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";
type Size = "default" | "small";

function classes(variant: Variant, size: Size) {
  return [styles.button, styles[variant], size === "small" && styles.small, pixelHost].filter(Boolean).join(" ");
}

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <Pixels cols={16} rows={4} />
      <span className={pixelLabel}>{children}</span>
    </>
  );
}

/** A link styled as a button. Internal paths use next/link; mailto and external links use <a>. */
export function ButtonLink({
  href,
  variant = "secondary",
  size = "default",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  const className = classes(variant, size);
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        <Inner>{children}</Inner>
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      <Inner>{children}</Inner>
    </a>
  );
}

export function Button({
  variant = "secondary",
  size = "default",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button type="button" {...rest} className={classes(variant, size)}>
      <Inner>{children}</Inner>
    </button>
  );
}
