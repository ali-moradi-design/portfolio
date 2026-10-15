"use client";

import type Highcharts from "highcharts";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { Tokens } from "@/shared/config";
import { useTheme } from "@/shared/lib/theme";
import { Chart } from "@/shared/ui/chart";
import { cn } from "@/shared/lib/cn";
import { ServicesTable } from "./ServicesTable";

// Sample data only. The dashboard shows the kind of UI Ali builds; the numbers are not real.

function wave(n: number, base: number, amp: number, seed: number) {
  return Array.from({ length: n }, (_, i) =>
    Math.round(
      base +
        amp * Math.sin(i / 2.3 + seed) +
        amp * 0.45 * Math.sin(i * 1.7 + seed * 3) +
        i * base * 0.012,
    ),
  );
}

const RANGES = {
  week: {
    label: "7 days",
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dashboards: [420, 510, 480, 560, 610, 300, 260],
    reports: [180, 220, 260, 240, 300, 120, 90],
    kpis: [
      {
        name: "Active users",
        value: "12,480",
        delta: "+4.2%",
        good: true,
        spark: wave(14, 40, 8, 1),
      },
      {
        name: "p95 load",
        value: "182 ms",
        delta: "-12 ms",
        good: true,
        spark: wave(14, 30, 6, 2),
      },
      {
        name: "Error rate",
        value: "0.3%",
        delta: "+0.1%",
        good: false,
        spark: wave(14, 20, 5, 3),
      },
    ],
    devices: [62, 31, 7],
  },
  month: {
    label: "30 days",
    categories: Array.from({ length: 30 }, (_, i) => String(i + 1)),
    dashboards: wave(30, 480, 90, 0.4),
    reports: wave(30, 200, 50, 1.3),
    kpis: [
      {
        name: "Active users",
        value: "48,920",
        delta: "+9.8%",
        good: true,
        spark: wave(14, 40, 8, 4),
      },
      {
        name: "p95 load",
        value: "194 ms",
        delta: "-6 ms",
        good: true,
        spark: wave(14, 30, 6, 5),
      },
      {
        name: "Error rate",
        value: "0.2%",
        delta: "-0.1%",
        good: true,
        spark: wave(14, 20, 5, 6),
      },
    ],
    devices: [58, 35, 7],
  },
} as const;
type RangeKey = keyof typeof RANGES;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(reducedQuery);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function baseOptions(t: Tokens, animate: boolean): Highcharts.Options {
  return {
    chart: {
      backgroundColor: "transparent",
      style: { fontFamily: "inherit" },
      spacing: [8, 4, 4, 0],
      animation: animate,
    },
    title: { text: undefined },
    credits: { enabled: false },
    legend: { enabled: false },
    accessibility: { enabled: true },
    tooltip: {
      backgroundColor: t.surface,
      borderColor: t["border-strong"],
      borderRadius: 6,
      shadow: false,
      style: { color: t.text, fontSize: "12px" },
      shared: true,
    },
    xAxis: {
      lineColor: t.border,
      tickColor: t.border,
      labels: { style: { color: t.muted, fontSize: "11px" } },
    },
    yAxis: {
      gridLineColor: t.border,
      title: { text: undefined },
      labels: { style: { color: t.muted, fontSize: "11px" } },
    },
    plotOptions: { series: { animation: animate ? { duration: 600 } : false } },
  };
}

