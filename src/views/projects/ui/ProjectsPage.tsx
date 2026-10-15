import { Suspense } from "react";
import { ProjectRow, visibleProjects } from "@/entities/project";
import { ProjectsBrowser } from "@/features/filter-projects";
import { cn } from "@/shared/lib/cn";
import { gutter } from "@/shared/ui/section";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export function ProjectsPage() {
  const projects = visibleProjects();
  return (
    <>
      <Header />
      <main id="main" className={cn("pb-[clamp(48px,8vw,128px)]", gutter)}>
        <div className="grid gap-4 pt-[clamp(32px,6vw,96px)] pb-[clamp(24px,4vw,56px)]">
          <p className="text-xs tracking-[0.06em] text-muted uppercase">
            <span className="text-accent">Projects</span>
            <span aria-hidden="true"> / </span>
            {projects.length} live demos
          </p>
          <h1 className="text-[clamp(2.25rem,6vw,4.75rem)] leading-none tracking-[-0.02em]">
            All projects
          </h1>
          <p className="max-w-[60ch] text-muted">
            Each project runs on its own subdomain: open it, try it, and read
            how it is built.
          </p>
        </div>
        {projects.length === 0 ? (
          <p className="border-t border-border py-16 text-muted">
            The first projects are on their way.
          </p>
        ) : (
          // Without JavaScript, or before the URL is read, the full list shows.
          <Suspense
            fallback={
              <div className="border-b border-border [&>article:first-child]:border-t-0">
                {projects.map((p) => (
                  <ProjectRow key={p.slug} project={p} />
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
