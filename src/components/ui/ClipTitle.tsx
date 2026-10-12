"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  id?: string;
};

export function ClipTitle({
  children,
  className,
  delay = 0,
  as: Tag = "h2",
  id,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={cn("overflow-hidden", className)}>
      <motion.span
        className="block will-change-[clip-path,transform]"
        initial={{ clipPath: "inset(0% 0% 100% 0%)", y: "18%" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", y: "0%" }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.95, delay, ease }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

export function ClipLine({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <span className="block overflow-hidden">
      <motion.span
        className={cn("block will-change-[clip-path,transform]", className)}
        initial={{ clipPath: "inset(0% 0% 100% 0%)", y: "110%" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", y: "0%" }}
        transition={{ duration: 1.05, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}
