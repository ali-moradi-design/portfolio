"use client";

import { useId, useState, type DragEvent } from "react";
import { cn } from "@/shared/lib/cn";
import { series } from "../../lib/series";
import { MiniBars, MiniLine } from "../MiniCharts";

type Kind = "kpi" | "bars" | "line";
type Widget = { id: number; kind: Kind };
type Range = 7 | 30;

const CATALOG: Record<Kind, { label: string; title: string; wide: boolean }> = {
  kpi: { label: "KPI", title: "Active users", wide: false },
  bars: { label: "Bar chart", title: "Orders per day", wide: false },
  line: { label: "Line chart", title: "Sessions", wide: true },
};
const KINDS = Object.keys(CATALOG) as Kind[];
const MAX = 6;
const DRAG_TYPE = "application/x-widget";

let nextId = 4;

/** Sample of a dashboard builder: drag widgets onto the canvas, filter, reorder. */
export function DashboardBuilderSample() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 1, kind: "kpi" },
    { id: 2, kind: "bars" },
    { id: 3, kind: "line" },
  ]);
  const [range, setRange] = useState<Range>(7);
  const [over, setOver] = useState(false);
  const [message, setMessage] = useState("");
  const statusId = useId();

  const add = (kind: Kind, before?: number) => {
    if (widgets.length >= MAX) {
      setMessage(`The canvas holds ${MAX} widgets. Remove one first.`);
      return;
    }
    const widget = { id: nextId++, kind };
    setWidgets((list) => insert(list, widget, before));
    setMessage(`Added ${CATALOG[kind].title}.`);
  };

  const move = (id: number, before?: number) => {
    if (id === before) return;
    setWidgets((list) => {
      const widget = list.find((w) => w.id === id);
      if (!widget) return list;
      return insert(
        list.filter((w) => w.id !== id),
        widget,
        before,
      );
    });
  };

  const drop = (e: DragEvent, before?: number) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);
    const data = e.dataTransfer.getData(DRAG_TYPE);
    if (data.startsWith("new:")) add(data.slice(4) as Kind, before);
    if (data.startsWith("move:")) move(Number(data.slice(5)), before);
  };

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Add a widget"
        >
          {KINDS.map((kind) => (
            <button
              key={kind}
              type="button"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData(DRAG_TYPE, `new:${kind}`)
              }
              onClick={() => add(kind)}
              className="cursor-grab rounded-md border border-dashed border-border-strong bg-surface px-2.5 py-1.5 text-xs text-text active:cursor-grabbing"
            >
              + {CATALOG[kind].label}
            </button>
          ))}
        </div>
        <div
          className="inline-flex overflow-hidden rounded-md border border-border-strong"
          role="group"
          aria-label="Date range"
        >
          {([7, 30] as const).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className="cursor-pointer px-2.5 py-1.5 text-xs text-text not-first:border-l not-first:border-border aria-pressed:bg-accent aria-pressed:text-on-accent"
            >
              {r} days
            </button>
          ))}
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => drop(e)}
        className={cn(
          "grid min-h-64 auto-rows-[112px] grid-cols-1 gap-2 rounded-md border border-dashed border-border p-2 transition-colors @md:grid-cols-2",
          over && "border-accent bg-accent/5",
        )}
        aria-describedby={statusId}
      >
        {widgets.map((w, i) => (
          <WidgetCard
            key={w.id}
            widget={w}
            range={range}
            first={i === 0}
            onDrop={(e) => drop(e, w.id)}
            onRemove={() => {
              setWidgets((list) => list.filter((x) => x.id !== w.id));
              setMessage(`Removed ${CATALOG[w.kind].title}.`);
            }}
            onMoveUp={() => move(w.id, widgets[i - 1]?.id)}
          />
        ))}
        {widgets.length === 0 && (
          <p className="col-span-full self-center text-center text-body-sm text-muted">
            Drag a widget here, or press one of the buttons above.
          </p>
        )}
      </div>
      <p id={statusId} role="status" className="min-h-5 text-xs text-muted">
        {message || "Drag widgets to add or reorder them."}
      </p>
    </div>
  );
}

function insert(list: Widget[], widget: Widget, before?: number) {
  const at = before === undefined ? -1 : list.findIndex((w) => w.id === before);
  if (at < 0) return [...list, widget];
  return [...list.slice(0, at), widget, ...list.slice(at)];
}

function WidgetCard({
  widget,
  range,
  first,
  onDrop,
  onRemove,
  onMoveUp,
}: {
  widget: Widget;
  range: Range;
  first: boolean;
  onDrop: (e: DragEvent) => void;
  onRemove: () => void;
  onMoveUp: () => void;
}) {
  const { title, wide } = CATALOG[widget.kind];
  const seed = widget.id * 1.7;
  const values = series(range === 7 ? 7 : 30, seed, range === 7 ? 40 : 60);
  const total = values.reduce((a, b) => a + b, 0) * 37;
  const action =
    "grid size-6 cursor-pointer place-items-center rounded-sm text-muted hover:bg-raised hover:text-text";

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData(DRAG_TYPE, `move:${widget.id}`);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      aria-label={title}
      className={cn(
        "flex min-w-0 cursor-grab flex-col gap-1.5 rounded-md border border-border bg-surface p-2.5 active:cursor-grabbing",
        wide && "@md:col-span-2",
      )}
    >
      <header className="flex items-center justify-between gap-2 text-xs text-muted">
        <span className="truncate">{title}</span>
        <span className="flex">
          {!first && (
            <button
              type="button"
              className={action}
              aria-label={`Move ${title} earlier`}
              onClick={onMoveUp}
            >
              ↑
            </button>
          )}
          <button
            type="button"
            className={action}
            aria-label={`Remove ${title}`}
            onClick={onRemove}
          >
            ×
          </button>
        </span>
      </header>
      {widget.kind === "kpi" ? (
        <p className="mt-auto text-heading-sm leading-none tabular-nums">
          {total.toLocaleString("en-US")}
        </p>
      ) : (
        <div className="min-h-0 flex-1">
          {widget.kind === "bars" ? (
            <MiniBars values={values} />
          ) : (
            <MiniLine values={values} />
          )}
        </div>
      )}
    </article>
  );
}
