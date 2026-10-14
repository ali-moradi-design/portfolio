import { hero, person } from "@/data/content";
import type { Tokens } from "../_lib/tokens";
import { HeroActions } from "./HeroInspector";
import { TrailField } from "./TrailField";

export function HeroTrail({ tokens }: { tokens: Tokens }) {
  return (
    <TrailField
      headline="I build dashboards for big data"
      tokens={tokens}
      className="hero-b"
      before={
        <p className="hero-kicker">
          {person.name}, {person.role}
        </p>
      }
    >
      <p className="hero-lede hero-b-lede">{hero.bio}</p>
      <HeroActions />
    </TrailField>
  );
}