export function SampleDashboard() {
  const { tokens: t } = useTheme();
  const [range, setRange] = useState<RangeKey>("week");
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
  const data = RANGES[range];

  const area = useMemo<Highcharts.Options>(() => {
    const b = baseOptions(t, !reduced);
    const fill = (c: string) => ({
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, alpha(c, 0.35)],
        [1, alpha(c, 0)],
      ] as [number, string][],
    });
    return {
      ...b,
      chart: { ...b.chart, type: "areaspline", height: 210 },
      xAxis: {
        ...b.xAxis,
        categories: [...data.categories],
        tickInterval: range === "week" ? 1 : 5,
      },
      accessibility: {
        description:
          "Sessions per day for dashboards and reports, sample data.",
      },
      series: [
        {
          type: "areaspline",
          name: "Dashboards",
          data: [...data.dashboards],
          color: t["chart-1"],
          fillColor: fill(t["chart-1"]),
          lineWidth: 2,
          marker: { enabled: false },
        },
        {
          type: "areaspline",
          name: "Reports",
          data: [...data.reports],
          color: t["chart-2"],
          fillColor: fill(t["chart-2"]),
          lineWidth: 2,
          marker: { enabled: false },
        },
      ],
    };
  }, [t, reduced, data, range]);

  const donut = useMemo<Highcharts.Options>(() => {
    const b = baseOptions(t, !reduced);
    return {
      ...b,
      chart: { ...b.chart, type: "pie", height: 210, spacing: [6, 6, 6, 6] },
      tooltip: {
        ...b.tooltip,
        shared: false,
        pointFormat: "<b>{point.y}%</b>",
      },
      accessibility: {
        description: "Share of sessions by device, sample data.",
      },
      plotOptions: {
        pie: {
          innerSize: "72%",
          borderWidth: 2,
          borderColor: t.surface,
          dataLabels: { enabled: false },
          center: ["50%", "50%"],
          size: "100%",
        },
      },
      series: [
        {
          type: "pie",
          name: "Devices",
          data: [
            { name: "Desktop", y: data.devices[0], color: t["chart-1"] },
            { name: "Mobile", y: data.devices[1], color: t["chart-2"] },
            { name: "Tablet", y: data.devices[2], color: t["chart-3"] },
          ],
        },
      ],
    };
  }, [t, reduced, data]);

  return (
    <div
      className="grid gap-4 rounded-lg border border-border bg-surface p-6 shadow-[0_1px_0_var(--border),0_18px_40px_-24px_color-mix(in_srgb,var(--text)_30%,transparent)]"
      data-inspect="Dashboard"
      data-tokens="bg --surface; border --border; radius --radius-lg; padding p-6; gap gap-4"
    >
      <div
        className="flex flex-wrap items-center justify-between gap-3"
        data-inspect="Toolbar"
        data-tokens="gap gap-3"
      >
        <div>
          <h2
            className="text-body-lg leading-[1.2]"
            data-inspect="Title"
            data-tokens="color --text; font --text-body-lg"
          >
            Product usage
          </h2>
          <p
            className="text-body-sm text-muted"
            data-inspect="Caption"
            data-tokens="color --muted; font --text-body-sm"
          >
            Sample data
          </p>
        </div>
        <div
          className="inline-flex overflow-hidden rounded-md border border-border-strong"
          role="group"
          aria-label="Range"
          data-inspect="Segmented control"
          data-tokens="border --border-strong; radius --radius-md"
        >
          {(Object.keys(RANGES) as RangeKey[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={range === k}
              className="cursor-pointer px-3 py-2.25 text-body-sm leading-none text-text not-first:border-l not-first:border-border aria-pressed:bg-accent aria-pressed:text-on-accent"
              onClick={() => setRange(k)}
            >
              {RANGES[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {data.kpis.map((k) => (
          <div
            key={k.name}
            className="flex items-end justify-between gap-2 rounded-md bg-raised px-4 py-3"
            data-inspect="KPI tile"
            data-tokens="bg --raised; radius --radius-md; padding py-3 / px-4"
          >
            <div className="grid gap-0.5">
              <span className="text-body-sm text-muted">{k.name}</span>
              <span className="text-heading-sm leading-[1.15] whitespace-nowrap tabular-nums">
                {k.value}
              </span>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  k.good ? "text-good" : "text-bad",
                )}
              >
                {k.delta}
              </span>
            </div>
            <Spark
              values={k.spark}
              color={k.good ? "var(--good)" : "var(--bad)"}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] gap-3">
        <figure
          className="m-0 grid min-w-0 gap-1 rounded-md border border-border px-3 pt-3 pb-2"
          data-inspect="Area chart (Highcharts)"
          data-tokens="series --chart-1 / --chart-2; grid --border"
        >
          <figcaption className="flex items-center justify-between gap-2 text-body-sm">
            <span>Sessions</span>
            <Legend
              items={[
                ["Dashboards", "var(--chart-1)"],
                ["Reports", "var(--chart-2)"],
              ]}
            />
          </figcaption>
          <Chart options={area} height={210} />
        </figure>
        <figure
          className="m-0 grid min-w-0 gap-1 rounded-md border border-border px-3 pt-3 pb-2"
          data-inspect="Donut chart (Highcharts)"
          data-tokens="series --chart-1 / --chart-2 / --chart-3"
        >
          <figcaption className="flex items-center justify-between gap-2 text-body-sm">
            <span>Devices</span>
          </figcaption>
          <div className="relative">
            <Chart options={donut} height={210} />
            {/* HTML overlay: Highcharts titles do not sit exactly in the middle of the ring. */}
            <span
              className="pointer-events-none absolute inset-0 grid place-content-center text-center leading-[1.1]"
              aria-hidden="true"
            >
              <span className="text-[22px] tabular-nums">
                {data.devices[0]}%
              </span>
              <span className="text-[11px] text-muted">desktop</span>
            </span>
          </div>
          <Legend
            className="justify-center"
            items={[
              ["Desktop", "var(--chart-1)"],
              ["Mobile", "var(--chart-2)"],
              ["Tablet", "var(--chart-3)"],
            ]}
          />
        </figure>
      </div>

      <ServicesTable />
    </div>
  );
}

/**
 * A KPI sparkline: plain SVG, scaled from the lowest to the highest value. A
 * Highcharts chart for each of these tiny lines cost more than the rest of the
 * dashboard on load.
 */
function Spark({
  values,
  color,
}: {
  values: readonly number[];
  color: string;
}) {
  const w = 80;
  const h = 36;
  const min = Math.min(...values);
  const span = Math.max(...values) - min || 1;
  const points = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - 2 - ((v - min) / span) * (h - 4),
  ]);
  const line = points
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-9 w-20 flex-none overflow-visible"
      aria-hidden="true"
    >
      <path d={`${line} L${w} ${h} L0 ${h} Z`} fill={color} opacity={0.12} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Legend({
  items,
  className,
}: {
  items: [label: string, color: string][];
  className?: string;
}) {
  return (
    <span className={cn("flex flex-wrap gap-4 text-xs text-muted", className)}>
      {items.map(([label, color]) => (
        <span key={label} className="inline-flex items-center gap-1.5">
          <i
            className="block size-2.5 rounded-[2px]"
            style={{ background: color }}
          />
          {label}
        </span>
      ))}
    </span>
  );
}
