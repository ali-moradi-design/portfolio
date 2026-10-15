"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { contrastRatio, parseColor } from "../_lib/contrast";
import { Pixels } from "./Pixels";

type Box = { x: number; y: number; w: number; h: number };
type Finding = {
  id: number;
  name: string;
  tokens: string[];
  box: Box;
  contrast: number | null;
  /** Size in design pixels: the dashboard may be scaled to fit the hero. */
  size: { w: number; h: number };
};

const MAX_FINDINGS = 12;

function effectiveBackground(el: Element | null): string | null {
  for (let node = el; node; node = node.parentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    if (parseColor(bg)) return bg;
  }
  return null;
}

function hasOwnText(el: Element): boolean {
  return Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
}

function textElement(el: Element): Element | null {
  if (hasOwnText(el)) return el;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (hasOwnText(n as Element)) return n as Element;
  }
  return null;
}

function describe(el: Element, id: number, origin: DOMRect): Finding {
  const r = el.getBoundingClientRect();
  const scale = parseFloat(el.closest("[data-scale]")?.getAttribute("data-scale") ?? "1") || 1;
  const textEl = textElement(el);
  let contrast: number | null = null;
  if (textEl) {
    const style = getComputedStyle(textEl);
    // SVG text is painted with `fill`, HTML text with `color`.
    const fg = parseColor(textEl instanceof SVGElement ? style.fill : style.color);
    const bgValue = effectiveBackground(textEl);
    const bg = bgValue ? parseColor(bgValue) : null;
    if (fg && bg) contrast = contrastRatio(fg, bg);
  }
  return {
    id,
    name: el.getAttribute("data-inspect") ?? el.tagName.toLowerCase(),
    tokens: (el.getAttribute("data-tokens") ?? "")
      .split(";")
      .map((t) => t.trim())
      .filter(Boolean),
    box: { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height },
    size: { w: Math.round(r.width / scale), h: Math.round(r.height / scale) },
    contrast,
  };
}

