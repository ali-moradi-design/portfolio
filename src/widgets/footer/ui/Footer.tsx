import Link from "next/link";
import { person } from "@/shared/config";
import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui/logo";
import { gutter } from "@/shared/ui/section";

export function Footer() {
  return (
    <footer
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-xs tracking-[0.06em] text-muted uppercase",
        gutter,
      )}
    >
      <p className="flex items-center gap-3 tracking-normal normal-case">
        <Logo />
        {person.name} · {person.location}
      </p>
      <p>Built with Next.js, Tailwind CSS and Feature-Sliced Design</p>
      <Link href="#main" className="text-text hover:text-accent">
        Back to top ↑
      </Link>
    </footer>
  );
}
