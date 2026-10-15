"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hexToVec3 } from "../_lib/contrast";
import type { Tokens } from "../_lib/tokens";

// A WebGL2 layer behind a hero, modelled on a small fluid: the cursor pushes "ink" into a
// low-resolution dye texture with a velocity field. Slow moves leave a small spot, fast moves a
// bigger, stronger one; both drift with the velocity and fade within about half a second.
// The ink is drawn as halftone dots. Letters of the headline under the ink turn to the accent
// color, split into two colors along the movement and break into dots where the ink is dense.
// The DOM headline stays for screen readers and text selection, and is the fallback when the
// layer is off (no WebGL2, touch screens, reduced motion).

const MAX_DPR = 1.5;
const SIM_SCALE = 0.25;

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const SPLAT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uTarget;
uniform vec2 uPoint;
uniform vec3 uValue;
uniform float uRadius;
uniform float uAspect;
void main() {
  vec2 d = vUv - uPoint;
  d.x *= uAspect;
  float g = exp(-dot(d, d) / (uRadius * uRadius));
  o = vec4(texture(uTarget, vUv).xyz + uValue * g, 1.0);
}
`;

const ADVECT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform float uDt;
uniform float uDissipation;
void main() {
  vec2 back = vUv - uDt * texture(uVelocity, vUv).xy;
  o = vec4(texture(uSource, back).xyz * uDissipation, 1.0);
}
`;

const DISPLAY = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uText;
uniform sampler2D uDye;
uniform sampler2D uVelocity;
uniform vec2 uRes;
uniform float uDpr;
uniform float uCell;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uSplit;
uniform vec3 uMuted;
uniform vec3 uPointer;

vec4 over(vec4 dst, vec4 src) { return src + dst * (1.0 - src.a); }