function intersects(a: Box, b: Box) {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

export function Inspector({ children, hint }: { children: ReactNode; hint?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const crossX = useRef<HTMLDivElement>(null);
  const crossY = useRef<HTMLDivElement>(null);
  const coords = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<Finding | null>(null);
  const [selection, setSelection] = useState<Box | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: Math.round(entry.contentRect.width), h: Math.round(entry.contentRect.height) });
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const local = (e: { clientX: number; clientY: number }) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, origin: r };
  };

  const moveCrosshair = (x: number, y: number, visible: boolean) => {
    if (crossX.current) {
      crossX.current.style.transform = `translateX(${x}px)`;
      crossX.current.style.opacity = visible ? "1" : "0";
    }
    if (crossY.current) {
      crossY.current.style.transform = `translateY(${y}px)`;
      crossY.current.style.opacity = visible ? "1" : "0";
    }
    if (coords.current) {
      const stageW = stageRef.current?.clientWidth ?? 0;
      const flip = x + 12 + coords.current.offsetWidth > stageW;
      const cx = flip ? x - 12 - coords.current.offsetWidth : x + 12;
      coords.current.style.transform = `translate(${cx}px, ${y + 12}px)`;
      coords.current.style.opacity = visible ? "1" : "0";
      coords.current.textContent = `X:${Math.round(x)}PX  Y:${Math.round(y)}PX`;
    }
  };

  const inspectAt = useCallback((clientX: number, clientY: number) => {
    const stage = stageRef.current;
    if (!stage) return null;
    const hit = document.elementFromPoint(clientX, clientY)?.closest("[data-inspect]");
    if (!hit || !stage.contains(hit)) return null;
    return describe(hit, 0, stage.getBoundingClientRect());
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    const { x, y } = local(e);
    moveCrosshair(x, y, true);
    if (drag.current) {
      const d = drag.current;
      setSelection({ x: Math.min(d.x, x), y: Math.min(d.y, y), w: Math.abs(x - d.x), h: Math.abs(y - d.y) });
      return;
    }
    if (e.pointerType === "mouse") {
      const f = inspectAt(e.clientX, e.clientY);
      setHover((prev) => (prev?.name === f?.name && prev?.box.x === f?.box.x && prev?.box.y === f?.box.y ? prev : f));
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest("button, a, input")) return;
    const { x, y } = local(e);
    drag.current = { x, y, id: e.pointerId };
    stageRef.current?.setPointerCapture(e.pointerId);
    setSelection({ x, y, w: 0, h: 0 });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    stageRef.current?.releasePointerCapture(d.id);
    const stage = stageRef.current!;
    const { x, y, origin } = local(e);
    const sel = { x: Math.min(d.x, x), y: Math.min(d.y, y), w: Math.abs(x - d.x), h: Math.abs(y - d.y) };
    setSelection(null);
    if (sel.w < 4 && sel.h < 4) {
      const f = inspectAt(e.clientX, e.clientY);
      setFindings(f ? [f] : []);
      return;
    }
    // Pick the innermost inspectable elements the selection touches, like a design tool does.
    const els = Array.from(stage.querySelectorAll("[data-inspect]"));
    const hits = els.filter((el) => {
      const r = el.getBoundingClientRect();
      return intersects(sel, { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height });
    });
    const leaves = hits.filter((el) => !hits.some((other) => other !== el && el.contains(other)));
    setFindings(leaves.slice(0, MAX_FINDINGS).map((el, i) => describe(el, i, origin)));
  };

  const inspectAll = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const origin = stage.getBoundingClientRect();
    setFindings(
      Array.from(stage.querySelectorAll("[data-inspect]"))
        .map((el, i) => describe(el, i, origin))
        .slice(0, MAX_FINDINGS),
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFindings([]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ticksX = Array.from({ length: Math.floor(size.w / 100) + 1 }, (_, i) => i * 100);
  const ticksY = Array.from({ length: Math.floor(size.h / 100) + 1 }, (_, i) => i * 100);

  return (
    <div className="insp">
      <div className="insp-frame">
        <div className="insp-corner" aria-hidden="true">+</div>
        <div className="insp-ruler insp-ruler-x" aria-hidden="true">
          {ticksX.map((t) => (
            <span key={t} style={{ left: t }}>
              {t}
            </span>
          ))}
        </div>
        <div className="insp-ruler insp-ruler-y" aria-hidden="true">
          {ticksY.map((t) => (
            <span key={t} style={{ top: t }}>
              {t}
            </span>
          ))}
        </div>
        <div
          ref={stageRef}
          className="insp-stage"
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
            setSelection(null);
          }}
          onPointerLeave={() => {
            moveCrosshair(0, 0, false);
            setHover(null);
          }}
        >
          {children}
          <div className="insp-overlay" aria-hidden="true">
            {hover && findings.length === 0 && <Guides box={hover.box} />}
            {hover && findings.length === 0 && <Outline f={hover} />}
            {findings.map((f) => (
              <Outline key={f.id} f={f} />
            ))}
            {selection && (
              <div
                className="insp-selection"
                style={{ left: selection.x, top: selection.y, width: selection.w, height: selection.h }}
              />
            )}
            <div ref={crossX} className="insp-cross-x" />
            <div ref={crossY} className="insp-cross-y" />
            <div ref={coords} className="insp-coords" />
          </div>
        </div>
        {findings.length > 0 && (
          <ul className="insp-report" aria-live="polite">
            {findings.map((f) => (
              <li key={f.id}>
                <span className="insp-report-name">{f.name}</span>
                <span className="insp-report-size">
                  {f.size.w} × {f.size.h}
                </span>
                <span className="insp-report-tokens">{f.tokens.join(", ") || "no tokens"}</span>
                {f.contrast !== null && (
                  <span className={`insp-badge ${f.contrast >= 4.5 ? "is-pass" : "is-fail"}`}>
                    {f.contrast.toFixed(2)}:1 {f.contrast >= 4.5 ? "AA pass" : "AA fail"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="insp-panel">
        <div className="insp-panel-head">
          <p>{hint ?? "Drag across the dashboard to inspect it, or click one element."}</p>
          <div className="insp-actions">
            <button type="button" className="px" onClick={inspectAll}>
              <Pixels cols={16} rows={4} />
              <span className="btn-label">Inspect all</span>
            </button>
            {findings.length > 0 && (
              <button type="button" className="px" onClick={() => setFindings([])}>
                <Pixels cols={16} rows={4} />
                <span className="btn-label">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Outline({ f }: { f: Finding }) {
  const { x, y, w, h } = f.box;
  const { w: dw, h: dh } = f.size;
  return (
    <div className="insp-outline" style={{ left: x, top: y, width: w, height: h }}>
      <span className="insp-tag">
        {f.name} {dw}×{dh}
      </span>
    </div>
  );
}

function Guides({ box }: { box: Box }) {
  return (
    <>
      <div className="insp-guide-v" style={{ left: box.x }} />
      <div className="insp-guide-v" style={{ left: box.x + box.w }} />
      <div className="insp-guide-h" style={{ top: box.y }} />
      <div className="insp-guide-h" style={{ top: box.y + box.h }} />
    </>
  );
}
