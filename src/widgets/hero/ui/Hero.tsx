import type { ReactNode } from "react";
import { Inspector } from "@/features/inspect-element";
import { hero, person } from "@/shared/config";
import { ButtonLink } from "@/shared/ui/button";
import { FitStage } from "@/shared/ui/fit-stage";
import { TrailField } from "./TrailField";

// Portrait: approved for the hero, waiting for a real photo of Ali (transparent PNG, chest-up,
// three-quarter view). When it arrives:
//   1. save it as src/widgets/hero/assets/portrait.png
//   2. uncomment the import and <Portrait /> below and the Portrait component at the end
//   3. the Portrait classes frame it like a selected layer and fade its lower edge
// import Image from "next/image";
// import portrait from "../assets/portrait.png";

/** The first screen: the name with the fluid trail, the bio, and a live sample UI in the inspector. */
export function Hero({ showcase }: { showcase: ReactNode }) {
  return (
    <TrailField
      headline={person.name}
      before={
        <>
          {/* <Portrait /> */}
          <p className="text-body-sm tracking-[0.02em] text-muted">
            {person.role}, {person.location}
          </p>
        </>
      }
      aside={
        <div className="grid min-h-0 min-w-0">
          <Inspector hint="This dashboard is live. Drag across it to see its spacing, tokens and contrast.">
            <FitStage width={720}>{showcase}</FitStage>
          </Inspector>
        </div>
      }
    >
      <p className="max-w-[52ch] text-[clamp(0.9rem,min(1.25vw,2.1vh),1.125rem)] text-muted [@media(max-height:640px)]:hidden">
        {hero.bio}
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/#work" variant="primary">
          See projects
        </ButtonLink>
        <ButtonLink href={person.emailHref}>Email me</ButtonLink>
      </div>
    </TrailField>
  );
}

// function Portrait() {
//   const handle = "absolute size-1.75 border border-accent bg-bg";
//   return (
//     <figure className="relative mb-2 aspect-640/794 h-[clamp(120px,34vh,360px)] border border-dashed border-accent/70 stacked:h-24">
//       <Image
//         src={portrait}
//         alt={person.name}
//         sizes="(max-width: 600px) 96px, 260px"
//         priority
//         className="size-full object-contain object-bottom mask-[linear-gradient(#000_78%,transparent)]"
//       />
//       <span className={`${handle} -top-1 -left-1`} aria-hidden="true" />
//       <span className={`${handle} -top-1 -right-1`} aria-hidden="true" />
//       <span className={`${handle} -bottom-1 -left-1`} aria-hidden="true" />
//       <span className={`${handle} -right-1 -bottom-1`} aria-hidden="true" />
//     </figure>
//   );
// }
