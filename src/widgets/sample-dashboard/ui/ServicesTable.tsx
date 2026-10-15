"use client";

import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import styles from "./SampleDashboard.module.css";

// Sample data only.
type Row = { service: string; status: "Healthy" | "Degraded" | "Down"; users: number; p95: number; uptime: number };
const DATA: Row[] = [
  { service: "Customer portal", status: "Healthy", users: 51234, p95: 182, uptime: 99.98 },
  { service: "Dashboard builder", status: "Healthy", users: 8420, p95: 240, uptime: 99.95 },
  { service: "Support panel", status: "Degraded", users: 1260, p95: 610, uptime: 99.2 },
  { service: "Form builder", status: "Healthy", users: 3915, p95: 205, uptime: 99.97 },
  { service: "Report export", status: "Down", users: 0, p95: 0, uptime: 97.4 },
];
const MAX_USERS = Math.max(...DATA.map((r) => r.users));
const STATUS_ORDER = { Healthy: 0, Degraded: 1, Down: 2 } as const;

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
    sortFn: (a, b) => STATUS_ORDER[a.original.status] - STATUS_ORDER[b.original.status],
    cell: (info) => <span className={`${styles.status} ${styles[info.getValue().toLowerCase()]}`}>{info.getValue()}</span>,
  }),
  helper.accessor("users", {
    header: "Users",
    cell: (info) => (
      <span className={styles.usersCell}>
        <span className={styles.usersBar} style={{ width: `${(info.getValue() / MAX_USERS) * 100}%` }} />
        <span>{info.getValue().toLocaleString("en-US")}</span>
      </span>
    ),
  }),
  helper.accessor("p95", {
    header: "p95 ms",
    cell: (info) => (info.getValue() ? <span className={info.getValue() > 400 ? styles.warn : undefined}>{info.getValue()}</span> : "n/a"),
  }),
  helper.accessor("uptime", { header: "Uptime", cell: (info) => `${info.getValue().toFixed(2)}%` }),
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
    <div className={styles.tableWrap} data-inspect="Data table (TanStack Table)" data-tokens="divider --border; header --muted; numbers tabular">
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className={NUMERIC.has(header.column.id) ? styles.num : undefined}
                    aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"}
                  >
                    <button type="button" onClick={header.column.getToggleSortingHandler()}>
                      <table.FlexRender header={header} />
                      <span className={styles.sortMark} aria-hidden="true">
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
                <td key={cell.id} className={NUMERIC.has(cell.column.id) ? styles.num : undefined}>
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
