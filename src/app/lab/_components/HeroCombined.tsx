import { hero, person } from "@/data/content";
import type { Tokens } from "../_lib/tokens";
import { HeroActions, HeroKicker, InspectorPanel } from "./HeroInspector";
import { TrailField } from "./TrailField";

export function HeroCombined({ tokens }: { tokens: Tokens }) {
  return (
    <TrailField
      headline={person.name}
      tokens={tokens}
      className="hero-fit hero-c"
      before={<HeroKicker />}
      aside={<InspectorPanel hint="This dashboard is live. Drag across it to see its spacing, tokens and contrast." />}
    >
      <p className="hero-lede">{hero.bio}</p>
      <HeroActions />
    </TrailField>
  );
}
