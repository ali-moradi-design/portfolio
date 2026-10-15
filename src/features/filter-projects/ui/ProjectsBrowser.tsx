"use client";

import type { Project } from "@/entities/project";
import { useProjectFilters } from "../model/useProjectFilters";
import { CommandBar } from "./variants/CommandBar";
import { DrawerPanel } from "./variants/DrawerPanel";
import { MenuBar } from "./variants/MenuBar";
import { RuledTabs } from "./variants/RuledTabs";
import { Sidebar } from "./variants/Sidebar";
import { StripBar } from "./variants/StripBar";

// Same order as FILTER_DESIGNS; the chosen design stays, the rest go.
const VIEWS = [RuledTabs, Sidebar, CommandBar, StripBar, DrawerPanel, MenuBar];

/** Filters and the project grid; the filters live in the URL query. */
export function ProjectsBrowser({
  projects,
  design = 0,
}: {
  projects: readonly Project[];
  design?: number;
}) {
  const s = useProjectFilters(projects);
  const View = VIEWS[design] ?? VIEWS[0];
  return <View s={s} />;
}
