import type { Metadata } from "next";
import { ProjectsPage } from "@/views/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Demo projects by Ali Moradi, each live on its own subdomain. Filter them by type and tech.",
};

export default function Page() {
  return <ProjectsPage />;
}
