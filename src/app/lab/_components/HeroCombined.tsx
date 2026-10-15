import Image from "next/image";
import { hero, person } from "@/data/content";
import portrait from "../_assets/portrait-placeholder.png";
import type { Tokens } from "../_lib/tokens";
import { HeroActions, HeroKicker, InspectorPanel } from "./HeroInspector";
import { TrailField } from "./TrailField";

export function HeroCombined({ tokens, photo = false }: { tokens: Tokens; photo?: boolean }) {
  return (
    <TrailField
      headline={person.name}
      tokens={tokens}
      className={`hero-fit hero-c${photo ? " has-photo" : ""}`}
      before={
        <>
          {photo && <Portrait />}
          <HeroKicker />
        </>
      }
      aside={<InspectorPanel hint="This dashboard is live. Drag across it to see its spacing, tokens and contrast." />}
    >
      <p className="hero-lede">{hero.bio}</p>
      <HeroActions />
    </TrailField>
  );
}

// Placeholder: an AI-generated stand-in, to be replaced with Ali's real photo before launch.
function Portrait() {
  return (
    <figure className="portrait">
      <Image src={portrait} alt="Placeholder portrait" sizes="(max-width: 600px) 96px, 260px" priority />
      {/* Drawn like a selected layer in the inspector, to tie the photo to the dashboard on the right. */}
      <figcaption className="portrait-tag">Placeholder photo</figcaption>
      <span className="portrait-handle tl" aria-hidden="true" />
      <span className="portrait-handle tr" aria-hidden="true" />
      <span className="portrait-handle bl" aria-hidden="true" />
      <span className="portrait-handle br" aria-hidden="true" />
    </figure>
  );
}
