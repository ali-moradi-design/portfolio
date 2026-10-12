"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
};

const ease = [0.22, 1, 0.36, 1] as const;

export function SplitReveal({ text, className, delay = 0, as = "span" }: Props) {
  const reduce = useReducedMotion();
  const Tag = as;
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn(className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ y: "0%", clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.82,
              delay: delay + i * 0.045,
              ease,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h1",
  id,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2";
  id?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={line} className={cn("block overflow-hidden", lineClassName)}>
          <motion.span
            className="block will-change-transform"
            initial={{ y: "112%", clipPath: "inset(0 0 100% 0)" }}
            animate={{ y: "0%", clipPath: "inset(0 0 0% 0)" }}
            transition={{
              duration: 0.95,
              delay: delay + i * 0.12,
              ease,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
