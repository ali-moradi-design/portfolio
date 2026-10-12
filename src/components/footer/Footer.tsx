import { person } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mb-9 border-t border-line py-6">
      <div className="section-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="index-label">
          <span className="text-accent">ALI</span>
          <span className="text-ink">MORADI</span>
          <span className="mx-3 text-ink-faint">/</span>
          © {year}
        </p>
        <p className="index-label">
          {person.role} · {person.location}
        </p>
      </div>
    </footer>
  );
}
