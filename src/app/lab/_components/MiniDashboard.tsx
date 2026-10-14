"use client";

import { useState } from "react";

// Sample data only. The dashboard shows the kind of UI Ali builds; the numbers are not real.
const RANGES = {
  week: {
    label: "7 days",
    columns: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      [420, 510, 480, 560, 610, 300, 260],
      [180, 220, 260, 240, 300, 120, 90],
      [90, 110, 140, 130, 170, 60, 40],
    ],
    kpis: [
      { name: "Active users", value: "12,480", delta: "+4.2%", good: true },
      { name: "p95 load", value: "182 ms", delta: "-12 ms", good: true },
      { name: "Error rate", value: "0.3%", delta: "+0.1%", good: false },
    ],
  },
  month: {
    label: "30 days",
    columns: ["W1", "W2", "W3", "W4"],
    series: [
      [2900, 3150, 3320, 3480],
      [1250, 1380, 1410, 1530],
      [640, 700, 720, 810],
    ],
    kpis: [
      { name: "Active users", value: "48,920", delta: "+9.8%", good: true },
      { name: "p95 load", value: "194 ms", delta: "-6 ms", good: true },
      { name: "Error rate", value: "0.2%", delta: "-0.1%", good: true },
    ],
  },
} as const;
type RangeKey = keyof typeof RANGES;

const SERIES = ["Dashboards", "Forms", "Reports"];

type Row = { service: string; status: "Healthy" | "Degraded" | "Down"; users: number; p95: number };
const ROWS: Row[] = [
  { service: "Customer portal", status: "Healthy", users: 51234, p95: 182 },
  { service: "Dashboard builder", status: "Healthy", users: 8420, p95: 240 },
  { service: "Support panel", status: "Degraded", users: 1260, p95: 610 },
  { service: "Form builder", status: "Healthy", users: 3915, p95: 205 },
  { service: "Report export", status: "Down", users: 0, p95: 0 },
];
type SortKey = keyof Row;

export function MiniDashboard({ compact = false }: { compact?: boolean }) {
  const [range, setRange] = useState<RangeKey>("week");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "users", dir: -1 });
  const data = RANGES[range];

  const rows = [...ROWS].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * sort.dir);
  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "service" || key === "status" ? 1 : -1 }));

  return (
    <div
      className={`dash${compact ? " dash-compact" : ""}`}
      data-inspect="Dashboard"
      data-tokens="bg --surface; border --border; radius --r-lg; padding --s-5; gap --s-4"
    >
      <div className="dash-head" data-inspect="Toolbar" data-tokens="gap --s-3">
        <div>
          <h2 className="dash-title" data-inspect="Title" data-tokens="color --text; font --step-1">
            Product usage
          </h2>
          <p className="dash-note" data-inspect="Caption" data-tokens="color --muted; font --step--1">
            Sample data
          </p>
        </div>
        <div className="dash-seg" role="group" aria-label="Range" data-inspect="Segmented control" data-tokens="border --border-strong; radius --r-md">
          {(Object.keys(RANGES) as RangeKey[]).map((k) => (
            <button key={k} type="button" aria-pressed={range === k} onClick={() => setRange(k)}>
              {RANGES[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="dash-kpis">
        {data.kpis.map((k) => (
          <div key={k.name} className="kpi" data-inspect="KPI tile" data-tokens="bg --raised; radius --r-md; padding --s-4">
            <span className="kpi-name">{k.name}</span>
            <span className="kpi-value">{k.value}</span>
            <span className={`kpi-delta ${k.good ? "is-good" : "is-bad"}`}>{k.delta}</span>
          </div>
        ))}
      </div>

      <figure className="dash-chart" data-inspect="Stacked bar chart" data-tokens="fill --chart-1 / --chart-2 / --chart-3; grid --border">
        <Chart columns={data.columns} series={data.series} />
        <figcaption className="dash-legend">
          {SERIES.map((s, i) => (
            <span key={s}>
              <i style={{ background: `var(--chart-${i + 1})` }} />
              {s}
            </span>
          ))}
        </figcaption>
      </figure>

      {!compact && (
        <div className="dash-table-wrap" data-inspect="Data table" data-tokens="divider --border; header --muted; numbers tabular">
          <table className="dash-table">
            <thead>
              <tr>
                {(
                  [
                    ["service", "Service"],
                    ["status", "Status"],
                    ["users", "Users"],
                    ["p95", "p95 ms"],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <th
                    key={key}
                    className={key === "users" || key === "p95" ? "num" : undefined}
                    aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                  >
                    <button type="button" onClick={() => toggleSort(key)}>
                      {label}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.service}>
                  <td>{r.service}</td>
                  <td>
                    <span className={`status status-${r.status.toLowerCase()}`}>{r.status}</span>
                  </td>
                  <td className="num">{r.users.toLocaleString("en-US")}</td>
                  <td className="num">{r.p95 || "n/a"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Chart({ columns, series }: { columns: readonly string[]; series: readonly (readonly number[])[] }) {
  const W = 480;
  const H = 200;
  const L = 44;
  const B = 24;
  const T = 12;
  const totals = columns.map((_, i) => series.reduce((sum, s) => sum + s[i], 0));
  const rawMax = Math.max(...totals);
  const step = 10 ** Math.floor(Math.log10(rawMax));
  const max = Math.ceil(rawMax / step) * step;
  const ticks = [0, max / 2, max];
  const y = (v: number) => T + (H - T - B) * (1 - v / max);
  const bw = (W - L - 8) / columns.length;
  const fmt = (v: number) => (v >= 1000 ? `${v / 1000}k` : String(v));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Stacked bar chart of sessions per period, sample data">
      {ticks.map((v) => (
        <g key={v}>
          <line x1={L} x2={W - 4} y1={y(v)} y2={y(v)} stroke="var(--border)" />
          <text x={L - 8} y={y(v) + 4} textAnchor="end" className="chart-label">
            {fmt(v)}
          </text>
        </g>
      ))}
      {columns.map((c, i) => {
        const x = L + 6 + i * bw;
        const w = Math.max(bw - 14, 4);
        let acc = 0;
        return (
          <g key={c}>
            {series.map((s, si) => {
              const top = y(acc + s[i]);
              const h = y(acc) - top;
              acc += s[i];
              return <rect key={si} x={x} y={top} width={w} height={Math.max(h - 1.5, 0)} rx={2} fill={`var(--chart-${si + 1})`} />;
            })}
            <text x={x + w / 2} y={H - 6} textAnchor="middle" className="chart-label">
              {c}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
