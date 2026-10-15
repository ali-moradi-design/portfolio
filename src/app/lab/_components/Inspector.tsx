"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { contrastRatio, parseColor } from "../_lib/contrast";
import { AA_GRAPHICS, AA_TEXT, isGraphicRole, isToken, parseTokens, typeStep } from "../_lib/inspectTokens";
import { Pixels } from "./Pixels";

type Box = { x: number; y: number; w: number; h: number };
type TokenItem = {
  label: string;
  /** Resolved CSS value, shown when short (e.g. "24px"). */
  value: string | null;
  /** Set when the value is a color. */
  swatch: string | null;
  /** Graphics contrast against the element background (series colors only). */
  contrast: number | null;
};
/** A measured space drawn over the stage: `box` in stage pixels, `value` in design pixels. */
type Space = { box: Box; value: number };
type Typography = { size: number; lineHeight: number | null; step: string | null };
type Finding = {
  id: number;
  type: Typography | null;
  padding: Space[];
  gaps: Space[];
  name: string;
  tokens: { role: string; items: TokenItem[] }[];
  box: Box;
  /** Text contrast of the first text inside the element. */
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

function resolveItem(el: Element, label: string, graphic: boolean, bg: string | null): TokenItem {
  if (!isToken(label)) return { label, value: null, swatch: null, contrast: null };
  const raw = getComputedStyle(el).getPropertyValue(label).trim();
  const color = raw ? parseColor(raw) : null;
  const bgColor = bg ? parseColor(bg) : null;
  return {
    label,
    value: !color && raw && raw.length <= 10 ? raw : null,
    swatch: color ? raw : null,
    contrast: graphic && color && bgColor ? contrastRatio(color, bgColor) : null,
  };
}

function typography(el: Element): Typography {
  const style = getComputedStyle(el);
  const size = parseFloat(style.fontSize);
  const lh = parseFloat(style.lineHeight);
  return { size: Math.round(size * 10) / 10, lineHeight: Number.isFinite(lh) ? Math.round(lh) : null, step: typeStep(size) };
}

function paddingSpaces(el: Element, r: DOMRect, origin: DOMRect, scale: number): Space[] {
  const s = getComputedStyle(el);
  const px = (v: string) => parseFloat(v) || 0;
  const [bt, br, bb, bl] = [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth].map(px);
  const [pt, pr, pb, pl] = [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(px);
  // Inner box (inside the border) in stage pixels; computed values are in design pixels.
  const x = r.left - origin.left + bl * scale;
  const y = r.top - origin.top + bt * scale;
  const w = r.width - (bl + br) * scale;
  const h = r.height - (bt + bb) * scale;
  return [
    { box: { x, y, w, h: pt * scale }, value: pt },
    { box: { x, y: y + h - pb * scale, w, h: pb * scale }, value: pb },
    { box: { x, y: y + pt * scale, w: pl * scale, h: h - (pt + pb) * scale }, value: pl },
    { box: { x: x + w - pr * scale, y: y + pt * scale, w: pr * scale, h: h - (pt + pb) * scale }, value: pr },
  ].filter((sp) => sp.value > 0);
}

/** Spaces between neighbouring children of a flex or grid container. */
function gapSpaces(el: Element, origin: DOMRect, scale: number): Space[] {
  const s = getComputedStyle(el);
  if (!/flex|grid/.test(s.display)) return [];
  const rects = Array.from(el.children)
    .map((c) => c.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0);
  const spaces: Space[] = [];
  for (const a of rects) {
    // Nearest neighbour to the right that shares a row, and below that shares a column.
    const right = rects
      .filter((b) => b.left >= a.right - 0.5 && b.top < a.bottom && a.top < b.bottom)
      .sort((p, q) => p.left - q.left)[0];
    const below = rects
      .filter((b) => b.top >= a.bottom - 0.5 && b.left < a.right && a.left < b.right)
      .sort((p, q) => p.top - q.top)[0];
    if (right && right.left - a.right > 0.5) {
      const top = Math.max(a.top, right.top);
      const bottom = Math.min(a.bottom, right.bottom);
      spaces.push({
        box: { x: a.right - origin.left, y: top - origin.top, w: right.left - a.right, h: bottom - top },
        value: Math.round((right.left - a.right) / scale),
      });
    }
    if (below && below.top - a.bottom > 0.5) {
      const left = Math.max(a.left, below.left);
      const rightEdge = Math.min(a.right, below.right);
      spaces.push({
        box: { x: left - origin.left, y: a.bottom - origin.top, w: rightEdge - left, h: below.top - a.bottom },
        value: Math.round((below.top - a.bottom) / scale),
      });
    }
  }
  return spaces;
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
  const elBg = effectiveBackground(el);
  return {
    id,
    type: textEl ? typography(textEl) : null,
    padding: paddingSpaces(el, r, origin, scale),
    gaps: gapSpaces(el, origin, scale),
    name: el.getAttribute("data-inspect") ?? el.tagName.toLowerCase(),
    tokens: parseTokens(el.getAttribute("data-tokens")).map((g) => ({
      role: g.role,
      items: g.items.map((item) => resolveItem(el, item, isGraphicRole(g.role), elBg)),
    })),
    box: { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height },
    size: { w: Math.round(r.width / scale), h: Math.round(r.height / scale) },
    contrast,
  };
}

function ratio(n: number) {
  return `${n.toFixed(2)}:1`;
}

function FindingRow({ f }: { f: Finding }) {
  return (
    <li>
      <span className="insp-report-name">{f.name}</span>
      <span className="insp-report-size">
        {f.size.w} × {f.size.h}
      </span>
      {f.tokens.length > 0 ? (
        <dl className="insp-tokens">
          {f.tokens.map((g) => (
            <div key={g.role} className="insp-token-row">
              <dt>{g.role}</dt>
              <dd>
                {g.items.map((item) => (
                  <span
                    key={item.label}
                    className={`insp-chip${item.contrast !== null && item.contrast < AA_GRAPHICS ? " is-fail" : ""}`}
                    title={item.contrast !== null ? `Contrast with the background; WCAG AA asks for at least ${AA_GRAPHICS}:1 for graphics` : undefined}
                  >
                    {item.swatch && <i className="insp-swatch" style={{ background: item.swatch }} />}
                    <code>{item.label}</code>
                    {item.value && <span className="insp-chip-value">{item.value}</span>}
                    {item.contrast !== null && <span className="insp-chip-value">{ratio(item.contrast)}</span>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <span className="insp-report-empty">No tokens</span>
      )}
      {f.type && (
        <div className="insp-token-row insp-type">
          <span>type</span>
          <span>
            {f.type.step ?? "Off scale"} · {f.type.size}px
            {f.type.lineHeight !== null && <span className="insp-chip-value"> / {f.type.lineHeight}px line</span>}
          </span>
        </div>
      )}
      {f.contrast !== null && (
        <span
          className={`insp-badge ${f.contrast >= AA_TEXT ? "is-pass" : "is-fail"}`}
          title={`WCAG AA asks for at least ${AA_TEXT}:1 for body text`}
        >
          Text contrast {ratio(f.contrast)} · WCAG AA {f.contrast >= AA_TEXT ? "pass" : "fail"}
        </span>
      )}
    </li>
  );
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
            {hover && findings.length === 0 && <Spacing f={hover} />}
            {hover && findings.length === 0 && <Outline f={hover} />}
            {findings.length === 1 && <Spacing f={findings[0]} />}
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
              <FindingRow key={f.id} f={f} />
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

function Spacing({ f }: { f: Finding }) {
  return (
    <>
      {f.padding.map((sp, i) => (
        <SpaceBox key={`p${i}`} sp={sp} kind="padding" />
      ))}
      {f.gaps.map((sp, i) => (
        <SpaceBox key={`g${i}`} sp={sp} kind="gap" />
      ))}
    </>
  );
}

function SpaceBox({ sp, kind }: { sp: Space; kind: "padding" | "gap" }) {
  const { x, y, w, h } = sp.box;
  return (
    <div className={`insp-space is-${kind}`} style={{ left: x, top: y, width: w, height: h }}>
      {Math.min(w, h) >= 6 && Math.max(w, h) >= 18 && <span className="insp-space-label">{sp.value}</span>}
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
