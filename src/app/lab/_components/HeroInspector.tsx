import Link from "next/link";
import { hero, person } from "@/data/content";
import { Inspector } from "./Inspector";
import { MiniDashboard } from "./MiniDashboard";

export function HeroInspector() {
  return (
    <section className="hero-a">
      <div className="hero-a-copy">
        <p className="hero-kicker">{person.role}, {person.location}</p>
        <h1 className="hero-a-title">{person.name}</h1>
        <p className="hero-lede">{hero.bio}</p>
        <HeroActions />
      </div>
      <Inspector>
        <MiniDashboard />
      </Inspector>
    </section>
  );
}

export function HeroActions() {
  return (
    <div className="hero-actions">
      <Link className="btn btn-primary" href="/#work">
        See projects
      </Link>
      <a className="btn btn-secondary" href={person.emailHref}>
        Email me
      </a>
    </div>
  );
}
