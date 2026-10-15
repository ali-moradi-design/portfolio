import { hero, person } from "@/data/content";
import type { Tokens } from "../_lib/tokens";
import { HeroActions, HeroKicker, InspectorPanel } from "./HeroInspector";
import { TrailField } from "./TrailField";

// Portrait: approved for the hero, waiting for a real photo of Ali (transparent PNG, chest-up,
// three-quarter view). When it arrives:
//   1. save it as src/app/lab/_assets/portrait.png
//   2. uncomment the import and <Portrait /> below and the Portrait component at the end
//   3. the `.portrait` styles in lab.css frame it like a selected layer and fade its lower edge
// import Image from "next/image";
// import portrait from "../_assets/portrait.png";

export function HeroCombined({ tokens }: { tokens: Tokens }) {
  return (
    <TrailField
      headline={person.name}
      tokens={tokens}
      className="hero-fit hero-c"
      before={
        <>
          {/* <Portrait /> */}
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

// function Portrait() {
//   return (
//     <figure className="portrait">
//       <Image src={portrait} alt={person.name} sizes="(max-width: 600px) 96px, 260px" priority />
//       <span className="portrait-handle tl" aria-hidden="true" />
//       <span className="portrait-handle tr" aria-hidden="true" />
//       <span className="portrait-handle bl" aria-hidden="true" />
//       <span className="portrait-handle br" aria-hidden="true" />
//     </figure>
//   );
// }
