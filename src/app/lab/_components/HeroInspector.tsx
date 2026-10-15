import Link from "next/link";
import { person } from "@/data/content";
import { FitStage } from "./FitStage";
import { Inspector } from "./Inspector";
import { MiniDashboard } from "./MiniDashboard";
import { Pixels } from "./Pixels";

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
        <Pixels cols={32} rows={8} />
        <span className="btn-label">See projects</span>
      </Link>
      <a className="btn btn-secondary px" href={person.emailHref}>
        <Pixels cols={32} rows={8} />
        <span className="btn-label">Email me</span>
      </a>
    </div>
  );
}
