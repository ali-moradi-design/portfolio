"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hexToVec3 } from "../_lib/contrast";
import type { Tokens } from "../_lib/tokens";

// A WebGL layer behind a hero. The cursor leaves a halftone trail that fades; letters of the
// headline under the trail split into two colors and turn into dots. The DOM headline stays for
// screen readers, text selection and as the fallback (no WebGL, touch screens, reduced motion).

const N = 48;
const MAX_DPR = 1.5;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform sampler2D uText;
uniform vec2 uRes;
uniform vec3 uPts[${N}];
uniform float uR;
uniform float uDot;
uniform float uDpr;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uSplit;
uniform vec3 uMuted;

float fieldAt(vec2 p) {
  float f = 0.0;
  for (int i = 0; i < ${N}; i++) {
    vec3 q = uPts[i];
    if (q.z <= 0.002) continue;
    vec2 d = p - q.xy;
    f += q.z * exp(-dot(d, d) / (uR * uR));
  }
  return clamp(f, 0.0, 1.0);
}

vec4 over(vec4 dst, vec4 src) { return src + dst * (1.0 - src.a); }

void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 cell = (floor(p / uDot) + 0.5) * uDot;
  float fc = fieldAt(cell);
  float f = fieldAt(p);
  float dist = length(p - cell);
  float aa = 0.75 * uDpr;

  float baseR = uDot * 0.1;
  float base = 1.0 - smoothstep(baseR - aa, baseR + aa, dist);
  float r = uDot * 0.5 * sqrt(fc);
  float dots = 1.0 - smoothstep(r - aa, r + aa, dist);

  vec2 uv = p / uRes;
  vec2 off = vec2(10.0, 4.0) * uDpr * f / uRes;
  float tc = texture2D(uText, uv).a;
  float ta = texture2D(uText, uv + off).a;
  float tb = texture2D(uText, uv - off).a;

  float fineDot = uDot * 0.5;
  vec2 c2 = (floor(p / fineDot) + 0.5) * fineDot;
  float r2 = fineDot * 0.58;
  float fine = 1.0 - smoothstep(r2 - aa, r2 + aa, length(p - c2));
  float core = tc * mix(1.0, fine, f);

  vec4 col = vec4(0.0);
  col = over(col, vec4(uMuted, 1.0) * base * 0.22);
  col = over(col, vec4(uAccent, 1.0) * dots * 0.85 * (1.0 - tc));
  col = over(col, vec4(uSplit, 1.0) * tb * f * 0.85);
  col = over(col, vec4(uAccent, 1.0) * ta * f * 0.85);
  col = over(col, vec4(uInk, 1.0) * core);
  gl_FragColor = col;
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
  return s;
}

export function TrailField({
  headline,
  tokens,
  className,
  before,
  children,
}: {
  headline: string;
  tokens: Tokens;
  className?: string;
  before?: ReactNode;
  children?: ReactNode;
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const tokensRef = useRef(tokens);
  const requestRef = useRef<() => void>(() => {});

  useEffect(() => {
    tokensRef.current = tokens;
    requestRef.current();
  }, [tokens]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const h1 = h1Ref.current;
    if (!wrap || !canvas || !h1) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return;

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    } catch {
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const loc = {
      res: u("uRes"), pts: u("uPts"), r: u("uR"), dot: u("uDot"), dpr: u("uDpr"),
      ink: u("uInk"), accent: u("uAccent"), split: u("uSplit"), muted: u("uMuted"),
    };

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const textCanvas = document.createElement("canvas");
    const pts = new Float32Array(N * 3);
    let head = 0;
    let dpr = 1;
    let width = 0;
    let height = 0;
    let last: { x: number; y: number } | null = null;
    let raf = 0;
    let prev = 0;

    const drawText = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      textCanvas.width = width;
      textCanvas.height = height;
      const ctx = textCanvas.getContext("2d")!;
      ctx.clearRect(0, 0, width, height);
      const cs = getComputedStyle(h1);
      ctx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * dpr}px ${cs.fontFamily}`;
      if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${parseFloat(cs.letterSpacing || "0") * dpr || 0}px`;
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "alphabetic";
      for (const span of Array.from(h1.querySelectorAll<HTMLSpanElement>("[data-word]"))) {
        const r = span.getBoundingClientRect();
        const m = ctx.measureText(span.textContent ?? "");
        ctx.fillText(span.textContent ?? "", (r.left - rect.left) * dpr, (r.top - rect.top) * dpr + m.fontBoundingBoxAscent);
      }
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    };

    const render = () => {
      const t = tokensRef.current;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(loc.res, width, height);
      gl.uniform3fv(loc.pts, pts);
      gl.uniform1f(loc.r, 70 * dpr);
      gl.uniform1f(loc.dot, 10 * dpr);
      gl.uniform1f(loc.dpr, dpr);
      gl.uniform3fv(loc.ink, hexToVec3(t.text));
      gl.uniform3fv(loc.accent, hexToVec3(t.accent));
      gl.uniform3fv(loc.split, hexToVec3(t["chart-2"]));
      gl.uniform3fv(loc.muted, hexToVec3(t.muted));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      const dt = prev ? Math.min((now - prev) / 16.67, 4) : 1;
      prev = now;
      const decay = Math.pow(0.95, dt);
      let alive = false;
      for (let i = 0; i < N; i++) {
        pts[i * 3 + 2] *= decay;
        if (pts[i * 3 + 2] > 0.003) alive = true;
        else pts[i * 3 + 2] = 0;
      }
      render();
      raf = alive ? requestAnimationFrame(tick) : 0;
      if (!alive) prev = 0;
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    requestRef.current = request;

    const push = (x: number, y: number) => {
      pts[head * 3] = x * dpr;
      pts[head * 3 + 1] = height - y * dpr;
      pts[head * 3 + 2] = 0.6;
      head = (head + 1) % N;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < -100 || y < -100 || x > rect.width + 100 || y > rect.height + 100) {
        last = null;
        return;
      }
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const steps = Math.min(Math.floor(Math.hypot(dx, dy) / 14), 8);
        for (let i = 1; i <= steps; i++) push(last.x + (dx * i) / (steps + 1), last.y + (dy * i) / (steps + 1));
      }
      push(x, y);
      last = { x, y };
      request();
    };

    const rebuild = () => {
      drawText();
      render();
    };
    const ro = new ResizeObserver(rebuild);
    ro.observe(wrap);
    document.fonts.ready.then(rebuild);
    window.addEventListener("pointermove", onMove, { passive: true });
    h1.classList.add("is-gl");
    canvas.classList.add("is-on");

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      h1.classList.remove("is-gl");
      canvas.classList.remove("is-on");
      requestRef.current = () => {};
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  const words = headline.split(" ");
  return (
    <section ref={wrapRef} className={`trail ${className ?? ""}`}>
      <canvas ref={canvasRef} className="trail-canvas" aria-hidden="true" />
      {before}
      <h1 ref={h1Ref} className="trail-title">
        {words.map((w, i) => (
          <span key={i}>
            <span data-word>{w}</span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      {children}
    </section>
  );
}
