import { CopyButton } from "@/features/copy-text";
import { facts, person } from "@/shared/config";
import { ButtonLink } from "@/shared/ui/button";
import { Section } from "@/shared/ui/section";

const openTo = facts.find((f) => f.label === "Open to")?.value;

export function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      label="Contact"
      note={openTo}
      title="Let's build an interface people enjoy using."
    >
      <div className="grid gap-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={person.emailHref}
            className="text-[clamp(1.375rem,4.2vw,3.1875rem)] leading-tight tracking-[-0.01em] break-all text-accent underline decoration-1 underline-offset-[0.18em] hover:decoration-2"
          >
            {person.email}
          </a>
          <CopyButton text={person.email} label="Copy email" />
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={person.cv}
            download={person.cvFileName}
            variant="primary"
          >
            Download CV
          </ButtonLink>
          <ButtonLink href={person.linkedin} external>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={person.github} external>
            GitHub
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
