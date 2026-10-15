import Link from "next/link";
import { hero, person } from "@/data/content";
import { FitStage } from "./FitStage";
import { Inspector } from "./Inspector";
import { MiniDashboard } from "./MiniDashboard";
import { Pixels } from "./Pixels";

export function HeroInspector() {
  return (
    <section className="hero-fit">
      <div className="lab-copy">
        <HeroKicker />
        <h1 className="hero-title">{person.name}</h1>
        <p className="hero-lede">{hero.bio}</p>
        <HeroActions />
      </div>
      <InspectorPanel />
    </section>
  );
}

export function HeroKicker() {
  return (
    <p className="hero-kicker">
      {person.role}, {person.location}
    </p>
  );
}

export function InspectorPanel({ hint }: { hint?: string }) {
  return (
    <div className="lab-panel">
      <Inspector hint={hint}>
        <FitStage width={720}>
          <MiniDashboard />
        </FitStage>
      </Inspector>
    </div>
  );
}

export function HeroActions() {
  return (
    <div className="hero-actions">
      <Link className="btn btn-primary px" href="/#work">
        <Pixels />
        <span className="btn-label">See projects</span>
      </Link>
      <a className="btn btn-secondary px" href={person.emailHref}>
        <Pixels />
        <span className="btn-label">Email me</span>
      </a>
    </div>
  );
}