void main() {
  vec2 p = vUv * uRes;
  float aa = 0.7 * uDpr;

  vec2 cell = (floor(p / uCell) + 0.5) * uCell;
  float dc = clamp(texture(uDye, cell / uRes).x, 0.0, 1.0);
  float dist = length(p - cell);
  float base = 1.0 - smoothstep(uCell * 0.09 - aa, uCell * 0.09 + aa, dist);
  float r = uCell * 0.5 * sqrt(dc);
  float dots = 1.0 - smoothstep(r - aa, r + aa, dist);

  float d = clamp(texture(uDye, vUv).x, 0.0, 1.0);
  vec2 vel = texture(uVelocity, vUv).xy;
  vec2 off = vel * 0.012;
  float len = length(off * uRes);
  float maxLen = 9.0 * uDpr;
  if (len > maxLen) off *= maxLen / len;
  off += vec2(0.94, 0.33) * 2.0 * uDpr / uRes * smoothstep(0.05, 0.5, d);

  float tc = texture(uText, vUv).a;
  float ta = texture(uText, vUv + off).a;
  float tb = texture(uText, vUv - off).a;

  float halfCell = uCell * 0.5;
  vec2 c2 = (floor(p / halfCell) + 0.5) * halfCell;
  float fine = 1.0 - smoothstep(halfCell * 0.62 - aa, halfCell * 0.62 + aa, length(p - c2));
  float ink = smoothstep(0.04, 0.4, d);
  float core = tc * mix(1.0, fine, smoothstep(0.45, 0.95, d) * 0.7);
  vec3 letter = mix(uInk, uAccent, ink);

  vec4 col = vec4(0.0);
  col = over(col, vec4(uMuted, 1.0) * base * 0.2);
  col = over(col, vec4(uAccent, 1.0) * dots * 0.75 * (1.0 - tc));
  col = over(col, vec4(uSplit, 1.0) * tb * ink * 0.9);
  col = over(col, vec4(uAccent, 1.0) * ta * ink * 0.9);
  col = over(col, vec4(letter, 1.0) * core);

  // Square cursor mark, in the same language as the pixel hovers.
  float half = 3.5 * uDpr;
  vec2 q = abs(p - uPointer.xy);
  float cursor = (1.0 - smoothstep(half - 0.5, half + 0.5, max(q.x, q.y))) * uPointer.z;
  col = over(col, vec4(uAccent, 1.0) * cursor);
  o = col;
}
`;

type Fbo = { tex: WebGLTexture; fb: WebGLFramebuffer };
type Double = { read: Fbo; write: Fbo; swap: () => void };

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
  return s;
}

function link(gl: WebGL2RenderingContext, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.bindAttribLocation(p, 0, "aPos");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "link error");
  const cache = new Map<string, WebGLUniformLocation | null>();
  const u = (name: string) => {
    if (!cache.has(name)) cache.set(name, gl.getUniformLocation(p, name));
    return cache.get(name)!;
  };
  return { p, u };
}

export function TrailField({
  headline,
  tokens,
  className,
  before,
  children,
  aside,
}: {
  headline: string;
  tokens: Tokens;
  className?: string;
  before?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const tokensRef = useRef(tokens);
  const requestRef = useRef<() => void>(() => {});

  useEffect(() => {
    tokensRef.current = tokens;
    requestRef.current();
  }, [tokens]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = hostRef.current;
    const h1 = h1Ref.current;
    if (!wrap || !host || !h1) return;

    // The lab shows why the trail is off, so a reviewer can tell a setting from a bug.
    const off = (note: string) => {
      wrap.dataset.trailNote = note;
      return () => delete wrap.dataset.trailNote;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return off("Trail is off: this system asks for reduced motion.");
    // Touch screens get the static headline; that is the design, not an error, so no note.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // A fresh canvas per effect run: React Strict Mode runs effects twice in development, and a
    // canvas whose context was lost in the first cleanup cannot give a working context again.
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return off("Trail is off: WebGL2 is not available in this browser.");

    let progs: { splat: ReturnType<typeof link>; advect: ReturnType<typeof link>; display: ReturnType<typeof link> };
    try {
      progs = { splat: link(gl, SPLAT), advect: link(gl, ADVECT), display: link(gl, DISPLAY) };
    } catch {
      return off("Trail is off: the WebGL shaders did not compile.");
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const makeTex = (w: number, h: number, internal: number, format: number, type: number, data: TexImageSource | null = null) => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (data) gl.texImage2D(gl.TEXTURE_2D, 0, internal, format, type, data);
      else gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
      return tex;
    };
    const makeFbo = (w: number, h: number): Fbo => {
      const tex = makeTex(w, h, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
      const fb = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { tex, fb };
    };
    const makeDouble = (w: number, h: number): Double => {
      const d = { read: makeFbo(w, h), write: makeFbo(w, h), swap: () => {} };
      d.swap = () => {
        const t = d.read;
        d.read = d.write;
        d.write = t;
      };
      return d;
    };
    const freeDouble = (d: Double | null) => {
      if (!d) return;
      for (const f of [d.read, d.write]) {
        gl.deleteTexture(f.tex);
        gl.deleteFramebuffer(f.fb);
      }
    };

    const textCanvas = document.createElement("canvas");
    let textTex: WebGLTexture | null = null;
    let velocity: Double | null = null;
    let dye: Double | null = null;
    let dpr = 1;
    let width = 1;
    let height = 1;
    let simW = 1;
    let simH = 1;
    let pointer = { x: 0, y: 0, inside: false };
    let pending: { dx: number; dy: number } | null = null;
    let energy = 0;
    let smoothSpeed = 0;
    let raf = 0;
    let prev = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      simW = Math.max(1, Math.round(width * SIM_SCALE));
      simH = Math.max(1, Math.round(height * SIM_SCALE));
      freeDouble(velocity);
      freeDouble(dye);
      velocity = makeDouble(simW, simH);
      dye = makeDouble(simW, simH);

      textCanvas.width = width;
      textCanvas.height = height;
      const ctx = textCanvas.getContext("2d")!;
      ctx.clearRect(0, 0, width, height);
      const cs = getComputedStyle(h1);
      ctx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * dpr}px ${cs.fontFamily}`;
      if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${(parseFloat(cs.letterSpacing) || 0) * dpr}px`;
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "alphabetic";
      for (const span of Array.from(h1.querySelectorAll<HTMLSpanElement>("[data-word]"))) {
        const r = span.getBoundingClientRect();
        const m = ctx.measureText(span.textContent ?? "");
        ctx.fillText(span.textContent ?? "", (r.left - rect.left) * dpr, (r.top - rect.top) * dpr + m.fontBoundingBoxAscent);
      }
      if (textTex) gl.deleteTexture(textTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      textTex = makeTex(width, height, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    };

    const bindTex = (unit: number, tex: WebGLTexture) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      return unit;
    };
    const draw = (target: Fbo | null, w: number, h: number) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fb : null);
      gl.viewport(0, 0, w, h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const splat = (d: Double, x: number, y: number, value: [number, number, number], radius: number) => {
      const { p, u } = progs.splat;
      gl.useProgram(p);
      gl.uniform1i(u("uTarget"), bindTex(0, d.read.tex));
      gl.uniform2f(u("uPoint"), x, y);
      gl.uniform3f(u("uValue"), ...value);
      gl.uniform1f(u("uRadius"), radius);
      gl.uniform1f(u("uAspect"), width / height);
      draw(d.write, simW, simH);
      d.swap();
    };

    const advect = (d: Double, dt: number, dissipation: number) => {
      const { p, u } = progs.advect;
      gl.useProgram(p);
      gl.uniform1i(u("uVelocity"), bindTex(0, velocity!.read.tex));
      gl.uniform1i(u("uSource"), bindTex(1, d.read.tex));
      gl.uniform1f(u("uDt"), dt);
      gl.uniform1f(u("uDissipation"), dissipation);
      draw(d.write, simW, simH);
      d.swap();
    };

    const display = () => {
      const t = tokensRef.current;
      const { p, u } = progs.display;
      gl.useProgram(p);
      gl.uniform1i(u("uText"), bindTex(0, textTex!));
      gl.uniform1i(u("uDye"), bindTex(1, dye!.read.tex));
      gl.uniform1i(u("uVelocity"), bindTex(2, velocity!.read.tex));
      gl.uniform2f(u("uRes"), width, height);
      gl.uniform1f(u("uDpr"), dpr);
      gl.uniform1f(u("uCell"), 7 * dpr);
      gl.uniform3fv(u("uInk"), hexToVec3(t.text));
      gl.uniform3fv(u("uAccent"), hexToVec3(t.accent));
      gl.uniform3fv(u("uSplit"), hexToVec3(t["chart-2"]));
      gl.uniform3fv(u("uMuted"), hexToVec3(t.muted));
      gl.uniform3f(u("uPointer"), pointer.x * dpr, height - pointer.y * dpr, pointer.inside ? 1 : 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = prev ? Math.min((now - prev) / 1000, 1 / 30) : 1 / 60;
      prev = now;
      if (pending && velocity && dye) {
        const { dx, dy } = pending;
        pending = null;
        // Smoothed speed in CSS px per second: a still cursor shows only the dot, slow moves a small
        // spot, fast moves a bigger and denser one.
        smoothSpeed += (Math.hypot(dx, dy) / dt - smoothSpeed) * 0.35;
        const k = Math.min(smoothSpeed / 1800, 1);
        const radiusPx = 8 + 22 * k;
        const amount = 0.14 + 0.32 * k;
        const ux = pointer.x / (width / dpr);
        const uy = 1 - pointer.y / (height / dpr);
        const r = radiusPx / (height / dpr);
        splat(velocity, ux, uy, [(dx / (width / dpr)) / dt * 0.6, (-dy / (height / dpr)) / dt * 0.6, 0], r);
        splat(dye, ux, uy, [amount, 0, 0], r);
        energy = Math.min(energy + amount, 3);
      } else {
        smoothSpeed *= 0.8;
      }
      if (velocity && dye) {
        const f = dt * 60;
        advect(velocity, dt, Math.pow(0.94, f));
        advect(dye, dt, Math.pow(0.94, f));
        energy *= Math.pow(0.93, f);
        display();
      }
      if (energy > 0.004 || pending) raf = requestAnimationFrame(tick);
      else prev = 0;
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    requestRef.current = request;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside && pointer.inside) {
        const p = pending ?? { dx: 0, dy: 0 };
        pending = { dx: p.dx + x - pointer.x, dy: p.dy + y - pointer.y };
      }
      pointer = { x, y, inside };
      request();
    };

    const rebuild = () => {
      resize();
      display();
    };
    const ro = new ResizeObserver(rebuild);
    ro.observe(wrap);
    document.fonts.ready.then(rebuild);
    window.addEventListener("pointermove", onMove, { passive: true });
    host.appendChild(canvas);
    h1.classList.add("is-gl");

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      h1.classList.remove("is-gl");
      canvas.remove();
      requestRef.current = () => {};
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  const words = headline.split(" ");
  return (
    <section ref={wrapRef} className={`trail ${className ?? ""}`}>
      <div ref={hostRef} className="trail-canvas" aria-hidden="true" />
      <div className="trail-copy lab-copy">
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
      </div>
      {aside}
    </section>
  );
}
