"use client";

import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { cn } from "@/shared/lib/cn";

// Sample data only.
type Row = {
  service: string;
  status: "Healthy" | "Degraded" | "Down";
  users: number;
  p95: number;
  uptime: number;
};
const DATA: Row[] = [
  {
    service: "Customer portal",
    status: "Healthy",
    users: 51234,
    p95: 182,
    uptime: 99.98,
  },
  {
    service: "Dashboard builder",
    status: "Healthy",
    users: 8420,
    p95: 240,
    uptime: 99.95,
  },
  {
    service: "Support panel",
    status: "Degraded",
    users: 1260,
    p95: 610,
    uptime: 99.2,
  },
  {
    service: "Form builder",
    status: "Healthy",
    users: 3915,
    p95: 205,
    uptime: 99.97,
  },
  { service: "Report export", status: "Down", users: 0, p95: 0, uptime: 97.4 },
];
const MAX_USERS = Math.max(...DATA.map((r) => r.users));
const STATUS_ORDER = { Healthy: 0, Degraded: 1, Down: 2 } as const;
const STATUS_DOT = {
  Healthy: "before:bg-good",
  Degraded: "before:bg-warn",
  Down: "before:bg-bad",
} as const;

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});
const helper = createColumnHelper<typeof features, Row>();
const columns = helper.columns([
  helper.accessor("service", { header: "Service", sortFn: "alphanumeric" }),
  helper.accessor("status", {
    header: "Status",
    sortFn: (a, b) =>
      STATUS_ORDER[a.original.status] - STATUS_ORDER[b.original.status],
    cell: (info) => (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 before:size-2 before:rounded-full before:content-['']",
          STATUS_DOT[info.getValue()],
        )}
      >
        {info.getValue()}
      </span>
    ),
  }),
  helper.accessor("users", {
    header: "Users",
    cell: (info) => (
      <span className="relative inline-flex min-w-27.5 justify-end">
        <span
          className="absolute -bottom-0.75 left-0 h-0.5 bg-chart-1 opacity-70"
          style={{ width: `${(info.getValue() / MAX_USERS) * 100}%` }}
        />
        <span>{info.getValue().toLocaleString("en-US")}</span>
      </span>
    ),
  }),
  helper.accessor("p95", {
    header: "p95 ms",
    cell: (info) =>
      info.getValue() ? (
        <span className={info.getValue() > 400 ? "text-warn" : undefined}>
          {info.getValue()}
        </span>
      ) : (
        "n/a"
      ),
  }),
  helper.accessor("uptime", {
    header: "Uptime",
    cell: (info) => `${info.getValue().toFixed(2)}%`,
  }),
]);
const NUMERIC = new Set(["users", "p95", "uptime"]);

export function ServicesTable() {
  const table = useTable({
    features,
    columns,
    data: DATA,
    initialState: { sorting: [{ id: "users", desc: true }] },
  });

  return (
    <div
      className="overflow-x-auto"
      data-inspect="Data table (TanStack Table)"
      data-tokens="divider --border; header --muted; numbers tabular"
    >
      <table className="w-full border-collapse text-body-sm">
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className={cn(
                      "border-b border-border px-2 py-1.75 text-left whitespace-nowrap",
                      "font-normal text-muted",
                      NUMERIC.has(header.column.id) && "text-right",
                    )}
                    aria-sort={
                      sorted === "asc"
                        ? "ascending"
                        : sorted === "desc"
                          ? "descending"
                          : "none"
                    }
                  >
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-1"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <table.FlexRender header={header} />
                      <span className="w-2 text-[8px]" aria-hidden="true">
                        {sorted === "asc" ? "▲" : sorted === "desc" ? "▼" : ""}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn(
                    "border-b border-border px-2 py-1.75 text-left whitespace-nowrap",
                    NUMERIC.has(cell.column.id) && "text-right tabular-nums",
                  )}
                >
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
