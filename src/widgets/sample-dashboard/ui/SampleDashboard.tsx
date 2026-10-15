"use client";

import type Highcharts from "highcharts";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { Tokens } from "@/shared/config";
import { useTheme } from "@/shared/lib/theme";
import { Chart } from "@/shared/ui/chart";
import styles from "./SampleDashboard.module.css";
import { ServicesTable } from "./ServicesTable";

// Sample data only. The dashboard shows the kind of UI Ali builds; the numbers are not real.

function wave(n: number, base: number, amp: number, seed: number) {
  return Array.from({ length: n }, (_, i) => Math.round(base + amp * Math.sin(i / 2.3 + seed) + amp * 0.45 * Math.sin(i * 1.7 + seed * 3) + i * base * 0.012));
}

const RANGES = {
  week: {
    label: "7 days",
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dashboards: [420, 510, 480, 560, 610, 300, 260],
    reports: [180, 220, 260, 240, 300, 120, 90],
    kpis: [
      { name: "Active users", value: "12,480", delta: "+4.2%", good: true, spark: wave(14, 40, 8, 1) },
      { name: "p95 load", value: "182 ms", delta: "-12 ms", good: true, spark: wave(14, 30, 6, 2) },
      { name: "Error rate", value: "0.3%", delta: "+0.1%", good: false, spark: wave(14, 20, 5, 3) },
    ],
    devices: [62, 31, 7],
  },
  month: {
    label: "30 days",
    categories: Array.from({ length: 30 }, (_, i) => String(i + 1)),
    dashboards: wave(30, 480, 90, 0.4),
    reports: wave(30, 200, 50, 1.3),
    kpis: [
      { name: "Active users", value: "48,920", delta: "+9.8%", good: true, spark: wave(14, 40, 8, 4) },
      { name: "p95 load", value: "194 ms", delta: "-6 ms", good: true, spark: wave(14, 30, 6, 5) },
      { name: "Error rate", value: "0.2%", delta: "-0.1%", good: true, spark: wave(14, 20, 5, 6) },
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
    chart: { backgroundColor: "transparent", style: { fontFamily: "inherit" }, spacing: [8, 4, 4, 0], animation: animate },
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
    xAxis: { lineColor: t.border, tickColor: t.border, labels: { style: { color: t.muted, fontSize: "11px" } } },
    yAxis: { gridLineColor: t.border, title: { text: undefined }, labels: { style: { color: t.muted, fontSize: "11px" } } },
    plotOptions: { series: { animation: animate ? { duration: 600 } : false } },
  };
}

export function SampleDashboard() {
  const { tokens: t } = useTheme();
  const [range, setRange] = useState<RangeKey>("week");
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => true);
  const data = RANGES[range];

  const area = useMemo<Highcharts.Options>(() => {
    const b = baseOptions(t, !reduced);
    const fill = (c: string) => ({ linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, alpha(c, 0.35)], [1, alpha(c, 0)]] as [number, string][] });
    return {
      ...b,
      chart: { ...b.chart, type: "areaspline", height: 210 },
      xAxis: { ...b.xAxis, categories: [...data.categories], tickInterval: range === "week" ? 1 : 5 },
      accessibility: { description: "Sessions per day for dashboards and reports, sample data." },
      series: [
        { type: "areaspline", name: "Dashboards", data: [...data.dashboards], color: t["chart-1"], fillColor: fill(t["chart-1"]), lineWidth: 2, marker: { enabled: false } },
        { type: "areaspline", name: "Reports", data: [...data.reports], color: t["chart-2"], fillColor: fill(t["chart-2"]), lineWidth: 2, marker: { enabled: false } },
      ],
    };
  }, [t, reduced, data, range]);

  const donut = useMemo<Highcharts.Options>(() => {
    const b = baseOptions(t, !reduced);
    return {
      ...b,
      chart: { ...b.chart, type: "pie", height: 210, spacing: [6, 6, 6, 6] },
      tooltip: { ...b.tooltip, shared: false, pointFormat: "<b>{point.y}%</b>" },
      accessibility: { description: "Share of sessions by device, sample data." },
      plotOptions: { pie: { innerSize: "72%", borderWidth: 2, borderColor: t.surface, dataLabels: { enabled: false }, center: ["50%", "50%"], size: "100%" } },
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

  const sparks = useMemo(
    () =>
      data.kpis.map((k) => {
        const color = k.good ? t.good : t.bad;
        return {
          chart: { type: "areaspline", height: 36, width: 80, backgroundColor: "transparent", margin: [2, 0, 2, 0], animation: !reduced },
          title: { text: undefined },
          credits: { enabled: false },
          legend: { enabled: false },
          tooltip: { enabled: false },
          accessibility: { enabled: false },
          xAxis: { visible: false },
          yAxis: { visible: false },
          plotOptions: { series: { animation: !reduced, enableMouseTracking: false, marker: { enabled: false } } },
          series: [{ type: "areaspline", data: [...k.spark], color, lineWidth: 1.5, fillColor: alpha(color, 0.12) }],
        } satisfies Highcharts.Options;
      }),
    [t, reduced, data],
  );

  return (
    <div className={styles.root} data-inspect="Dashboard" data-tokens="bg --surface; border --border; radius --r-lg; padding --s-5; gap --s-4">
      <div className={styles.head} data-inspect="Toolbar" data-tokens="gap --s-3">
        <div>
          <h2 className={styles.title} data-inspect="Title" data-tokens="color --text; font --step-1">
            Product usage
          </h2>
          <p className={styles.note} data-inspect="Caption" data-tokens="color --muted; font --step--1">
            Sample data
          </p>
        </div>
        <div className={styles.seg} role="group" aria-label="Range" data-inspect="Segmented control" data-tokens="border --border-strong; radius --r-md">
          {(Object.keys(RANGES) as RangeKey[]).map((k) => (
            <button key={k} type="button" aria-pressed={range === k} onClick={() => setRange(k)}>
              {RANGES[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.kpis}>
        {data.kpis.map((k, i) => (
          <div key={k.name} className={styles.kpi} data-inspect="KPI tile" data-tokens="bg --raised; radius --r-md; padding --s-3 / --s-4">
            <div className={styles.kpiText}>
              <span className={styles.kpiName}>{k.name}</span>
              <span className={styles.kpiValue}>{k.value}</span>
              <span className={`${styles.kpiDelta} ${k.good ? styles.good : styles.bad}`}>{k.delta}</span>
            </div>
            <div className={styles.kpiSpark} aria-hidden="true">
              <Chart options={sparks[i]} height={36} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.charts}>
        <figure className={styles.card} data-inspect="Area chart (Highcharts)" data-tokens="series --chart-1 / --chart-2; grid --border">
          <figcaption className={styles.cardHead}>
            <span>Sessions</span>
            <span className={styles.legend}>
              <span><i style={{ background: "var(--chart-1)" }} />Dashboards</span>
              <span><i style={{ background: "var(--chart-2)" }} />Reports</span>
            </span>
          </figcaption>
          <Chart options={area} height={210} />
        </figure>
        <figure className={styles.card} data-inspect="Donut chart (Highcharts)" data-tokens="series --chart-1 / --chart-2 / --chart-3">
          <figcaption className={styles.cardHead}>
            <span>Devices</span>
          </figcaption>
          <div className={styles.donut}>
            <Chart options={donut} height={210} />
            {/* HTML overlay: Highcharts titles do not sit exactly in the middle of the ring. */}
            <span className={styles.donutCenter} aria-hidden="true">
              <span className={styles.donutValue}>{data.devices[0]}%</span>
              <span className={styles.donutLabel}>desktop</span>
            </span>
          </div>
          <span className={`${styles.legend} ${styles.legendCenter}`}>
            <span><i style={{ background: "var(--chart-1)" }} />Desktop</span>
            <span><i style={{ background: "var(--chart-2)" }} />Mobile</span>
            <span><i style={{ background: "var(--chart-3)" }} />Tablet</span>
          </span>
        </figure>
      </div>

      <ServicesTable />
    </div>
  );
}
