import type { Metadata } from "next";
import { ProjectsPage } from "@/views/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Complete products by Ali Moradi, designed and built end to end, each running on its own subdomain. Filter by type or technology.",
};

export default function Page() {
  return <ProjectsPage />;
}
