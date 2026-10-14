import { hero, person } from "@/data/content";
import type { Tokens } from "../_lib/tokens";
import { HeroActions } from "./HeroInspector";
import { Inspector } from "./Inspector";
import { MiniDashboard } from "./MiniDashboard";
import { TrailField } from "./TrailField";

export function HeroCombined({ tokens }: { tokens: Tokens }) {
  return (
    <div className="hero-c">
      <TrailField headline="I build dashboards for big data" tokens={tokens} className="hero-c-top">
        <div className="hero-c-meta">
          <p className="hero-kicker">
            {person.name}, {person.role}
          </p>
          <p className="hero-lede hero-c-lede">{hero.bio}</p>
          <HeroActions />
        </div>
      </TrailField>
      <div className="hero-c-bottom">
        <Inspector hint="This dashboard is live. Drag across it to see the spacing, tokens and contrast behind it.">
          <MiniDashboard compact />
        </Inspector>
      </div>
    </div>
  );
}
