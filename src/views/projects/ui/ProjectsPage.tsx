import { Suspense } from "react";
import { ProjectCard, projectGrid, visibleProjects } from "@/entities/project";
import { ProjectsBrowser } from "@/features/filter-projects";
import { cn } from "@/shared/lib/cn";
import { RevealText } from "@/shared/ui/reveal";
import { gutter } from "@/shared/ui/section";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

/** All demo projects with filters. */
export function ProjectsPage() {
  const projects = visibleProjects();
  return (
    <>
      <Header />
      <main id="main" className={cn("pb-[clamp(48px,8vw,128px)]", gutter)}>
        <div className="grid gap-5 pt-[clamp(32px,6vw,96px)] pb-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-12">
          <div className="grid gap-4">
            <p className="text-xs tracking-[0.06em] text-muted uppercase">
              <span className="text-accent">Projects</span>
              <span aria-hidden="true"> / </span>
              {projects.length} live
            </p>
            <RevealText
              as="h1"
              className="text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.95] tracking-[-0.02em]"
            >
              Projects
            </RevealText>
          </div>
          <RevealText
            delay={0.15}
            className="max-w-[48ch] text-muted lg:justify-self-end"
          >
            Complete products, designed and built end to end. Each one runs on
            its own subdomain, so you can open it and use it. Filter by type or
            technology.
          </RevealText>
        </div>
        {projects.length === 0 ? (
          <p className="border-t border-border py-16 text-muted">
            The first projects are on their way.
          </p>
        ) : (
          // Without JavaScript, or before the URL is read, the full list shows.
          <Suspense
            fallback={
              <div className={projectGrid[2]}>
                {projects.map((p) => (
                  <ProjectCard key={p.slug} project={p} detailed />
                ))}
              </div>
            }
          >
            <ProjectsBrowser projects={projects} />
          </Suspense>
        )}
      </main>
      <Footer />
    </>
  );
}
