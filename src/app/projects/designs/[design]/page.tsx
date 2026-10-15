import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FILTER_DESIGNS } from "@/features/filter-projects";
import { ProjectsPage } from "@/views/projects";

// Temporary: previews of the filter designs to choose from. Delete this route
// once one is picked.

export const metadata: Metadata = {
  title: "Filter designs",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return FILTER_DESIGNS.map((_, i) => ({ design: String(i + 1) }));
}

export default async function Page({
  params,
}: PageProps<"/projects/designs/[design]">) {
  const n = Number((await params).design);
  if (!Number.isInteger(n) || n < 1 || n > FILTER_DESIGNS.length) notFound();
  return <ProjectsPage design={n - 1} />;
}
